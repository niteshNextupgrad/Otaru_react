"use client"
import Image from "next/image";
import { useState } from "react";
import BackToTopButton from "./BackToTopButton";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";

const blogs = [
    {
        date: '12 MAY 2022',
        image: '/Blogs/blog1.jpg',
        title: 'What we do in life echoes in eternity',
        description: `"Sit amet purus gravida quis blandit.
      Erat velit scelerisque in dictum non consectetur a erat nam.
      In metus vulputate eu scelerisque felis imperdiet. Adipiscing vitae proin sagittis nisl.
      Purus viverra accumsan in nisl nisi scelerisque. At volutpat diam ut venenatis."`,
        tags: ["Design", "Digital", "Marketing"],
        socailLinks: [
            { name: 'FACEBOOK', link: 'https://www.facebook.com' },
            { name: 'LINKEDIN', link: 'https://www.linkedin.com' },
            { name: 'TWITTER', link: 'https://www.x.com' },
        ]
    },
    {
        date: '12 MAY 2022',
        image: '/Blogs/blog2.jpg',
        title: 'Second Blog Example',
        description: `"MSit amet purus gravida quis blandit. Erat velit scelerisque in dictum non consectetur a erat nam. In metus vulputate eu scelerisque felis imperdiet. Adipiscing vitae
     proin sagittis nisl. Purus viverra accumsan in nisl nisi scelerisque. At volutpat diam ut venenatis"`,
        tags: ["Design", "SEO"],
        socailLinks: [
            { name: 'FACEBOOK', link: 'https://www.facebook.com' },
            { name: 'LINKEDIN', link: 'https://www.linkedin.com' },
            { name: 'TWITTER', link: 'https://www.x.com' },
        ]
    },
    {
        date: '13 MAY 2022',
        image: '/Blogs/blog3.jpg',
        title: 'Third Blog Example',
        description: `"Sit amet purus gravida quis blandit. Erat velit scelerisque in dictum non consectetur a erat nam. In metus vulputate eu scelerisque felis imperdiet. Adipiscing vitae proin sagittis
     nisl. Purus viverra accumsan in nisl nisi scelerisque. At volutpat diam ut venenatis"`,
        tags: ["UI/UX", "Branding"],
        socailLinks: [
            { name: 'FACEBOOK', link: 'https://www.facebook.com' },
            { name: 'LINKEDIN', link: 'https://www.linkedin.com' },
            { name: 'TWITTER', link: 'https://www.x.com' },
        ]
    },
    {
        date: '14 MAY 2022',
        image: '/Blogs/blog4.jpg',
        title: 'Fourth Blog Example',
        description: `"Sit amet purus gravida quis blandit. Erat velit scelerisque in dictum non consectetur a erat nam. In metus vulputate eu scelerisque felis imperdiet. Adipiscing vitae proin sagittis nisl.
     Purus viverra accumsan in nisl nisi scelerisque. At volutpat diam ut venenatis"`,
        tags: ["Digital", "Marketing"],
        socailLinks: [
            { name: 'FACEBOOK', link: 'https://www.facebook.com' },
            { name: 'LINKEDIN', link: 'https://www.linkedin.com' },
            { name: 'TWITTER', link: 'https://www.x.com' },
        ]
    },
    {
        date: '14 MAY 2022',
        image: '/Blogs/blog1.jpg',
        title: 'Fifth Blog Title',
        description: `"Sit amet purus gravida quis blandit. Erat velit scelerisque in dictum non consectetur a erat nam. In metus vulputate eu scelerisque felis imperdiet. Adipiscing vitae proin sagittis nisl.
     Purus viverra accumsan in nisl nisi scelerisque. At volutpat diam ut venenatis"`,
        tags: ["Digital", "Marketing", "Designing"],
        socailLinks: [
            { name: 'FACEBOOK', link: 'https://www.facebook.com' },
            { name: 'LINKEDIN', link: 'https://www.linkedin.com' },
            { name: 'TWITTER', link: 'https://www.x.com' },
        ]
    },
]

export default function BlogPage() {
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
                                    <div key={index} className="col-12 p-0 d-flex flex-column gap-4 py-5 mb-4">
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
                                            <div className="d-flex flex-wrap justify-content-between gap-2">
                                                <div className="d-flex flex-wrap gap-2">
                                                    {blog.tags.map((type, idx) => (
                                                        <button key={idx} className="pageBtn py-1 px-4">{type}</button>
                                                    ))}
                                                </div>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {blog.socailLinks.map((sl, idx) => (
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
