import './FoodCheck.css';
import * as React from 'react';
import { useState, useRef } from 'react';

export default function FoodCheck() {

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedFile);
    };

    return (
        <div class = "main-layout">
            <div class = "header-layout">
                <button class = "prev-button">
                    Prev
                </button>
            </div>
            <div class = "box-center">
                <div class = "upload-box box-center">
                    <p>upload an image of your food label.</p>
                    <form class = "box-center" onSubmit={handleSubmit}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button class= "select-file-button" type="button" onClick={handleButtonClick}>
                            Select a File
                        </button>
                        <button class = "upload-button" type="submit">Upload</button>
                </form>
                </div>
            </div>
        </div>
    );
}


