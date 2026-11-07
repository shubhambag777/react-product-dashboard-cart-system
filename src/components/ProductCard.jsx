import { useNavigate } from "react-router-dom";
function ProductCard({ product, isAdded, onAddToCart }) {
    const navigate = useNavigate();
    return (
        <div className="product-card">

            <img
                src={product.thumbnail}
                alt={product.title}
            />

            <div className="product-info">

                <h3>{product.title}</h3>

                <p className="category">
                    {product.category}
                </p>

                <h2>₹{product.price}</h2>

                <p>⭐ {product.rating}</p>

                <p>
                    {product.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                </p>

                <button
                    onClick={() => onAddToCart(product)}
                    disabled={isAdded || product.stock === 0}
                >
                    {isAdded ? "Already Added" : "Add to Cart"}
                </button>
                
                <button
                    onClick={() => navigate(`/products/${product.id}`)}
                >
                    View Details
                </button>

            </div>
        </div>
    );
}

export default ProductCard;
