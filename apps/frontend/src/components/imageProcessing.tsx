import ImageUpload from './ImageUpload.tsx';
import axios from 'axios';
import { useState } from 'react';
import { countryOptions } from '../countries_list.ts';
import Select from 'react-select';
import ResultGrid from './ResultGrid.tsx';

export type ResultItem = {
  url: string;
  price: number | null;
  currency: string;
  name_of_website: string;
  image_url?: string;
  title?: string;
};
export type MainResult = {
  similarListings: ResultItem[];
};
type ImageProcessingProps = {
  userName: string | null;
  processQuery: Function;
};

async function fetchDataFromAPI(url: string, country: string): Promise<MainResult> {
  const endpointUrl = import.meta.env.VITE_ENDPOINT_URL;
  const response = await axios.get(`${endpointUrl}?url=${url}&country=${country}`);
  console.log(country)
  return response.data;
}

export default function ImageProcessing({ userName, processQuery }: ImageProcessingProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState({ value: 'ua', label: 'Ukraine' });
  const [country, setCountry] = useState<string | null>(null);
  const [data, setData] = useState<MainResult>();

  const handleUpload = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const handleSearchClick = async () => {
    setCountry(selectedCountry.value);
    const fetchedData = await fetchDataFromAPI(imageUrl!, selectedCountry.value!);
    setData(fetchedData);
    processQuery({
      originalImg: imageUrl,
      obtainedData: fetchedData
    });
  };

  return (
    <>
      {!imageUrl && !data && (
        <div className="flex flex-col row-end-2 items-center justify-center min-h-4/5 bg-white-background">
          <h1 className="text-4xl leading-relaxed font-poppins bg-gradient-to-r from-green-gradient to-yellow-gradient bg-clip-text text-transparent">
            Hello, {userName}!
          </h1>
          <ImageUpload onUpload={handleUpload} />
        </div>
      )}

      {imageUrl && !country && !data && (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white-background p-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl leading-relaxed font-poppins bg-gradient-to-r from-green-gradient to-yellow-gradient bg-clip-text text-transparent text-center">
          Hello, {userName}!
        </h1>

        <div className="flex flex-col md:flex-row w-full max-w-2xl border bg-white border-gray-300 rounded-lg p-4 mt-6 shadow-md">
          {/* Left: Image */}
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full md:w-48 md:h-48 h-64 object-cover rounded border border-gray-300 shadow mb-4 md:mb-0"
          />

          {/* Right: Select + Button */}
          <div className="flex-1 relative flex flex-col items-center justify-center pl-0 md:pl-6">
          <div className="w-full">
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(option) => setSelectedCountry(option)}
              placeholder="Select a country..."
              className="w-full"
              classNamePrefix="react-select"
            />
          </div>

          <button
            onClick={handleSearchClick}
            className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-white-background transition">
            Search
          </button>
        </div>

        </div>
      </div>
    )}


      {/* Processing screen */}
      {imageUrl && country && !data && (
        <div className="flex flex-col items-center justify-center min-h-4/5 bg-white-background">
          <h2 className="p-1 text-4xl font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Processing...
          </h2>

          {/* TODO send request to API, and set recived data to data variable using setData */}
        </div>
      )}

      {data && <ResultGrid data={data} />}
    </>
  );
}
