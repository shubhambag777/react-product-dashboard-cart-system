
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [success, setSuccess] = useState("");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Calculate order amount
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.10;
  const tax = (subtotal - discount) * 0.05;
  const finalTotal = subtotal - discount + tax;

  // Place order
  function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: formData,
      items: cart,
      subtotal: subtotal,
      discount: discount,
      tax: tax,
      total: finalTotal,
      date: new Date().toLocaleDateString(),
      status: "Pending"
    };

    // Get previous orders
    const previousOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Save new order
    const updatedOrders = [...previousOrders, order];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Clear cart
    localStorage.removeItem("cart");

    setSuccess("Order placed successfully!");
  }

  return (
    <div>
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="checkout-content">

          <h1>Checkout</h1>
          <p>Enter your details to complete your order.</p>

          {success ? (

            <div className="success-message">
              <h2>{success}</h2>
              <p>Thank you for shopping with ShopAdmin!</p>

              <button onClick={() => navigate("/orders")}>
                View Orders
              </button>
            </div>

          ) : (

            <div className="checkout-layout">

              {/* Customer Form */}
              <form
                className="checkout-form"
                onSubmit={handleSubmit}
              >

                <h2>Customer Information</h2>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    title="Enter a 10 digit phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    pattern="[0-9]{6}"
                    title="Enter a 6 digit pincode"
                    required
                  />
                </div>

                <button type="submit" className="place-order-button">
                  Place Order
                </button>

                <button
                  type="button"
                  className="back-cart-button"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </button>

              </form>

              {/* Order Summary */}
              <div className="checkout-summary">

                <h2>Order Summary</h2>

                {cart.map((item) => (
                  <div className="checkout-item" key={item.id}>
                    <span>{item.title} × {item.quantity}</span>
                    <span>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <hr />

                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>Discount: -₹{discount.toFixed(2)}</p>
                <p>Tax: ₹{tax.toFixed(2)}</p>

                <h3>Final Amount: ₹{finalTotal.toFixed(2)}</h3>

              </div>

            </div>

          )}

        </main>
      </div>
    </div>
  );
}

export default Checkout;
