import './FoodCheck.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
// import model from '../../Gemini/Gemini';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import FoodSuccess from '../FoodSuccess/FoodSuccess';

export default function FoodCheck() {
    const apiKey = "AIzaSyA_DFA0Qj49YggyhXe6PuaM6_eZb2MW_Jg";
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
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" , safetySettings});

  const prompt = "get the information from this food label and format each atrribute into a json object where every key and value is a string."

  const fileInputEl = document.querySelector("input[type=file]");
  const imageParts = await Promise.all(
    [...fileInputEl.files].map(fileToGenerativePart)
  );
  console.log(imageParts);
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  const cleanedText = text.replace(/```json/g, '').replace(/```/g, '');
  setGeminiResponse(text);
  console.log(text);
  console.log("JSON OBJECT UNDER THIS.");
  console.log(JSON.parse(cleanedText));
  setLoading(false);
}

    

    return (
        (geminiResponse? <div>{<FoodSuccess response={geminiResponse}/>}</div> :
        <div className={"main-layout"}>
            <div className={"header-layout"}>
                <button className={"fc-prev-button"} onClick={onClickPrev}>
                    back
                </button>
            </div>
            <div className={"box-center"}>
                <div className={"fc-upload-box fc-box-center"}>
                    {
                        loading?
                         <div className={"loader"}></div>
                        : 
                        <div className = {"fc-upload-box"}>
                            <p className={"fc-prompt-text fc-box-center"}>upload an image of a food label.</p>
                            <form className={"box-center"} onSubmit={handleSubmit}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button className={"fc-select-file-button"} type="button" onClick={handleButtonClick}>
                                    select image
                                </button> 
                            </form> 
                            <div>
                            {selectedFile && (
                                    <div>
                                        <h3>this is your selected image.</h3>
                                        <img src={URL.createObjectURL(selectedFile)} alt="Selected" height="200" />
                                    </div>
                                    )}
                            </div>
                            <div className={"fc-upload-button-div"}>
                                <button className={"fc-upload-button"} type="submit">upload</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        )
    );
}