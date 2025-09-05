"use client";
import AdminLayout from "@/Components/AdminLayout";
import TransparentDataTable from "@/Components/DataTable";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  deleteProductById,
  getAllProductCategories,
  getAllProducts,
  updateProductById,
} from "@/Services";
import { useSelector } from "react-redux";
import Loader from "@/Components/Loader";
import SwalFire, { SwalConfirm } from "@/Helpers/SwalFire";

const schema = yup.object().shape({
  // image: yup
  //   .mixed()
  //   .test("fileType", "Only images are allowed", (value) => {
  //     if (!value || value.length === 0) return true; // allow empty on edit
  //     return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
  //       value[0].type
  //     );
  //   })
  //   .test("fileSize", "Image size must be less than 2MB", (value) => {
  //     if (!value || value.length === 0) return true;
  //     return value[0].size <= 2 * 1024 * 1024;
  //   }),
  title: yup.string().min(3, "Title too short").required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  discount: yup
    .number()
    .typeError("Discount must be a number")
    .min(0, "Discount cannot be less than 0")
    .max(90, "Discount cannot be more than 90")
    .required("Discount is required"),

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
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getAllProductCategories();
      if (res.success) setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
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
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("title", formDataValues.title);
      formData.append("price", formDataValues.price);
      formData.append("discount", formDataValues.discount);
      formData.append("category", formDataValues.category);
      formData.append("description", formDataValues.description);
      if (formDataValues.image?.[0]) {
        formData.append("image", formDataValues.image[0]);
      }

      const response = await updateProductById(editingId, formData, user?.token);

      if (response.success) {
        SwalFire("Product", "success", response?.message || "Product updated!")
        fetchProducts()
        setEditingId(null);
        setPreviewImage(null);
        reset();
      }
      else {
        SwalFire("Product", "error", response?.message || "failed to update product!")

      }
    } catch (error) {
      console.error("Update failed", error);
      SwalFire("Product", "error", error.response.data.message || "Internal Server Error")
    }
    finally {
      setLoading(false)
    }
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    reset({
      title: row.title,
      price: row.price,
      discount: row.discount,
      category: row.category?.id || "",
      description: row.description,
      image: null,
    });

    setPreviewImage(row.image);
  };

  const handleDelete = async (row) => {
    const confirmed = await SwalConfirm("Delete Product?", "This action cannot be undone!", "warning", "Yes, delete it!", "No, cancel",);

    if (!confirmed) return;

    try {
      const response = await deleteProductById(row.id, user?.token);
      if (response.success) {
        SwalFire("Product", "success", response?.message || "Product deleted!")
        fetchProducts()
      }
    } catch (error) {
      console.error("Delete failed", error);
      SwalFire("Product", "error", error.response.data.message || "Internal Server error!")
    }
  };

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true, width: "80px" },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Price", selector: (row) => row.price, sortable: true },
    { name: "Discount", selector: (row) => `${row.discount}%` || 0, sortable: true },
    { name: "Category", selector: (row) => row.category?.name || "N/A", sortable: true },
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
          <button className="btn-edit" onClick={() => handleEdit(row)}>
            <i className="ri-edit-line"></i>
          </button>
          <button className="btn-delete" onClick={() => handleDelete(row)}>
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="container py-4">
        <h2 className="mb-2">Manage Products</h2>

        {editingId && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row border g-3 p-4 rounded shadow-sm mb-4 mt-2"
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
            <div className="col-md-3">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                className={`${errors.discount ? "is-invalid" : ""}`}
                {...register("discount")}
                placeholder="Enter Discount"
              />
              <div className="invalid-feedback">{errors.discount?.message}</div>
            </div>

            <div className="col-md-3">
              <label className="form-label">Category</label>
              <select
                className={`form-select w-100 ${errors.category ? "is-invalid" : ""}`}
                {...register("category")}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
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
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Udating..." : "Update Product"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
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
      </div>
    </AdminLayout>
  );
};

export default Page;
