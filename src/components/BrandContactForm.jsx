import React from 'react';
import '../styles/contact-style.css';

const BrandContactForm = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const fileInputRef = React.useRef(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    return (
        <section className="section section-form" style={{ backgroundColor: '#000000', color: '#ffffff', padding: '60px 0', margin: 0 }}>
            <div className="grid">
                <div pos="5-12" pos-s="row">
                    <div className="text" style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#ffffff' }}>Brand Collaborations</h2>
                        <p style={{ color: '#dddddd' }}>We are always ready to listen. Do you want to request a quote for the creation of a logo, a visual identity or a graphic design project? Feel free to fill out the form below. You can also write to us directly at info@jujuindia.com.</p>
                    </div>

                    <div className="frm_forms with_frm_style frm_style_formidable-style" id="frm_form_2_container" style={{
                        '--title-color': '#ffffff',
                        '--label-color': '#ffffff',
                        '--text-color': '#000000', // Input text color should differ if inputs are white
                        '--form-desc-color': '#dddddd',
                        '--check-label-color': '#ffffff'
                    }}>
                        <form encType="multipart/form-data" method="post" className="frm-show-form frm_js_validate frm_pro_form">
                            <div className="frm_form_fields">
                                <fieldset>
                                    <legend className="frm_screen_reader">Brand Collaborations</legend>
                                    <div className="frm_fields_container">
                                        <div className="frm_form_field form-field frm_required_field frm_top_container frm6 frm_first">
                                            <label className="frm_primary_label">Last Name <span className="frm_required">*</span></label>
                                            <input type="text" placeholder="Last Name" required />
                                        </div>
                                        <div className="frm_form_field form-field frm_required_field frm_top_container frm6">
                                            <label className="frm_primary_label">First Name <span className="frm_required">*</span></label>
                                            <input type="text" placeholder="First Name" required />
                                        </div>
                                        <div className="frm_form_field form-field frm_required_field frm_top_container frm6 frm_first">
                                            <label className="frm_primary_label">Email <span className="frm_required">*</span></label>
                                            <input type="email" placeholder="Email" required />
                                        </div>
                                        <div className="frm_form_field form-field frm_top_container frm6">
                                            <label className="frm_primary_label">Phone</label>
                                            <input type="tel" placeholder="+33000000000" />
                                        </div>

                                        <div className="frm_form_field form-field frm_top_container frm6 frm_first">
                                            <label className="frm_primary_label">Company</label>
                                            <input type="text" placeholder="Company" />
                                        </div>
                                        <div className="frm_form_field form-field frm_top_container frm6">
                                            <label className="frm_primary_label">Address</label>
                                            <input type="text" placeholder="Address" />
                                        </div>
                                        <div className="frm_form_field form-field frm_top_container frm6 frm_first">
                                            <label className="frm_primary_label">What is your deadline?</label>
                                            <input type="text" />
                                        </div>
                                        <div className="frm_form_field form-field frm_top_container frm6">
                                            <label className="frm_primary_label">What is your budget?</label>
                                            <input type="text" />
                                        </div>

                                        <div className="frm_form_field form-field frm_top_container frm_full">
                                            <label className="frm_primary_label">What is your request?</label>
                                            <textarea rows="5" style={{ color: '#000000' }}></textarea>
                                        </div>

                                        <div className="frm_form_field form-field frm_top_container frm12 frm_first">
                                            <label className="frm_primary_label">Attach a file</label>
                                            <div
                                                className="frm_dropzone frm_multi_upload frm_clearfix"
                                                role="group"
                                                onClick={() => fileInputRef.current.click()}
                                                style={{ cursor: 'pointer', border: '1px dashed #ccc', padding: '20px', textAlign: 'center', borderRadius: '4px' }}
                                            >
                                                <div className="dz-message needsclick">
                                                    <span className="frm_upload_text">
                                                        <button type="button" style={{ pointerEvents: 'none' }}>
                                                            {selectedFile ? selectedFile.name : "Drop a file here or click to upload"}
                                                        </button>
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
                                                <button className="frm_button_submit frm_final_submit" type="submit">Send my quote request</button>
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
    );
};

export default BrandContactForm;
