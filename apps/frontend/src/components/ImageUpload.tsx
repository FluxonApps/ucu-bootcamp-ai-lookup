import React,{ useRef, useState, useEffect } from 'react';
import Select from 'react-select';

import { countryOptions } from '../countries_list';

type ImageUploadProps = {
  onSearch: (data: { country: string; imageUrl: string }) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onSearch }) => {
    const [selectedCountry, setSelectedCountry] = useState({value: "ua", label: "Ukraine" });

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    // Send data back to parent
    const handleSearchClick = () => {
        if (selectedCountry && preview) {
        onSearch({
            country: selectedCountry.value,
            imageUrl: preview,
        });
        }
    };

    return (
        <div className="mt-4 flex flex-row items-center gap-4">
        {preview && (
        <div className="flex w-full max-w-4xl border border-gray-300 rounded-lg p-4 relative">
            {/* Left: Image */}
            <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded border border-gray-300 shadow"
            />

            {/* Right: Input + Button */}
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

                {/* Search Button: bottom-right of THIS container */}
                <button
                onClick={handleSearchClick}
                className="absolute bottom-0 right-0 mb-2 mr-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-400 text-black rounded hover:from-green-700 hover:to-green-500  transition"
                >
                Search
                </button>
            </div>
        </div>
        )}

        {!preview && (
            <>
                <button
                    className=" px-6 py-2 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#c0c0c0] transition"
                    onClick={() => inputRef.current?.click()}
                >
                    Upload Image
                </button>

                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    ref={inputRef}
                    className="hidden"
                />
            </>
        )}
    </div>
    )
}

export default ImageUpload;
