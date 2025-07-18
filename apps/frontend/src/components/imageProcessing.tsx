import ImageUpload from './ImageUpload.tsx';
import axios from 'axios';
import { useState } from 'react';
import { countryOptions } from '../countries_list.ts';
import Select, { SingleValue } from 'react-select';
import ResultGrid from './ResultGrid.tsx';
import { QueryData } from '../pages/SearchPage.tsx';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';

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
  processQuery: (queryData: QueryData) => Promise<void>;
};

type RegionType = {
  value: string;
  label: string;
}

async function fetchDataFromAPI(url: string, country?: string): Promise<MainResult> {
  const endpointUrl = 'http://localhost:3131/scrape/?url=';
  const response = await axios.get(endpointUrl + url);
  return response.data;
}

const auth = getAuth();

export default function ImageProcessing({ processQuery }: ImageProcessingProps) {
  const [user, userLoading] = useAuthState(auth);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<SingleValue<RegionType>>({ value: 'ua', label: 'Ukraine' });
  const [country, setCountry] = useState<string | null>(null);
  const [data, setData] = useState<MainResult>();

  if (userLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleUpload = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  const handleSearchClick = async () => {
    if (!imageUrl || !selectedCountry)
    {
      return;
    }
    setCountry(selectedCountry.value);
    const fetchedData = await fetchDataFromAPI(imageUrl!);
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
            Hello, {user.displayName}!
          </h1>
          <ImageUpload onUpload={handleUpload} />
        </div>
      )}

      {imageUrl && !country && !data && (
        <div className="flex flex-col items-center justify-center min-h-4/5 bg-white-background">
          <h1 className="text-4xl leading-relaxed font-poppins bg-gradient-to-r from-green-gradient to-yellow-gradient bg-clip-text text-transparent">
            Hello, {user.displayName}!
          </h1>
          <div className="flex w-full max-w-4xl border border-gray-300 rounded-lg p-4 relative">
            {/* Left: Image */}
            <img
              src={imageUrl}
              alt="Preview"
              className="w-48 h-48 object-cover rounded border border-gray-300 shadow"
            />

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
                className="absolute bottom-0 right-0 mb-2 mr-2 px-4 py-2 bg-green-gradient text-black rounded hover:bg-dark-green transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {imageUrl && country && !data && (
        <div className="flex flex-col items-center justify-center min-h-4/5 bg-white-background">
          <h2 className="p-1 text-4xl font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
            Processing...
          </h2>
        </div>
      )}

      {data && <ResultGrid data={data} />}
    </>
  );
}
