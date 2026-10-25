import { useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Product.css";

function Products({
  products,
  setProducts,
  addToCart,
}) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const updateQuantity = (id) => {
    const updatedProducts = products.map(
      (product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                product.quantity + 1,
            }
          : product
    );

    setProducts(updatedProducts);
  };

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="products-page">
      <h1>Products</h1>

      <div className="filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="All">
            All Categories
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
      </div>

      <div className="products-grid">
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              updateQuantity={
                updateQuantity
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default Products;