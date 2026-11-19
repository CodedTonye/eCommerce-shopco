import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchRelatedProducts } from '../store/productsSlice.js';
import { addToCart } from '../store/cartSlice.js';
import StarRating from '../components/StarRating.jsx';
import ProductCard, { discountedPrice } from '../components/ProductCard.jsx';

const COLORS = ['#4B3B2A', '#2F4132', '#2A3A4B'];
const SIZES = ['Small', 'Medium', 'Large', 'X-Large'];
const TABS = ['Product Details', 'Rating & Reviews', 'FAQs'];

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, currentStatus, related } = useSelector((s) => s.products);

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState('Large');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(TABS[1]);
  const [reviewCount, setReviewCount] = useState(4);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
    setActiveImage(0);
    setAdded(false);
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (current?.category) {
      dispatch(fetchRelatedProducts({ category: current.category, excludeId: current.id }));
    }
  }, [dispatch, current?.category, current?.id]);

  if (currentStatus === 'loading' || !current) {
    return <div className="container-x py-20 text-center text-black/50">Loading product…</div>;
  }

  const hasDiscount = current.discountPercentage > 1;
  const finalPrice = hasDiscount
    ? discountedPrice(current.price, current.discountPercentage)
    : current.price;
  const images = current.images?.length ? current.images : [current.thumbnail];
  const reviews = current.reviews || [];

  function handleAddToCart() {
    dispatch(
      addToCart({
        id: current.id,
        title: current.title,
        price: finalPrice,
        thumbnail: current.thumbnail,
        size,
        color,
        qty,
      })
    );
    setAdded(true);
  }

  return (
    <div className="container-x py-8">
      <p className="text-xs text-black/50">
        <Link to="/">Home</Link> / <Link to="/category/tops">Shop</Link> / {current.category}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {images.slice(0, 3).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-20 overflow-hidden rounded-xl border ${
                  activeImage === i ? 'border-black' : 'border-black/10'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl bg-gray-100">
            <img src={images[activeImage]} alt={current.title} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-h3 uppercase sm:text-h2-sm">{current.title}</h1>
          <StarRating rating={current.rating} size="text-base" />
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-semibold">${finalPrice.toFixed(0)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-black/40 line-through">${current.price.toFixed(0)}</span>
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">
                  -{Math.round(current.discountPercentage)}%
                </span>
              </>
            )}
          </div>
          <p className="mt-4 text-sm text-black/60">{current.description}</p>

          <hr className="my-5 border-black/10" />

          <p className="text-sm text-black/60">Select Colors</p>
          <div className="mt-2 flex gap-3">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="h-8 w-8 rounded-full border-2"
                style={{ backgroundColor: c, borderColor: color === c ? '#000' : 'transparent' }}
                aria-label={`Color ${c}`}
              >
                {color === c && <span className="block text-center text-white">✓</span>}
              </button>
            ))}
          </div>

          <hr className="my-5 border-black/10" />

          <p className="text-sm text-black/60">Choose Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full px-4 py-2 text-sm ${
                  size === s ? 'bg-black text-white' : 'bg-gray-100 text-black/70'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <hr className="my-5 border-black/10" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-center gap-4 rounded-full bg-gray-100 px-4 py-3">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-1 text-lg">
                −
              </button>
              <span className="w-4 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-1 text-lg">
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="pill-btn flex-1 bg-black text-white hover:bg-black/80"
            >
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-8 border-b border-black/10 text-sm text-black/50">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 pb-3 ${
                tab === t ? 'border-black font-semibold text-black' : 'border-transparent'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Product Details' && (
          <div className="mt-6 max-w-2xl text-sm text-black/70 space-y-2">
            <p>{current.description}</p>
            <p><span className="font-medium text-black">Brand:</span> {current.brand || 'Shop.co'}</p>
            <p><span className="font-medium text-black">Warranty:</span> {current.warrantyInformation}</p>
            <p><span className="font-medium text-black">Shipping:</span> {current.shippingInformation}</p>
          </div>
        )}

        {tab === 'Rating & Reviews' && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">All Reviews ({reviews.length})</p>
              <button className="pill-btn border border-black/20 px-5 py-2 text-sm">Write a Review</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {reviews.slice(0, reviewCount).map((r, i) => (
                <div key={i} className="rounded-2xl border border-black/10 p-5">
                  <StarRating rating={r.rating} showValue={false} />
                  <p className="mt-2 flex items-center gap-1 font-semibold">
                    {r.reviewerName} <span className="text-green-500 text-xs">✓</span>
                  </p>
                  <p className="mt-1 text-sm text-black/60">"{r.comment}"</p>
                  <p className="mt-2 text-xs text-black/40">
                    Posted on {new Date(r.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            {reviewCount < reviews.length && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setReviewCount((c) => c + 4)}
                  className="pill-btn border border-black/20 px-8 py-2.5 text-sm"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        )}

        {tab === 'FAQs' && (
          <div className="mt-6 max-w-2xl text-sm text-black/70">
            <p>Return policy: {current.returnPolicy}</p>
            <p className="mt-2">Minimum order quantity: {current.minimumOrderQuantity}</p>
            <p className="mt-2">Availability: {current.availabilityStatus}</p>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center font-display text-h2-sm sm:text-h2">YOU MIGHT ALSO LIKE</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
