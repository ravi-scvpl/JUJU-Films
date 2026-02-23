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
        city: '',
        company: '',
        start_timeline: 'Immediately',
        website_url: '',
        service: [],
        brand_type: 'Startup/ D2C Brand',
        has_ambassador: 'No'
    });
    const [briefFile, setBriefFile] = useState(null);
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
        let { name, value } = e.target;
        if (name === 'phone') {
            // Auto prefix +91
            const cleaned = value.replace(/\D/g, '');
            // If they enter 10 digits and it doesn't have +91, add it
            if (cleaned.length === 10 && !value.startsWith('+91')) {
                value = '+91' + cleaned;
            }
        }
        setFormData({ ...formData, [name]: value });
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
                    status: 'new',
                    lead_tag: 'partial'
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
            if (!formData.name || !formData.phone || !formData.email || !formData.city || !formData.company) {
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
        } else if (step === 2) {
            await handleVerifyOtp();
        } else {
            await handleSubmit(e);
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

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError('Please enter the verification code sent to your email.');
            return;
        }

        setVerifyingOtp(true);
        setError('');

        try {
            const cleanEmail = formData.email.trim();
            const cleanOtp = otp.trim();
            const verificationTypes = ['signup', 'magiclink', 'email'];
            let lastError = null;
            let success = false;

            for (const type of verificationTypes) {
                const { error: verifyError } = await supabase.auth.verifyOtp({
                    email: cleanEmail,
                    token: cleanOtp,
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
                // Update lead to 'verified' status in Supabase if leadId exists
                if (leadId) {
                    await supabase
                        .from('contacts')
                        .update({ lead_tag: 'verified' })
                        .eq('id', leadId);
                }
                setStep(3);
            } else {
                setError(`Verification failed: ${lastError?.message || 'Invalid or expired code'}`);
            }
        } catch (err) {
            console.error("OTP verification error", err);
            setError('Something went wrong during verification.');
        } finally {
            setVerifyingOtp(false);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleUrlBlur = (e) => {
        let { name, value } = e.target;
        if (name === 'website_url' && value.trim() !== '') {
            if (!/^https?:\/\//i.test(value)) {
                setFormData(prev => ({ ...prev, [name]: 'https://' + value }));
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setBriefFile(e.target.files[0]);
        }
    };

    const uploadBrief = async (file) => {
        if (!file) return null;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('briefs')
            .upload(filePath, file);

        if (uploadError) {
            console.error("Upload error:", uploadError);
            throw new Error("Failed to upload brief. Please try again.");
        }

        const { data: { publicUrl } } = supabase.storage
            .from('briefs')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            let briefUrl = null;
            if (briefFile) {
                briefUrl = await uploadBrief(briefFile);
            }

            const leadData = {
                first_name: formData.name.split(' ')[0],
                last_name: formData.name.split(' ').slice(1).join(' ') || '',
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                address: formData.city,
                budget: '',
                message: `Services: ${Array.isArray(formData.service) ? formData.service.join(', ') : formData.service}`,
                type: 'ad_lead',
                status: 'new',
                start_timeline: formData.start_timeline,
                website_url: formData.website_url,
                brand_type: formData.brand_type,
                has_ambassador: formData.has_ambassador,
                brief_url: briefUrl,
                lead_tag: 'complete'
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

                    <div style={{ width: '60px', height: '2px', background: '#E52323', margin: '0 auto 1.5rem' }}></div>

                    <p style={{
                        fontSize: '0.8rem',
                        marginBottom: '2rem',
                        lineHeight: '1.6',
                        opacity: 0.9,
                        textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                    }}>
                        Thank you for filling out the form!
                        Our GTM Expert will connect with you shortly.

                        Till then… JUJU ✨
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
                                padding: '10px 20px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '12px',
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
                                padding: '10px 20px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '12px',
                                borderRadius: '50px',
                                transition: 'all 0.3s'
                            }}
                        >
                            <span>WhatsApp</span>
                        </a>
                        <Link
                            to="/"
                            className="hover-scale"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px 20px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '12px',
                                borderRadius: '50px',
                                transition: 'all 0.3s'
                            }}
                        >
                            Homepage
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
                            {step === 1 ? 'Let\'s connect' : step === 2 ? 'Verification' : 'Share Your Requirements'}
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <div style={{ width: '30px', height: '2px', backgroundColor: step === 1 ? '#E52323' : '#333', marginRight: '5px' }}></div>
                            <div style={{ width: '30px', height: '2px', backgroundColor: step === 2 ? '#E52323' : '#333', marginRight: '5px' }}></div>
                            <div style={{ width: '30px', height: '2px', backgroundColor: step === 3 ? '#E52323' : '#333' }}></div>
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
                                        placeholder="10 digit mobile number"
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
                            </div>
                        )}

                        {step === 3 && (
                            <div className="form-step-3">

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
                                                        backgroundColor: isSelected ? '#4CBF64' : 'rgba(255,255,255,0.05)',
                                                        border: `1px solid ${isSelected ? '#4CBF64' : '#333'}`,
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
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>How Soon You want to start.</label>
                                    <select
                                        name="start_timeline"
                                        value={formData.start_timeline}
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
                                        <option value="Immediately">Immediately</option>
                                        <option value="Just looking">Just looking</option>
                                        <option value="within this week">within this week</option>
                                        <option value="within this month">within this month</option>
                                        <option value="next 3 months">next 3 months</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>website</label>
                                    <input
                                        type="text"
                                        name="website_url"
                                        value={formData.website_url}
                                        onChange={handleChange}
                                        onBlur={handleUrlBlur}
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="Your Website Url"
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>You are a</label>
                                    <select
                                        name="brand_type"
                                        value={formData.brand_type}
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
                                        <option value="Startup/ D2C Brand">Startup/ D2C Brand</option>
                                        <option value="Legacy Brand">Legacy Brand</option>
                                        <option value="SME / MSME / Manufacturing">SME / MSME / Manufacturing</option>
                                        <option value="Ad / Digital / Influencer / PR Agency">Ad / Digital / Influencer / PR Agency</option>
                                        <option value="Large Enterprise / Corporation">Large Enterprise / Corporation</option>
                                        <option value="Government / PSU">Government / PSU</option>
                                        <option value="Individual / Freelancer">Individual / Freelancer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Do you have brand ambassador</label>
                                    <select
                                        name="has_ambassador"
                                        value={formData.has_ambassador}
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
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="Need help with Brand Ambassador">Need help with Brand Ambassador</option>
                                    </select>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Upload Brief / Planning File (PDF, PPT, DOCS)</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.ppt,.pptx,.doc,.docx"
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#111',
                                            border: '1px dashed #444',
                                            color: '#fff',
                                            fontSize: '14px',
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    {briefFile && <p style={{ fontSize: '12px', color: '#4CBF64', marginTop: '5px' }}>Selected: {briefFile.name}</p>}
                                </div>

                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                            {step > 1 && (
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
                                    flex: step > 1 ? 2 : 1,
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
                                {submitting ? 'Processing...' : (step === 1 ? 'Next' : step === 2 ? (verifyingOtp ? 'Verifying...' : 'Verify Email') : 'Submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MetaAdLanding;
