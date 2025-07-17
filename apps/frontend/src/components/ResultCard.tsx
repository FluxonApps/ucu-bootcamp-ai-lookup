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
    <div className="w-full aspect-[7/9] bg-white flex flex-col overflow-hidden p-3 rounded-lg text-[12px] lg:text-[16px]">
      <div className="flex-1 relative cursor-pointer" onClick={goToWebsite}>
        <img
          src={image_url}
          className={`absolute transform transition-all duration-300 ease-in-out inset-0 w-full h-full object-cover hover:scale-102`}
        />
      </div>
      <div className="text-dark-green font-semibold flex flex-col px-2 gap-2 pt-1">
        <div className="flex justify-between">
          <div className='text-sm lg:text-md'>{title?.slice(0, 25) ?? 'No title'}</div>

        </div>
        <div className="flex justify-between items-center">
            <span className="font-semibold text-[18px] xl:text-xl text-[#2e2e2e]">
              {conversion[currency]}
              {price}
            </span>

            <span className="underline font-semibold cursor-pointer text-[12px] xl:text-sm" onClick={goToWebsite}>
              {name_of_website}
            </span>
        </div>
      </div>
    </div>
  );
}
