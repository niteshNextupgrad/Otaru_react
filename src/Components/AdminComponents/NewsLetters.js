"use client"

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { deleteNewsLetter, getAllNewsLetters } from "@/Services";
import TransparentDataTable from "../DataTable";
import Loader from "../Loader";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";

export default function NewsLetters() {
    const [newsLetters, setNewsLetters] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchNewsLetters = async () => {
        try {
            setLoading(true)
            const response = await getAllNewsLetters()
            setNewsLetters(response?.data)
        } catch (error) {
            console.error('failed to fetch nnewsletter records!', error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        fetchNewsLetters()
    }, [])

    const handleDelete = async (id) => {
        const confirmed = await SwalConfirm(
            "Delete Record",
            "This action cannot be undone!",
            "warning",
            "Yes, delete it!",
            "No, Cancel"
        )
        if (!confirmed) return;

        try {
            const response = await deleteNewsLetter(id);
            if (response?.success) {
                SwalFire("Delete NewsLetter", "success", response?.message)
                fetchNewsLetters()
            }
        } catch (error) {
            console.error('failed to delete newsletter record', error)
        }
    }

    const columns = [
        { name: "SN", selector: (row, index) => index + 1, sortable: true, width: "80px", },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Subscribe Date", selector: (row) => new Date(row.createdAt).toLocaleDateString("en-GB") || "N/A", sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn-delete"
                        onClick={() => handleDelete(row.id)}
                    >
                        <i className="ri-delete-bin-line"></i>
                    </button>
                </div>
            ),
            sortable: false,
        }

    ];
    return (
        <AdminLayout>
            <div className="container py-4">
                <h2 className="mb-2">Manage NewsLetters</h2>

                {loading ? <Loader height="50vh" /> : <TransparentDataTable columns={columns} data={newsLetters} />}
            </div>

        </AdminLayout>
    )
}