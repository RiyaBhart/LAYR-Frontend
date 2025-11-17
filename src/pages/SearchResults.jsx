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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-3 gap-6">
        {results.length ? results.map(p => <ProductCard key={p.article_id} product={p} />) 
                         : <p>No products found.</p>}
      </div>
    </div>
  );
}
