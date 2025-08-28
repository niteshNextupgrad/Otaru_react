import AdminLayout from "@/Components/AdminLayout";
import { blogData } from "@/Data/blogs";
import { productsData } from "@/Data/products";
import Link from "next/link";

export default function Dashboard() {
    const productCount = productsData.length || 0;
    const blogCount = blogData.length || 0;
    return (
        <AdminLayout>
            <h1 className="h3 mb-4">Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">Users</h5>
                            <p className="card-text display-6">120</p>
                            <Link href="#">Get Full Details</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">Products</h5>
                            <p className="card-text display-6">{productCount}</p>
                            <Link href="/admin/products">Get Full Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">Blogs</h5>
                            <p className="card-text display-6">{blogCount}</p>
                            <Link href="/admin/blogs">Get Full Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
