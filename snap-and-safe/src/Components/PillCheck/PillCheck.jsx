import './PillCheck.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
// import model from '../../Gemini/Gemini';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import PillSuccess from '../PillSuccess/PillSuccess';


export default function PillCheck() {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey);
    const navigate = useNavigate();
    // const fs = require("fs");

    function onClickPrev() {
        navigate('/');
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [geminiResponse, setGeminiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(selectedFile);
        if(selectedFile) {
            run();
        }
    };

    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];

    // Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" , safetySettings});

  const prompt = "what medicine is this pill and what is it for?";

  const fileInputEl = document.querySelector("input[type=file]");
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );
  console.log(imageParts);
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  setGeminiResponse(text);
  console.log(text);
  setLoading(false);
}
return (
    
    (geminiResponse? <div>{<PillSuccess response={geminiResponse}/>}</div> :
    <div className={"main-layout"}>
        <div className={"header-layout"}>
            <button className={"pc-prev-button"} onClick={onClickPrev}>
                back
            </button>
            
        </div>
        <div className={"box-center"}>
            <div className={"pc-upload-box pc-box-center"}>
                {
                    loading?
                     <div className={"loader box-center"} ></div>
                    : 
                    <div className = {"pc-upload-box"}>
                        <p className={"pc-prompt-text pc-box-center"}>upload an image of a food label.</p>
                        <div className={"box-center"}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <button className={"pc-select-file-button"} type="button" onClick={handleButtonClick}>
                                select image
                            </button> 
                        </div> 
                        <div>
                        {selectedFile && (
                                <div>
                                    <h3>this is your selected image.</h3>
                                    <img src={URL.createObjectURL(selectedFile)} alt="Selected" height="200" />
                                </div>
                                )}
                        </div>
                        <div className={"pc-upload-button-div"}>
                            <button className={"pc-upload-button" } type="submit" onClick={handleSubmit}>upload</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
    )
);
}