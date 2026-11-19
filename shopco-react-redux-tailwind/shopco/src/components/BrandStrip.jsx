import versace from '../assets/icons/versace.svg';
import zara from '../assets/icons/zara.svg';
import gucci from '../assets/icons/gucci.svg';
import prada from '../assets/icons/prada.svg';
import calvinKlein from '../assets/icons/calvin-klein.svg';

const BRANDS = [
  { name: 'Versace', src: versace, className: 'h-4 sm:h-5' },
  { name: 'Zara', src: zara, className: 'h-5 sm:h-6' },
  { name: 'Gucci', src: gucci, className: 'h-4 sm:h-5' },
  { name: 'Prada', src: prada, className: 'h-4 sm:h-5' },
  { name: 'Calvin Klein', src: calvinKlein, className: 'h-4 sm:h-5' },
];

export default function BrandStrip() {
  return (
    <div className="bg-black py-6">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        {BRANDS.map((b) => (
          <img key={b.name} src={b.src} alt={b.name} className={`w-auto ${b.className}`} />
        ))}
      </div>
    </div>
  );
}
