
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Orders.css";

function Orders() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders] = useState(
        JSON.parse(localStorage.getItem("orders")) || []
    );

    return (
        <div>
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <main className="orders-content">
                    <h2>My Orders</h2>
                    <p className="orders-subtitle">View your recent orders</p>

                    {orders.length === 0 ? (
                        <div className="empty-orders">
                            <h3>No orders found</h3>
                            <p>Your placed orders will appear here.</p>
                        </div>
                    ) : (
                        <div className="orders-table-wrapper">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.customer.fullName}</td>
                                            <td>{order.date}</td>
                                            <td>₹{order.total.toFixed(2)}</td>
                                            <td>
                                                <span className="order-status">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="view-order-btn"
                                                    onClick={() => setSelectedOrder(order)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                    {selectedOrder && (
                        <div className="order-details">
                            <h2>Order Details</h2>

                            <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                            <p><strong>Customer:</strong> {selectedOrder.customer.fullName}</p>
                            <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                            <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
                            <p><strong>City:</strong> {selectedOrder.customer.city}</p>
                            <p><strong>Pincode:</strong> {selectedOrder.customer.pincode}</p>

                            <h3>Ordered Products</h3>

                            {selectedOrder.items.map((item) => (
                                <p key={item.id}>
                                    {item.title} × {item.quantity} — ₹
                                    {(item.price * item.quantity).toFixed(2)}
                                </p>
                            ))}

                            <h3>Total: ₹{selectedOrder.total.toFixed(2)}</h3>

                            <button
                                className="view-order-btn"
                                onClick={() => setSelectedOrder(null)}
                            >
                                Close Details
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Orders;
