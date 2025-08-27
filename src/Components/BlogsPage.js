"use client"
import Image from "next/image";
import { useState } from "react";
import BackToTopButton from "./BackToTopButton";
import Breadcrumb from "./Breadcrumb";
import { blogData } from "@/Data/blogs";
import { useRouter } from "next/navigation";

export default function BlogPage() {
    const router=useRouter()
    const [blogs, setBlogs] = useState(blogData)
    const [currentPage, setCurrentPage] = useState(1);
    const perPageBlog = 3;

    // total pages
    const totalPages = Math.ceil(blogs.length / perPageBlog);

    // slice blogs according to current page
    const startIndex = (currentPage - 1) * perPageBlog;
    const selectedBlogs = blogs.slice(startIndex, startIndex + perPageBlog);

    return (
        <>
            <BackToTopButton />
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "BLOG", href: null },
            ]} />

            <section className="py-5 mb-5 px-4 px-md-0">
                <div className="container-fluid">
                    <div className="row my-5">
                        <div className="col-sm-10 mx-auto">

                            <div className="row">
                                {selectedBlogs.map((blog, index) => (
                                    <div key={index} className="col-12 p-0 d-flex flex-column gap-4 py-5 mb-4" onClick={() => router.push(`/blog/${blog.id}`)}>
                                        <Image
                                            src={blog.image}
                                            width={1125}
                                            height={600}
                                            alt={blog.title}
                                            className="img-fluid"
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className="d-flex flex-column gap-4">
                                            <div>
                                                <button className="small-text btn btn-outline-light p-0 px-1">{blog.date}</button>
                                            </div>
                                            <div>
                                                <h2 className="fs-1 transitionText mb-4">{blog.title}</h2>
                                                <p className="text-muted small ls-1">{blog.description}</p>
                                            </div>
                                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                                                <div className="d-flex flex-wrap gap-2">
                                                    {blog.tags.map((type, idx) => (
                                                        <button key={idx} className="pageBtn py-1 px-4">{type}</button>
                                                    ))}
                                                </div>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {blog.socialLinks.map((sl, idx) => (
                                                        <a key={idx} href={sl.link} target="_blank" className="text-muted small-text">{sl.name}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="row mt-4">
                                <div className="col-12 d-flex flex-wrap  align-items-center gap-2 p-0">
                                    <button
                                        className="border-0 bg-dark text-light px-2"
                                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="ri-arrow-left-s-fill fw-bold"></i>Prev
                                    </button>

                                    <div className="d-flex flex-wrap gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`btn ${currentPage === i + 1 ? "btn-light" : "text-light"}`}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className="border-0 bg-dark text-light px-2"
                                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next<i className="ri-arrow-right-s-fill fw-bold"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <hr />
        </>
    );
}
