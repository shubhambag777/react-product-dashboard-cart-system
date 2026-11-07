
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Fetch products from API
  useEffect(() => {

    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong!");
        setLoading(false);
      });

  }, []);

  // Add product to cart
  function handleAddToCart(product) {

    const updatedCart = [
      ...cart,
      { ...product, quantity: 1 }
    ];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  }

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  // Search, filter and sort
  let filteredProducts = products.filter((product) => {

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Check whether product is already added
  function isProductAdded(productId) {
    return cart.some((item) => item.id === productId);
  }

  return (
    <div>
      <Header />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="products-content">

          <h1>Products</h1>
          <p>Explore and manage your products.</p>

          {/* Search, Filter and Sort */}
          <div className="product-controls">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default Sorting</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

          </div>

          {/* Loading */}
          {loading && <h3>Loading products...</h3>}

          {/* Error */}
          {error && <h3>{error}</h3>}

          {/* Product Grid */}
          {!loading && !error && (

            <div className="products-grid">

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    isAdded={isProductAdded(product.id)}
                    onAddToCart={handleAddToCart}
                  />

                ))

              ) : (

                <h3>No products found.</h3>

              )}

            </div>

          )}

        </main>
      </div>
    </div>
  );
}

export default Products;
