import './PillCheck.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
// import model from '../../Gemini/Gemini';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


export default function PillCheck() {
    const navigate = useNavigate();
    // const fs = require("fs");

    function onClickPrev() {
        navigate('/');
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        if(selectedFile) {
            run();
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedFile);
    };

    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];

    // Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBTq93OT7Fp9sMPE9CpjKXZKcMhtYRel_s");

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

async function run() {
  // For text-and-images input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" , safetySettings});

  const prompt = "what medicine is this pill and what is it for?";

  const fileInputEl = document.querySelector("input[type=file]");
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );
  console.log(imageParts);
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
    return (
        <div className={"main-layout"}>
            <div className={"header-layout"}>
                <button className={"prev-button"} onClick={onClickPrev}>
                    Prev
                </button>
            </div>
            <div className={"box-center"}>
                <div className={"upload-box box-center"}>
                    <p id={"text"}>upload an image of a loose pill,
                        pill bottle, or pill box</p>
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