import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cart, setCart }) {
  const [placed, setPlaced] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [couponCode, setCouponCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [orderId, setOrderId] =
    useState("");

  const coupons = {
    SAVE10: 10,
    SAVE20: 20,
    WELCOME50: 50,
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.cartQuantity,
    0
  );

  const total =
    subtotal - discount > 0
      ? subtotal - discount
      : 0;

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]:
        e.target.value,
    });
  };

const applyCoupon = () => {
  const couponPercent =
    coupons[couponCode.toUpperCase()];

  if (couponPercent) {
    let calculatedDiscount =
      Math.round(
        (subtotal * couponPercent) / 100
      );

    calculatedDiscount = Math.min(
      calculatedDiscount,
      500
    );

    setDiscount(calculatedDiscount);

    alert(
      `${couponPercent}% discount applied. You saved ₹${calculatedDiscount}`
    );
  } else {
    alert("Invalid Coupon Code");
  }
};

  const validateForm = () => {
    const emailRegex =
      /\S+@\S+\.\S+/;

    if (!customer.name.trim()) {
      return "Please enter your name";
    }

    if (
      !emailRegex.test(
        customer.email
      )
    ) {
      return "Please enter valid email";
    }

    if (
      customer.address.trim()
        .length < 10
    ) {
      return "Address must be at least 10 characters";
    }

    if (cart.length === 0) {
      return "Cart is empty";
    }

    return null;
  };

  const generateOrderId = () => {
    return (
      "ORD-" +
      Date.now() +
      "-" +
      Math.floor(
        Math.random() * 1000
      )
    );
  };

  const saveOrder = () => {
    const newOrderId =
      generateOrderId();

    const order = {
      orderId: newOrderId,
      customer,
      products: cart,
      subtotal,
      discount,
      total,
      paymentMethod,
      date:
        new Date().toLocaleString(),
    };

    const orders =
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...orders,
        order,
      ])
    );

    localStorage.removeItem(
      "cart"
    );

    setCart([]);

    setOrderId(newOrderId);

    setPlaced(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const error =
      validateForm();

    if (error) {
      alert(error);
      return;
    }

    saveOrder();
  };

  if (placed) {
    return (
      <div className="success-page">
        <h1>
          ✅ Order Placed Successfully
        </h1>

        <h3>
          Order ID: {orderId}
        </h3>

        <p>
          Thank you for shopping
          with us.
        </p>

        <div className="success-links">
          <Link to="/">
            Continue Shopping
          </Link>

          <Link to="/orders">
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-wrapper">

        {/* LEFT SIDE */}

        <form
          className="checkout-form"
          onSubmit={
            handlePlaceOrder
          }
        >
          <h3>
            Delivery Details
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={
              handleChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={customer.email}
            onChange={
              handleChange
            }
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={
              customer.address
            }
            onChange={
              handleChange
            }
          />

          <div className="payment-section">
            <h3>
              Payment Method
            </h3>

            <label className="payment-option">
              <input
                type="radio"
                value="COD"
                checked={
                  paymentMethod ===
                  "COD"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              Cash On Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                value="UPI"
                checked={
                  paymentMethod ===
                  "UPI"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              UPI Payment
            </label>

            <label className="payment-option">
              <input
                type="radio"
                value="CARD"
                checked={
                  paymentMethod ===
                  "CARD"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />
              Credit / Debit Card
            </label>
          </div>

          <button
            type="submit"
            className="checkout-btn"
          >
            Place Order
          </button>
        </form>

        {/* RIGHT SIDE */}

        <div className="order-summary">
          <h2>
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p>
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="order-item"
              >
                <span>
                  {item.name} ×{" "}
                  {
                    item.cartQuantity
                  }
                </span>

                <span>
                  ₹
                  {item.price *
                    item.cartQuantity}
                </span>
              </div>
            ))
          )}

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) =>
                setCouponCode(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className="apply-btn"
              onClick={
                applyCoupon
              }
            >
              Apply
            </button>
          </div>

          <div className="total-box">
            <p>
              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>
            </p>

            <p>
              <span>
                Discount
              </span>

              <span>
                -₹{discount}
              </span>
            </p>

            <h2>
              <span>
                Total
              </span>

              <span>
                ₹{total}
              </span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;