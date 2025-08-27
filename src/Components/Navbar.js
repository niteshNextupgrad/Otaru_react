"use client";
import { useCart } from "@/Hooks/useCart";
// import { useCart } from "@/ContextApi/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false)

  useEffect(() => {


    const handleScroll = () => {
      // console.log(window.scrollY);
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top px-4 ${isScrolled ? "navbar-scrolled bg-dark" : "bg-dark-transparent p-lg-5"
          }`}
        style={{ transition: "all 0.3s ease" }}
      >
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3 me-4" href="/">
          <Image src="/image23.png" height={30} width={60} alt="logo" />
        </Link>

        {/* Right side on mobile: Cart + Toggle */}
        <div className="d-flex align-items-center ms-auto d-lg-none">
          <Link href='/cart' className="text-white">Cart ({cartCount || 0})</Link>
          <button
            className="px-2 border-0 bg-transparent text-white fs-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span><i className="ri-menu-line"></i></span>
          </button>
        </div>

        {/* Menu: collapses on mobile */}
        <div className="collapse navbar-collapse justify-content-between p-0 m-0" id="navbarNavDropdown">
          {/* Menu items (left side on desktop) */}
          <ul className="navbar-nav d-flex flex-lg-row gap-lg-4">
            {/* Home */}
            <li className="nav-item"><Link className="nav-link text-white" href="/">Home</Link></li>
            {/* <li className="nav-item"><Link className="nav-link text-white" href="/about-us">About</Link></li> */}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="pagesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                About
              </a>
              <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                <li><Link className="dropdown-item" href="/about-us">About Us</Link></li>
                <li><Link className="dropdown-item" href="/our-team">Our Team</Link></li>
                <li><Link className="dropdown-item" href="/pricing-plans">Pricing Plans</Link></li>
              </ul>
            </li>
            <li className="nav-item"><Link className="nav-link text-white" href="/blogs">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/shop">Shop</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" href="/contact-us">Contact</Link></li>

            {/* Pages */}
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="pagesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pages
              </a>
              <ul className="dropdown-menu" aria-labelledby="pagesDropdown">
                <li><Link className="dropdown-item" href="/our-team">Our Team</Link></li>
                <li><Link className="dropdown-item" href="/pricing-plans">Pricing Plans</Link></li>
              </ul>
            </li> */}
          </ul>
          
          {/* Right side Cart + Button (desktop only) */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link href='/cart' className="text-white">Cart ({cartCount || 0})</Link>
            <button className="fs-1 bg-transparent text-light fw-bold border-0" onClick={() => setTimeout(() => setSideBarOpen(true), 300)}><i className="ri-menu-line"></i></button>
          </div>
        </div>
      </nav>


      <div className={`rightSideBar ${sideBarOpen ? "open" : ""}`}>
        <button
          className="sidebarCloseBtn fs-1 bg-transparent text-dark fw-bold border-0"
          onClick={() => setSideBarOpen(false)}
        >
          <i className="ri-close-large-fill"></i>
        </button>

        {/*  sidebar content  */}
        <div className="d-none d-lg-flex flex-column gap-3 py-5">
          <div className="row">
            <div className="logo col-sm-12 d-flex flex-column justify-content-center align-items-center gap-4">
              <Image src='/image24.png' height={110} width={180} alt="logo" />
              <h2 className="ls-2 text-dark">Otaru tech</h2>
              <p className="text-dark">New generation of technology and design. Find us on social media and always stay updated.</p>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-3">
              <Image src='/image27.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src='/image18.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src='/image19.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-3">
              <Image src='/image20.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src='/image22.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src='/image21.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center align-items-center gap-2 text-dark">
              <p><a href="/" className="text-decoration-none text-dark">FACEBOOK</a></p>
              <p><a href="/" className="text-decoration-none text-dark">TWITTER</a></p>
              <p><a href="/" className="text-decoration-none text-dark">INSTAGRAM</a></p>
            </div>
          </div>
        </div>
      </div>
      {/* {sideBarOpen && (
        <div className="container rightSideBar">
          <button className="sidebarCloseBtn fs-1 bg-transparent text-dark fw-bold border-0" onClick={() => setSideBarOpen(false)}><i className="ri-close-large-fill"></i></button>
          <div className="d-none d-lg-flex flex-column gap-3 py-5">
            <div className="row">
              <div className="logo col-sm-12 d-flex flex-column justify-content-center align-items-center gap-4">
                <Image src='/image24.png' height={110} width={180} alt="logo" />
                <h2 className="ls-2 text-dark">Otaru tech</h2>
                <p className="text-dark">New generation of technology and design. Find us on social media and always stay updated.</p>
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-sm-3">
                <Image src='/image27.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
              </div>
              <div className="col-sm-3">
                <Image src='/image18.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
              </div>
              <div className="col-sm-3">
                <Image src='/image19.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-sm-3">
                <Image src='/image20.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
              </div>
              <div className="col-sm-3">
                <Image src='/image22.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
              </div>
              <div className="col-sm-3">
                <Image src='/image21.jpg' height={100} width={95} alt="logo" className="rightSidebarImage" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-center align-items-center gap-2 text-dark">
                <p><a href="/" className="text-decoration-none text-dark">FACEBOOK</a></p>
                <p><a href="/" className="text-decoration-none text-dark">TWITTER</a></p>
                <p><a href="/" className="text-decoration-none text-dark">INSTAGRAM</a></p>
              </div>
            </div>
          </div>
        </div>
      )} */}

    </>

  );
}