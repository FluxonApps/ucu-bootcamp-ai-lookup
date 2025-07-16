import { useRef, useState, useEffect } from 'react';

type ImageUploadProps = {
  onUpload: (imageUrl: string) => void;
};

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
    const [selectedFile, setSelectedFile] = useState()
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        onUpload(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    return (
        <div>
            <button
                className=" px-6 py-2 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#c0c0c0] transition"
                onClick={() => inputRef.current?.click()}
            >
                Insert picture
            </button>

            <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                ref={inputRef}
                className="hidden"
            />
        </div>
    )
}

export default ImageUpload;
