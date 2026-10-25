import { Link } from "react-router-dom";
import "./AdminD.css";
import React from "react";


function OrderHistory() {
  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  return (
    <div className="orders-page">
      <h1 className="orders-title">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="no-orders">
          No Orders Found
        </p>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order.orderId}
          >
            <div className="order-header">
              <div>
                <div className="order-id">
                  {order.orderId}
                </div>

                <div className="order-date">
                  {order.date}
                </div>
              </div>

              <div className="order-total">
                ₹{order.total}
              </div>
            </div>

            <div className="payment-badge">
              {order.paymentMethod}
            </div>

            <div className="order-products">
              {order.products.map(
                (product) => (
                  <div
                    className="order-product"
                    key={product.id}
                  >
                    <span>
                      {product.name}
                    </span>

                    <span>
                      Qty:
                      {" "}
                      {
                        product.cartQuantity
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;