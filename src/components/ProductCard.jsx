import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="card">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      )}

      <h2>{product.name}</h2>
      <h2>{product.description}</h2>

      <p className="price">
        <h3>₹{product.price}</h3>
      </p>

      <p
        style={{
          color:
            product.status === "Available"
              ? "green"
              : "red",
          fontWeight: "bold",
        }}
      >
        {product.status === "Available"
          ? "Available ✅"
          : "Out of Stock ❌"}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {product.category}
      </p>

      <p>
        <strong>Stock:</strong>{" "}
        {product.quantity}
      </p>

 <Link to={`/products/${product.id}`}>
  <button className="btn-details">
    View Details
  </button>
</Link>
 <div className="action-buttons">
  <button
    className="btn-cart"
    onClick={handleAddToCart}
  >
    Add To Cart
  </button>

  <button
    className="btn-buy"
    onClick={handleBuyNow}
  >
    Buy Now
  </button>
</div>


    </div>
  );
}

export default ProductCard;