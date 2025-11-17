export default function ReviewItem({ review }) {
  return (
    <div className="border p-4 rounded mb-2">
      <p className="font-bold">{review.customer_id}</p>
      <p>Rating: {review.rating} / 5</p>
      <p>{review.review_text}</p>
      <p className="text-gray-500 text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
    </div>
  );
}
