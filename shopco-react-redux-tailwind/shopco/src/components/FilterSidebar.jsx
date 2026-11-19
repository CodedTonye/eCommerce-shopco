import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPriceRange, toggleColor, toggleSize, resetFilters } from '../store/filtersSlice.js';
import { DRESS_STYLE_CATEGORY_MAP } from '../store/productsSlice.js';

const CATEGORY_LINKS = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
const COLOR_SWATCHES = [
  '#22c55e', '#ef4444', '#eab308', '#f97316', '#38bdf8',
  '#2563eb', '#7c3aed', '#ec4899', '#ffffff', '#000000',
];
const SIZE_OPTIONS = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
const DRESS_STYLES = ['Casual', 'Formal', 'Party', 'Gym'];

export default function FilterSidebar({ onApply, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector((s) => s.filters);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">✕</button>
        )}
      </div>

      <div className="mt-4 space-y-3 border-b border-black/10 pb-4 text-sm">
        {CATEGORY_LINKS.map((c) => (
          <div key={c} className="flex items-center justify-between text-black/70 hover:text-black cursor-pointer">
            <span>{c}</span>
            <span>›</span>
          </div>
        ))}
      </div>

      <div className="border-b border-black/10 py-4">
        <p className="font-semibold text-sm">Price</p>
        <input
          type="range"
          min="0"
          max="300"
          value={filters.priceMax}
          onChange={(e) => dispatch(setPriceRange({ min: filters.priceMin, max: Number(e.target.value) }))}
          className="mt-3 w-full accent-black"
        />
        <div className="mt-1 flex justify-between text-xs text-black/50">
          <span>${filters.priceMin}</span>
          <span>${filters.priceMax}</span>
        </div>
      </div>

      <div className="border-b border-black/10 py-4">
        <p className="font-semibold text-sm">Colors</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c}
              onClick={() => dispatch(toggleColor(c))}
              className={`h-7 w-7 rounded-full border ${filters.colors.includes(c) ? 'ring-2 ring-black ring-offset-2' : 'border-black/10'}`}
              style={{ backgroundColor: c }}
              aria-label={`color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="border-b border-black/10 py-4">
        <p className="font-semibold text-sm">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => dispatch(toggleSize(s))}
              className={`rounded-full px-3 py-1.5 text-xs ${
                filters.sizes.includes(s) ? 'bg-black text-white' : 'bg-gray-100 text-black/70'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="py-4">
        <p className="font-semibold text-sm">Dress Style</p>
        <div className="mt-3 space-y-3 text-sm">
          {DRESS_STYLES.map((d) => (
            <div
              key={d}
              onClick={() => navigate(`/category/${DRESS_STYLE_CATEGORY_MAP[d.toLowerCase()]}`)}
              className="flex items-center justify-between text-black/70 hover:text-black cursor-pointer"
            >
              <span>{d}</span>
              <span>›</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          onApply?.();
          onClose?.();
        }}
        className="pill-btn mt-2 w-full bg-black text-white"
      >
        Apply Filter
      </button>
      <button
        onClick={() => dispatch(resetFilters())}
        className="mt-2 w-full text-center text-xs text-black/50 underline"
      >
        Reset filters
      </button>
    </div>
  );
}
