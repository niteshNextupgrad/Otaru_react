"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import Link from "next/link";
import Swal from "sweetalert2";
import SwalFire from "@/Helpers/SwalFire";
import { logout } from "@/Redux/Slices/authSlice";


const adminMenus = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard'
    },
    {
        name: 'Users',
        link: '/admin/users'
    },
    {
        name: "Blogs",
        menus: [
            {
                label: 'Manage Blogs',
                link: '/admin/blogs'
            },
            {
                label: 'Add Blog',
                link: '/admin/add-blog'
            },
        ]
    },
    {
        name: "Products",
        menus: [
            {
                label: 'Manage Products',
                link: '/admin/products'
            },
            {
                label: 'Add Product',
                link: '/admin/add-product'
            },
        ]
    },
    {
        name: "Slider Images",
        link: '/admin/slider-images'
    },
]
export default function AdminLayout({ children }) {
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
        adminMenus.forEach(menu => {
            if (menu.menus?.some(sub => sub.link === pathName)) {
                setOpenMenu(menu.name);
            }
        });
    }, [pathName]);

    useEffect(() => {
        if (!user || user.userType !== "admin") {
            router.push("/admin/login");
        }
    }, [user, router]);


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
                SwalFire('Auth', "success", "Logout Success!",)
                router.push('/')
            }
        });
    }
    if (!user) {
        return <Loader />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav
                    className={`bg-secondary sidebar shadow-sm position-fixed top-0 start-0 vh-100 p-2 p-lg-0 
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
                        <h5 className="">Admin</h5>
                        <button className="pageBtn mt-0 py-1" onClick={logoutUser}>Logout<i className="fw-bold fs-5 ri-arrow-right-s-fill"></i></button>
                    </div>
                    <ul className="nav flex-column gap-2">
                        {adminMenus.map((menu, index) => (
                            <li key={index} className="nav-item">
                                {/* If it has submenus */}
                                {menu.menus ? (
                                    <>
                                        <button
                                            className="nav-link text-white d-flex justify-content-between align-items-center w-100"
                                            onClick={() => toggleMenu(menu.name)}
                                        >
                                            {menu.name}
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
                                                            className={`nav-link text-white w-100 ${pathName === sub.link ? "bg-primary" : ""
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
                                    <Link
                                        href={menu.link}
                                        className={`nav-link text-white ${pathName === menu.link ? "bg-primary" : ""}`}
                                    >
                                        {menu.name}
                                    </Link>
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
