export default function StarRating({ rating = 0, showValue = true, size = 'text-sm' }) {
  const full = Math.round(rating);
  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <div className="flex text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < full ? '★' : '☆'}</span>
        ))}
      </div>
      {showValue && <span className="text-black/60">{rating.toFixed(1)}/5</span>}
    </div>
  );
}
