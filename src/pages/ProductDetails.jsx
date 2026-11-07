
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return <h2>Loading product details...</h2>;
  }

  if (!product || !product.id) {
    return <h2>Product not found.</h2>;
  }

  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const isAdded = cart.some((item) => item.id === product.id);

  // Add product to cart
  function handleAddToCart() {

    if (isAdded) return;

    const updatedCart = [
      ...cart,
      { ...product, quantity: 1 }
    ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/products");
  }

  return (
    <div>
      <Header />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="products-content">

          <button onClick={() => navigate("/products")}>
            ← Back to Products
          </button>

          <div className="details-container">

            <div className="details-image">
              <img src={product.thumbnail} alt={product.title} />
            </div>

            <div className="details-info">

              <h1>{product.title}</h1>

              <p>Category: {product.category}</p>

              <h2>₹{product.price}</h2>

              <p>⭐ {product.rating} / 5</p>

              <p>
                Availability: {product.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>

              <h3>Description</h3>

              <p>{product.description}</p>

              <button
                onClick={handleAddToCart}
                disabled={isAdded || product.stock === 0}
              >
                {isAdded ? "Already in Cart" : "Add to Cart"}
              </button>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default ProductDetails;
