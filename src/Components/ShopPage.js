"use client"
import Image from "next/image";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import BackToTopButton from "./BackToTopButton";
import Link from "next/link";
import { useCart } from "@/Hooks/useCart";
// import { useCart } from "@/ContextApi/CartContext";
import { productsData } from "@/Data/products";
import { useRouter } from "next/navigation";
import Breadcrumb from "./Breadcrumb";


export default function ShopPage() {
    const router = useRouter()
    const { addToCart } = useCart()
    const [allProducts] = useState(productsData)
    const [products, setProducts] = useState(allProducts)
    const [currentPage, setCurrentPage] = useState(1);
    const perPageProduct = 6;
    const totalPages = Math.ceil(products.length / perPageProduct);
    const startIndex = (currentPage - 1) * perPageProduct;
    const selectedProducts = products.slice(startIndex, startIndex + perPageProduct);


    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("latest")

    const filterByPrice = () => {
        let filtered = allProducts.filter(
            p => p.price >= priceRange[0] && p.price <= priceRange[1]
        );
        setProducts(filtered);
        setCurrentPage(1);
    };
    const searchProduct = (e) => {
        e.preventDefault();

        if (searchTerm.trim().length < 1) {
            setProducts(allProducts);
            setCurrentPage(1);
            return;
        }

        const filtered = allProducts.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filtered);
        setCurrentPage(1);
    };




    const seearchByCategory = (e) => {
        e.preventDefault()
        console.log(e.target.value);

    }
    const sortProducts = () => {
        console.log(sortBy);
    }
    return (
        <>
            <BackToTopButton />
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "SHOP", href: null },
            ]} />

            <section className="py-5 mb-5">
                <div className="container-fluid">
                    <div className="row my-5">
                        <div className="col-sm-10 mx-auto">
                            <div className="row">
                                {
                                    selectedProducts.length > 0 ? (
                                        <div className="col-lg-9">
                                            <div className="row">
                                                <div className="col-sm-12 text-muted d-flex justify-content-between align-items-center py-2">
                                                    <p className="m-0">
                                                        Showing{" "} {startIndex + 1}-{Math.min(startIndex + perPageProduct, products.length)} {" "} of {products.length} results
                                                    </p>
                                                    <select className="form-select" value={sortBy} onChange={(e) => { setSortBy(e.target.value); sortProducts() }}>
                                                        <option value="popularty">Sort by popularty</option>
                                                        <option value="rating">Sort by average Rating</option>
                                                        <option value="latest">Sort by latest</option>
                                                        <option value="priceLow">Sort by price : low to high</option>
                                                        <option value="priceHigh">Sort by price : high to low</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row g-4 py-4">
                                                {selectedProducts?.map((product, i) => (
                                                    <div key={i} className="col-sm-6 col-md-4 col-lg-4">
                                                        <div className="h-100 d-flex flex-column gap-4 mb-3">
                                                            <div className="position-relative overflow-hidden">
                                                                <Image
                                                                    src={product.image}
                                                                    height={250}
                                                                    width={250}
                                                                    alt={product.image}
                                                                    style={{ objectFit: "cover", width: "100%" }}
                                                                    className="d-block"
                                                                />

                                                                <div className="shopProductOverlay d-flex justify-content-center align-items-center">
                                                                    <button className="pageBtn" onClick={() => addToCart(product)} >Add to Cart <i className="fw-bold  fs-4 ri-arrow-right-s-fill"></i></button>
                                                                </div>
                                                            </div>

                                                            <div>

                                                                <h4 className="transitionText fw-normal" onClick={() => router.push(`/product/${product.id}`)}>{product.title}</h4>
                                                                <p>₹{product.price}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                            {/* Pagination */}
                                            <div className="row my-4">
                                                <div className="col-sm-12 d-flex justify-start-between align-items-center p-0">
                                                    <button
                                                        className="border-0 bg-dark text-light px-2"
                                                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                                        disabled={currentPage === 1}
                                                    >
                                                        <i className="ri-arrow-left-s-fill fw-bold"></i>Prev
                                                    </button>

                                                    <div>
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
                                    ) : (
                                        <div className="col-sm-9 fs-1 text-center h-100 d-flex justify-content-center align-items-center">
                                            No Product Found!
                                        </div>
                                    )
                                }
                                <div className="col-lg-3 px-3">
                                    <div>
                                        <form onSubmit={searchProduct}>
                                            <input placeholder="Serach Products" onChange={(e) => setSearchTerm(e.target.value)} />
                                            <button type="submit" className="formSubmitBtn"><i className="ri-search-line fs-5"></i></button>
                                        </form>
                                    </div>
                                    <div className="mt-5">
                                        <h2 className="mb-3 fs-3">Filter by Price</h2>
                                        <RangeSlider
                                            min={0}
                                            max={5000}
                                            step={100}
                                            value={priceRange}
                                            onInput={setPriceRange}
                                        />

                                        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                                            <p className="mt-3">
                                                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                                            </p>
                                            <button type="submit" onClick={filterByPrice} className="btn text-light h-50">Filter <i className="ri-arrow-right-s-fill"></i></button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h5>Categories</h5>
                                        {/* <ul className="d-flex flex-column gap-2 mt-4">
                                            <li>Gadgets <span className="text-muted">(19)</span></li>
                                            <li>Headphones <span className="text-muted">(3)</span></li>
                                            <li>Keyboards <span className="text-muted">(6)</span></li>
                                            <li>Speakers <span className="text-muted">(12)</span></li>
                                            <li>Watches <span className="text-muted">(5)</span></li>
                                        </ul> */}
                                        <div className="d-flex flex-column gap-2 mt-4">
                                            <Link href='/' className="text-white">Gadgets <span className="text-muted">(19)</span></Link>
                                            <Link href='/' className="text-white">Headphones <span className="text-muted">(3)</span></Link>
                                            <Link href='/' className="text-white">Keyboards <span className="text-muted">(6)</span></Link>
                                            <Link href='/' className="text-white">Speakers <span className="text-muted">(12)</span></Link>
                                            <Link href='/' className="text-white">Gadgets <span className="text-muted">(19)</span></Link>
                                            <Link href='/' className="text-white">Watches <span className="text-muted">(5)</span></Link>
                                        </div>
                                    </div>
                                    <div className="row g-2 mt-4">
                                        <div>
                                            <h4>Instagram</h4>
                                        </div>
                                        <div className="col-sm-12 d-flex flex-wrap gap-1 mb-4">
                                            <Image src='/image27.jpg' height={80} width={80} alt="logo" className="rightSidebarImage" />
                                            <Image src='/image18.jpg' height={80} width={80} alt="logo" className="rightSidebarImage" />
                                            <Image src='/image19.jpg' height={80} width={80} alt="logo" className="rightSidebarImage" />
                                            <Image src='/image22.jpg' height={80} width={80} alt="logo" className="rightSidebarImage" />
                                            <Image src='/image20.jpg' height={80} width={80} alt="logo" className="rightSidebarImage" />
                                            <Image src='/image21.jpg' height={80} width={80} alt="logo" className="rightSidebarImage" />
                                        </div>
                                        <div className="mt-4">
                                            <h4>Follow us</h4>
                                            <div className="d-flex gap-3">
                                                <a href="#" className="text-muted small-text">FACEBOOK</a>
                                                <a href="#" className="text-muted small-text">TWITTER</a>
                                                <a href="#" className="text-muted small-text">LINKEDIN</a>
                                            </div>
                                        </div>
                                    </div>
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
