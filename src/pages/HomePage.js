// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import ProductList from "../components/ProductList";
// import { useState } from "react";

// function HomePage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const products = [
//     { id: 1, name: "Laptop", price: 50000, inStock: true },
//     { id: 2, name: "Smartphone", price: 30000, inStock: false },
//     { id: 3, name: "Headphones", price: 2000, inStock: true },
//     { id: 4, name: "Keyboard", price: 1500, inStock: true },
//      { id: 5, name: "Smart TV", price: 70000, inStock: true },
//   ];

//   // ✅ Filter products by search term
//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Header />
//       <main style={{ padding: "20px" }}>
//         <h1>Welcome to E-Commerce Product Management Portal</h1>
//         <p> products and manage easily.</p>

//         {/* ✅ Search Box at the Top */}
//         <input
//           type="text"
//           placeholder="Search product..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{padding: "8px", marginBottom: "20px", width: "250px" , }}
//         />

//         {/* ✅ Product List */}
//         <ProductList products={filteredProducts} />
//       </main>
//       <Footer />
//     </div>
//   );
// }
// export default HomePage;

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { useState } from "react";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const products = [
    { id: 1, name: "Laptop", price: 50000, inStock: true, category: "Electronics" },
    { id: 2, name: "Smartphone", price: 30000, inStock: false, category: "Electronics" },
    { id: 3, name: "Headphones", price: 2000, inStock: true, category: "Accessories" },
    { id: 4, name: "Keyboard", price: 1500, inStock: true, category: "Accessories" },
    { id: 5, name: "Shoes", price: 2500, inStock: true, category: "Fashion" },
    { id: 6, name: "T-Shirt", price: 800, inStock: true, category: "Fashion" },
  ];

  // ✅ Filter by search + category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <h1>Welcome to E-Commerce Product Management Portal</h1>
        
        <p>Browse products and manage inventory easily.</p>

        {/* ✅ Search + Category Filter */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        {/* ✅ Product List */}
        <ProductList products={filteredProducts} />
      </main>
      <Footer />
    </div>
  );
}
export default HomePage;

