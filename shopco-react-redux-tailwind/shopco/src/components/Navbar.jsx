import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice.js';
import { selectCurrentUser, logout } from '../store/authSlice.js';
import { fetchSearchSuggestions } from '../store/productsSlice.js';
import shopcoLogo from '../assets/icons/SHOP.CO.svg';

const NAV_LINKS = [
  { label: 'Shop', to: '/category/tops' },
  { label: 'On Sale', to: '/category/mens-shirts' },
  { label: 'New Arrivals', to: '/' },
  { label: 'Brands', to: '/' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectCurrentUser);
  const suggestions = useSelector((s) => s.products.suggestions);
  const suggestionsStatus = useSelector((s) => s.products.suggestionsStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const accountRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced live search-as-you-type
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestionsOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      dispatch(fetchSearchSuggestions(query));
      setSuggestionsOpen(true);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, dispatch]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSuggestionsOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestionsOpen(false);
    }
  }

  function goToProduct(id) {
    setSuggestionsOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="container-x flex items-center justify-between gap-6 py-5">
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M0 1h22M0 8h22M0 15h22" stroke="black" strokeWidth="1.5" />
          </svg>
        </button>

        <Link to="/" className="shrink-0">
          <img src={shopcoLogo} alt="SHOP.CO" className="h-6 w-auto sm:h-7" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className="hover:opacity-60">
              {link.label}
            </Link>
          ))}
        </nav>

        <div ref={searchRef} className="relative hidden md:block flex-1 max-w-md">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="11" cy="11" r="7" stroke="#00000080" strokeWidth="2" />
              <path d="m21 21-3.5-3.5" stroke="#00000080" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim() && setSuggestionsOpen(true)}
              placeholder="Search for products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSuggestionsOpen(false);
                }}
                className="text-black/40 hover:text-black"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </form>

          {suggestionsOpen && (
            <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-lg">
              {suggestionsStatus === 'loading' && (
                <p className="px-4 py-3 text-sm text-black/40">Searching…</p>
              )}
              {suggestionsStatus === 'succeeded' && suggestions.length === 0 && (
                <p className="px-4 py-3 text-sm text-black/40">No products found for "{query}"</p>
              )}
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => goToProduct(p.id)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
                >
                  <img src={p.thumbnail} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex-1 truncate text-sm">{p.title}</span>
                  <span className="text-sm font-medium">${p.price}</span>
                </button>
              ))}
              {suggestions.length > 0 && (
                <button
                  onClick={handleSearch}
                  className="w-full border-t border-black/10 px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50"
                >
                  See all results for "{query}" →
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2m6 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div ref={accountRef} className="relative hidden sm:block">
            {user ? (
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2"
                aria-label="Account menu"
              >
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="h-8 w-8 rounded-full object-cover border border-black/10"
                />
              </button>
            ) : (
              <button onClick={() => setAccountOpen((v) => !v)} aria-label="Account">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="1.5" />
                  <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}

            {accountOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 w-48 rounded-2xl border border-black/10 bg-white p-2 shadow-lg">
                {user ? (
                  <>
                    <p className="px-3 py-2 text-sm">
                      <span className="block font-semibold">{user.firstName} {user.lastName}</span>
                      <span className="block text-black/50 truncate">{user.email}</span>
                    </p>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setAccountOpen(false);
                        navigate('/');
                      }}
                      className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="container-x pb-4 md:hidden">
        <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="11" cy="11" r="7" stroke="#00000080" strokeWidth="2" />
            <path d="m21 21-3.5-3.5" stroke="#00000080" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
          />
        </form>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-black/10 px-4 py-3 flex flex-col gap-3 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <hr className="border-black/10" />
          {user ? (
            <>
              <span className="text-black/50">Signed in as {user.firstName}</span>
              <button
                onClick={() => {
                  dispatch(logout());
                  setMenuOpen(false);
                }}
                className="text-left"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Create Account</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
