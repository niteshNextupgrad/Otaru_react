"use client"
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import SwalFire from "@/Helpers/SwalFire";
import { getAllOrders, updateOrderStatus } from "@/Services";
import { useEffect, useState } from "react";

export default function Orders() {
    const [ordersData, setOrdersData] = useState([]);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrdersData(response?.data || []);
        } catch (err) {
            console.error("Failed to fetch orders");
        }
    };

    // Handle status change
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await updateOrderStatus(orderId, { status: newStatus });
            if (response?.success) {
                SwalFire("Order Status", "success", "Order status updated successfully!")
                fetchOrders();
            }
            else {
                SwalFire("Order Status", "success", response?.message)

            }

        } catch (error) {
            SwalFire("Order Status", "error", "Internal Server Error")
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        { name: "SN.", selector: (row, index) => index + 1, sortable: true, width: "80px" },
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
            name: "Status",
            cell: (row) => (
                <select
                    className={`text-capitalize border-0
                        ${row.status === "delivered" ? "bg-success text-white" :
                            row.status === "cancelled" ? "bg-danger text-white" :
                                "bg-light"
                        }`}
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            ),
            sortable: true
        },
        { name: "Order date", selector: (row) => new Date(row.createdAt).toLocaleDateString("en-GB"), sortable: true },
    ];

    return (
        <AdminLayout>
            <div className="container py-4">
                <h2 className="mb-2">Manage Orders</h2>
                <TransparentDataTable columns={columns} data={ordersData} />
            </div>
        </AdminLayout>
    );
}
