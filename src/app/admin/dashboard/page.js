"use client";
import AdminLayout from "@/Components/AdminLayout";
import { getAllBlogs, getAllOrders, getAllProducts, getAllUsers } from "@/Services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dummy chart data (replace with API data later)
const chartData = [
  { name: "Jan", users: 40, sales: 240 },
  { name: "Feb", users: 80, sales: 320 },
  { name: "Mar", users: 65, sales: 210 },
  { name: "Apr", users: 120, sales: 400 },
  { name: "May", users: 90, sales: 350 },
];

export default function Dashboard() {
  const {user}=useSelector(state=>state.auth)
  const [blogsCount, setBlogsCount] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [productsCount, setProductsCount] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllOrders();
      setOrdersCount(response?.data.length || 0)
    }
    const fetchUsers = async () => {
      const response = await getAllUsers(user?.token);
      setUsersCount(response?.data.length || 0)
    }
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProductsCount(response?.data.length || 0)
    }
    const fetchBlogs = async () => {
      const response = await getAllBlogs();
      setBlogsCount(response?.data.length || 0)
    }
    fetchBlogs()
    fetchUsers()
    fetchOrders()
    fetchProducts()
  })
  return (
    <AdminLayout>
      <h1 className="h3 mb-4">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="row">
        {/* Users */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text display-6">{usersCount}</p>
              <Link href="/admin/users">Get Full Details</Link>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text display-6">{productsCount}</p>
              <Link href="/admin/products">Get Full Details</Link>
            </div>
          </div>
        </div>

        {/* Blogs */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Blogs</h5>
              <p className="card-text display-6">{blogsCount}</p>
              <Link href="/admin/blogs">Get Full Details</Link>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text display-6">{ordersCount}</p>
              <Link href="/admin/orders">Get Full Details</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Charts + Recent Activity */}
      <div className="row mt-4">
        {/* Chart Section */}
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white">
              User Growth & Sales
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#0d6efd" strokeWidth={3} name="Users" />
                  <Line type="monotone" dataKey="sales" stroke="#198754" strokeWidth={3} name="Sales" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white">
              Recent Activity
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">=  New product <b>iPhone 15</b> added</li>
              <li className="list-group-item">=  Blog <b>React Tips</b> updated</li>
              <li className="list-group-item">=  User <b>John Doe</b> registered</li>
              <li className="list-group-item">=  Order #1024 processed</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
