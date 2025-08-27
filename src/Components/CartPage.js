"use client"
import Image from "next/image"
// import { useCart } from "@/ContextApi/CartContext"
import { useCart } from "@/Hooks/useCart";

import { useRouter } from "next/navigation"
import Breadcrumb from "./Breadcrumb"

export default function CartPage() {

    const router = useRouter()
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

    // calculate subtotal/total
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <>
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "CART", href: null },
            ]} />

            <section className="p-3 p-md-5">
                {
                    cartItems?.length > 0 ? (
                        <>
                            <div className="row mt-5">
                                <div className="col-12 col-lg-11 mx-auto p-2 p-md-4">
                                    <div className="table-responsive">
                                        <table className="table table-transparent text-nowrap">
                                            <thead>
                                                <tr className="fs-5">
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">SubTotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map(item => (
                                                    <tr key={item.id}>
                                                        <td className="d-flex gap-2 align-items-center align-middle pe-2">
                                                            <button
                                                                className="text-light bg-dark border-0 fw-bold rounded-circle"
                                                                onClick={() => removeFromCart(item.id)}
                                                            >
                                                                <i className="ri-close-line"></i>
                                                            </button>
                                                            <Image
                                                                src={item.image}
                                                                height={60}
                                                                width={60}
                                                                alt={item?.title || "img"}
                                                                className="rounded"
                                                            />
                                                            <span className="fs-6 transitionText"  style={{wordBreak:'break-word'}}>
                                                                {item.title}</span>
                                                        </td>
                                                        <td className="align-middle pe-2">₹{item.price.toFixed(2)}</td>
                                                        <td className="align-middle pe-2">
                                                            <div className="d-flex ">
                                                                <button className="cartBtn quantityBtn">{item.quantity}</button>
                                                                <div className="d-flex flex-column position-relative">
                                                                    <button
                                                                        className="cartBtn increaseBtn small"
                                                                        onClick={() => increaseQuantity(item.id)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                    <button
                                                                        className="cartBtn decreaseBtn small"
                                                                        onClick={() => decreaseQuantity(item.id)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle">₹{(item.price * item.quantity).toFixed(2)}</td>
                                                    </tr>


                                                ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* Coupon Section */}
                            <div className="row align-items-lg-center mx-lg-5 mx-2">
                                <div className="col-lg-3 col-6 d-flex">
                                    <input placeholder="Coupon Code" className="couponInput small" />
                                </div>
                                <div className="col-lg-3 col-6">
                                    <button className="pageBtn small py-0 mt-0">
                                        Apply Coupon <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="row mx-2 mx-lg-5 my-4 my-lg-5">
                                <div className="col-12 col-md-6 d-flex flex-column gap-3">
                                    <h2 className="ls-1">Cart totals</h2>
                                    <div className="table-responsive">
                                        <table className="table table-transparent align-middle text-nowrap">
                                            <tbody>
                                                <tr>
                                                    <th className="w-50 w-md-25">Subtotal</th>
                                                    <td>₹{subtotal.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th className="w-50 w-md-25">Total</th>
                                                    <td>₹{subtotal.toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button
                                        className="pageBtn py-1 small px-3 d-flex align-items-center justify-content-between"
                                        onClick={() => router.push('/checkout-items')}
                                    >
                                        Proceed to checkout
                                        <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) :
                        (
                            <div className="d-flex justify-content-center flex-column align-items-center">
                                <h2>Your cart is currently empty.</h2>
                                <button
                                    onClick={() => router.push('/shop')}
                                    className="pageBtn small ls-1"
                                >Return to shop page <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i></button>
                            </div>
                        )
                }
            </section >
            <hr />
        </>
    )
}

