"use client"
import { deleteUserById, getAllUsers } from "@/Services";
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";


// const data = [
//   { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
//   { id: 2, name: "Bob", email: "bob@example.com", role: "Editor" },
//   { id: 3, name: "Carol", email: "carol@example.com", role: "Viewer" },
//   { id: 4, name: "David", email: "david@example.com", role: "Editor" },
//   { id: 5, name: "Alice", email: "alice@example.com", role: "Admin" },
//   { id: 6, name: "Bob", email: "bob@example.com", role: "Editor" },
//   { id: 7, name: "Carol", email: "carol@example.com", role: "Viewer" },
//   { id: 8, name: "David", email: "david@example.com", role: "Editor" },
// ];
const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const [usersData, setUsersData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await getAllUsers(user?.token);
      if (response.success) {
        setUsersData(response?.data)
      }
    } catch (error) {
      console.error('failed to fetch users')
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    const confirmed = await SwalConfirm(
      "Delete User",
      "This action cannot be undone!",
      "warning",
      "Yes, delete it!",
      "No, Cancel"
    )
    if (!confirmed) return;
    try {
      const response = await deleteUserById(userId, user?.token)
      if (response?.success) {
        SwalFire("Delete User", "success", response?.message)
        fetchUsers()
      }
      else {
        SwalFire("Delete User", "error", response?.message)

      }
    } catch (error) {
      console.error('failed to delete user', error)
      SwalFire("Delete User", "error", "Internal Server Error")

    }

  }
  const columns = [
    { name: "SN.", selector: (row, index) => index + 1, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Resiter date", selector: (row) => new Date(row.createdAt).toLocaleDateString("en-GB"), sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn-delete" onClick={() => handleDelete(row.id)}>
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];
  return (
    <AdminLayout>
      <div className="container py-4">
        <h2>Manage Users</h2>
        {
          loading ? <Loader height='50vh' /> : (
            <TransparentDataTable data={usersData} columns={columns} />
          )
        }
      </div>
    </AdminLayout>
  )
}
export default Page;