import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/api";
import { useEffect, useState } from "react";

export default function ProductListing() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProducts(24, 0).then(res => setItems(res.data ?? [])).catch(() => setItems([]));
  }, []);

  return (
    <div className="app-container mt-10">
      <h1 className="text-2xl font-semibold mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.length ? items.map(p => <ProductCard key={p.article_id} product={p} />)
         : Array.from({length:12}).map((_,i)=>(<div key={i} className="card-neutral p-4"><div className="h-44 bg-gray-50 animate-pulse rounded-md"></div></div>))}
      </div>
    </div>
  );
}
