import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchProducts().then(res => {
      const filtered = res.data.filter(p =>
        p.prod_name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }).catch(err => console.error(err));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {/* Render your results here */}
    </div>
  );
}
