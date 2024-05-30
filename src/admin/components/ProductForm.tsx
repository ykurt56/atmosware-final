import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
  stock: z.number().min(0, "Must be a positive number"),
  sizes: z.object({
    S: z.number().min(0, "Must be a positive number"),
    M: z.number().min(0, "Must be a positive number"),
    L: z.number().min(0, "Must be a positive number"),
    XL: z.number().min(0, "Must be a positive number"),
  }),
  rating: z.object({
    rate: z.number().min(0, "Rate must be a positive number"),
    count: z.number().min(0, "Count must be a positive number"),
  }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductForm: React.FC = () => {
  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      stock: 0,
      sizes: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
      },
      rating: {
        rate: 0,
        count: 0,
      },
    },
    onSubmit: async (values) => {
      try {
        values.rating.rate = parseFloat((Math.random() * 4 + 1).toFixed(1));
        values.rating.count = Math.round(Math.random() * 250) + 1;
        // Stock değerini sizes içindeki değerlerin toplamı olarak hesapla
        let stock =
          values.sizes.L + values.sizes.M + values.sizes.S + values.sizes.XL;
        // Stock değerini values içine ata
        values.stock = stock;

        await axios.post("http://localhost:3001/products", values);

        toast.success("Product added successfully");
        formik.resetForm();
      } catch (error) {
        toast.error("Failed to add product");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.title && (
          <div className="text-red-500 text-sm">{formik.errors.title}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.price && (
          <div className="text-red-500 text-sm">{formik.errors.price}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.description && (
          <div className="text-red-500 text-sm">
            {formik.errors.description}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.category && (
          <div className="text-red-500 text-sm">{formik.errors.category}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.errors.image && (
          <div className="text-red-500 text-sm">{formik.errors.image}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Sizes And Total Stock{" "}
          {formik.values.sizes.S +
            formik.values.sizes.M +
            formik.values.sizes.L +
            formik.values.sizes.XL}{" "}
        </label>
        <div className="flex justify-between">
          <div>
            <label>S:</label>
            <input
              type="number"
              name="sizes.S"
              value={formik.values.sizes.S}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>M:</label>
            <input
              type="number"
              name="sizes.M"
              value={formik.values.sizes.M}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>L:</label>
            <input
              type="number"
              name="sizes.L"
              value={formik.values.sizes.L}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>XL:</label>
            <input
              type="number"
              name="sizes.XL"
              value={formik.values.sizes.XL}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
