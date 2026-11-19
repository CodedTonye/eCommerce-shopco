import shopcoLogo from '../assets/icons/SHOP.CO.svg';
import facebook from '../assets/icons/facebook.svg';
import twitter from '../assets/icons/twitter.svg';
import instagram from '../assets/icons/instagram.svg';
import github from '../assets/icons/github.svg';
import visa from '../assets/icons/visa.svg';
import mastercard from '../assets/icons/mastercard.svg';
import paypal from '../assets/icons/paypal.svg';
import applepay from '../assets/icons/applepay.svg';
import googlepay from '../assets/icons/googlepay.svg';

const COLUMNS = [
  { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
  { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
  { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
  { title: 'RESOURCES', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
];

const SOCIALS = [
  { name: 'Twitter', src: twitter },
  { name: 'Facebook', src: facebook },
  { name: 'Instagram', src: instagram },
  { name: 'Github', src: github },
];

const PAYMENTS = [
  { name: 'Visa', src: visa },
  { name: 'Mastercard', src: mastercard },
  { name: 'PayPal', src: paypal },
  { name: 'Apple Pay', src: applepay },
  { name: 'Google Pay', src: googlepay },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 pt-12">
      <div className="container-x grid grid-cols-2 gap-8 pb-10 md:grid-cols-6">
        <div className="col-span-2">
          <img src={shopcoLogo} alt="SHOP.CO" className="h-6 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-black/60">
            We have clothes that suit your style and which you're proud to wear. From women to
            men.
          </p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map((s) => (
              <span
                key={s.name}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black"
              >
                <img src={s.src} alt={s.name} className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h5 className="text-sm font-semibold tracking-wide">{col.title}</h5>
            <ul className="mt-4 space-y-2 text-sm text-black/60">
              {col.links.map((l) => (
                <li key={l} className="hover:text-black cursor-pointer">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/10 py-5">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-black/50 sm:flex-row">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p.name}
                className="flex h-7 w-11 items-center justify-center rounded border border-black/10 bg-white"
              >
                <img src={p.src} alt={p.name} className="h-4 w-auto" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
