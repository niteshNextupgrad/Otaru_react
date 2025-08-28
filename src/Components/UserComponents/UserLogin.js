"use client"
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "@/Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import SwalFire from "@/Helpers/SwalFire";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Breadcrumb";
import Link from "next/link";


const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required!").min(3, "not a valid password!")
})
export default function UserLogin() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
    // console.log(user, "user detail");


    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(LoginSchema) })

    const handleAdminLogin = async (payload) => {
        // console.log(payload, "payload from form");
        if (payload.email === 'user@gmail.com' && payload.password === 'User@123') {
            dispatch(login({ ...payload, userType: 'user' }))
            SwalFire("Login", "success", "Login success!")
            reset()
            router.push("/");
        }
        else {
            SwalFire("Login", "error", "Inivalid username or password!!")
        }
    }
    return (
        <>
            <Breadcrumb paths={[
                { label: "HOME", href: "/" },
                { label: "LOGIN", href: null },
            ]} />

            <div className="container py-3">
                <div className="row align-items-center">
                    <div className="col-10 col-lg-5 border-dark border rounded-2 mx-auto py-3">
                        <form className="d-flex flex-column gap-2" onSubmit={handleSubmit(handleAdminLogin)}>
                            <div className="text-center">
                                <Image height={60} width={60} alt="logo" src='/ltImge7.png' />
                                <p className="fs-5 text-center mb-3">Log in to explore more.</p>
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
                                <div className="text-end"><a>Forgot Password?</a></div>
                            </div>
                            <div>
                                <button className="pageBtn w-100 justify-content-center">Login<i className="fw-bold fs-5 ri-arrow-right-s-fill"></i></button>
                            </div>
                            {/* <p className="text-center text-muted small my-3">-------OR-------</p> */}
                            <div>
                                <p className="text-center mt-2 px-4">{`Don't`} have an account? <Link href='/user-register'>Regsiter Now</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}