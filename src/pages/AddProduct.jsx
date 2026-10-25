
import "./AddProduct.css"
import { useState } from "react";

function AddProduct({
  products,
  setProducts,
}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
    status: "Available",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!product.name.trim()) {
      newErrors.name =
        "Product Name is required";
    }

    if (!product.description.trim()) {
      newErrors.description =
        "Description is required";
    }

    if (!product.category) {
      newErrors.category =
        "Category is required";
    }

    if (
      !product.price ||
      Number(product.price) <= 0
    ) {
      newErrors.price =
        "Price must be greater than 0";
    }

    if (
      product.quantity === "" ||
      Number(product.quantity) < 0
    ) {
      newErrors.quantity =
        "Quantity cannot be negative";
    }

    if (!product.image.trim()) {
      newErrors.image =
        "Image URL is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newProduct = {
      id: Date.now(),
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    setProducts([
      ...products,
      newProduct,
    ]);

    alert(
      "Product Added Successfully"
    );

    setProduct({
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      image: "",
      status: "Available",
    });
  };

  return (
    <div className="add-product-card">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />

          <p className="error">
            {errors.name}
          </p>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />

          <p className="error">
            {errors.description}
          </p>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">
              Select Category
            </option>
            <option value="Electronics">
              Electronics
            </option>
            <option value="Accessories">
              Accessories
            </option>
            <option value="Fashion">
              Fashion
            </option>
          </select>

          <p className="error">
            {errors.category}
          </p>
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />

          <p className="error">
            {errors.price}
          </p>
        </div>

        <div className="form-group">
          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />

          <p className="error">
            {errors.quantity}
          </p>
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />

          <p className="error">
            {errors.image}
          </p>
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={product.status}
            onChange={handleChange}
          >
            <option value="Available">
              Available
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>
          </select>
        </div>

        <button
          className="btn-buy"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;