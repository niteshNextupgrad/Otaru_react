"use client";
import { useCart } from "@/Hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "@/Redux/Slices/authSlice";

const menus = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Blog',
    link: '/blogs'
  },
  {
    label: 'Shop',
    link: '/shop'
  },
  {
    label: 'Contact',
    link: '/contact-us'
  },
]
export default function Navbar() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const router = useRouter()
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(false)
  const [showLogoutBtn, setShowLogoutBtn] = useState(false)

  const pathname = usePathname(); // Get the current pathname

  // Handle menu toggle manually on mobile
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Close the menu when the pathname changes
  useEffect(() => {
    setMenuOpen(false); // Close the menu when the route changes
  }, [pathname]); // Dependency on pathname to track route changes

  // Handle scroll effect for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.userType === 'user') {
      setUserLogged(true)
    }
  }, [user])

  const logoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(logout())
        Swal.fire({
          title: "Auth",
          icon: "success",
          text: "Logout Success!",
        })
        setUserLogged(false)
        router.push('/')
      }
    });
  }
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top px-4 ${isScrolled ? "navbar-scrolled bg-dark" : "bg-dark-transparent p-lg-5"}`}
        style={{ transition: "all 0.3s ease" }}
      >
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3 me-4" href="/">
          <Image src="/image23.png" height={30} width={60} alt="logo" />
        </Link>

        {/* Right side on mobile: Cart + Toggle */}
        <div className="d-flex align-items-center ms-auto d-lg-none">

          <Link href="/cart" className="text-white">
            Cart ({cartCount || 0})
          </Link>
          <button
            className="px-2 border-0 bg-transparent text-white fs-3"
            type="button"
            onClick={toggleMenu} // Toggle the menu manually
          >
            <span>
              <i className="ri-menu-line"></i>
            </span>
          </button>
        </div>

        {/* Menu: collapses on mobile */}
        <div className={`collapse navbar-collapse justify-content-between p-0 m-0 ${menuOpen ? "show" : ""}`}>
          {/* Menu items (left side on desktop) */}
          <ul className="navbar-nav d-flex flex-lg-row gap-lg-4">
            {
              menus?.map((menu, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link text-white" href={menu?.link}>
                    {menu.label}
                  </Link>
                </li>
              ))
            }
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
                <li>
                  <Link className="dropdown-item" href="/about-us">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/our-team">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/pricing-plans">
                    Pricing Plans
                  </Link>
                </li>
              </ul>
            </li>
            {!userLogged && (
              <li className="nav-item">
                <Link className="nav-link text-white" href='/user-login'>
                  Login
                </Link>
              </li>
            )}
          </ul>

          {/* Right side Cart + Button (desktop only) */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {
              userLogged && (
                <div className="userIcon" >
                  <div onClick={() => setShowLogoutBtn(!showLogoutBtn)}>
                    <Image src='/user.png' alt="user" height={30} width={30} title={user?.email || "User"}/>
                  </div>

                  {showLogoutBtn && <div className="">
                    <button className="pageBtn logoutBtn" onClick={logoutUser}>Logout</button>
                  </div>}
                </div>
              )
            }
            <Link href="/cart" className="text-white">
              Cart ({cartCount || 0})
            </Link>
            <button
              className="fs-1 bg-transparent text-light fw-bold border-0"
              onClick={() => setSideBarOpen(true)}
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`rightSideBar ${sideBarOpen ? "open" : ""}`}>
        <button
          className="sidebarCloseBtn fs-1 bg-transparent text-dark fw-bold border-0"
          onClick={() => setSideBarOpen(false)}
        >
          <i className="ri-close-large-fill"></i>
        </button>

        {/* Sidebar Content */}
        <div className="d-none d-lg-flex flex-column gap-3 py-5">
          <div className="row">
            <div className="logo col-sm-12 d-flex flex-column justify-content-center align-items-center gap-4">
              <Image src="/image24.png" height={110} width={180} alt="logo" />
              <h2 className="ls-2 text-dark">Otaru tech</h2>
              <p className="text-dark">
                New generation of technology and design. Find us on social media and always stay updated.
              </p>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-3">
              <Image src="/image27.jpg" height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src="/image18.jpg" height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src="/image19.jpg" height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-3">
              <Image src="/image20.jpg" height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src="/image22.jpg" height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
            <div className="col-sm-3">
              <Image src="/image21.jpg" height={100} width={95} alt="logo" className="rightSidebarImage" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center align-items-center gap-2 text-dark">
              <p>
                <a href="/" className="text-decoration-none text-dark">
                  FACEBOOK
                </a>
              </p>
              <p>
                <a href="/" className="text-decoration-none text-dark">
                  TWITTER
                </a>
              </p>
              <p>
                <a href="/" className="text-decoration-none text-dark">
                  INSTAGRAM
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
