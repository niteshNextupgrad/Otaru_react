"use client"
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import { blogData } from "@/Data/blogs";

const columns = [
  { name: "SN", selector: (row, index) => index + 1, sortable: true, width: "80px", },
  { name: "Title", selector: (row) => row.title, sortable: true },
  { name: "Date", selector: (row) => row.date, sortable: true },
  { name: "Category", selector: (row) => row.category, sortable: true },
  {
    name: "Image", cell: (row) => (
      <img
        src={row.image}
        alt="preview"
        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
      />
    ), sortable: false,
  },
  { name: "Description", selector: (row) => row.description, sortable: true },
  {
    name: "Content",
    cell: (row) => (
      <span title={row.content}>  {/* full text in tooltip */}
        {row.content.length > 50
          ? row.content.substring(0, 50) + "..."
          : row.content}
      </span>
    ),
    sortable: true,
    wrap: true, // allows text wrapping (instead of one long line)
  },
  {
    name: "Actions", cell: (row) => (
      <div className="d-flex gap-2">
        <button className="btn btn-outline-success"><i className="ri-edit-line"></i></button>
        <button className="btn btn-outline-danger"><i className="ri-delete-bin-line"></i></button>

      </div>
    ), sortable: false,
  },
];

const data = blogData || [];
const Page = () => {
  return (
    <AdminLayout>
      <h2>Manage Products</h2>
      <TransparentDataTable columns={columns} data={data} />
    </AdminLayout>
  )
}
export default Page;