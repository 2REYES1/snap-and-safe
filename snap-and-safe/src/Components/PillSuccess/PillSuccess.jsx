import './PillSuccess.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export default function PillSuccess(props) {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [newResponse, setNewResponse] = useState('');
    const navigate = useNavigate();

    function onClickPrev() {
        navigate('/');
    }

    const fileInputRef = useRef(null);

    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ];

    // Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("");

async function run() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" , safetySettings});
  
    const prompt = props.response + userInput;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setNewResponse(text);
    console.log(text);
    setLoading(false);
  }

  function handleSubmit(e) {
    setLoading(true);
    // Prevent the browser from reloading the page
    e.preventDefault();
    run();

    // console.log(userInput);

    // Read the form data
    // const form = e.target.value;
    // const formData = new FormData(form);

    // console.log(form);
    // console.log(formData.entries());
    // // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
  }
  

    return (
        <div className={"main-layout"}>
            <div className={"header-layout"}>
                <button className={"prev-button"} onClick={onClickPrev}>
                    Prev
                </button>
            </div>
            <div className={"box-center"}>
            {/* <form className={"box-center"} onSubmit={handleSubmit}>
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
                    </form> */}
                <div className={"upload-box box-center"}>
                {
                        loading?
                         <div className={"loader"}></div>
                    : 
                    <div>
                    <p>Image successfully uploaded.</p>
                    <p style={{fontSize: "2vh"}}>{newResponse? newResponse : props.response}</p>
                    <p>Is there anything else about this pill you would like to know?</p>
                    <form className={"box-center"} onSubmit={handleSubmit}>
                        <textarea 
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        style={{width: "30vw", height: "15vh", paddingTop: "0vh",}}/>
                        <button type="submit">Submit</button>
                        {/* <input
                        type="text"
                        style={{width: "30vw", height: "15vh", paddingTop: "0vh",}}
                        /> */}
                    </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}