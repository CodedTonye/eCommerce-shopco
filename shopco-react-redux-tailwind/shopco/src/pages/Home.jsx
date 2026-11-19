import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHomeProducts } from '../store/productsSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import BrandStrip from '../components/BrandStrip.jsx';
import heroImg from '../assets/images/hero.jpg';
import dress1 from '../assets/images/dress-1.png';
import dress2 from '../assets/images/dress-2.png';
import dress3 from '../assets/images/dress-3.png';

const DRESS_STYLES = [
  { name: 'Casual', slug: 'tops', image: dress2, span: 'md:col-span-1' },
  { name: 'Formal', slug: 'mens-shirts', image: dress1, span: 'md:col-span-2' },
  { name: 'Party', slug: 'womens-dresses', image: dress3, span: 'md:col-span-2' },
  { name: 'Gym', slug: 'womens-shoes', image: dress2, span: 'md:col-span-1' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: 'Alex K.',
    text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.',
  },
  {
    name: 'James L.',
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection is diverse and on-point with the latest trends.",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const { newArrivals, topSelling, homeStatus } = useSelector((s) => s.products);
  const [arrivalsExpanded, setArrivalsExpanded] = useState(false);
  const [sellingExpanded, setSellingExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchHomeProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-cream">
        <div className="container-x grid items-center gap-8 py-10 md:grid-cols-2 md:py-14">
          <div>
            <h1 className="font-display text-hero-sm sm:text-hero">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="mt-5 max-w-md text-sm text-black/60">
              Browse through our diverse range of meticulously crafted garments, designed to
              bring out your individuality and cater to your sense of style.
            </p>
            <Link to="/category/tops" className="pill-btn mt-6 inline-block bg-black text-white hover:bg-black/80">
              Shop Now
            </Link>
            <div className="mt-8 flex flex-wrap gap-6 border-t border-black/10 pt-6">
              <div>
                <p className="font-display text-2xl">200+</p>
                <p className="text-xs text-black/60">International Brands</p>
              </div>
              <div>
                <p className="font-display text-2xl">2,000+</p>
                <p className="text-xs text-black/60">High-Quality Products</p>
              </div>
              <div>
                <p className="font-display text-2xl">30,000+</p>
                <p className="text-xs text-black/60">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={heroImg} alt="Models wearing Shop.co outfits" className="mx-auto w-full max-w-sm rounded-2xl object-cover" />
            <span className="absolute right-4 top-2 text-6xl sm:text-7xl">✦</span>
            <span className="absolute left-0 top-1/3 text-3xl sm:text-4xl">✦</span>
          </div>
        </div>
      </section>

      <BrandStrip />

      {/* New Arrivals */}
      <section className="container-x py-14">
        <h2 className="text-center font-display text-h2-sm sm:text-h2">NEW ARRIVALS</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {homeStatus === 'loading' && Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          {(arrivalsExpanded ? newArrivals : newArrivals.slice(0, 4)).map((p) => (
            <ProductCard key={p.id} product={p} ratingSize="text-base" />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => setArrivalsExpanded((v) => !v)}
            className="pill-btn inline-block border border-black/20 hover:bg-gray-50"
          >
            {arrivalsExpanded ? 'Show Less' : 'View All'}
          </button>
        </div>
      </section>

      <hr className="container-x border-black/10" />

      {/* Top Selling */}
      <section className="container-x py-14">
        <h2 className="text-center font-display text-h2-sm sm:text-h2">TOP SELLING</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {homeStatus === 'loading' && Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          {(sellingExpanded ? topSelling : topSelling.slice(0, 4)).map((p) => (
            <ProductCard key={p.id} product={p} ratingSize="text-base" />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => setSellingExpanded((v) => !v)}
            className="pill-btn inline-block border border-black/20 hover:bg-gray-50"
          >
            {sellingExpanded ? 'Show Less' : 'View All'}
          </button>
        </div>
      </section>

      {/* Browse by Dress Style */}
      <section className="container-x pb-14">
        <div className="rounded-3xl bg-cream p-6 sm:p-10">
          <h2 className="text-center font-display text-h2-sm sm:text-h2">BROWSE BY DRESS STYLE</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {DRESS_STYLES.map((style) => (
              <Link
                key={style.name}
                to={`/category/${style.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-white ${style.span}`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 font-display text-xl">{style.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x pb-16">
        <h2 className="font-display text-2xl">OUR HAPPY CUSTOMERS</h2>
        <div className="mt-6 flex gap-5 overflow-x-auto no-scrollbar pb-2">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="min-w-[280px] rounded-2xl border border-black/10 p-6">
              <div className="flex gap-1 text-2xl leading-none text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mt-3 flex items-center gap-1 font-semibold">
                {t.name}
                <span className="text-green-500">✓</span>
              </p>
              <p className="mt-2 text-sm text-black/60">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-2xl bg-gray-100" />
      <div className="mt-3 h-4 w-3/4 rounded bg-gray-100" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
    </div>
  );
}
