"use client"
import { getAllUsers } from "@/Services";
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const columns = [
  { name: "SN.", selector: (row, index) => index + 1, sortable: true },
  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Role", selector: (row) => row.userType, sortable: true },
];

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


  const data = usersData || []
  return (
    <AdminLayout>
      <h2>Manage Products</h2>
      {
        loading ? <Loader height='50vh' /> : (
          <TransparentDataTable data={data} columns={columns} />
        )
      }
    </AdminLayout>
  )
}
export default Page;