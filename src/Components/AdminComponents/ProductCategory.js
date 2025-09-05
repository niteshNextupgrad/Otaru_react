"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminLayout from "../AdminLayout";
import TransparentDataTable from "../DataTable";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";
import { addNewProductCategory, deleteProductCategoryById, getAllProductCategories, updateProductCategoryById } from "@/Services";

//  Validation Schema
const schema = yup.object().shape({
    name: yup.string().required("Category name is required"),
    description: yup.string().nullable(),
});

export default function ProductCategories() {
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    //  Fetch Categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllProductCategories();
            if (res.success) setCategories(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    //  Add / Update
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (editingId) {
                const res = await updateProductCategoryById(editingId, data);
                SwalFire("Updated", "success", res.message);
            } else {
                const res = await addNewProductCategory(data);
                SwalFire("Added", "success", res.message);
            }
            fetchCategories();
            reset();
            setEditingId(null);
        } catch (err) {
            console.error(err);
            SwalFire("Error", "error", "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    //  Delete
    const handleDelete = async (id) => {
        const confirmed = await SwalConfirm(
            "Delete Category",
            "This action cannot be undone!",
            "warning",
            "Yes, delete it!",
            "Cancel"
        );

        if (!confirmed) return;

        try {
            const res = await deleteProductCategoryById(id);
            SwalFire("Deleted", "success", res.message);
            fetchCategories();
        } catch (err) {
            console.error(err);
            SwalFire("Error", "error", "Failed to delete category");
        }
    };

    // Edit (prefill form)
    const handleEdit = (cat) => {
        setEditingId(cat.id);
        setValue("name", cat.name);
        setValue("description", cat.description);
    };

    // Table Columns
    const columns = [
        {
            name: "SN",
            selector: (row, i) => i + 1,
            width: "70px",
        },
        { name: "Category Name", selector: (row) => row.name, sortable: true },
        { name: "Description", selector: (row) => row.description },
        {
            name: "Created At",
            selector: (row) =>
                new Date(row.createdAt).toLocaleDateString("en-GB"),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn-edit"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="ri-edit-line"></i>
                    </button>
                    <button
                        className="btn-delete"
                        onClick={() => handleDelete(row.id)}
                    >
                        <i className="ri-delete-bin-line"></i>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <div className="container py-4">
                <h2 className="mb-4">Manage Product Categories</h2>

                {/*  Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mb-5 border p-4 rounded shadow-sm"
                >
                    <div className="mb-3">
                        <label className="form-label">Category Name</label>
                        <input
                            type="text"
                            className=""
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className=""
                            rows="3"
                            {...register("description")}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : editingId
                                ? "Update Category"
                                : "Add Category"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() => {
                                reset();
                                setEditingId(null);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                <TransparentDataTable columns={columns} data={categories} />
            </div>
        </AdminLayout>
    );
}
