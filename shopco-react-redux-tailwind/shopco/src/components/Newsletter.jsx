import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <section className="container-x">
      <div className="rounded-3xl bg-black px-6 py-10 sm:px-12 md:flex md:items-center md:justify-between md:gap-8">
        <h3 className="font-display text-h2-sm text-white max-w-sm">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 md:mt-0 md:w-80">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
                stroke="#00000080"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button type="submit" className="pill-btn bg-white text-black hover:bg-gray-100">
            {subscribed ? 'Subscribed ✓' : 'Subscribe to Newsletter'}
          </button>
        </form>
      </div>
    </section>
  );
}
