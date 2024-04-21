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
                {
                        loading?
                         <div className={"loader"}></div>
                    : 
                    <div>
                    <p style={{textAlign: "center"}}>Image successfully uploaded.</p>
                    <div style={{ height: '25vh', overflowY: 'scroll' }}> 
                    <p style={{
                        fontSize: "3vh",
                        paddingLeft: "5vw",
                        paddingRight: "5vw",
                        fontWeight: "initial"
                        }}>
                    {newResponse? newResponse : props.response}
                    </p>
                    </div>
                    <p style={{
                        paddingLeft: "5vw",
                        paddingRight: "5vw"
                    }}>
                        Is there anything else about this medication you would like to know?
                    </p>
                    <form className={"box-center"} onSubmit={handleSubmit}>
                        <textarea 
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        style={{
                          width: "30vw",
                          height: "10vh",
                          paddingTop: "0vh",
                          fontFamily: "serif",
                          fontSize: "2vh",
                          }}/>
                        <button type="submit"
                         style={{
                            width: "10vw",
                            height: "5vh",
                            borderRadius: "30px",
                            color: "white",
                            borderColor: "white",
                            borderStyle: "solid",
                            backgroundColor: "transparent",
                            }}>Submit</button>
                    </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}