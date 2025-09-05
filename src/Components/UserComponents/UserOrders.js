"use client"
import { getOrdersByUserId, updateOrderStatus } from "@/Services"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserLayout from "./UserLayout"
import TransparentDataTable from "../DataTable"
import Loader from "../Loader"
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire"

export default function UserOrders() {
    const { user } = useSelector(state => state.auth)
    const [ordersdata, setOrdersdata] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchUserOrders = async () => {
        setLoading(true)
        try {
            const response = await getOrdersByUserId(user?.id);
            if (response?.success) {
                setOrdersdata(response?.data)
            }
        } catch (error) {
            console.error('failed to fetch orders!', error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        fetchUserOrders()
    }, [])
    console.log(ordersdata, "");

    const handleCancelOrder = async (orderId) => {

        const confirmed = await SwalConfirm(
            "Cancel Order",
            "This action cannot be undone!",
            "warning",
            "Yes!",
            "No"
        )
        if (!confirmed) return;

        try {
            const response = await updateOrderStatus(orderId, { status: "delivered" });
            if (response?.success) {
                SwalFire("Order Status", "success", "Order cancelled successfully!")
                fetchUserOrders();
            }
            else {
                SwalFire("Order Status", "error", response?.message)
            }

        } catch (error) {
            SwalFire("Order Status", "error", "Internal Server Error")
        }
    }


    const columns = [
        // { name: "SN.", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        {
            name: "Products",
            cell: (row) => (
                <span title={row.items.map(item => item.title).join(", ")}>
                    {row.items.map(item => item.title).slice(0, 2).join(", ")}
                    {row.items.length > 2 && " ..."}
                </span>
            ),
            sortable: false,
        },
        { name: "Name", selector: (row) => `${row.billing?.firstName} ${row.billing?.lastName}`, sortable: true },
        {
            name: "Address",
            cell: (row) => (
                <span title={row.address}>
                    {row.address?.length > 25
                        ? row.address.slice(0, 25) + "..."
                        : row.address}
                </span>
            ),
            sortable: true,
        },
        { name: "Total Amount", selector: (row) => row.total, sortable: true },
        {
            name: "Status", selector: (row) => (
                <span
                    className={`badge text-capitalize ${row.status === "delivered"
                        ? "bg-success"
                        : row.status === "pending"
                            ? "bg-warning text-dark"
                            : row.status === "processing"
                                ? "bg-info text-dark"
                                : row.status === "shipped"
                                    ? "bg-primary"
                                    : row.status === "cancelled"
                                        ? "bg-danger"
                                        : "bg-secondary"
                        }`}
                >
                    {row.status}
                </span>
            ), sortable: true
        },
        { name: "Order date", selector: (row) => new Date(row.createdAt).toLocaleDateString("en-GB"), sortable: true },
        {
            name: "Action",
            cell: (row) =>
                row.status === "pending" ? (
                    <button
                        title="Cancel order"
                        className="btn-delete"
                        onClick={() => handleCancelOrder(row.id)}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                ) : (
                    <span className="text-muted">--</span>
                ),
        }

    ];
    return (
        <UserLayout>
            <div className="container py-4">
                <h2 className="mb-2">My Orders</h2>
                {loading ? (
                    <Loader height="50vh" />
                ) : ordersdata.length === 0 ? (
                    <div className="mt-5">
                        <p className="text-danger">No Product Purchased Yet!</p>
                    </div>
                ) : (
                    <TransparentDataTable columns={columns} data={ordersdata} />
                )}

            </div>
        </UserLayout>
    )
}