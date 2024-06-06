import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  sizes: {
    S: number;
    M: number;
    L: number;
    XL: number;
  };
  rating: {
    rate: number;
    count: number;
  };
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleSaveEdit = async (values: Product) => {
    try {
      const updatedProduct = {
        ...values,
        stock:
          values.sizes.S + values.sizes.M + values.sizes.L + values.sizes.XL,
      };

      await axios.put(
        `http://localhost:3001/products/${updatedProduct.id}`,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      setIsEditing(false);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex items-center mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-600 line-clamp-1">
                {product.description}
              </p>
              <p className="text-blue-500 font-bold">${product.price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditClick(product)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <Formik
              initialValues={{
                id: editingProduct?.id || "",
                title: editingProduct?.title || "",
                price: editingProduct?.price || 0,
                description: editingProduct?.description || "",
                category: editingProduct?.category || "",
                image: editingProduct?.image || "",
                stock: editingProduct?.stock || 0,
                sizes: {
                  S: editingProduct?.sizes?.S || 0,
                  M: editingProduct?.sizes?.M || 0,
                  L: editingProduct?.sizes?.L || 0,
                  XL: editingProduct?.sizes?.XL || 0,
                },
                rating: {
                  rate: editingProduct?.rating?.rate || 0,
                  count: editingProduct?.rating?.count || 0,
                },
              }}
              onSubmit={(values) => handleSaveEdit(values)}
            >
              {({ values, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Title
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Price (USD)
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Category
                    </label>
                    <Field
                      type="text"
                      id="category"
                      name="category"
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Image URL
                    </label>
                    <Field
                      type="text"
                      id="image"
                      name="image"
                      className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="sizes"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Sizes And Total Stock{" "}
                      {values.sizes.S +
                        values.sizes.M +
                        values.sizes.L +
                        values.sizes.XL}
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <span>S</span>
                        <Field
                          type="number"
                          id="sizes.S"
                          name="sizes.S"
                          placeholder="S"
                          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <span>M</span>
                        <Field
                          type="number"
                          id="sizes.M"
                          name="sizes.M"
                          placeholder="M"
                          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <span>L</span>
                        <Field
                          type="number"
                          id="sizes.L"
                          name="sizes.L"
                          placeholder="L"
                          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <span>XL</span>
                        <Field
                          type="number"
                          id="sizes.XL"
                          name="sizes.XL"
                          placeholder="XL"
                          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Rating
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        type="number"
                        id="rating.rate"
                        name="rating.rate"
                        placeholder="Rate"
                        className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Field
                        type="number"
                        id="rating.count"
                        name="rating.count"
                        placeholder="Count"
                        className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
