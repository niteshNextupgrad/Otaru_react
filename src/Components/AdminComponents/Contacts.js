"use client"
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import Loader from "@/Components/Loader";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";
import { deleteContact, getAllContacts } from "@/Services";
import { useEffect, useState } from "react";

export default function Contacts() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchContactData = async () => {
        try {
            setLoading(true)
            const response = await getAllContacts()
            if (response?.success) {
                setContacts(response?.data || [])
            }
        } catch (error) {
            console.error('faailed to fetch contact records', error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContactData()
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
            const response = await deleteContact(id);
            if (response?.success) {
                SwalFire("Contact", "success", response?.message)
                fetchContactData()
            }
            else {
                SwalFire("Contact", "error", response?.message)
            }
        } catch (error) {
            console.error('failed to delete record', error)
            SwalFire("Contact", "error", "Internal Server Error")

        }
    }

    const columns = [
        { name: "SN", selector: (row, index) => index + 1, sortable: true, width: "80px", },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Message", selector: (row) => row.message, sortable: true },
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
                <h2 className="mb-2">Manage Conatcts</h2>

                {loading ? <Loader height="50vh" /> : <TransparentDataTable columns={columns} data={contacts} />}
            </div>
        </AdminLayout>
    )
}