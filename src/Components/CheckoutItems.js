"use client";
import { useState } from "react";
// import { useCart } from "@/ContextApi/CartContext";
import { useCart } from "@/Hooks/useCart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

const checkoutSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    mobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    address: Yup.string().required("Address is required"),
});

const countryStateData = {
    India: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Madhya Pradesh", "Bihar"],
    USA: ["California", "Texas", "New York", "Florida", "Illinois"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
};

export default function CheckOutCartItems() {
    const router = useRouter()
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [states, setStates] = useState([]);

    // hook form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(checkoutSchema),
    });
    // Watch country field in real-time
    const selectedCountry = watch("country");

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setStates(countryStateData[country] || []);
    };
    const onSubmit = (data) => {
        const payload = {
            ...data,
            cartItems,
            total: subtotal,
        };
        console.log("Payload:", payload);
    };

    return (
        <>
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "CHECKOUT", href: null },
            ]} />
            {
                cartItems?.length > 0 ? (
                    <section className="py-5 checkOutPage">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-11 col-lg-10 mx-auto">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column gap-3">
                                            <h2 className="ls-1">Your Order</h2>
                                            <div className="table-responsive">
                                                <table className="table table-transparent align-middle text-nowrap text-muted">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartItems.map((item) => (
                                                            <tr key={item.id}>
                                                                <td className="d-flex gap-2 align-items-center">
                                                                    <span className="fs-6 fs-md-5 transitionText">
                                                                        {item.title} <i className="ri-close-fill fw-bold"></i> {item.quantity}
                                                                    </span>
                                                                </td>
                                                                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <th>Total</th>
                                                            <td>₹{subtotal.toFixed(2)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-lg-6 p-lg-4">
                                            <h2>Billing details</h2>
                                            <form className="text-muted" onSubmit={handleSubmit(onSubmit)}>
                                                <div>
                                                    <label>First Name*</label>
                                                    <input type="text" {...register("firstName")} />
                                                    <p className="text-danger small">{errors.firstName?.message}</p>
                                                </div>
                                                <div>
                                                    <label>Last Name*</label>
                                                    <input type="text" {...register("lastName")} />
                                                    <p className="text-danger small">{errors.lastName?.message}</p>
                                                </div>
                                                <div>
                                                    <label>Mobile Number*</label>
                                                    <input type="text" {...register("mobile")} />
                                                    <p className="text-danger small">{errors.mobile?.message}</p>
                                                </div>
                                                <div>
                                                    <label>Email Address*</label>
                                                    <input type="email" {...register("email")} />
                                                    <p className="text-danger small">{errors.email?.message}</p>
                                                </div>
                                                <div>
                                                    <label>Country*</label>
                                                    <select className="form-select w-100" {...register("country")} onChange={handleCountryChange}>
                                                        <option value="">Select Country</option>
                                                        {Object.keys(countryStateData).map((country) => (
                                                            <option key={country} value={country}>
                                                                {country}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p className="text-danger small">{errors.country?.message}</p>
                                                </div>
                                                <div>
                                                    <label>State*</label>
                                                    <select className="form-select w-100"  {...register("state")} disabled={!states.length}>
                                                        <option value="">Select State</option>
                                                        {states.map((st) => (
                                                            <option key={st} value={st}>
                                                                {st}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p className="text-danger small">{errors.state?.message}</p>
                                                </div>
                                                <div>
                                                    <label>Address*</label>
                                                    <textarea rows={4} {...register("address")} />
                                                    <p className="text-danger small">{errors.address?.message}</p>
                                                </div>
                                                <div>
                                                    <button type="submit" className="pageBtn small ls-1">
                                                        Place Order <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-12 col-lg-6 p-lg-4">
                                            <h2>Additional information</h2>
                                            <div className="text-muted">
                                                <label>Order notes (optional)</label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                                    {...register("notes")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="row py-5">
                        <div className="col-6 mx-auto text-center d-flex justify-content-center flex-column align-items-center">
                            <h2>Your cart is currently empty.</h2>
                            <button
                                onClick={() => router.push('/shop')}
                                className="pageBtn small ls-1"
                            >Return to shop page <i className="fw-bold fs-4 ri-arrow-right-s-fill"></i></button>
                        </div>
                    </div>
                )
            }


        </>
    );
}
