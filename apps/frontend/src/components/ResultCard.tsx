import { useState } from 'react';

export type CardProps = {
  url: string;
  price: number;
  currency: Currency;
  name_of_website: string;
  image_url: string;
  title: string;
};
type Currency = 'usd' | 'uah' | 'eur' | 'gbp' | 'cny' | 'jpy';

const conversion: Record<Currency, string> = {
  usd: '$',
  uah: '₴',
  eur: '€',
  gbp: '£',
  cny: '¥',
  jpy: '¥',
};

export default function ResultCard({ url, price, currency, name_of_website, image_url, title }: CardProps) {
  const goToWebsite = () => {
    // window.location.href =  url;
    window.open(url, '_blank');
  };
  const [fullName, setFullName] = useState(false);
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
    console.log(hover);
  };
  const handleMouseLeave = () => {
    setHover(false);
    console.log(hover);
  };
  return (
    <div
      className="w-full aspect-[7/8] bg-[#F3F3F3] flex flex-col overflow-hidden rounded-xs pb-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-1 relative cursor-pointer" onClick={goToWebsite}>
        <img
          src={image_url}
          className={`absolute transform transition-all duration-300 ease-in-out inset-0 w-full h-full object-cover ${hover ? 'scale-102' : 'scale-100 '}`}
        />
      </div>
      <div className="text-[#4A6144] font-poppins flex flex-col px-2 gap-2 pt-1">
        <div className="flex justify-between">
          <div>{title?.slice(0, fullName ? title.length : 20) ?? 'No title'}</div>
          <button
            onClick={() => {
              setFullName(!fullName);
            }}
          >
            ▼
          </button>
        </div>
        <div className="flex justify-center">
          <p>
            Price:{' '}
            <span className="font-semibold">
              {conversion[currency as keyof typeof conversion]}
              {price}
            </span>
            {' | '}
            <span className="underline font-semibold cursor-pointer" onClick={goToWebsite}>
              {name_of_website}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
