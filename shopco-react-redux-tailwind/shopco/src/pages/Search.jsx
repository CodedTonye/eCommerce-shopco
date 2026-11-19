import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProducts } from '../store/productsSlice.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const dispatch = useDispatch();
  const { items, total, status, query } = useSelector((s) => s.products.search);

  useEffect(() => {
    if (q.trim()) dispatch(fetchSearchProducts({ q }));
    window.scrollTo(0, 0);
  }, [dispatch, q]);

  return (
    <div className="container-x py-8">
      <p className="text-xs text-black/50">
        <Link to="/">Home</Link> / Search
      </p>
      <h1 className="mt-4 font-display text-h3">Search results for "{q}"</h1>
      {status === 'succeeded' && (
        <p className="mt-1 text-sm text-black/50">
          {total} {total === 1 ? 'product' : 'products'} found
        </p>
      )}

      {status === 'loading' && (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-2xl bg-gray-100" />
              <div className="mt-3 h-4 w-3/4 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {status === 'succeeded' && items.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-black/50">
            No products matched "{query}". Try a different search term like "shirt", "shoes" or "bag".
          </p>
          <Link to="/category/tops" className="pill-btn mt-4 inline-block bg-black text-white">
            Browse All Products
          </Link>
        </div>
      )}

      {status === 'succeeded' && items.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {status === 'failed' && (
        <p className="mt-8 text-center text-red-500">
          Something went wrong searching. Please try again.
        </p>
      )}
    </div>
  );
}
