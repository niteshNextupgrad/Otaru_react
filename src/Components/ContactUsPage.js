"use client"
import { useState } from "react";
import ContactForm from "./ContactForm";
import InstagramAdvertize from "./InstagramAdvertize";

const contacts = [
    {
        city: "Belgium",
        address: "Rue de Baras 108 Tenneville Rd",
        mobile: "381629332193"
    },
    {
        city: "Stockholm",
        address: "Fäbodvägen 8 142 33 Skogås",
        mobile: "024993223"
    },
    {
        city: "Glassgow",
        address: "1 Lethington Rd, Glasgow, G46 6TA",
        mobile: "381629334215"
    },
]

export default function ContactUsPage() {
    const [newsLetterEmail, setNewsLetterEmail] = useState("")
    const [mailError, setMailError] = useState(null)
    const handleSubmitNewsletter = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newsLetterEmail || !emailRegex.test(newsLetterEmail)) {
            setMailError("Please enter a valid email address");
            return;
        }

        alert("Submitted");
        setNewsLetterEmail("");
        setMailError("");

    }

    const mapAddress = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14241.96079526277!2d80.9346006!3d26.8467088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2f59d36f5c3%3A0x6c3fb9f6cfed29f0!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1692524600000!5m2!1sen!2sin"
    return (
        <>
            <section className="contact-us-section">
                <h1><span className="text-muted">Contact</span> Us</h1>
            </section>
            <section className="py-lg-5 py-2">
                <div className="container-fluid">
                    <div style={{ width: "100%", height: "450px", filter: 'grayscale(100%)' }}>
                        <iframe
                            src={mapAddress}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
            <section className="contactSection" style={{
                padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)'
            }}
            >
                <div className="container">
                    <div className="row py-lg-5">
                        <div className="col-sm-6 d-flex flex-column gap-4 p-lg-3">
                            <h2 className="fs-2 pe-5">
                                Don{`'`}t hesitate to contact us pronto!
                            </h2>
                            <p className="text-secondary">Malesua da fames ac turpis eg estas mae cenas pharetra. Torto condim entum lacinia quis vel. Quis vel eros donec ac odio.</p>
                            <div>
                                <div className="row gap-3 gap-lg-0">
                                    {
                                        contacts?.map((contact, index) => (
                                            <div key={index} className="col-sm-4 d-flex flex-column">
                                                <h4 className="ls-1 mb-3">{contact.city}</h4>
                                                <a className="mb-2 text-muted">
                                                    {contact.address}
                                                </a>
                                                <a className="mb-1 text-muted">{contact.mobile}</a>
                                            </div>
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                        <ContactForm />

                    </div>
                    <div className="row justify-content-center my-5 py-5">
                        <div className="col-sm-8 d-flex justify-content-center align-items-center flex-column gap-5">
                            <h2 >
                                Subscribe to our newsletter
                            </h2>
                            <form className="newsLetterForm w-100">
                                <div className="input-group">
                                    <input required={true} type="email" placeholder="Your e-mail" onChange={(e) => setNewsLetterEmail(e.target.value)} />
                                    <button className="btn mt-3 p-2  newsLetterSubmit" type="submit" onClick={handleSubmitNewsletter}><i className="ri-send-plane-2-fill"></i></button>
                                    {mailError && (
                                        <p className="text-danger">{mailError}</p>
                                    )}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <InstagramAdvertize />
            <hr />
        </>
    )
}