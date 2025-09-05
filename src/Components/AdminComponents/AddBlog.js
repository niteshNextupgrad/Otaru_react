"use client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AdminLayout from "@/Components/AdminLayout";
import { useState } from "react";
import { addNewBlog } from "@/Services";
import { useSelector } from "react-redux";
import SwalFire from "@/Helpers/SwalFire";

// Validation Schema
const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    description: yup.string().required("Description is required"),
    image: yup.mixed().required("Image is required")
        .test("fileType", "Only images are allowed", (value) => {
            if (!value || value.length === 0) return false;
            return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value[0].type);
        })
        .test("fileSize", "Image size must be less than 2MB", (value) => {
            if (!value || value.length === 0) return false;
            return value[0].size <= 2 * 1024 * 1024; // 2MB
        }),
    content: yup.string().required("Content is required"),
    tags: yup.string()
        .required("Tags are required")
        .test("is-valid", "At least one tag is required", (value) => {
            return value && value.split(",").map(t => t.trim()).filter(Boolean).length > 0;
        }),

});

export default function AddBlog() {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            image: "",
            content: "",
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("description", data.description);
        formData.append("category", "Marketing");
        formData.append("slug", data.title.toLowerCase().replace(/\s+/g, "-"));
        formData.append("content", data.content);
        formData.append("date", new Date().toISOString().split("T")[0]);

        // Tags as array
        const tagsArray = data.tags.split(",").map(t => t.trim()).filter(Boolean);
        formData.append("tags", JSON.stringify(tagsArray));

        formData.append("image", data.image[0]);

        setLoading(true)

        try {
            const response = await addNewBlog(formData, user?.token || "")
            SwalFire("Blog", "success", response?.message)
            reset()
        } catch (error) {
            console.error('error adding blog!', error.response.data.message || "")
            SwalFire("Blog", "error", "Internal Server Error")
        }
        finally {
            setLoading(false)
        }
    };


    return (
        <AdminLayout>
            <div className="">
                <h2 className="mb-4">Write Your Blog</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded shadow-sm">
                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Blog Title"
                            {...register("title")}
                            className={` ${errors.title ? "is-invalid" : ""}`}
                        />
                        {errors.title && (
                            <div className="invalid-feedback">{errors.title.message}</div>
                        )}
                    </div>

                    {/* Author */}
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            placeholder="Enter Author Name"
                            {...register("author")}
                            className={` ${errors.author ? "is-invalid" : ""}`}
                        />
                        {errors.author && (
                            <div className="invalid-feedback">{errors.author.message}</div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            rows="3"
                            placeholder="Enter short blog description"
                            {...register("description")}
                            className={` ${errors.description ? "is-invalid" : ""}`}
                        />
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description.message}</div>
                        )}
                    </div>

                    {/* Image */}
                    <div className="mb-3">
                        <label className="form-label">Featured Image</label>
                        <input
                            type="file"
                            {...register("image")}
                            className={` ${errors.image ? "is-invalid" : ""}`}
                        />
                        {errors.image && (
                            <div className="invalid-feedback">{errors.image.message}</div>
                        )}
                    </div>

                    {/* Tags  */}
                    <div className="mb-3">
                        <label className="form-label">Tags (comma separated)</label>
                        <input
                            type="text"
                            placeholder="e.g. design, digital, marketing"
                            {...register("tags")}
                            className={`${errors.tags ? "is-invalid" : ""}`}
                        />
                        {errors.tags && (
                            <div className="invalid-feedback">{errors.tags.message}</div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={field.value}
                                    onChange={(_event, editor) => {
                                        const data = editor.getData();
                                        field.onChange(data);
                                    }}
                                />
                            )}
                        />
                        {errors.content && (
                            <div className="text-danger mt-1">{errors.content.message}</div>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving....' : ' Save Blog'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
