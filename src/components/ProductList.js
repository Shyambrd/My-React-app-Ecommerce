import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
export default ProductList;
