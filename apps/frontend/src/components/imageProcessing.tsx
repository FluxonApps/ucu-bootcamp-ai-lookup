import ImageUpload from './ImageUpload.tsx';
import { ProfileButton } from './ProfileButton.tsx';
import axios from 'axios';
import { useState } from 'react';
import { countryOptions } from '../countries_list.ts';
import Select from 'react-select';

type ResultItem = {
  url: string;
  price: number | null;
  currency: string | null;
  name_of_website: string;
  image_url?: string;
  title?: string;
};
type MainResult = {
  similarListings: ResultItem[];
};
type ImageProcessingProps = {
  userName: string | null;
};

async function fetchDataFromAPI(url: string, country?: string): Promise<MainResult> {
  const endpointUrl = 'https://ucu-bootcamp-ai-lookup-backend.onrender.com/scrape/?url=';
  const response = await axios.get(endpointUrl + url);
  return response.data;
}

export default function ImageProcessing({ userName }: ImageProcessingProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState({ value: 'ua', label: 'Ukraine' });
  const [country, setCountry] = useState<string | null>(null);
  const [data, setData] = useState<MainResult>();

  const handleUpload = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const handleSearchClick = async () => {
    setCountry(selectedCountry.value);
    const fetchedData = await fetchDataFromAPI(imageUrl!);
    setData(fetchedData);
  };

  return (
    <>
      {/* TODO change colors to one color style */}
      {/* Header - centered horizontally, slightly above center */}
      {/* Centered content block */}
      {!imageUrl && !data && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <h1 className="text-4xl leading-relaxed font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Hello, {userName}!
          </h1>
          <ImageUpload onUpload={handleUpload} />
        </div>
      )}

      {imageUrl && !country && !data && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <h1 className="text-4xl leading-relaxed font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Hello, {userName}!
          </h1>
          <div className="flex w-full max-w-4xl border border-gray-300 rounded-lg p-4 relative">
            {/* Left: Image */}
            <img
              src={imageUrl}
              alt="Preview"
              className="w-48 h-48 object-cover rounded border border-gray-300 shadow"
            />

            {/* Right: Select + Button */}
            <div className="flex-1 flex flex-col justify-center pl-6 relative">
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={(option) => setSelectedCountry(option)}
                placeholder="Select a country..."
                className="w-full"
                classNamePrefix="react-select"
              />

              <button
                onClick={handleSearchClick}
                className="absolute bottom-0 right-0 mb-2 mr-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-400 text-black rounded hover:from-green-700 hover:to-green-500 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing screen */}
      {imageUrl && country && !data && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <h2 className="p-1 text-4xl font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Processing...
          </h2>

          {/* TODO send request to API, and set recived data to data variable using setData */}
        </div>
      )}

      {data && <p>display data as a grid</p>}
    </>
  );
}
