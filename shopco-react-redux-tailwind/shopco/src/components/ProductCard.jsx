import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';

function discountedPrice(price, discountPercentage) {
  return price - price * (discountPercentage / 100);
}

export default function ProductCard({ product, ratingSize = 'text-sm' }) {
  const hasDiscount = product.discountPercentage > 1;
  const finalPrice = hasDiscount
    ? discountedPrice(product.price, product.discountPercentage)
    : product.price;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h3 className="mt-3 truncate text-product-title font-semibold">{product.title}</h3>
      <StarRating rating={product.rating} size={ratingSize} />
      <div className="mt-1 flex items-center gap-2">
        <span className="text-product-price font-semibold">${finalPrice.toFixed(0)}</span>
        {hasDiscount && (
          <>
            <span className="text-black/40 line-through">${product.price.toFixed(0)}</span>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500">
              -{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </div>
    </Link>
  );
}

export { discountedPrice };
