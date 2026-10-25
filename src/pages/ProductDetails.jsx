import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <div className="details-container">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
  };

  return (
    <div className="details-container">
      <div className="details-card">
        
        <div className="details-image-wrapper">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="details-image"
            />
          )}
        </div>

        <div className="details-info">
          <h1>{product.name}</h1>
          <h1>{product.description}</h1>

          <h2 className="details-price">
            ₹{product.price}
          </h2>

          <p
            className={
              product.status === "Available"
                ? "available"
                : "out-of-stock"
            }
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
            <strong>Quantity:</strong>{" "}
            {product.quantity}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{product.description}</p>

          <div className="details-buttons">
            <button
              className="btn-cart"
              onClick={() => addToCart(product)}
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

          <Link to="/products">
            <button className="btn-details">
              Back To Products
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;