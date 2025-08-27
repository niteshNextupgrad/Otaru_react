"use client";

import { useCart } from "@/Hooks/useCart";
import { productsData } from "@/Data/products";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Breadcrumb from "@/Components/Breadcrumb";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id?.toString();

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const item = productsData.find((p) => p.id.toString() === productId);
                setProduct(item);
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);


    if (!product) {
        return (
            <>
                <Breadcrumb paths={[
                    { label: "HOME", href: "/" },
                    { label: "SHOP", href: "/shop" },
                    { label: "PRODUCT", href: null },
                    // { label: params.id, href: null },
                ]} />
                <div className="row py-5">
                    <div className="col-10 col-md-6 mx-auto text-center d-flex justify-content-center flex-column align-items-center">
                        <h2>Product Not Found!.</h2>
                        <button
                            onClick={() => router.replace('/shop')}
                            className="pageBtn small ls-1 mt-3"
                        >
                            Return to shop page <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
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
                { label: "SHOP", href: "/shop" },
                { label: "PRODUCT", href: null },
                { label: params.id, href: null },
            ]} />

            <section className="py-5">
                <div className="container">
                    <div className="row g-4 align-items-start">
                        {/* Product Image */}
                        <div className="col-12 col-lg-8">
                            <Image
                                src={product.image}
                                height={600}
                                width={800}
                                alt={product?.title}
                                className="img-fluid rounded shadow-sm w-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="col-12 col-lg-4 px-3 px-lg-5">
                            <div>
                                <h2 className="fs-1">{product.title}</h2>
                                <s className="fs-3 me-1 text-muted">₹{product.price + product.price*20/100}</s>
                                <span className="fs-2 mt-2">₹{product.price}.00</span>
                                <p className="text-muted my-4">{product.description}</p>

                                <button
                                    className="pageBtn mb-4"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to cart <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                </button>
                            </div>

                            <div className="mt-4 fs-5">
                                <p className="m-0">
                                    SKU: <span className="fs-6 text-muted">04</span>
                                </p>
                                <p className="m-0">
                                    Category: <span className="fs-6 text-muted">{product.category || "N/A"}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
