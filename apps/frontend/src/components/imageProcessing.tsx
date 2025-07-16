
import ImageUpload from './ImageUpload.tsx'
import { ProfileButton } from './ProfileButton.tsx';
import { useState } from 'react'
import { countryOptions } from '../countries_list.ts';
import Select from 'react-select'

type ImageProcessingProps = {
  userName: string | null;
};

export default function ImageProcessing ({userName}:ImageProcessingProps) {
  const [imageUrl, setImageUrl] = useState<string|null>(null);

  const [selectedCountry, setSelectedCountry] = useState({value: "ua", label: "Ukraine" });
  const [country, setCountry ] = useState<string|null>(null);
  const [data, setData] = useState();

  const handleUpload = (imageUrl: string ) => {
    setImageUrl(imageUrl);
  };

  const handleSearchClick = () => {
    setCountry(selectedCountry.value);
  };

  return (
    <>
    {/* TODO change colors to one color style */}
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* Header - centered horizontally, slightly above center */}
      <h1 className="text-4xl leading-relaxed font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
        Hello, {userName}!
      </h1>

      {/* Centered content block */}
      {!imageUrl && !data && <ImageUpload onUpload={handleUpload} />}

      {imageUrl && !country && !data && (
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
              isClearable
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
      )}
    </div>

    {/* Processing screen */}
    {imageUrl && country && !data && (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white">
        <h1 className="p-1 text-4xl font-bold bg-gradient-to-r from-[#334A40] to-[#C0D55B] bg-clip-text text-transparent">
          Processing...
        </h1>

        {/* TODO send request to API, and set recived data to data variable using setData */}

      </div>
    )}

    {data && (
      <p>display data as a grid</p>
    )}

  </>

  );
};






// {!preview && (
//     <>
//         <button
//             className=" px-6 py-2 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#c0c0c0] transition"
//             onClick={() => inputRef.current?.click()}
//         >
//             Upload Image
//         </button>

//         <input
//             type="file"
//             accept="image/*"
//             onChange={onSelectFile}
//             ref={inputRef}
//             className="hidden"
//         />
//     </>
// )}
