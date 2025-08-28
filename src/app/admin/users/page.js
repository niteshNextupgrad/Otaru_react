"use client"
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
const columns = [
  { name: "ID", selector: (row) => row.id, sortable: true },
  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Role", selector: (row) => row.role, sortable: true },
];

const data = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Carol", email: "carol@example.com", role: "Viewer" },
  { id: 4, name: "David", email: "david@example.com", role: "Editor" },
  { id: 5, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 6, name: "Bob", email: "bob@example.com", role: "Editor" },
  { id: 7, name: "Carol", email: "carol@example.com", role: "Viewer" },
  { id: 8, name: "David", email: "david@example.com", role: "Editor" },
];
const Page = () => {
  return (
    <AdminLayout>
      <h2>Manage Products</h2>
      <TransparentDataTable data={data} columns={columns} />
    </AdminLayout>
  )
}
export default Page;