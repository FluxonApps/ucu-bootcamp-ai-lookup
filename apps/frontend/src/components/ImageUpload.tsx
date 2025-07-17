import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState("")
    const storage = getStorage()

    useEffect(() => {
        if (!selectedFile) {
            setPreview("")
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

    const handleUpload = async () => {
        if (!selectedFile) return;

        const fileName = `${Date.now()}_${selectedFile.name}`;
        const storageRef = ref(storage, `uploads/${fileName}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        setPreview(downloadURL);
        console.log("Uploaded and available at:", downloadURL);
    }
    return (
        <div>
            <input type='file' accept='image/*' onChange={onSelectFile}/>
            {selectedFile && <img src={preview}/>}
            <button onClick={handleUpload} className='bg-green-100 p-8'>Upload</button>
        </div>
    )
}

export default ImageUpload;
