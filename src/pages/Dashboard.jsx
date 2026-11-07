
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { useState, useEffect } from "react";

function Dashboard() {

    const [totalProducts, setTotalProducts] = useState(0);
    const [cartItems, setCartItems] = useState(0);
    const [cartValue, setCartValue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        // Get total products from API
        fetch("https://dummyjson.com/products?limit=1")
            .then((res) => res.json())
            .then((data) => setTotalProducts(data.total))
            .catch((error) => console.log(error));

        // Get cart data from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const quantity = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const value = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        setCartItems(quantity);
        setCartValue(value);

        // Get orders from localStorage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        setTotalOrders(orders.length);
    }, []);

    const cards = [
        { title: "Total Products", value: totalProducts },
        { title: "Cart Items", value: cartItems },
        { title: "Total Cart Value", value: `₹${cartValue.toFixed(2)}` },
        { title: "Total Orders", value: totalOrders }
    ];

    const activities = [
        "Welcome to ShopAdmin!",
        "Your dashboard is ready.",
        "Start adding products to your cart."
    ];

    return (
        <div>
            <Header />

            <div className="dashboard-layout">
                <Sidebar />

                <main className="dashboard-content">

                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's your overview.</p>

                    <div className="dashboard-cards">

                        {cards.map((card, index) => (
                            <div className="dashboard-card" key={index}>
                                <h3>{card.title}</h3>
                                <h2>{card.value}</h2>
                            </div>
                        ))}

                    </div>

                    <div className="activity-section">
                        <h2>Recent Activity</h2>

                        {activities.map((activity, index) => (
                            <p key={index}>{activity}</p>
                        ))}

                    </div>

                </main>
            </div>
        </div>
    );
}

export default Dashboard;
