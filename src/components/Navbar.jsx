import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setShowSearch(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="app-container flex items-center justify-between py-4">
        {/* LEFT LINKS */}
        <div className="flex items-center space-x-6 text-sm text-brand-600">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/products" className="hover:text-black">Shop</Link>
          <Link to="/blog" className="hover:text-black">Blog</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>
        </div>

        {/* CENTER LOGO */}
        <div className="text-2xl font-semibold text-gray-900">
          <Link to="/">LAYR<span className="text-brand-600">.</span></Link>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-4 relative">
          {/* search icon toggles a small search dropdown */}
          <button
            onClick={() => setShowSearch(prev => !prev)}
            className="text-gray-600 hover:text-black p-2 rounded"
            aria-label="Search"
          >
            🔍
          </button>

          {showSearch && (
            <form onSubmit={handleSearch} className="absolute top-12 right-0 bg-white border rounded-md shadow p-3 w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 rounded text-sm"
                placeholder="Search products..."
                aria-label="Search input"
              />
            </form>
          )}

          <Link to="/wishlist" className="text-gray-600 hover:text-black p-2">♡</Link>
          <Link to="/profile" className="text-gray-600 hover:text-black p-2">👤</Link>
          <Link to="/cart" className="text-gray-600 hover:text-black p-2 text-lg">🛒</Link>
        </div>
      </div>
    </header>
  );
}
