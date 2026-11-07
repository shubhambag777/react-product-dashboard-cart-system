
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Cart.css";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Update cart and localStorage
  function updateCart(updatedCart) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Increase quantity
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );

    updateCart(updatedCart);
  }

  // Remove product
  function removeProduct(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  }

  // Calculate cart amount
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.10;
  const tax = (subtotal - discount) * 0.05;
  const finalTotal = subtotal - discount + tax;

  return (
    <div>
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="cart-content">

          <h1>Shopping Cart</h1>
          <p>Manage your selected products.</p>

          {cart.length === 0 ? (

            <div className="empty-cart">
              <h2>Your cart is empty.</h2>

              <button onClick={() => navigate("/products")}>
                Continue Shopping
              </button>
            </div>

          ) : (

            <div className="cart-layout">

              {/* Cart Products */}
              <div className="cart-items">

                {cart.map((item) => (

                  <div className="cart-item" key={item.id}>

                    <img src={item.thumbnail} alt={item.title} />

                    <div className="cart-item-info">

                      <h3>{item.title}</h3>

                      <p>₹{item.price}</p>

                      <div className="quantity-controls">

                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>

                      </div>

                      <p>
                        Item Total: ₹{item.price * item.quantity}
                      </p>

                      <button
                        className="remove-button"
                        onClick={() => removeProduct(item.id)}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              {/* Cart Summary */}
              <div className="cart-summary">

                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Discount (10%)</span>
                  <span>- ₹{discount.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <hr />

                <div className="summary-row final-total">
                  <span>Final Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>

                <button
                  className="checkout-button"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>

                <button
                  className="continue-button"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>

              </div>

            </div>

          )}

        </main>
      </div>
    </div>
  );
}

export default Cart;
