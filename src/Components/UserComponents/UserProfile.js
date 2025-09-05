"use client";

import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";
import { login, logout } from "@/Redux/Slices/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateUserProfile } from "@/Services";
import UserLayout from "@/Components/UserComponents/UserLayout";

const schema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
});

export default function UserProfile() {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
        },
    });

    useEffect(() => {
        if (!user || user?.userType !== "user") {
            router.push('/user-login');
        }
    }, [user, router]);

    const logoutUser = async () => {
        const confirmed = await SwalConfirm(
            "Are You Sure ?",
            "You will be logged out of your account.",
            "warning",
            "Yes, Logout!",
            "Cancel"
        );
        if (!confirmed) return;

        await dispatch(logout());
        SwalFire("Auth", "success", "Logout Success!");
        router.push("/");
    };

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("address", data.address);

            if (data.profileImage && data.profileImage[0]) {
                formData.append("profileImage", data.profileImage[0]);
            }

            const response = await updateUserProfile(user?.id, formData);

            if (response?.success) {
                SwalFire("Profile", "success", response?.message);
                dispatch(login(response?.data)); // update redux state
                setIsEditing(false);
            } else {
                SwalFire("Profile", "error", response?.message);
            }
        } catch (error) {
            console.error("Failed to update profile", error);
            SwalFire("Profile", "error", "Internal Server Error!");
        }
        finally {
            setLoading(false)
        }
    };


    const handleEditClick = () => {
        reset({
            name: user?.name || "",
            phone: user?.phone || "",
            address: user?.address || "",
        });
        setIsEditing(true);
    };

    return (
        <>

            <UserLayout>
                <div className="container py-2">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8 bg-dark border rounded-4">
                            <div className="card border-0 rounded-4 overflow-hidden">
                                <div className="card-body text-center bg-dark py-5">
                                    <Image
                                        src={user?.profileImage ? user.profileImage : "/user.png"}
                                        height={100}
                                        width={100}
                                        alt="user"
                                        className="rounded-circle border border-3 border-secondary shadow-sm"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <h3 className="mt-3 mb-1 fw-bold text-white">
                                        {user?.name || "User"}
                                    </h3>
                                    <p className="text-muted">{user?.email || "No Email"}</p>
                                </div>

                                {!isEditing && (
                                    <div className="table-responsive">
                                        <table className="table table-hover table-dark mb-0 align-middle">
                                            <tbody>
                                                <tr>
                                                    <th className="text-start w-25">Full Name</th>
                                                    <td className="text-secondary">
                                                        {user?.name || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-start">Email</th>
                                                    <td className="text-secondary">
                                                        {user?.email || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-start">Phone No.</th>
                                                    <td className="text-secondary">
                                                        {user?.phone || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-start">Address</th>
                                                    <td className="text-secondary">
                                                        {user?.address || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="text-start">Status</th>
                                                    <td>
                                                        <span
                                                            className={`badge px-3 py-2 rounded-pill ${user?.status === "Active"
                                                                ? "bg-success"
                                                                : "bg-secondary"
                                                                }`}
                                                        >
                                                            {user?.status || "N/A"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {isEditing && (
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="card-body bg-dark text-light"
                                    >
                                        <div className="mb-3">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                className={` ${errors.name ? "is-invalid" : ""
                                                    }`}
                                                {...register("name")}
                                            />
                                            {errors.name && (
                                                <div className="invalid-feedback">
                                                    {errors.name.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Phone No.</label>
                                            <input
                                                type="text"
                                                className={` ${errors.phone ? "is-invalid" : ""
                                                    }`}
                                                {...register("phone")}
                                            />
                                            {errors.phone && (
                                                <div className="invalid-feedback">
                                                    {errors.phone.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Profile Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className=""
                                                {...register("profileImage")}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <textarea
                                                rows="3"
                                                className={` ${errors.address ? "is-invalid" : ""
                                                    }`}
                                                {...register("address")}
                                            />
                                            {errors.address && (
                                                <div className="invalid-feedback">
                                                    {errors.address.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="d-flex justify-content-center gap-2">
                                            <button type="submit" className="btn btn-success px-4">
                                                {loading ? 'Saving' : (
                                                    <>
                                                        <i className="ri-save-line"></i> Save
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary px-4"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                <i className="ri-close-large-line"></i>  Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {!isEditing && (
                                    <div className="card-footer text-center bg-dark py-3">
                                        <button
                                            className="btn btn-primary px-4 me-2 shadow-sm"
                                            onClick={handleEditClick}
                                        >
                                            <i className="ri-pencil-line"></i> Edit Profile
                                        </button>
                                        <button
                                            className="btn btn-outline-danger px-4 shadow-sm"
                                            onClick={logoutUser}
                                        >
                                            <i className="ri-logout-circle-line"></i>   Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        </>
    );
}
