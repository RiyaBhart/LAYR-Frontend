import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchReviewsByProduct } from "../api/api";
import ReviewItem from "../components/ReviewItem";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProductById(id).then(res => setProduct(res.data)).catch(err => console.error(err));
    fetchReviewsByProduct(id).then(res => setReviews(res.data)).catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="app-container py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="w-full">
          <div className="w-full aspect-square max-h-[70vh] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
            <img
              src={`/products/${product.image || 'placeholder.jpg'}`}
              alt={product.prod_name}
              className="absolute inset-0 w-full h-full object-contain"
              onError={(e) => {
                e.target.src = '/products/placeholder.jpg';
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{product.prod_name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price}</p>
          <p className="mb-2 text-gray-600">Stock: <span className="font-medium">{product.stock}</span></p>
          <p className="mb-6 text-gray-600">Category: <span className="font-medium">{product.product_group_name}</span></p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Reviews</h2>
        {reviews.length ? reviews.map(r => <ReviewItem key={r.review_id} review={r} />) : <p className="text-gray-600">No reviews yet.</p>}
      </div>
    </div>
  );
}
