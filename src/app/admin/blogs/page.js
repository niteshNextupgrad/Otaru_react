"use client"
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";
import { deleteBlogById, getAllBlogs } from "@/Services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const token = user.token || ""
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(token)
      setBlogs(response?.data)
    } catch (error) {
      console.error('failed to fetch blogs!', error.response.data.message)
    }
  }
  const handleDelete = async (id) => {
    const confirmed = await SwalConfirm("Delete Blog?", "This action cannot be undone!", "warning", "Yes, delete it!", "No, cancel",);

    if (!confirmed) return;

    try {
      const response = await deleteBlogById(id, token);
      SwalFire("Delete Blog", "success", response?.message || "Blog deleted!")
    } catch (error) {
      console.error('failed to delete product !', error)
    }

  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const columns = [
    // { name: "SN", selector: (row, index) => index + 1, sortable: true, width: "70px", },
    {
      name: "Title", cell: (row) => (
        <span title={row.title}>
          {row.title.length > 50
            ? row.title.substring(0, 50) + "..."
            : row.title}
        </span>
      ), sortable: true,
    },
    { name: "Date", selector: (row) => new Date(row.date).toLocaleDateString("en-GB"), sortable: true, width: "110px", },
    { name: "Category", selector: (row) => row.category, sortable: true, width: "120px", },
    {
      name: "Image", cell: (row) => (
        <img
          src={row.image}
          alt="preview"
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
        />
      ), sortable: false, width: "100px",
    },
    { name: "Description", selector: (row) => row.description, sortable: true, width: "200px", },
    {
      name: "Content",
      cell: (row) => (
        <span title={row.content}>
          {row.content.length > 50
            ? row.content.substring(0, 50) + "..."
            : row.content}
        </span>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions", cell: (row) => (
        <div className="d-flex gap-2">
          {/* <button className="btn btn-outline-success"><i className="ri-edit-line"></i></button> */}
          <button className="btn-delete" onClick={(row) => handleDelete(row.id)}><i className="ri-delete-bin-line"></i></button>

        </div>
      ), sortable: false, width: "80px",
    },
  ];
  return (
    <AdminLayout>
      <div className="container py-4">
        <h2 className="mb-2">Manage Products</h2>
        <TransparentDataTable columns={columns} data={blogs} />

      </div>

    </AdminLayout>
  )
}
export default Page;