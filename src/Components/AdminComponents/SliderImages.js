"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminLayout from "../AdminLayout";
import TransparentDataTable from "../DataTable";
import {
    addNewSliderImage,
    deleteSliderImageById,
    getAllSldierImages,
    updateSliderImageById,
} from "@/Services";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";
import Loader from "../Loader";

// Yup validation
const schema = yup.object().shape({
    image: yup.mixed().required("Image is required"),
    title: yup.string().required("Title is required").min(10, 'tilt should be at least 10 character').max(100, 'limit exceed'),
    position: yup
        .number()
        .typeError("Position must be a number")
        .required("Position is required"),
    status: yup
        .string()
        .oneOf(["active", "inactive"])
        .required("Status is required"),
});

export default function SliderImages() {
    const [sliderImages, setSliderImages] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false); // table loading
    const [submitting, setSubmitting] = useState(false); // form loading
    const [deletingId, setDeletingId] = useState(null); // delete button loading

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Fetch slider images
    const fetchSliderImages = async () => {
        setLoading(true);
        try {
            const response = await getAllSldierImages();
            if (response.success) setSliderImages(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliderImages();
    }, []);

    // Add / Update
    const onSubmit = async (formData) => {
        setSubmitting(true);
        try {
            const form = new FormData();
            if (formData.image[0]) form.append("image", formData.image[0]);
            form.append("position", formData.position);
            form.append("title", formData.title);
            form.append("status", formData.status);

            if (editingId) {
                const response = await updateSliderImageById(editingId, form);
                SwalFire("Success", "success", response?.message);
            } else {
                const response = await addNewSliderImage(form);
                SwalFire("Success", "success", response.message);
            }
            reset();
            setEditingId(null);
            fetchSliderImages();
        } catch (error) {
            console.error("Submit error:", error);
            SwalFire("Error", "error", "Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    // Delete
    const handleDelete = async (id) => {
        const confirmed = await SwalConfirm(
            "Delete Record",
            "This action cannot be undone!",
            "warning",
            "Yes, delete it!",
            "No, cancel"
        );

        if (!confirmed) return;

        setDeletingId(id);
        try {
            const response = await deleteSliderImageById(id);
            if (response.success) {
                SwalFire("Deleted!", "success", response.message);
                fetchSliderImages();
            }
        } catch (error) {
            console.error("Delete error:", error);
            SwalFire("Error", "error", "Failed to delete slider");
        } finally {
            setDeletingId(null);
        }
    };

    // Edit (prefill form)
    const handleEdit = (slider) => {
        setEditingId(slider.id);
        setValue("title", slider.title);
        setValue("position", slider.position);
        setValue("status", slider.status);
    };

    const columns = [
        {
            name: "SN",
            selector: (row, index) => index + 1,
            width: "80px",
            sortable: true,
        },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={row.imageUrl}
                    alt="slider"
                    style={{
                        width: "60px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                    }}
                />
            ),
            sortable: false,
        },
        {
            name: "Title",
            selector: (row) => row.title || "N/A",
            sortable: true,
        },
        {
            name: "Position",
            selector: (row) => row.position,
            sortable: true,
        },
        {
            name: "Status",
            cell: (row) => (
                <span
                    className={`badge ${row.status === "active" ? "bg-success" : "bg-secondary"
                        }`}
                >
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) =>
                new Date(row.createdAt).toLocaleDateString("en-GB"),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleEdit(row)}
                        disabled={submitting}
                    >
                        <i className="ri-edit-line"></i>
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(row.id)}
                        disabled={deletingId === row.id}
                    >
                        {deletingId === row.id ? (
                            <span
                                className="spinner-border spinner-border-sm text-danger"
                                role="status"
                            ></span>
                        ) : (
                            <i className="ri-delete-bin-line"></i>
                        )}
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <div className="container py-4">
                <h2 className="mb-4">Manage Slider Images</h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mb-5 border p-4 rounded shadow-sm"
                >
                    <div className="mb-3">
                        <label className="form-label">Slider Image</label>
                        <input type="file" {...register("image")} />
                        {errors.image && (
                            <p className="text-danger">{errors.image.message}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" {...register("title")} />
                        {errors.title && (
                            <p className="text-danger">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Position</label>
                        <input type="number" {...register("position")} />
                        {errors.position && (
                            <p className="text-danger">{errors.position.message}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="form-select w-100" {...register("status")}>
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && (
                            <p className="text-danger">{errors.status.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                            ></span>
                        ) : editingId ? (
                            "Update Slider"
                        ) : (
                            "Add Slider"
                        )}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() => {
                                reset();
                                setEditingId(null);
                            }}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {loading ? <Loader height="50vh" /> : <TransparentDataTable
                    columns={columns}
                    data={sliderImages}
                />}
            </div>
        </AdminLayout>
    );
}
