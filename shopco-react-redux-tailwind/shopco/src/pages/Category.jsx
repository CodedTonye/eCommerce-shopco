import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProducts } from '../store/productsSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';

const PAGE_SIZE = 9;
const SORT_OPTIONS = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Newest'];

function titleCase(slug = '') {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { items, total, status } = useSelector((s) => s.products.category);
  const { sortBy, order, priceMin, priceMax } = useSelector((s) => s.filters);

  const [page, setPage] = useState(1);
  const [sortLabel, setSortLabel] = useState('Most Popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => setPage(1), [category]);

  useEffect(() => {
    dispatch(
      fetchCategoryProducts({
        category,
        limit: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        sortBy,
        order,
      })
    );
  }, [dispatch, category, page, sortBy, order]);

  const filteredItems = items.filter((p) => p.price >= priceMin - 50 && p.price <= priceMax + 50);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="container-x py-8">
      <p className="text-xs text-black/50">
        <Link to="/">Home</Link> / {titleCase(category)}
      </p>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="rounded-2xl border border-black/10 p-5">
            <FilterSidebar />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-h2-sm sm:text-h2">{titleCase(category)}</h1>
            <button
              className="rounded-full border border-black/20 px-4 py-2 text-sm lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-black/50">
            <span>
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}-{Math.min(page * PAGE_SIZE, total)} of{' '}
              {total} Products
            </span>
            <select
              value={sortLabel}
              onChange={(e) => setSortLabel(e.target.value)}
              className="rounded-full border border-black/10 bg-transparent px-3 py-1.5 outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3">
            {status === 'loading' &&
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-2xl bg-gray-100" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-gray-100" />
                </div>
              ))}
            {status === 'succeeded' &&
              filteredItems.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {status === 'succeeded' && filteredItems.length === 0 && (
            <p className="mt-10 text-center text-black/50">No products match these filters.</p>
          )}

          <div className="mt-10 flex items-center justify-between text-sm">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="disabled:opacity-30"
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-8 w-8 rounded-full ${page === i + 1 ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto h-full w-80 overflow-y-auto bg-white p-5">
            <FilterSidebar onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
