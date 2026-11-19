import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  applyPromo,
  selectCartItems,
  selectSubtotal,
  selectDiscount,
  selectDeliveryFee,
  selectTotal,
} from '../store/cartSlice.js';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const discount = useSelector(selectDiscount);
  const deliveryFee = useSelector(selectDeliveryFee);
  const total = useSelector(selectTotal);
  const promoApplied = useSelector((s) => s.cart.promoApplied);
  const [promoCode, setPromoCode] = useState('');

  function handleApplyPromo() {
    if (promoCode.trim()) dispatch(applyPromo());
  }

  return (
    <div className="container-x py-8">
      <p className="text-xs text-black/50">
        <Link to="/">Home</Link> / Cart
      </p>
      <h1 className="mt-4 font-display text-h2-sm sm:text-h2">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-black/50">Your cart is empty.</p>
          <Link to="/category/tops" className="pill-btn mt-4 inline-block bg-black text-white">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 rounded-2xl border border-black/10 p-5 lg:col-span-2">
            {items.map((item) => (
              <div key={item.cartId} className="flex gap-4 border-b border-black/10 pb-4 last:border-0 last:pb-0">
                <img src={item.thumbnail} alt={item.title} className="h-24 w-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs text-black/50">Size: {item.size}</p>
                      <p className="flex items-center gap-1 text-xs text-black/50">
                        Color:
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-black/10"
                          style={{ backgroundColor: item.color }}
                        />
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.cartId))}
                      className="text-red-500"
                      aria-label="Remove item"
                    >
                      🗑
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-semibold">${item.price.toFixed(0)}</p>
                    <div className="flex items-center gap-4 rounded-full bg-gray-100 px-4 py-1.5">
                      <button onClick={() => dispatch(decrementQty(item.cartId))} className="px-1">
                        −
                      </button>
                      <span className="w-4 text-center text-sm">{item.qty}</span>
                      <button onClick={() => dispatch(incrementQty(item.cartId))} className="px-1">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-black/10 p-5">
            <h2 className="font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Discount (-20%)</span>
                <span className="font-medium text-red-500">-${discount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Delivery Fee</span>
                <span className="font-medium">${deliveryFee.toFixed(0)}</span>
              </div>
              <hr className="border-black/10" />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(0)}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Add promo code"
                className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm outline-none"
              />
              <button
                onClick={handleApplyPromo}
                className="pill-btn bg-black px-5 py-2.5 text-sm text-white"
              >
                {promoApplied ? 'Applied ✓' : 'Apply'}
              </button>
            </div>

            <button className="pill-btn mt-4 w-full bg-black text-white">
              Go to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
