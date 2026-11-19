import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-black py-2 text-center text-xs text-white">
      <p>
        Sign up and get 20% off to your first order.{' '}
        <Link to="/signup" className="underline font-semibold hover:opacity-80">
          Sign Up Now
        </Link>
      </p>
      <button
        onClick={() => setOpen(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
