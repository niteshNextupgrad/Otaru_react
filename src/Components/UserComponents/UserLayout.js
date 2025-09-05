"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Link from "next/link";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";
import { logout } from "@/Redux/Slices/authSlice";
import Image from "next/image";


const userMenus = [
    {
        name: 'Profile',
        link: '/user/profile',
        icon: 'ri-user-line'
    },
    {
        name: 'My Orders',
        link: '/user/orders',
        icon: 'ri-shopping-cart-line'
    },
    {
        name: 'Go to Cart Page',
        link: '/cart',
        icon: 'ri-shopping-cart-line'
    },
    {
        name: 'Back to Home Page',
        link: '/',
        icon: 'ri-home-2-line'
    },

]
export default function UserLayout({ children }) {
    const { user } = useSelector((state) => state.auth);
    const pathName = usePathname()
    const dispatch = useDispatch()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const toggleMenu = (name) => {
        setOpenMenu((prev) => (prev === name ? null : name));
    };

    useEffect(() => {
        userMenus.forEach(menu => {
            if (menu.menus?.some(sub => sub.link === pathName)) {
                setOpenMenu(menu.name);
            }
        });
    }, [pathName]);

    useEffect(() => {
        if (!user || user.userType !== "user") {
            router.push("/user-login");
        }
    }, [user, router]);


    const logoutUser = async () => {
        const confirmed = await SwalConfirm(
            "Are You Sure ?",
            "You will be logged out of your account.",
            "warning",
            "Yes, Logout!",
            "Cancel"
        );
        if (!confirmed) return;

        await dispatch(logout());
        SwalFire("Auth", "success", "Logout Success!");
        router.push("/");
    }
    if (!user) {
        return <Loader />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav
                    className={`sidebar shadow-sm position-fixed top-0 start-0 vh-100 p-2 p-lg-0 
                        ${sidebarOpen ? "d-block" : "d-none d-md-block"}`}
                    style={{ width: "250px", zIndex: 1050 }}
                >
                    <button
                        className="dahboardMenuBtn d-md-none"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                    <div className="border-bottom d-flex justify-content-between align-items-center p-2 p-lg-4">
                        <Image src={user?.profileImage ? user.profileImage : "/user.png"} height={60} width={60} alt="avatar" className="rounded-circle" />
                        <button className="pageBtn mt-0 py-1 " onClick={logoutUser}>Logout<i className="fw-bold fs-5 ri-arrow-right-s-fill"></i></button>
                    </div>
                    <ul className="nav flex-column gap-2 mt-lg-3">
                        {userMenus.map((menu, index) => (
                            <li key={index} className="nav-item">
                                {/* If it has submenus */}
                                {menu.menus ? (
                                    <>
                                        <button
                                            className="nav-link text-white d-flex align-items-center w-100"
                                            onClick={() => toggleMenu(menu.name)}
                                        >
                                            <i className={`me-2 ${menu?.icon}`}></i>{menu.name}
                                            <i
                                                className={`ms-2 ${openMenu === menu.name ? "ri-arrow-down-s-fill" : "ri-arrow-up-s-fill"
                                                    }`}
                                            ></i>
                                        </button>

                                        {/* Dropdown (collapsible) */}
                                        {openMenu === menu.name && (
                                            <ul className="nav flex-column submenu">
                                                {menu.menus.map((sub, subIndex) => (
                                                    <li key={subIndex} className="nav-item">
                                                        <Link
                                                            href={sub.link}
                                                            className={`nav-link text-white w-100 ${pathName === sub.link ? "bg-dark" : ""
                                                                }`}
                                                        >
                                                            <i className="ri-arrow-right-double-fill me-2"></i>{sub.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    // If it's a single menu
                                    <>

                                        <Link
                                            href={menu.link}
                                            className={`nav-link text-white ${pathName === menu.link ? "bg-dark" : ""}`}
                                        >
                                            <i className={`me-2 ${menu?.icon}`}></i>{menu.name}
                                        </Link>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Toggle Btn for Mobile */}
                <div className="d-md-none p-2 shadow-sm bg-light">
                    <button
                        className="dahboardMenuBtn"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <i className="ri-menu-2-line"></i>
                    </button>
                    <span className="text-dark ms-2">User Pannel</span>
                </div>

                {/*  Content */}
                <main
                    className={`${sidebarOpen ? "ms-0" : "col-md-9 ms-sm-auto col-lg-10"
                        } px-md-4 py-3`}
                >
                    <div className="container"> {children}</div>
                </main>
            </div>
        </div>
    );
}
