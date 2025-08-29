"use client";
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAllProducts, 
  // updateProduct, deleteProduct
 } from "@/Services";
import { useSelector } from "react-redux";
import Loader from "@/Components/Loader";

const schema = yup.object().shape({
  image: yup
    .mixed()
    .test("fileType", "Only images are allowed", (value) => {
      if (!value || value.length === 0) return true; // allow empty on edit
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        value[0].type
      );
    })
    .test("fileSize", "Image size must be less than 2MB", (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024;
    }),
  title: yup.string().min(3, "Title too short").required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  category: yup.string().required("Category is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
});

const Page = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(user?.token);
      if (response.success) {
        setProducts(response?.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit updated product
  const onSubmit = async (formDataValues) => {
    try {
      const formData = new FormData();
      formData.append("title", formDataValues.title);
      formData.append("price", formDataValues.price);
      formData.append("category", formDataValues.category);
      formData.append("description", formDataValues.description);
      if (formDataValues.image?.[0]) {
        formData.append("image", formDataValues.image[0]);
      }

      const response = await updateProduct(editingId, formData, user?.token);

      if (response.success) {
        // Update frontend
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingId
              ? {
                  ...p,
                  title: formDataValues.title,
                  price: formDataValues.price,
                  category: formDataValues.category,
                  description: formDataValues.description,
                  image: formDataValues.image?.[0]
                    ? URL.createObjectURL(formDataValues.image[0])
                    : p.image,
                }
              : p
          )
        );
        alert("Product updated successfully!");
        setEditingId(null);
        setPreviewImage(null);
        reset();
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update product");
    }
  };

  const handleEdit = (row) => {
    setEditingId(row._id);
    reset({
      title: row.title,
      price: row.price,
      category: row.category,
      description: row.description,
      image: null,
    });
    setPreviewImage(row.image);
  };

  const handleDelete = async (row) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await deleteProduct(row._id, user?.token);
      if (response.success) {
        setProducts((prev) => prev.filter((p) => p._id !== row._id));
        alert("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete product");
    }
  };

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true, width: "80px" },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Price", selector: (row) => row.price, sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image}
          alt="preview"
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
        />
      ),
    },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success" onClick={() => handleEdit(row)}>
            <i className="ri-edit-line"></i>
          </button>
          <button className="btn btn-outline-danger" onClick={() => handleDelete(row)}>
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2 className="mb-2">Manage Products</h2>

      {editingId && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="row border g-3 p-4 rounded shadow-sm mb-4"
        >
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className={`${errors.title ? "is-invalid" : ""}`}
              {...register("title")}
              placeholder="Enter product title"
            />
            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className={`${errors.image ? "is-invalid" : ""}`}
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                style={{ width: "80px", marginTop: "10px", borderRadius: "6px" }}
              />
            )}
            <div className="invalid-feedback">{errors.image?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className={`${errors.price ? "is-invalid" : ""}`}
              {...register("price")}
              placeholder="Enter price"
            />
            <div className="invalid-feedback">{errors.price?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              type="text"
              className={`${errors.category ? "is-invalid" : ""}`}
              {...register("category")}
              placeholder="Enter category"
            />
            <div className="invalid-feedback">{errors.category?.message}</div>
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              rows="4"
              className={`${errors.description ? "is-invalid" : ""}`}
              {...register("description")}
              placeholder="Enter product description"
            ></textarea>
            <div className="invalid-feedback">{errors.description?.message}</div>
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingId(null);
                setPreviewImage(null);
                reset();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? <Loader height="50vh" /> : <TransparentDataTable columns={columns} data={products} />}
    </AdminLayout>
  );
};

export default Page;
