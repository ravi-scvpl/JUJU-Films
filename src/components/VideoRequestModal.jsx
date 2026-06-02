"use client";

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { supabase } from '../supabaseClient';

const VideoRequestModal = ({ isOpen, onClose, caseStudyId, caseStudyTitle, videoUrl }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: ''
    });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.touchAction = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.touchAction = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();

        if (!formData.email || !formData.name || !formData.company) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: formData.email,
                options: {
                    shouldCreateUser: true,
                }
            });

            if (otpError) throw otpError;

            setResendTimer(60);
            setStep(2);
        } catch (err) {
            console.error("OTP send error:", err);
            setError(err.message || 'Failed to send verification code.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            setError('Please enter the verification code.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const verificationTypes = ['signup', 'magiclink', 'email'];
            let lastError = null;
            let success = false;

            for (const type of verificationTypes) {
                const { error: verifyError } = await supabase.auth.verifyOtp({
                    email: formData.email,
                    token: otp.trim(),
                    type: type
                });

                if (!verifyError) {
                    success = true;
                    break;
                } else {
                    lastError = verifyError;
                }
            }

            if (success) {
                // Record the request in video_requests table
                await supabase.from('video_requests').insert([{
                    case_study_id: caseStudyId,
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    company: formData.company,
                    status: 'verified'
                }]);

                // Call Brevo API to send the video link
                try {
                    const response = await fetch('/api/send-video-link', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: formData.email,
                            caseStudyTitle,
                            videoUrl
                        })
                    });

                    if (!response.ok) {
                        const contentType = response.headers.get("content-type");
                        let errorMessage = `Mail API Error (${response.status})`;

                        if (contentType && contentType.indexOf("application/json") !== -1) {
                            const errorData = await response.json();
                            // If we have detailed error info from my latest API update, show it
                            if (errorData.message || errorData.details) {
                                errorMessage = `${errorData.error || 'Error'}: ${errorData.message || ''} ${JSON.stringify(errorData.details || '')}`;
                            } else {
                                errorMessage = errorData.error || errorMessage;
                            }
                        } else {
                            const textError = await response.text();
                            console.error("Non-JSON error response:", textError);
                            if (response.status === 404) {
                                errorMessage = "API route not found (404). Please ensure you are using port 3000 for 'vercel dev'.";
                            } else {
                                errorMessage = `Server Error (${response.status}): ${textError.substring(0, 50)}...`;
                            }
                        }
                        throw new Error(errorMessage);
                    }
                } catch (apiErr) {
                    console.error("Email delivery failed:", apiErr);
                    let finalMsg = "OTP verified, but email failed: " + apiErr.message;
                    setError(finalMsg);
                    setLoading(false);
                    return;
                }

                setStep(3);
            } else {
                setError(lastError?.message || 'Invalid or expired code.');
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.98)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999999,
            backdropFilter: 'blur(30px)',
            pointerEvents: 'auto'
        },
        container: {
            backgroundColor: '#050505',
            padding: '60px 40px',
            borderRadius: '0px',
            width: '90%',
            maxWidth: '500px',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 100px rgba(229, 35, 35, 0.1)',
            maxHeight: '90vh',
            overflowY: 'auto'
        },
        close: {
            position: 'absolute',
            top: '30px',
            right: '30px',
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '32px',
            lineHeight: '1',
            cursor: 'pointer',
            transition: 'color 0.3s',
            zIndex: 10
        },
        title: {
            fontSize: '24px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            marginBottom: '15px',
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'serif'
        },
        subtitle: {
            fontSize: '13px',
            color: '#888',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: '1.8',
            letterSpacing: '1px'
        },
        inputGroup: {
            marginBottom: '25px'
        },
        input: {
            width: '100%',
            padding: '18px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #1a1a1a',
            color: '#fff',
            fontSize: '15px',
            outline: 'none',
            transition: 'border-color 0.3s',
            borderRadius: '0',
            boxSizing: 'border-box'
        },
        label: {
            display: 'block',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#555',
            marginBottom: '10px',
            fontWeight: '600'
        },
        button: {
            width: '100%',
            padding: '20px',
            backgroundColor: '#E52323',
            color: '#fff',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
            marginTop: '15px'
        },
        error: {
            color: '#ff4444',
            fontSize: '12px',
            marginBottom: '30px',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 68, 68, 0.05)',
            padding: '15px',
            border: '1px solid rgba(255, 68, 68, 0.1)',
            letterSpacing: '1px',
            lineHeight: '1.4',
            wordBreak: 'break-word'
        }
    };

    const modalContent = (
        <div style={modalStyles.overlay} onClick={onClose} id="video-request-modal-overlay">
            <div style={modalStyles.container} onClick={e => e.stopPropagation()} id="video-request-modal-container">
                <button
                    style={modalStyles.close}
                    onClick={onClose}
                    onMouseEnter={e => e.target.style.color = '#E52323'}
                    onMouseLeave={e => e.target.style.color = '#666'}
                >&times;</button>

                {step === 1 && (
                    <>
                        <h2 style={modalStyles.title}>Access Video</h2>
                        <p style={modalStyles.subtitle}>Requesting the master copy of <br /><span style={{ color: '#fff', textTransform: 'none', letterSpacing: '0' }}>"{caseStudyTitle}"</span></p>

                        {error && <div style={modalStyles.error}>{error}</div>}

                        <form onSubmit={handleSendOtp}>
                            <div style={modalStyles.inputGroup}>
                                <label style={modalStyles.label}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Rahul Sharma"
                                    style={modalStyles.input}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={modalStyles.inputGroup}>
                                <label style={modalStyles.label}>Company / Agency</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Where do you work?"
                                    style={modalStyles.input}
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={modalStyles.inputGroup}>
                                <label style={modalStyles.label}>Work Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    style={modalStyles.input}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={modalStyles.inputGroup}>
                                <label style={modalStyles.label}>Contact Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+91 ...."
                                    style={modalStyles.input}
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" style={modalStyles.button} disabled={loading}>
                                {loading ? 'Processing...' : 'Verify & Request'}
                            </button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 style={modalStyles.title}>Verification</h2>
                        <p style={modalStyles.subtitle}>We've sent a code to <br /><span style={{ color: '#fff' }}>{formData.email}</span></p>

                        {error && <div style={modalStyles.error}>{error}</div>}

                        <form onSubmit={handleVerifyOtp}>
                            <div style={modalStyles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="0 0 0 0 0 0"
                                    style={{ ...modalStyles.input, textAlign: 'center', letterSpacing: '12px', fontSize: '24px', fontWeight: '700', backgroundColor: '#000' }}
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    maxLength="10"
                                    required
                                />
                            </div>
                            <button type="submit" style={modalStyles.button} disabled={loading}>
                                {loading ? 'Sending Video Link...' : 'Finish & Receive Link'}
                            </button>
                        </form>

                        <div style={{ marginTop: '30px', textAlign: 'center' }}>
                            <button
                                onClick={handleSendOtp}
                                disabled={resendTimer > 0 || loading}
                                style={{ background: 'none', border: 'none', color: resendTimer > 0 ? '#333' : '#E52323', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', cursor: 'pointer' }}
                            >
                                {resendTimer > 0 ? `Resend Available in ${resendTimer}s` : 'Resend Verification Code'}
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <div style={{ fontSize: '70px', color: '#E52323', marginBottom: '30px' }}>✓</div>
                        <h2 style={modalStyles.title}>Master Sent</h2>
                        <p style={{ ...modalStyles.subtitle, fontSize: '15px', color: '#ccc' }}>
                            The high-resolution link for "{caseStudyTitle}" is on its way to your inbox.
                        </p>
                        <button onClick={onClose} style={{ ...modalStyles.button, width: '60%', margin: '20px auto 0' }}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    // Use a portal to render outside the main layout tree (prevents parent clipping)
    return ReactDOM.createPortal(modalContent, document.body);
};

export default VideoRequestModal;
