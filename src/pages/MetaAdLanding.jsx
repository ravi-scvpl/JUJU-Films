import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';
import '../styles/juju-overrides.css';
import bgVideo from '../assets/bg-ad-landing-jujufilms.mp4';
import showreelVideo from '../assets/juju-showreel.mp4';
import { Link } from 'react-router-dom';

const formOptions = [
    { value: "Product TVC", label: "Product TVC - Most look good; ours actually sells." },
    { value: "Brand TVC", label: "Brand TVC - Stop buying airtime – buy a spot in their memory." },
    { value: "Social Media Videos", label: "Social Media Videos - Don't just fill the feed; freeze it." },
    { value: "AI Films", label: "AI Films - The Physics of production just changed" },
    { value: "10-Second Bumpers", label: "10-Second Bumpers - Give them a 10-second reason to obsess." },
    { value: "Brand Celebrity Ambassador", label: "Brand Celebrity Ambassador - Star power is wasted without stellar vision" },
    { value: "UGC Content", label: "UGC Content - The best ads don’t get skipped – they get absorbed" },
    { value: "Brand IP", label: "Brand IP - Build worlds your audience wants to live in." },
    { value: "Web Series", label: "Web Series - A story that isn’t a binge-worthy hit is JUST a story." },
    { value: "In-Movie Branding", label: "In-Movie Branding - Sell where the market is buzzing." },
    { value: "Vertical Series", label: "Vertical Series - The 9:16 view they’ll never get enough of" },
    { value: "Corporate Films", label: "Corporate Films - If your vision is bold, your film shouldn’t whisper." },
    { value: "Influencer Marketing", label: "Influencer Marketing - When the creator meets the filmmaker." },
    { value: "JUJU Films", label: "JUJU Films - The creative edge for those who hate average." },
    { value: "The JUJU Team", label: "The JUJU Team - The gear is expensive – the minds are the real luxury" }
];

const MetaAdLanding = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        website: '',
        city: '',
        turnover: '',
        budget: '',
        service: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const videoRef = useRef(null);

    // Auto-play video on mount/success if needed
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        }
    }, [submitted]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [leadId, setLeadId] = useState(null);

    // ... (existing code)

    const capturePartialLead = async () => {
        try {
            // Attempt to save partial data
            const { data, error: supabaseError } = await supabase
                .from('contacts')
                .insert([{
                    first_name: formData.name.split(' ')[0],
                    last_name: formData.name.split(' ').slice(1).join(' ') || '',
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.city,
                    company: formData.website,
                    type: 'ad_lead_partial', // Mark as partial
                    status: 'new'
                }])
                .select()
                .single();

            if (supabaseError) throw supabaseError;
            if (data) setLeadId(data.id);

        } catch (err) {
            console.error("Partial lead capture exception", err);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (!formData.name || !formData.phone || !formData.email || !formData.city) {
                setError('Please fill in all required fields.');
                return;
            }
            setError('');
            capturePartialLead(); // Capture partial lead
            setStep(2);
        } else {
            handleSubmit(e);
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
            const leadData = {
                first_name: formData.name.split(' ')[0],
                last_name: formData.name.split(' ').slice(1).join(' ') || '',
                email: formData.email,
                phone: formData.phone,
                company: formData.website, // Using company field for website
                address: formData.city, // Using address field for city
                budget: formData.budget,
                message: `Service: ${formData.service}\nTurnover: ${formData.turnover}`,
                type: 'ad_lead', // Upgrade to full lead
                status: 'new'
            };

            let supabaseError;

            if (leadId) {
                // Update existing partial lead
                const { error } = await supabase
                    .from('contacts')
                    .update(leadData)
                    .eq('id', leadId);
                supabaseError = error;
            } else {
                // Fallback: Insert new if no partial ID (shouldn't happen normally)
                const { error } = await supabase
                    .from('contacts')
                    .insert([leadData]);
                supabaseError = error;
            }

            if (supabaseError) throw supabaseError;

            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
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
                        Your vision is safe with us. We'll be in touch shortly.
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
                            <span>Follow on Instagram</span>
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
                            Back to Homepage
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
                <source src={bgVideo} type="video/mp4" />
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
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Phone Number *</label>
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
                                        placeholder="+91..."
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
                                        placeholder="Mumbai, Delhi..."
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Company Website</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
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
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-step-2">
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
                                        <option value="<1Cr">Less than 1 Cr</option>
                                        <option value="1Cr-10Cr">1 Cr - 10 Cr</option>
                                        <option value="10Cr-50Cr">10 Cr - 50 Cr</option>
                                        <option value="50Cr+">50 Cr +</option>
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
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', color: '#888' }}>Service / Interest</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: '#000',
                                            border: '1px solid #333',
                                            color: '#fff',
                                            fontSize: '14px',
                                            outline: 'none',
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        <option value="">Select a Service</option>
                                        {formOptions.map((opt, idx) => (
                                            <option key={idx} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
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
                                {submitting ? 'Processing...' : (step === 1 ? 'Next' : 'Submit Request')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MetaAdLanding;
