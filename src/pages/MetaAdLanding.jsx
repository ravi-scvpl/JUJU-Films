import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';
import '../styles/juju-overrides.css';
import bgVideo from '../assets/bg-ad-landing-jujufilms.mp4';
import showreelVideo from '../assets/juju-showreel-small-size.mp4';
import { Link } from 'react-router-dom';

const formOptions = [
    { value: "Product TVC" },
    { value: "Brand TVC" },
    { value: "Social Media Videos" },
    { value: "AI Films" },
    { value: "10-Second Bumpers" },
    { value: "Brand Celebrity Ambassador" },
    { value: "UGC Content" },
    { value: "Brand IP" },
    { value: "Web Series" },
    { value: "In-Movie Branding" },
    { value: "Vertical Series" },
    { value: "Corporate Films" },
    { value: "Influencer Marketing" },
];

const MetaAdLanding = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        website: '',
        company: '', // Added to fix uncontrolled warning
        city: '',
        turnover: '',
        budget: '',
        service: [] // Changed to array for multi-select
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [resendDisabled, setResendDisabled] = useState(false);
    const videoRef = useRef(null);

    // Auto-play video on mount/success if needed
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        }
    }, [submitted]);

    // Timer logic for OTP resend
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleService = (serviceValue) => {
        setFormData(prev => {
            const currentServices = prev.service || [];
            const newValue = currentServices.includes(serviceValue)
                ? currentServices.filter(s => s !== serviceValue)
                : [...currentServices, serviceValue];
            return { ...prev, service: newValue };
        });
    };

    const [leadId, setLeadId] = useState(null);

    // ... (existing code)

    const capturePartialLead = async () => {
        if (!formData.email || !formData.name) return null;

        try {
            console.log("Capturing partial lead...");
            const { data, error: supabaseError } = await supabase
                .from('contacts')
                .insert([{
                    first_name: formData.name.split(' ')[0],
                    last_name: formData.name.split(' ').slice(1).join(' ') || '',
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.city,
                    company: formData.company || '', // Unified to use company
                    type: 'ad_lead_partial', // Mark as partial
                    status: 'new'
                }])
                .select()
                .single();

            if (supabaseError) {
                console.warn("Partial lead capture Supabase error:", supabaseError.message);
                return null;
            }

            if (data) {
                console.log("Partial lead captured with ID:", data.id);
                setLeadId(data.id);
                return data.id;
            }
        } catch (err) {
            console.error("Partial lead capture exception:", err);
        }
        return null;
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (!formData.name || !formData.phone || !formData.email || !formData.city) {
                setError('Please fill in all required fields.');
                return;
            }
            setError('');

            setSubmitting(true);
            try {
                // Send OTP to user's email
                const { error: otpError } = await supabase.auth.signInWithOtp({
                    email: formData.email,
                    options: {
                        shouldCreateUser: true,
                    }
                });

                if (otpError) throw otpError;

                setResendTimer(120); // Start 2 minute timer
                setResendDisabled(true);

                // Await partial lead capture to ensure leadId is set
                await capturePartialLead();

                setStep(2);
            } catch (err) {
                console.error("OTP send error", err);
                if (err.status === 422 || err.message?.includes('Signups not allowed')) {
                    setError('Verification failed: New signups are disabled in Supabase. Please enable "Allow new users to sign up" in your Supabase Dashboard.');
                } else {
                    setError('Failed to send verification code. Please check your email.');
                }
            } finally {
                setSubmitting(false);
            }
        } else {
            handleSubmit(e);
        }
    };

    const handleResend = async () => {
        setError('');
        setResendDisabled(true);
        try {
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: formData.email,
                options: {
                    shouldCreateUser: true,
                }
            });

            if (otpError) throw otpError;

            setResendTimer(120); // Reset timer to 2 minutes
            alert("Verification code resent successfully!");
        } catch (err) {
            console.error("OTP resend error", err);
            setError('Failed to resend code. Please try again later.');
            setResendDisabled(false);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // Verify OTP first
            if (!otp) {
                setError('Please enter the verification code sent to your email.');
                setSubmitting(false);
                return;
            }

            setVerifyingOtp(true);

            const cleanEmail = formData.email.trim();
            const cleanOtp = otp.trim();
            const verificationTypes = ['signup', 'magiclink', 'email'];
            let lastError = null;
            let success = false;

            console.log("Starting verification for:", cleanEmail);

            for (const type of verificationTypes) {
                console.log(`Attempting verification with type: ${type}...`);
                const { error: verifyError } = await supabase.auth.verifyOtp({
                    email: cleanEmail,
                    token: cleanOtp,
                    type: type
                });

                if (!verifyError) {
                    console.log(`Verification successful with type: ${type}`);
                    success = true;
                    break;
                } else {
                    console.warn(`${type} verification failed:`, verifyError.message);
                    lastError = verifyError;
                }
            }

            if (!success) {
                console.error("All verification attempts failed.");
                setError(`Verification failed: ${lastError?.message || 'Invalid or expired code'}. Please try requesting a new code.`);
                setVerifyingOtp(false);
                setSubmitting(false);
                return;
            }

            const leadData = {
                first_name: formData.name.split(' ')[0],
                last_name: formData.name.split(' ').slice(1).join(' ') || '',
                email: formData.email,
                phone: formData.phone,
                company: formData.company, // Using company field
                address: formData.city, // Using address field for city
                budget: formData.budget,
                message: `Services: ${Array.isArray(formData.service) ? formData.service.join(', ') : formData.service}\nTurnover: ${formData.turnover}`,
                type: 'ad_lead', // Upgrade to full lead
                status: 'new'
            };

            console.log("Lead data prepared for full submission:", leadData);

            let supabaseError;
            let rowsAffected = 0;

            if (leadId) {
                console.log("Updating lead by ID:", leadId);
                const { error, count } = await supabase
                    .from('contacts')
                    .update(leadData, { count: 'exact' })
                    .eq('id', leadId);
                supabaseError = error;
                rowsAffected = count || 0;
            } else {
                console.log("No leadId found, searching by email fallback...");
                const { data: existing, error: findError } = await supabase
                    .from('contacts')
                    .select('id')
                    .eq('email', formData.email)
                    .eq('type', 'ad_lead_partial')
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (existing && existing.length > 0) {
                    console.log("Found existing lead via fallback:", existing[0].id);
                    const { error, count } = await supabase
                        .from('contacts')
                        .update(leadData, { count: 'exact' })
                        .eq('id', existing[0].id);
                    supabaseError = error;
                    rowsAffected = count || 0;
                } else {
                    console.log("No existing lead found, creating new record.");
                    const { error } = await supabase
                        .from('contacts')
                        .insert([leadData]);
                    supabaseError = error;
                    rowsAffected = 1; // Assuming success if no error
                }
            }

            if (supabaseError) {
                console.error("Supabase Operation Error:", supabaseError);
                throw supabaseError;
            }

            if (rowsAffected === 0) {
                console.error("Critical: 0 rows were updated. Check your RLS 'UPDATE' policy!");
                setError('Warning: Your data could not be saved. Please contact support or check RLS policies.');
                setVerifyingOtp(false);
                setSubmitting(false);
                return;
            }

            console.log("Final submission successful, rows affected:", rowsAffected);
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
            setVerifyingOtp(false);
        }
    };

    if (submitted) {
        return (
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                backgroundColor: '#000',
                display: 'flex',
                fontFamily: "'Inter', sans-serif",
                alignItems: 'flex-end', // Align to bottom
                justifyContent: 'center',
                color: '#fff'
            }}>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        opacity: 1 // Full visibility for showreel
                    }}
                >
                    <source src={showreelVideo} type="video/mp4" />
                </video>

                {/* Gradient Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    zIndex: 1
                }}></div>

                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '40px 20px 60px', // Bottom padding
                    maxWidth: '800px',
                    width: '100%',
                    animation: 'fadeIn 1s ease-out'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem',
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        Thank You
                    </h1>
                    <div style={{ width: '60px', height: '2px', background: '#E52323', margin: '0 auto 1.5rem' }}></div>

                    <p style={{
                        fontSize: '1.1rem',
                        marginBottom: '2rem',
                        lineHeight: '1.6',
                        opacity: 0.9,
                        textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                    }}>
                        Thank you for reaching out. Our GTM Expert will connect with you shortly.
                        Till then… JUJU
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <a
                            href="https://www.instagram.com/jujufilmsindia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover-scale"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 25px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '14px',
                                borderRadius: '50px',
                                transition: 'all 0.3s'
                            }}
                        >
                            <span>Instagram</span>
                        </a>

                        <a
                            href="https://wa.me/919810075412"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover-scale"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 25px',
                                backgroundColor: '#25D366',
                                border: '1px solid #25D366',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '14px',
                                borderRadius: '50px',
                                transition: 'all 0.3s'
                            }}
                        >
                            <span>Contact on WhatsApp</span>
                        </a>
                        <Link
                            to="/"
                            className="hover-scale"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '12px 25px',
                                backgroundColor: '#E52323',
                                border: '1px solid #E52323',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '14px',
                                borderRadius: '50px',
                                transition: 'all 0.3s'
                            }}
                        >
                            Take me to Homepage
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            fontFamily: "'Inter', sans-serif",
            backgroundColor: '#000',
            color: '#fff',
            overflow: 'hidden'
        }}>
            <SEO
                title="Start Your Project"
                description="Partner with JUJU Films for high-impact film craft and brand storytelling."
                canonical="/start-project"
            />

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    opacity: 0.4
                }}
            >
                <source src={showreelVideo} type="video/mp4" />
            </video>

            <div style={{
                position: 'relative',
                zIndex: 2,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px' // Reduced padding
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '500px', // Slightly narrower for cleaner look
                    padding: '30px',
                    backgroundColor: 'rgba(10, 10, 10, 0.6)', // Glassy dark bg
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <img src="/juju-white-logo.webp" alt="JUJU Films" style={{ height: '40px', marginBottom: '20px' }} />
                        <h1 style={{ fontSize: '24px', fontWeight: '300', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {step === 1 ? 'Let\'s connect' : 'Project Details'}
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <div style={{ width: '40px', height: '2px', backgroundColor: step === 1 ? '#E52323' : '#333', marginRight: '5px' }}></div>
                            <div style={{ width: '40px', height: '2px', backgroundColor: step === 2 ? '#E52323' : '#333' }}></div>
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: '#ff4444', marginBottom: '20px', textAlign: 'center', backgroundColor: 'rgba(255,68,68,0.1)', padding: '10px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleNext}>
                        {step === 1 && (
                            <div className="form-step-1">
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>WhatsApp Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="`{+91}`10 digit mobile number"
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="Mumbai, Delhi, Bangalore"
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Company Name *</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="Your Company Name"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-step-2">
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#E52323', fontWeight: 'bold' }}>Verification Code *</label>
                                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>We've sent a code to {formData.email}</p>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        maxLength="8"
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #E52323',
                                            color: '#fff',
                                            fontSize: '20px',
                                            letterSpacing: '5px',
                                            textAlign: 'center',
                                            outline: 'none'
                                        }}
                                        placeholder="00000000"
                                    />
                                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                        {resendTimer > 0 ? (
                                            <p style={{ fontSize: '12px', color: '#888' }}>
                                                Resend code in <span style={{ color: '#E52323' }}>{Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}</span>
                                            </p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResend}
                                                disabled={resendDisabled}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#E52323',
                                                    fontSize: '12px',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    opacity: resendDisabled ? 0.5 : 1
                                                }}
                                            >
                                                Didn't receive the code? Resend
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Company Turnover</label>
                                    <select
                                        name="turnover"
                                        value={formData.turnover}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="">Select Turnover Range</option>
                                        <option value="<1Cr">Less than 10 Cr</option>
                                        <option value="1Cr-10Cr">10 Cr - 100 Cr</option>
                                        <option value="10Cr-50Cr">100 Cr - 500 Cr</option>
                                        <option value="50Cr+">500 Cr +</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Budget</label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="Approx. Budget"
                                    />
                                </div>
                                <div style={{ marginBottom: '30px' }}>
                                    <label style={{ display: 'block', marginBottom: '15px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Services / Interests * (Select Multiple)</label>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '10px',
                                        maxHeight: '250px',
                                        overflowY: 'auto',
                                        padding: '5px'
                                    }}>
                                        {formOptions.map((opt, idx) => {
                                            const isSelected = formData.service.includes(opt.value);
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => toggleService(opt.value)}
                                                    style={{
                                                        padding: '10px 15px',
                                                        backgroundColor: isSelected ? '#E52323' : 'rgba(255,255,255,0.05)',
                                                        border: `1px solid ${isSelected ? '#E52323' : '#333'}`,
                                                        color: isSelected ? '#fff' : '#ccc',
                                                        borderRadius: '4px',
                                                        fontSize: '13px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {opt.value}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                            {step === 2 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    style={{
                                        flex: 1,
                                        padding: '15px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #fff',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    flex: 1,
                                    padding: '15px',
                                    backgroundColor: '#E52323',
                                    border: 'none',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    opacity: submitting ? 0.7 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {submitting ? 'Processing...' : (step === 1 ? 'Submit' : (verifyingOtp ? 'Verifying...' : 'Submit Request'))}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MetaAdLanding;
