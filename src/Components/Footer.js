"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
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
  return (
    <div className="container-fluid p-4">
      <footer className="bg-dark-transparent text-white mt-0 mt-lg-5 ">

        <div className="row g-4">
          {/* Logo & Info */}
          <div className="col-lg-3 col-6">
            <Image src="/image23.png" height={50} width={100} alt="logo" />
            <p className="text-muted mt-4">For your creative output.</p>
            <small>© 2025 QODE INTERACTIVE</small>
          </div>
          {/* Address */}
          <div className="col-lg-3 col-6  d-flex flex-column">
            <h5 className="ls-1 fw-normal">Address</h5>
            <a className="mb-1 text-muted">46 Skabersjogatan < br />Malmo, Sweden</a>
            <a className="mb-1 text-muted">+44 1793 123 456</a>
            <a href="mailto:otaru@example.com" className="text-white text-muted text-decoration-none">otaru@example.com</a>
          </div>
          {/* Social Links */}
          <div className="col-lg-3 col-6">
            <h5 className="ls-1 fw-normal">Social</h5>
            <ul className="list-unstyled">
              {["Instagram", "Twitter", "Dribbble", "LinkedIn"].map(s => (
                <li key={s}>
                  <a href="#" className="text-white text-decoration-none text-muted text-uppercase small">{s}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter */}
          <div className="col-lg-3 col-6">
            <h5 className="ls-1 fw-normal">Newsletter</h5>
            <p className="text-muted">Be up to date with new products.</p>
            <form className="newsLetterForm">
              <div className="input-group mt-5">
                <input required={true} type="email" placeholder="Your e-mail" onChange={(e) => setNewsLetterEmail(e.target.value)} />
                <button className="btn mt-3 p-2  newsLetterSubmit" type="submit" onClick={handleSubmitNewsletter}><i className="ri-send-plane-2-fill"></i></button>
                {mailError && (
                  <p className="text-danger">{mailError}</p>
                )}
              </div>
            </form>
          </div>
        </div>

      </footer>
    </div>
  );
}
