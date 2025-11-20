import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchProductsWithSales } from "../api/api";
import { useEffect, useState } from "react";

export default function ProductListing() {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);

    if (adminStatus) {
      // Load products with sales data for admin
      fetchProductsWithSales(100, 0).then(res => setItems(res.data ?? [])).catch(() => setItems([]));
    } else {
      // Load regular products for customers
      fetchProducts(24, 0).then(res => setItems(res.data ?? [])).catch(() => setItems([]));
    }
  }, []);

  if (isAdmin) {
    // Admin view with table showing name, price, quantity, and sold
    return (
      <div className="app-container mt-10">
        <h1 className="text-2xl font-semibold mb-6">Shop - Admin View</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Product Name</th>
                <th className="border border-gray-300 p-3 text-left">Price</th>
                <th className="border border-gray-300 p-3 text-left">Quantity (Stock)</th>
                <th className="border border-gray-300 p-3 text-left">Sold</th>
                <th className="border border-gray-300 p-3 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {items.length ? items.map((product) => (
                <tr key={product.article_id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{product.prod_name || 'N/A'}</td>
                  <td className="border border-gray-300 p-3">${product.price?.toFixed(2) || '0.00'}</td>
                  <td className="border border-gray-300 p-3">{product.stock || 0}</td>
                  <td className="border border-gray-300 p-3">{product.total_sold || 0}</td>
                  <td className="border border-gray-300 p-3">
                    <img
                      src={`/products/${product.image || 'placeholder.jpg'}`}
                      alt={product.prod_name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/products/placeholder.jpg";
                      }}
                    />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="border border-gray-300 p-3 text-center">Loading products...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Regular customer view
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
