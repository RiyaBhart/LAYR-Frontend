import { Link } from "react-router-dom";
import SettingsIcon from "./SettingsIcon"; // Adjust path as needed

export default function ProductCard({ product, isAdmin }) {
  console.log("ProductCard received:", product); // Debug

  return (
    <Link to={`/product/${product.article_id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-xl p-4 transition-all duration-300 group-hover:shadow-lg">

        {/* Image box */}
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center relative">
          <img
            src={`/products/${product.image}`}
            alt={product.prod_name}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.log("Failed to load image:", `/products/${product.image}`);
              e.target.src = "/products/placeholder.jpg";
            }}
          />
        </div>

        {/* Product text */}
        <div className="mt-4 text-center">
          <h4 className="text-sm font-medium text-gray-800">
            {product.prod_name}
          </h4>

          <p className="text-gray-500 text-sm mt-1">
            ${product.price ?? "0.00"}
          </p>
        </div>

        {isAdmin && (
          <button className="settings-btn">
            <SettingsIcon />
          </button>
        )}
      </div>
    </Link>
  );
}
