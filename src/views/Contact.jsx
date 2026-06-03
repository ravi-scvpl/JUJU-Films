"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { usePathname, useSearchParams } from 'next/navigation';
import SEO from '../components/SEO';

const Contact = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('organic_website');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = React.useRef(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        deadline: '',
        budget: '',
        portfolio_url: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const tab = searchParams ? searchParams.get('tab') : null;
        if (tab && tabContent[tab]) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) return null;

        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('contact-uploads')
            .upload(filePath, selectedFile);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            return null;
        }

        const { data } = supabase.storage.from('contact-uploads').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const fileUrl = await uploadFile();

            const { error } = await supabase
                .from('contacts')
                .insert([{
                    type: activeTab,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    company: activeTab === 'organic_website' ? formData.company : null,
                    address: activeTab === 'organic_website' ? formData.address : null,
                    deadline: activeTab === 'organic_website' ? formData.deadline : null,
                    budget: activeTab === 'organic_website' ? formData.budget : null,
                    portfolio_url: activeTab !== 'organic_website' ? formData.portfolio_url : null,
                    message: formData.message,
                    file_url: fileUrl,
                    status: 'new'
                }]);

            if (error) throw error;

            // Sync to HubSpot
            try {
                await fetch('/api/hubspot-sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        email: formData.email,
                        phone: formData.phone,
                        company: formData.company,
                        city: formData.address,
                        message: formData.message,
                        type: activeTab
                    })
                });
            } catch (hubspotErr) {
                console.error('HubSpot sync failed:', hubspotErr);
                // We don't alert the user here because the primary mission (Supabase) succeeded
            }

            alert('Thank you! Your message has been sent.');
            setFormData({
                first_name: '', last_name: '', email: '', phone: '',
                company: '', address: '', deadline: '', budget: '',
                portfolio_url: '', message: ''
            });
            setSelectedFile(null);
        } catch (error) {
            alert('Error sending message: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };



    const tabContent = {
        organic_website: {
            title: "We are always <br />ready to listen.",
            introHeading: "Brand Collaborations",
            introText: "Do you want to request a quote for the creation of a logo, a visual identity or a graphic design project? Feel free to fill out the form below. You can also write to us directly at info@jujuindia.com.",
            buttonText: "Send my quote request"
        },
        creators: {
            title: "Storytellers & <br />Visual Artists.",
            introHeading: "Creators Connect",
            introText: "Are you a director, photographer, or visual artist looking to collaborate on original JUJU stories? We'd love to see your work and explore how we can build together.",
            buttonText: "Submit my portfolio"
        },
        internships: {
            title: "Learning and <br />Growing together.",
            introHeading: "Internships",
            introText: "Joining JUJU Films means joining a team where passion and sharing are synonymous with fulfillment and success. Apply for an internship via our dedicated form.",
            buttonText: "Submit my application"
        },
        jobs: {
            title: "Join the <br />JUJU Philosophy.",
            introHeading: "Jobs",
            introText: "We are always looking for passionate designers and strategists to join our Paris and Lyon offices. Tell us why you'd be a great fit for the team.",
            buttonText: "Apply now"
        }
    };

    const current = tabContent[activeTab];

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine">
            <SEO
                title="Contact Us"
                description="Get in touch with JUJU Films for brand collaborations, creator connections, internships, and job opportunities."
                type="website"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact JUJU Films",
                    "description": "Contact page for JUJU Films including options for Brand Collaborations, Creators Connect, Internships, and Jobs.",
                    "url": "https://www.jujuindia.com/contact"
                }}
            />
            <div>
                <header className="hero  ">
                    <div className="hero__tabs">
                        <nav className="tabs">
                            <ul className="tabs__list">
                                <li className={`tab ${activeTab === 'organic_website' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('organic_website')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>Brand Collabrations</button>
                                </li>
                                <li className={`tab ${activeTab === 'creators' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('creators')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>Creators Connect</button>
                                </li>
                                <li className={`tab ${activeTab === 'internships' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('internships')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>Internships</button>
                                </li>
                                <li className={`tab ${activeTab === 'jobs' ? 'tab--active' : ''}`}>
                                    <button className="tab__link" onClick={() => setActiveTab('jobs')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>Jobs</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid hero__content reveal-on-scroll">
                        <p pos="row" pos-s="row" className="hero__title">
                            Contact </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description" dangerouslySetInnerHTML={{ __html: current.title }}></h1>
                    </div>
                </header>

                <div>
                    <section className="section section-wysiwyg reveal-on-scroll">
                        <div className="grid">
                            <div className="grid subgrid section-wysiwyg__container" pos="row">
                                <div pos="5-12" pos-s="row" className="text">
                                    <h2>{current.introHeading}</h2>
                                    <p>{current.introText}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section section-form reveal-on-scroll">
                        <div className="grid">
                            <div pos="5-12" pos-s="row">
                                <div className="frm_forms  with_frm_style frm_style_formidable-style" id="frm_form_2_container">
                                    <form encType="multipart/form-data" method="post" className="frm-show-form frm_js_validate frm_pro_form" onSubmit={handleSubmit}>
                                        <div className="frm_form_fields ">
                                            <fieldset>
                                                <legend className="frm_screen_reader">{current.introHeading}</legend>
                                                <div className="frm_fields_container">
                                                    {/* Common Fields */}
                                                    <div className="frm_form_field form-field frm_required_field frm_top_container frm6 frm_first">
                                                        <label className="frm_primary_label">Last Name <span className="frm_required">*</span></label>
                                                        <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} placeholder="Last Name" required />
                                                    </div>
                                                    <div className="frm_form_field form-field frm_required_field frm_top_container frm6">
                                                        <label className="frm_primary_label">First Name <span className="frm_required">*</span></label>
                                                        <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} placeholder="First Name" required />
                                                    </div>
                                                    <div className="frm_form_field form-field frm_required_field frm_top_container frm6 frm_first">
                                                        <label className="frm_primary_label">Email <span className="frm_required">*</span></label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
                                                    </div>
                                                    <div className="frm_form_field form-field frm_top_container frm6">
                                                        <label className="frm_primary_label">Phone</label>
                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+33000000000" />
                                                    </div>

                                                    {/* Conditional: Brand Only */}
                                                    {activeTab === 'organic_website' && (
                                                        <>
                                                            <div className="frm_form_field form-field frm_top_container frm6 frm_first">
                                                                <label className="frm_primary_label">Company</label>
                                                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company" />
                                                            </div>
                                                            <div className="frm_form_field form-field frm_top_container frm6">
                                                                <label className="frm_primary_label">Address</label>
                                                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
                                                            </div>
                                                            <div className="frm_form_field form-field frm_top_container frm6 frm_first">
                                                                <label className="frm_primary_label">What is your deadline?</label>
                                                                <input type="text" name="deadline" value={formData.deadline} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="frm_form_field form-field frm_top_container frm6">
                                                                <label className="frm_primary_label">What is your budget?</label>
                                                                <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} />
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Conditional: Portfolio/Resume for others */}
                                                    {activeTab !== 'organic_website' && (
                                                        <div className="frm_form_field form-field frm_top_container frm12 frm_first">
                                                            <label className="frm_primary_label">Portfolio / Resume URL</label>
                                                            <input type="url" name="portfolio_url" value={formData.portfolio_url} onChange={handleInputChange} placeholder="https://behance.net/..." />
                                                        </div>
                                                    )}

                                                    <div className="frm_form_field form-field frm_top_container frm_full">
                                                        <label className="frm_primary_label">
                                                            {activeTab === 'organic_website' ? 'What is your request?' : 'Tell us about yourself / your project'}
                                                        </label>
                                                        <textarea name="message" value={formData.message} onChange={handleInputChange} rows="5"></textarea>
                                                    </div>

                                                    <div className="frm_form_field form-field frm_top_container frm12 frm_first">
                                                        <label className="frm_primary_label">Attach a file</label>
                                                        <div
                                                            className="frm_dropzone frm_multi_upload frm_clearfix frm_attachment_dropzone"
                                                            role="group"
                                                            onClick={() => fileInputRef.current.click()}
                                                        >
                                                            <div className="dz-message needsclick">
                                                                <span className="frm_upload_text">
                                                                    <span className="frm_attachment_label">
                                                                        {selectedFile ? selectedFile.name : "Drop a file here or click to upload"}
                                                                    </span>
                                                                </span>
                                                                {!selectedFile && <div className="frm_small_text"><p>Max file size: 128MB</p></div>}
                                                            </div>
                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                onChange={handleFileChange}
                                                                style={{ display: 'none' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="frm_form_field form-field frm12 frm_first">
                                                        <div className="frm_submit frm_flex">
                                                            <button className="frm_button_submit frm_final_submit" type="submit" disabled={submitting}>
                                                                {submitting ? 'Sending...' : current.buttonText}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section section-table reveal-on-scroll">
                        <div className="grid">
                            <ul pos="5-12" pos-s="row" className="grid subgrid section-table__list">
                                <li pos="row" className="grid subgrid section-table__item">
                                    <p pos="1-4" pos-s="row" className="section-table__title">Phone</p>
                                    <div pos="6-9" pos-s="row" className="section-table__text text">
                                        <p><a href="tel:+91 98100 75412">+91 98100 75412</a></p>
                                    </div>
                                </li>
                                <li pos="row" className="grid subgrid section-table__item">
                                    <p pos="1-4" pos-s="row" className="section-table__title">Address</p>
                                    <div pos="6-9" pos-s="row" className="section-table__text text">
                                        <p>Ghitorni, MG Road<br />New Delhi<br />110030</p>
                                        <p><a href="https://www.google.com/maps/dir//Metro+Pillar+Number+133,+K+426,+427,+Mehrauli-Gurgaon+Rd,+Ghitorni,+New+Delhi,+Delhi+110030/@28.4887288,77.1391488,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390d1ef7383128bf:0x68e783bac2a5f436!2m2!1d77.141535!2d28.490974?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Get directions</a></p>
                                        <p>Andheri West<br />Mumbai<br />400053</p>
                                        <p><a href="https://maps.app.goo.gl/z5QKfg5XdacEixGe9" target="_blank" rel="noopener noreferrer">Get directions</a></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Contact;
