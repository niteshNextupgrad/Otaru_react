"use client"
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import SwalFire from "@/Helpers/SwalFire";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Breadcrumb";
import Link from "next/link";
import { userRegiser } from "@/Services";


const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required!").min(6, "password should be minimum 6 characters long!")
})
export default function UserRegister() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(LoginSchema) })

    const handleUserRegister = async (data) => {
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            if (data.profileImage?.[0]) {
                formData.append("profileImage", data.profileImage[0]);
            }

            const response = await userRegiser(formData);
            if (response.success) {
                SwalFire("Register", "success", response?.message);
                reset();
            } else {
                SwalFire("Register", "error", response?.message);
            }
        } catch (error) {
            console.error("failed to register user", error);
            SwalFire("Register", "error", "Internal Server Error");
        }
        finally {
            setLoading(false)
        }
    };
    return (
        <>
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "LOGIN", href: null },
            ]} />

            <div className="container py-3">
                <div className="row align-items-center">
                    <div className="col-10 col-lg-5 border-dark border rounded-2 mx-auto py-3">
                        <form className="d-flex flex-column gap-2" onSubmit={handleSubmit(handleUserRegister)} encType="multipart/form-data" >
                            <div className="text-center">
                                <Image height={60} width={60} alt="logo" src='/ltImge7.png' />
                                <p className="fs-5 text-center mb-3">Log in to explore more.</p>
                            </div>
                            <div>
                                <label className="ps-1">Name</label>
                                <input  {...register("name")} type="text" placeholder="enter your name" className=" mb-2" />
                                <p className="text-danger small">{errors.name?.message}</p>

                            </div>
                            <div>
                                <label className="ps-1">E-mail</label>
                                <input  {...register("email")} type="email" placeholder="enter your e-mail" className=" mb-2" />
                                <p className="text-danger small">{errors.email?.message}</p>

                            </div>
                            <div className="position-relative">
                                <label className="ps-1">Password</label>
                                <input  {...register("password")} type={showPassword ? "text" : "password"} placeholder="enter your password" className=" mb-2" />
                                <p className="text-danger small">{errors.password?.message}</p>
                                <div className="position-absolute" style={{ top: '25px', right: '10px', cursor: 'pointer' }}>
                                    {
                                        showPassword ?
                                            <i className="fs-5 ri-eye-line" onClick={() => setShowPassword(!showPassword)}></i>
                                            : <i className="fs-5 ri-eye-off-line" onClick={() => setShowPassword(!showPassword)}></i>
                                    }
                                </div>
                            </div>
                            {/* Profile Image */}
                            <div>
                                <label className="ps-1">Profile Picture</label>
                                <input {...register("profileImage")} type="file" accept="image/*" />
                            </div>
                            <div>
                                <button className="pageBtn w-100 justify-content-center" disabled={loading}>{loading ? 'Registering...' : (<>Register <i className="fw-bold fs-5 ri-arrow-right-s-fill"></i></>)}</button>
                            </div>
                            {/* <p className="text-center text-muted small my-3">-------OR-------</p> */}
                            <div>
                                <p className="text-center mt-2 px-4">{`Don't`} already have an account? <Link href='/user-login'>login Now</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}