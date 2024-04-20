import './PillCheck.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

export default function PillCheck() {
    const navigate = useNavigate();

    function onClickPrev() {
        navigate('/');
    }

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
        <div className={"main-layout"}>
            <div className={"header-layout"}>
                <button className={"prev-button"} onClick={onClickPrev}>
                    Prev
                </button>
            </div>
            <div className={"box-center"}>
                <div className={"upload-box box-center"}>
                    <p>upload an image of your food label.</p>
                    <form className={"box-center"} onSubmit={handleSubmit}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <button className={"select-file-button"} type="button" onClick={handleButtonClick}>
                            Select a File
                        </button>
                        <button className={"upload-button"} type="submit">Upload</button>
                </form>
                {selectedFile && (
                <div>
                    <h3>This is your selected image.</h3>
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected" height="200" />
                </div>
                )}
                </div>
            </div>
        </div>
    );
}