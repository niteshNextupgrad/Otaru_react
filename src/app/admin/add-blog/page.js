"use client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AdminLayout from "@/Components/AdminLayout";

// ✅ Validation Schema
const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    description: yup.string().required("Description is required"),
    image: yup.string().required("Image URL is required"),
    content: yup.string().required("Content is required"),
    tags: yup.string()
        .required("Tags are required")
        .test("is-valid", "At least one tag is required", (value) => {
            return value && value.split(",").map(t => t.trim()).filter(Boolean).length > 0;
        }),

});

export default function BlogEditor() {
    const {
        register,
        handleSubmit,
        control,
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

    const onSubmit = (data) => {
        // Shape into blog object
        const newBlog = {
            // id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            image: data.image, // from form
            title: data.title,
            description: data.description,
            tags: [],
            author: data.author,
            category: "General",
            slug: data.title.toLowerCase().replace(/\s+/g, "-"),
            content: data.content,
        };

        console.log("Blog Object:", newBlog);

        // Example: send to backend
        // fetch("/api/blogs", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(newBlog),
        // });
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h2 className="mb-4">Write Your Blog</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <label className="form-label">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter Image URL"
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
                    <button type="submit" className="btn btn-primary">
                        Save Blog
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
