import "./AdminD.css"


function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.cartQuantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );

  const handleCheckout = () => {
    alert(
      `Order placed successfully!\nTotal Items: ${totalItems}\nTotal Amount: ₹${total}`
    );
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <div className="cart-product">
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/120"
                  }
                  alt={item.name}
                  className="cart-image"
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    Category:
                    {item.category}
                  </p>

                  <p>
                    Price: ₹{item.price}
                  </p>

                  <p
                    style={{
                      color:
                        item.status ===
                        "Available"
                          ? "green"
                          : "red",
                    }}
                  >
                    {item.status}
                  </p>
                </div>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    decreaseQuantity(
                      item.id
                    )
                  }
                >
                  -
                </button>

                <span>
                  {item.cartQuantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(
                      item.id
                    )
                  }
                >
                  +
                </button>
              </div>

              <div className="item-total">
                ₹
                {item.price *
                  item.cartQuantity}
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCart(
                    item.id
                  )
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <p>
              Total Items:
              <strong>
                {" "}
                {totalItems}
              </strong>
            </p>

            <p>
              Cart Total:
              <strong>
                {" "}
                ₹{total}
              </strong>
            </p>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;