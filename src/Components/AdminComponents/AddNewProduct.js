"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminLayout from "@/Components/AdminLayout";
import { addNewProduct } from "@/Services";
import SwalFire from "@/Helpers/SwalFire";
import { useState } from "react";
import { useSelector } from "react-redux";

// Validation Schema
const schema = yup.object().shape({
    image: yup.mixed().required("Image is required")
        .test("fileType", "Only images are allowed", (value) => {
            if (!value || value.length === 0) return false;
            return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value[0].type);
        })
        .test("fileSize", "Image size must be less than 2MB", (value) => {
            if (!value || value.length === 0) return false;
            return value[0].size <= 2 * 1024 * 1024; // 2MB
        }),

    title: yup.string().min(3, "Title too short").required("Title is required"),
    price: yup.number().typeError("Price must be a number").positive("Price must be greater than 0").required("Price is required"),
    category: yup.string().required("Category is required"),
    description: yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
});

const AddProduct = () => {
    const {user}=useSelector((state)=>state.auth)
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submit
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]); // file object
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("description", data.description);
        setLoading(true)
        try {
            const response = await addNewProduct(formData,user?.token)
            if (response?.success) {
                SwalFire("Product", "success", response.message)
                reset()
            }
            else {
                SwalFire("Product", "error", response.message)
            }

        } catch (error) {
            console.error('failed to add product!', error)
            SwalFire("Product", "error", "Inter Server Error")
        }
        finally {
            setLoading(false)
        }

    };

    return (
        <AdminLayout>
            <h2 className="mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="row border g-3 p-4 rounded shadow-sm">
                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className={` ${errors.title ? "is-invalid" : ""}`}
                        {...register("title")}
                        placeholder="Enter product title"
                    />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="col-md-6 ">
                    <label className="form-label">Product Image</label>
                    <input
                        type="file"
                        className={` ${errors.image ? "is-invalid" : ""}`}
                        accept="image/*"
                        {...register("image")}
                    />
                    <div className="invalid-feedback">{errors.image?.message}</div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Price (₹)</label>
                    <input
                        type="number"
                        className={` ${errors.price ? "is-invalid" : ""}`}
                        {...register("price")}
                        placeholder="Enter price"
                    />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        className={` ${errors.category ? "is-invalid" : ""}`}
                        {...register("category")}
                        placeholder="Enter category"
                    />
                    <div className="invalid-feedback">{errors.category?.message}</div>
                </div>
                <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                        rows="4"
                        className={` ${errors.description ? "is-invalid" : ""}`}
                        {...register("description")}
                        placeholder="Enter product description"
                    ></textarea>
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>

                {/* Submit Btn */}
                <div className="col-12">
                    <button type="submit" className="pageBtn" disabled={loading}>
                        Save Product<i className="fw-bold fs-5 ri-arrow-right-s-fill"></i>
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default AddProduct;
