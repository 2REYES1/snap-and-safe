import './PillSuccess.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

export default function PillSuccess(props) {
    const navigate = useNavigate();

    function onClickPrev() {
        navigate('/');
    }

    const fileInputRef = useRef(null);

    return (
        <div className={"main-layout"}>
            <div className={"header-layout"}>
                <button className={"prev-button"} onClick={onClickPrev}>
                    Prev
                </button>
            </div>
            <div className={"box-center"}>
                <div className={"upload-box box-center"}>
                    <p>Image successfully uploaded.</p>
                    <p style={{fontSize: "2vh"}}>{props.response}</p>
                    <p>Is there anything else about this pill you would like to know?</p>
                    <form className={"box-center"}>
                        <input
                        type="text"
                        style={{width: "30vw", height: "15vh"}}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}