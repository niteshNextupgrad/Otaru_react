"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

import LightImages from "./LightImages";
import InstagramAdvertize from "./InstagramAdvertize";
import ContactForm from "./ContactForm";

const slides = [
    {
        src: "/image04.jpg",
        title: "Fllow the digital trends and lead the changes",
        subtitle: "Design. Build. Scale.",
    },
    {
        src: "/image05.jpg",
        title: "Realize your new projects with our expertize",
        subtitle: "We craft digital experiences.",
    },
    {
        src: "/image06.jpg",
        title: "Incredible app features & fresh new Ideas",
        subtitle: "Empowering your growth.",
    },
];
const features = [
    {
        title: "Full Flexibility",
        text: "Mi egeta mauris pharetra ultrices rationibus comprehensam scriptorem.",
        img: "/image13.jpg",
    },
    {
        title: "Digital Instruments",
        text: "Mi egeta mauris pharetra ultrices rationibus comprehensam scriptorem.",
        img: "/image28.jpg",
    },
    {
        title: "Unique Solutions",
        text: "Mi egeta mauris pharetra ultrices rationibus comprehensam scriptorem.",
        img: "/image14.jpg",
    },
    {
        title: "User Interface",
        text: "Mi egeta mauris pharetra ultrices rationibus comprehensam scriptorem.",
        img: "/image15.jpg",
    },
];
const products = [
    {
        img: "/image16.jpg",
        date: "18. AUG 2025",
        title: "Small Wireless bluetooth earphone",
        author: "John Drahmns",
    },
    {
        img: "/image25.jpg",
        date: "18. AUG 2025",
        title: "young new artists and their fresh view",
        author: "John Drahmns",
    },
    {
        img: "/image26.jpg",
        date: "18. AUG 2025",
        title: "How connect bluetooth speakers?",
        author: "John Drahmns",
    },
    {
        img: "/image17.jpg",
        date: "18. AUG 2025",
        title: "50 Motivationals and inspirational songs",
        author: "John Drahmns",
    },
];
const advantages = [
    {
        img: "./innovative.svg",
        title: "Innovative",
        desc: "Platea dictumst vesti bulum rhoncus est sque elit ullam corper dignissim",
    },
    {
        img: "./design.svg",
        title: "Design",
        desc: "Platea dictumst vesti bulum rhoncus est sque elit ullam corper dignissim",
    },
    {
        img: "./branding.svg",
        title: "Branding",
        desc: "Platea dictumst vesti bulum rhoncus est sque elit ullam corper dignissim",
    },
];
export default function HeroPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeImage, setActiveImage] = useState("/image13.jpg");
    const swiperRef = useRef(null);
    const handlePlay = () => {
        const vid = document.getElementById("myVideo");
        vid.play();
        setIsPlaying(true); // mark as playing
        vid.setAttribute("controls","true")
    };

    return (
        <>
            <div className="w-100 heroSliderSection position-relative">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}  // 👈 save instance
                    className="w-100 h-100"
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="h-100 w-100 position-relative d-flex align-items-end justify-content-start text-white p-5"
                                style={{
                                    backgroundImage: `url(${slide.src})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="position-relative px-lg-3">
                                    <h2 className="display-2 w-75 ls-1 mb-5">{slide.title}</h2>
                                    <Link href="/shop" className="pageBtn">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>


                <div className="customNavWrapper d-none d-md-flex">
                    <button onClick={() => swiperRef.current?.slidePrev()}
                        className="customNavBtn1 custom-prev">
                        <i className="ri-arrow-left-double-line"></i>
                    </button>
                    <button onClick={() => swiperRef.current?.slideNext()} className="customNavBtn2 custom-next">
                        <i className="ri-arrow-right-double-line"></i>
                    </button>
                </div>

            </div>

            <section className="p-5">
                <div className="row px-0 px-sm-5 px-md-5 px-lg-5">
                    {advantages.map((adv, i) => (
                        <div key={i} className="col-sm-12 col-md-6 col-lg-4  d-flex flex-column gap-2 p-lg-4" >
                            <Image src={adv.img} height={100} width={100} alt={adv.title} className="img-fluid" />
                            <h2>{adv.title}</h2>
                            <p style={{ fontSize: '16px', paddingRight: '30px' }} className="text-muted">{adv.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-5 px-2 p-md-5">
                <div className="container-fluid">
                    <div className="row">
                        {/* Left Column */}
                        <div className="col-12 col-md-4 mb-4">
                            <span className="text-muted" style={{ fontSize: '12px' }}>TECHNOLOGY</span>
                            <div className="d-flex gap-4 flex-column mb-4">
                                <h2 className="fs-2 fs-md-1">Something truly exciting for us all</h2>
                                <p className="text-muted">
                                    Turpis nunc eget lorem dolor. Ut lectus arcu bibendum at varius vel. Tempor orci eu lobortis elementum nibh. Faucibus purus in massa tempor nec feugiat nisl ad pretium fusce. Viverra aliquet eget sit amet tellus cras.
                                </p>
                            </div>
                            <Link href="/shop/" className="pageBtn">
                                View More
                            </Link>
                        </div>

                        {/* Right Column */}
                        <div className="col-12 col-md-8">
                            <div className="row g-4">
                                {/* First Image */}
                                <div className="col-12 col-sm-6">
                                    <div className="image-container position-relative">
                                        <Image
                                            src="/image07.jpg"
                                            alt="product"
                                            width={390}
                                            height={400}
                                            className="img-fluid w-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="overlay">
                                            <div className="overlay-content text-center">
                                                <Image
                                                    src="/image08.jpg"
                                                    alt="overlay img"
                                                    width={100}
                                                    height={100}
                                                    className="img-fluid"
                                                />
                                                <button className="pageBtn mt-3">
                                                    Add to Cart <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Image */}
                                <div className="col-12 col-sm-6">
                                    <div className="image-container position-relative">
                                        <Image
                                            src="/image09.jpg"
                                            alt="product"
                                            width={390}
                                            height={400}
                                            className="img-fluid w-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="overlay">
                                            <div className="overlay-content text-center">
                                                <Image
                                                    src="/image10.jpg"
                                                    alt="overlay img"
                                                    width={100}
                                                    height={100}
                                                    className="img-fluid"
                                                />
                                                <button className="pageBtn mt-3">
                                                    Add to Cart <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
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


            <section className="py-5 px-0 lg-p-5 md-p-5">
                <div className="container-fluid video-wrapper">
                    <video
                        id="myVideo"
                        width="100%"
                        height="450"
                        poster="/image11.jpg"
                    >
                        <source
                            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>

                    {!isPlaying && (
                        <button
                            className="play-btn pageBtn"
                            onClick={handlePlay}
                        >
                            Play Video
                        </button>
                    )}
                </div>

            </section>

            <section className="p-0 lg-p-5 md-p-5 d-flex justify-content-center align-items-center">
                <h2 className="w-75">Reach out to us anytime and lets create a better future for all technology users <s>together, forever. We are open</s> to all types of collab offers and tons more.
                </h2>
            </section>

            <section className="py-5 px-0 px-lg-5 lg-p-5 md-p-5 quotesSection">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-sm-8">
                            <img src="/image12.jpg" style={{ width: '100%', border: '0.1px solid gray' }} />
                        </div>
                        <div className="col-sm-4 p-5 d-flex align-items-center flex-column maskImageBg" style={{ border: '0.1px solid gray' }}>
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 3000, // 3 seconds
                                    disableOnInteraction: false, // keep autoplay after manual swipe
                                }}
                                spaceBetween={30}
                                slidesPerView={1}
                                style={{ overflow: 'hidden', maxWidth: '100%' }}
                            >
                                <SwiperSlide>
                                    <div className="my-4 d-flex align-items-center flex-column text-center text-white">
                                        <p className="text-muted">
                                            "This handy tool helps you create dummy text for all your layout needs.
                                            We are gradually adding new functionality and we welcome your suggestions and feedback."

                                            "This handy tool helps you create
                                            We are gradually adding new functionality and we welcome your suggestions and feedback."
                                        </p>
                                        <strong>Signature</strong>
                                        <p>DESIGNER</p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="my-4 d-flex align-items-center flex-column text-center">
                                        <p className="text-muted">
                                            "This handy tool helps you create dummy text for all your layout needs.
                                            We are gradually adding new functionality."

                                            "This handy tool helps you create
                                            We are gradually adding new functionality and we welcome your suggestions and feedback."
                                        </p>
                                        <strong>Signature</strong>
                                        <p>DEVELOPER</p>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div className="my-4 d-flex align-items-center flex-column text-center">
                                        <p className="text-muted">
                                            "Another testimonial goes here with custom content to showcase carousel usage."

                                            "This handy tool helps you create dummy text for all your layout needs.
                                            We are gradually adding new functionality and we welcome your suggestions and feedback."
                                        </p>
                                        <strong>Signature</strong>
                                        <p>MANAGER</p>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 px-0 lg-p-5 md-p-5  featuresSection">
                <div className="row m-4 d-flex gap-5">
                    {/* Left Side - Features */}
                    <div className="col-sm-4 mx-auto">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`mb-5 ${idx === features.length - 1 ? "border-0" : ""}`}
                                onMouseEnter={() => setActiveImage(feature.img)}
                                style={{ cursor: "pointer" }}
                            >
                                <h3 className="transitionText">{feature.title}</h3>
                                <p className="text-muted">{feature.text}</p>
                                <hr />
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Image */}
                    <div className="col-sm-6 d-flex justify-content-center align-items-center">
                        <Image
                            src={activeImage}
                            height={550}
                            width={550}
                            alt="Feature image"
                            className="rounded shadow img-fluid"
                        />
                    </div>
                </div>
            </section>

            <section className="py-5">
                <hr />
                <div className="marquee-container py-2">
                    <div className="marquee-track">
                        <h2>Modern - Futuristic -</h2>
                        <h2>Established  -  Modern</h2>
                        <h2>- Futuristic - Modern</h2>
                    </div>
                </div>
                {/* <div style={{ fontSize: '88px' }} >
                    <marquee direction="right" scrollamount={15} loop={2}>Modern - Futuristic -
                        Established  -  Modern - Futuristic - Modern - Futuristic -
                        Established  -  Modern - Futuristic - </marquee>
                </div> */}
                <hr />
                <div style={{ fontSize: '92px' }}>
                    <marquee direction="right" scrollamount={15} >Modern - Futuristic -
                        Established  -  Modern - Futuristic - Modern - Futuristic -
                        Established  -  Modern - Futuristic - </marquee>
                </div>
                <hr />
            </section>

            <section className="py-5 productSection">
                <div className="container-fluid">
                    <div className="row ">
                        {products.map((item, i) => (
                            <div
                                key={i}
                                className="col-sm-3 d-flex justify-content-center align-items-center"
                                style={{ position: "relative" }}
                            >
                                <div>
                                    <Image
                                        src={item.img}
                                        height={450}
                                        width={320}
                                        alt={`product-${i}`}
                                    />
                                </div>
                                <div
                                    style={{ position: "absolute", bottom: 0 }}
                                    className="mx-5 d-flex gap-2 gap-lg-4 flex-column"
                                >
                                    <button type="button" className="btn btn-outline-light w-50 p-0">
                                        {item.date}
                                    </button>
                                    <h4 className="ls-2 fw-normal p-2">{item.title}</h4>
                                    <p className="text-muted">By <span className="">{item.author}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="contactSection" style={{ padding: '80px 40px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 d-flex flex-column gap-4">
                            <h2>
                                Don{`'`}t hesitate to
                                contact us whenever!
                            </h2>
                            <p className="text-secondary">Malesua da fames ac turpis eg estas mae cenas pharetra. Torto condim entum lacinia quis vel. Quis vel eros donec ac odio.</p>
                            <div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <h4 className="ls-2">Belgium</h4>
                                        <p className="text-muted">
                                            Rue de Baras 108
                                            Tenneville Rd
                                        </p>
                                        <p className="text-muted">381629332193</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <h4 className="ls-2">Stockholm</h4>
                                        <p className="text-muted">
                                            Fäbodvägen 8
                                            142 33 Skogås
                                        </p>
                                        <p className="text-muted">024993223</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <h4 className="ls-2">Glassgow</h4>
                                        <p className="text-muted">
                                            1 Lethington Rd,
                                            Glasgow, G46 6TA
                                        </p>
                                        <p className="text-muted">381629334215</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ContactForm />

                    </div>
                </div>
            </section>
            <LightImages />
            <hr />

            <InstagramAdvertize />
            <hr />
        </>
    );
}
