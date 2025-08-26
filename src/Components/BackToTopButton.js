"use client";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "30px",
                        height: "40px",
                        width: "40px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        border: "none",
                        zIndex: 1000,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                        overflow: "hidden",
                        transition: "all 0.3s ease-in-out",
                    }}
                    className="back-to-top-btn"
                    aria-label="Back to top"
                >
                    <i className="ri-arrow-up-double-fill fw-bold fs-4"></i>
                    <span className="btn-text">Back to top</span>
                </button>

            )}
        </>
    );
}
