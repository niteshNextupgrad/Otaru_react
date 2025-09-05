"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Breadcrumb from "@/Components/Breadcrumb";
import { useEffect, useState } from "react";
import { getBlogBySlug } from "@/Services";

export default function blogPage() {
    const router = useRouter();
    const params = useParams();
    const blogSlug = params?.id?.toString();

    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (!blogSlug) return;
        const fetchblog = async () => {
            try {
                setLoading(true);
                const response = await getBlogBySlug(blogSlug)
                setBlog(response?.data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchblog();
    }, [blogSlug]);


    if (!blog) {
        return (
            <>
                <Breadcrumb paths={[
                    { label: "HOME", href: "/" },
                    { label: "BLOG", href: "/blogs" },
                    { label: "blog", href: null },
                    // { label: params.id, href: null },
                ]} />
                <div className="row py-5">
                    <div className="col-10 col-md-6 mx-auto text-center d-flex justify-content-center flex-column align-items-center">
                        <h2>blog Not Found!.</h2>
                        <button
                            onClick={() => router.replace('/blogs')}
                            className="pageBtn small ls-1 mt-3"
                        >
                            Return to Blog page <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "BLOG", href: "/blogs" },
                { label: params.id, href: null },
            ]} />

            <section className="py-5">
                <div className="container">
                    <div className="row gap-4">
                        {/* blog Image */}
                        <div className="col-12 col-lg-12">
                            <Image
                                src={blog.image}
                                height={600}
                                width={800}
                                alt={blog?.title}
                                className="img-fluid rounded shadow-sm w-100"
                                style={{ objectFit: "cover" }}
                            />

                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-column gap-2">
                                <p className="fs-5">
                                    By-<a>{blog.author}</a>
                                </p>
                                <button className="small-text pageBtn p-0 px-1">{blog.date}</button>
                                <h2 className="fs-1 mt-3">{blog.title}</h2>
                                <p className="text-muted">{blog?.description}</p>

                                {/* ✅ Render HTML content safely */}
                                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                            </div>


                            <div className="d-flex flex-wrap justify-content-between gap-2 mt-4">
                                <div className="d-flex flex-wrap gap-2">
                                    {(() => {
                                        let cleanTags = [];
                                        try {
                                            // Try to parse into proper array if it's broken JSON
                                            cleanTags = JSON.parse(blog.tags.join(""));
                                        } catch (e) {
                                            cleanTags = blog.tags; // fallback
                                        }
                                        return cleanTags.map((type, idx) => (
                                            <button key={idx} className="pageBtn py-1 px-4">
                                                {type.replace(/["\[\]]/g, "").trim()}
                                            </button>
                                        ));
                                    })()}
                                </div>
                                <div className="d-flex flex-wrap gap-2">
                                    {blog.socialLinks?.map((sl, idx) => (
                                        <a key={idx} href={sl.link} target="_blank" className="text-muted small-text">{sl.name}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
