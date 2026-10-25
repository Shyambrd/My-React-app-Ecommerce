import { useState } from "react";
import ProductList from "../components/ProductList";

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const products = [
    { id: 1, name: "Laptop", price: 50000, inStock: true },
    { id: 2, name: "Smartphone", price: 30000, inStock: false },
    { id: 3, name: "Headphones", price: 2000, inStock: true },
    { id: 4, name: "Keyboard", price: 1500, inStock: true },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
}
export default ProductSearch;
