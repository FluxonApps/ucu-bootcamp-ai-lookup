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
  return (
    <div className="w-full aspect-[7/8] min-h-[200px] bg-white-background flex flex-col overflow-hidden rounded-xs pb-1 text-[12px] lg:text-[16px]">
      <div className="flex-1 relative cursor-pointer" onClick={goToWebsite}>
        <img
          src={image_url}
          className={`absolute transform transition-all duration-300 ease-in-out inset-0 w-full h-full object-cover hover:scale-102`}
        />
      </div>
      <div className="text-dark-green font-poppins flex flex-col px-2 gap-2 pt-1">
        <div className="flex justify-between items-center gap-1 cursor-pointer" onClick={goToWebsite}>
          <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">{title}</div>
        </div>
        <div className="flex justify-center">
          <p>
            Price:{' '}
            <span className="font-semibold">
              {conversion[currency]}
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
