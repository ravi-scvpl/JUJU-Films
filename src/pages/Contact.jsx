import React from 'react';

const Contact = () => {
    React.useEffect(() => {
        document.body.classList.add('switch');
        return () => {
            document.body.classList.remove('switch');
        };
    }, []);

    return (
        <div className="wp-singular page-template-default page page-parent wp-theme-grapheine switch">
            <div>
                <header className="hero  ">
                    <div className="hero__tabs">
                        <nav className="tabs">
                            <ul className="tabs__list">
                                <li className="tab tab--active"><a className="tab__link" href="/contact/">Request a quote</a></li>
                                <li className="tab "><a className="tab__link" href="stage/">Internship</a></li>
                                <li className="tab "><a className="tab__link" href="alternance/">Work-study</a></li>
                                <li className="tab "><a className="tab__link" href="emploi/">Jobs</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid hero__content">
                        <p pos="row" pos-s="row" className="hero__title">
                            Contact </p>
                        <h1 pos="5-12" pos-s="row" className="hero__description">We are always <br />ready to listen.</h1>
                    </div>
                </header>
                <div>
                    <section className="section section-table">
                        <div className="grid">
                            <ul pos="5-12" pos-s="row" className="grid subgrid section-table__list">
                                <li pos="row" className="grid subgrid section-table__item">
                                    <p pos="1-4" pos-s="row" className="section-table__title">
                                        Phone </p>
                                    <div pos="6-9" pos-s="row" className="section-table__text text">
                                        <p><a href="tel:+33972311595">+33 (0)9 72 31 15 95</a></p>
                                    </div>
                                </li>
                                <li pos="row" className="grid subgrid section-table__item">
                                    <p pos="1-4" pos-s="row" className="section-table__title">
                                        Address </p>
                                    <div pos="6-9" pos-s="row" className="section-table__text text">
                                        <p>Graphéine Paris<br />
                                            3 rue des Montibœufs<br />
                                            75020 Paris</p>
                                        <p><a href="https://maps.app.goo.gl/N5jHJzNg6NoijTwu6" target="_blank"
                                            rel="noopener noreferrer">Get directions</a></p>
                                        <p>Graphéine Lyon<br />
                                            13 rue Sainte-Catherine<br />
                                            69001 Lyon</p>
                                        <p><a href="https://maps.app.goo.gl/z5QKfg5XdacEixGe9" target="_blank"
                                            rel="noopener noreferrer">Get directions</a></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="section section-wysiwyg">
                        <div className="grid">
                            <div className="grid subgrid section-wysiwyg__container" pos="row">
                                <div pos="5-12" pos-s="row" className="text">
                                    <h2>Request a quote</h2>
                                    <p>Do you want to request a quote for the creation of a logo, a visual identity or a graphic design project? Feel free to fill out the form below. You can also write to us directly at
                                        <a href="mailto:devis@grapheine.com">devis@grapheine.com</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section section-form">
                        <div className="grid">
                            <div pos="5-12" pos-s="row">
                                <div className="frm_forms  with_frm_style frm_style_formidable-style" id="frm_form_2_container"
                                    data-token="912305ab95fc73e85cf5f1e821889e17">
                                    <form encType="multipart/form-data" method="post"
                                        className="frm-show-form  frm_js_validate  frm_pro_form " id="form_contact-form-paris"
                                        data-token="912305ab95fc73e85cf5f1e821889e17">
                                        <div className="frm_form_fields ">
                                            <fieldset>
                                                <legend className="frm_screen_reader">Contact Paris</legend>

                                                <div className="frm_fields_container">
                                                    <input type="hidden" name="frm_action" defaultValue="create" />
                                                    <input type="hidden" name="form_id" defaultValue="2" />
                                                    <input type="hidden" name="frm_hide_fields_2" id="frm_hide_fields_2"
                                                        defaultValue="" />
                                                    <input type="hidden" name="form_key" defaultValue="contact-form-paris" />
                                                    <input type="hidden" name="item_meta[0]" defaultValue="" />
                                                    <input type="hidden" id="frm_submit_entry_2" name="frm_submit_entry_2"
                                                        defaultValue="08ea21c49a" /><input type="hidden" name="_wp_http_referer"
                                                            defaultValue="/contact/" />
                                                    <div id="frm_field_21_container"
                                                        className="frm_form_field form-field  frm_required_field frm_top_container frm6 frm_first">

                                                        <label htmlFor="field_ocfup12" id="field_ocfup12_label"
                                                            className="frm_primary_label">Last Name

                                                            <span className="frm_required" aria-hidden="true">*</span>

                                                        </label>

                                                        <input type="text" id="field_ocfup12" name="item_meta[21]" defaultValue=""
                                                            autoComplete="family-name" placeholder="Last Name"
                                                            data-reqmsg="Last Name is required" aria-required="true"
                                                            data-invmsg="Last Name is invalid" aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_20_container"
                                                        className="frm_form_field form-field  frm_required_field frm_top_container frm6">

                                                        <label htmlFor="field_qh4icy2" id="field_qh4icy2_label"
                                                            className="frm_primary_label">First Name

                                                            <span className="frm_required" aria-hidden="true">*</span>

                                                        </label>

                                                        <input type="text" id="field_qh4icy2" name="item_meta[20]" defaultValue=""
                                                            autoComplete="given-name" placeholder="First Name"
                                                            data-reqmsg="First Name is required" aria-required="true"
                                                            data-invmsg="First Name is invalid" aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_19_container"
                                                        className="frm_form_field form-field  frm_top_container frm6 frm_first">

                                                        <label htmlFor="field_mravf2" id="field_mravf2_label"
                                                            className="frm_primary_label">Company

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <input type="text" id="field_mravf2" name="item_meta[19]" defaultValue=""
                                                            autoComplete="organization" placeholder="Company"
                                                            data-invmsg="Company is invalid" aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_22_container"
                                                        className="frm_form_field form-field  frm_top_container frm6">

                                                        <label htmlFor="field_a30mv2" id="field_a30mv2_label"
                                                            className="frm_primary_label">Address

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <input type="text" id="field_a30mv2" name="item_meta[22]" defaultValue=""
                                                            autoComplete="street-address" placeholder="Address"
                                                            data-invmsg="Address is invalid" aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_23_container"
                                                        className="frm_form_field form-field  frm_required_field frm_top_container frm6 frm_first">

                                                        <label htmlFor="field_29yf4d2" id="field_29yf4d2_label"
                                                            className="frm_primary_label">Email

                                                            <span className="frm_required" aria-hidden="true">*</span>

                                                        </label>

                                                        <input type="email" id="field_29yf4d2" name="item_meta[23]" defaultValue=""
                                                            autoComplete="email" placeholder="Email"
                                                            data-reqmsg="Email is required" aria-required="true"
                                                            data-invmsg="Email is invalid" aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_24_container"
                                                        className="frm_form_field form-field  frm_top_container frm6">

                                                        <label htmlFor="field_w3h1f2" id="field_w3h1f2_label"
                                                            className="frm_primary_label">Phone

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <input type="tel" id="field_w3h1f2" name="item_meta[24]" defaultValue=""
                                                            placeholder="+33000000000"
                                                            data-invmsg="Phone is invalid" aria-invalid="false"
                                                            pattern="((\+\d{1,3}(-|.| )?\(?\d\)?(-| |.)?\d{1,5})|(\(?\d{2,6}\)?))(-|.| )?(\d{3,4})(-|.| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" />

                                                    </div>
                                                    <div id="frm_field_26_container"
                                                        className="frm_form_field form-field  frm_top_container frm_full">

                                                        <label htmlFor="field_9jv0r12" id="field_9jv0r12_label"
                                                            className="frm_primary_label">What is your request?

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <textarea name="item_meta[26]" id="field_9jv0r12" rows="5"
                                                            data-invmsg="What is your request? is invalid"
                                                            aria-invalid="false"></textarea>

                                                    </div>
                                                    <div id="frm_field_27_container"
                                                        className="frm_form_field form-field  frm_top_container frm6 frm_first">

                                                        <label htmlFor="field_rohmh2" id="field_rohmh2_label"
                                                            className="frm_primary_label">What is your deadline?

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <input type="text" id="field_rohmh2" name="item_meta[27]" defaultValue=""
                                                            data-invmsg="What is your deadline? is invalid"
                                                            aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_29_container"
                                                        className="frm_form_field form-field  frm_top_container frm6">

                                                        <label htmlFor="field_2tbt42" id="field_2tbt42_label"
                                                            className="frm_primary_label">What is your budget?

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <input type="text" id="field_2tbt42" name="item_meta[29]" defaultValue=""
                                                            data-invmsg="What is your budget? is invalid"
                                                            aria-invalid="false" />

                                                    </div>
                                                    <div id="frm_field_30_container"
                                                        className="frm_form_field form-field  frm_top_container frm12 frm_first">

                                                        <label htmlFor="field_wybfo2" id="field_wybfo2_label"
                                                            className="frm_primary_label">Attach a file

                                                            <span className="frm_required" aria-hidden="true"></span>

                                                        </label>

                                                        <input type="hidden" data-invmsg="Attach a file is invalid"
                                                            className="auto_width" aria-invalid="false" name="item_meta[30][]"
                                                            defaultValue="" data-frmfile="30" />
                                                        <div className="frm_dropzone frm_multi_upload frm_clearfix"
                                                            id="file30_dropzone" role="group">
                                                            <div className="fallback">
                                                                <input type="file" name="file30[]" id="field_wybfo2"
                                                                    data-frmfile="30" multiple="multiple"
                                                                    data-invmsg="Attach a file is invalid"
                                                                    className="auto_width" aria-invalid="false" />
                                                                <div className="frm_clearfix "></div>
                                                            </div>
                                                            <div className="dz-message needsclick">
                                                                <svg viewBox="0 0 18 18" className="frmsvg frm-svg-icon">
                                                                    <path viewBox="0 0 18 18" fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M8.2 4v8a.8.8 0 001.5 0V4l2.1 2.2A.7.7 0 1013 5L9.5 1.7a.7.7 0 00-1.1 0L5.1 5.2a.8.8 0 001 1l2.1-2zm7.6 4.3c.4 0 .7.3.7.7v6.8c0 .4-.3.7-.8.7H2.3a.8.8 0 01-.8-.8V9A.8.8 0 013 9v6h12V9c0-.4.3-.8.8-.8z">
                                                                    </path>
                                                                </svg> <span className="frm_upload_text"><button type="button"
                                                                    aria-label="Attach a file. Drop a file here or click to upload. Max file size: 128MB">Drop a file here or click to upload</button></span>
                                                                <span className="frm_compact_text"><button type="button"
                                                                    aria-label="Attach a file. Choose a file. Max file size: 128MB">Choose a file</button></span>
                                                                <div className="frm_small_text">
                                                                    <p>Max file size: 128MB</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="item_meta[31]" id="field_6r8cs2" defaultValue="fr"
                                                        data-frmval="fr" />
                                                    <div id="frm_field_32_container"
                                                        className="frm_form_field form-field  frm12 frm_first">

                                                        <div className="frm_submit frm_flex">

                                                            <button className="frm_button_submit frm_final_submit" type="submit"
                                                                formNoValidate="formnovalidate">Send my quote request</button>

                                                        </div>

                                                    </div>
                                                    <input type="hidden" name="item_key" defaultValue="" />
                                                    <div id="frm_field_113_container">
                                                        <label htmlFor="field_fhmr4">
                                                            If you are human, do not fill this field. </label>
                                                        <input id="field_fhmr4" type="text"
                                                            className="frm_form_field form-field frm_verify"
                                                            name="item_meta[113]" defaultValue="" />
                                                    </div>
                                                    <input name="frm_state" type="hidden"
                                                        defaultValue="nmEkcs1oglrbaVODx9bceOjRJX/Pi+YCX4fOUgUMfTibpHv3XJjmE3sXRekg1g5h" />
                                                </div>
                                            </fieldset>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section section-wysiwyg">
                        <div className="grid">
                            <div className="grid subgrid section-wysiwyg__container" pos="row">
                                <div pos="5-12" pos-s="row" className="text">
                                    <h2>Recruitment</h2>
                                    <p>Joining Graphéine means joining a team where passion and sharing are synonymous with fulfillment and success.<br />
                                        Apply for an <a href="/contact/stage/">internship</a>, a <a
                                            href="/contact/alternance/">work-study</a> or a <a
                                                href="/contact/emploi">job</a> via our dedicated forms.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Contact;
