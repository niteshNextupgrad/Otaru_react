"use client"
import Image from "next/image";
import Link from "next/link";
import ProgressBars from "./ProgressBars";
import { useState, useRef } from "react";
import CountUp from "react-countup";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BackToTopButton from "./BackToTopButton";
import LightImages from "./LightImages";
import InstagramAdvertize from "./InstagramAdvertize";


const advantages = [
    {
        img: "./innovative.svg",
        title: "Temporal",
        desc: "Platea dictumst vesti bulum rhoncus est sque elit ullam corper dignissim",
    },
    {
        img: "./design.svg",
        title: "Special",
        desc: "Platea dictumst vesti bulum rhoncus est sque elit ullam corper dignissim",
    },
    {
        img: "./branding.svg",
        title: "Timeless",
        desc: "Platea dictumst vesti bulum rhoncus est sque elit ullam corper dignissim",
    },
];
const testimonials = [
    {
        text: `"Lorem ipsum dolor sit amet, ex eum admodum disputationi eos, at vis velit putant cetero. Dico consul est et natum."`,
        name: "Tim Behrens",
        role: "MANAGER",
    },
    {
        text: `"Excellent service, amazing quality and very professional team. got out a pencil and another piece of paper and said it probably made people feel very
 Im really happy with the results."`,
        name: "Sarah Johnson",
        role: "CEO",
    },
    {
        text: `"Wellington was a poodle. Not one of the small poodles that have hairstyles but a big poodle. It had curly black fur, but when you got
         close you could see that the skin underneath the fur was a very pale yellow, like chicken."`,
        name: "David Kim",
        role: "FOUNDER",
    },
];
const AboutUs = () => {
    const swiperRef = useRef(null);

    return (
        <>
            <BackToTopButton />
            <section className="about-us-section">
                <h1><span className="text-muted">About</span> Us</h1>
            </section>
            <section className="p-4 p-lg-5">
                <div className="container-fluid">
                    <div className="row px-0  px-lg-5">
                        {advantages.map((adv, i) => (
                            <div key={i} className="col-12 col-lg-4 d-flex flex-column gap-2 p-lg-4" >
                                <Image src={adv.img} height={100} width={100} alt={adv.title} className="img-fluid" />
                                <h2>{adv.title}</h2>
                                <p style={{ fontSize: '16px', paddingRight: '30px' }} className="text-muted">{adv.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="p-4 p-md-5">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <span className="text-muted small">TECHNOLOGY</span>
                            <div className="d-flex gap-4 flex-column mt-2">
                                <h2 className="">
                                    Never be inspired by failures in a journey
                                </h2>
                                <p className="text-muted">
                                    Turpis nunc eget lorem dolor. Ut lectus arcu bibendum at varius vel.
                                    Tempor orci eu lobortis elementum nibh. Faucibus purus in massa
                                    tempor nec feugiat nisl pretium fusce. Viverra aliquet eget sit amet tellus.
                                </p>
                            </div>
                            <Link href="/shop/" className="pageBtn mt-3">
                                Discover all projects
                            </Link>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="row g-4">

                                <div className="col-12 col-sm-6">
                                    <div className="image-container">
                                        <Image
                                            src="/image07.jpg"
                                            height={400}
                                            width={390}
                                            alt="product"
                                            className="img-fluid rounded"
                                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                        />
                                        <div className="overlay">
                                            <div className="overlay-content">
                                                <Image src="/image08.jpg" height={100} width={100} alt="overlay img" />
                                                <button className="pageBtn mt-2">
                                                    Add to Cart<i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="image-container">
                                        <Image
                                            src="/image09.jpg"
                                            height={400}
                                            width={390}
                                            alt="product"
                                            className="img-fluid rounded"
                                            style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                        />
                                        <div className="overlay">
                                            <div className="overlay-content">
                                                <Image src="/image10.jpg" height={100} width={100} alt="overlay img" />
                                                <button className="pageBtn mt-2">
                                                    Add to Cart<i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container-fluid px-4 px-md-5">
                    <div className="row align-items-center">

                        {/* Text Section */}
                        <div className="col-12 col-md-8 d-flex flex-column gap-4 mb-4 mb-md-0">
                            <h2 className="fw-bold display-6 display-md-4">
                                Tune in with incredible sharpness of the cutting edge sound tech
                            </h2>
                            <p className="text-muted pe-md-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam.
                            </p>
                            <Link href="/shop/" className="pageBtn">
                                View More
                            </Link>
                        </div>

                        {/* Progress Bars Section */}
                        <div className="col-12 col-md-4">
                            <ProgressBars />
                        </div>
                    </div>
                </div>
            </section>


            <section className="client-section text-white">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-7 px-2-0">
                            <div className="testimonial-bg d-flex align-items-center justify-content-center">
                                <div className="testimonial-card p-4 p-md-5">
                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                                        loop={true}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    >
                                        {testimonials.map((t, i) => (
                                            <SwiperSlide key={i}>
                                                <div>
                                                    <div className="quote-icon mb-3">“</div>
                                                    <p className="testimonial-text">{t.text}</p>
                                                    <div className="signature mt-4 mb-2">{t.name}</div>
                                                    <div className="role mb-4">{t.role}</div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="d-flex justify-content-start mt-3">
                                        <button
                                            className="nav-btn1 me-1"
                                            onClick={() => swiperRef.current?.slidePrev()}
                                        >
                                            <i className="ri-arrow-left-double-line fs-4"></i>
                                        </button>
                                        <button
                                            className="nav-btn2"
                                            onClick={() => swiperRef.current?.slideNext()}
                                        >
                                            <i className="ri-arrow-right-double-line fs-4"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 d-flex flex-column justify-content-between bg-black px-4 px-md-5 py-4 mx-0 mx-md-4">
                            <div>
                                <h1 className="display-1 fw-bold counter-text">
                                    <CountUp start={240} end={250} delay={5} duration={8} enableScrollSpy={true}>
                                        {({ countUpRef, start }) => (
                                            <div>
                                                <span ref={countUpRef} />
                                                +
                                            </div>
                                        )}
                                    </CountUp>
                                    {/* <CountUp start={240} duration={5} end={250} enableScrollSpy={true} />+ */}
                                </h1>
                                <h4 className="mb-4">
                                    Happy clients inspired by our loyalty and quality
                                </h4>
                            </div>
                            <div>
                                <p className="mb-4 me-0 me-md-3 text-muted">
                                    Hendrerit gravida rutrum quisque non tellus. Suscipit adipiscing
                                    bibendum est ultricies integer quis auctor. Eu consequat ac felis
                                    donec et odio. Fames ac turpis egestas rat velit scelerisque in
                                    dictum non mas.
                                </p>
                                <button className="btn btn-light rounded-pill px-4">
                                    Discover all projects
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className="my-5">
                <LightImages />
            </div>
            <hr />
            <div className="my-5">
                <InstagramAdvertize />
            </div>
            <hr />
        </>
    )
}


export default AboutUs