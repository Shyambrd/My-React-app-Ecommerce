import { Link } from "react-router-dom";

function OrderSuccess() {
  return (<div className="success-page">
  <h1>
    ✅ Order Placed Successfully
  </h1>

  <h3>
    Order ID: {orderId}
  </h3>

  <p>
    Thank you for shopping with us.
  </p>

  <div className="success-links">
    <Link to="/">
      Continue Shopping
    </Link>

    <Link to="/orders">
      View Orders
    </Link>
  </div>
</div>);
}

export default OrderSuccess;