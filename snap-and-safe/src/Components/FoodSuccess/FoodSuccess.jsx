import './FoodSuccess.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

export default function FoodSuccess(props) {
    const navigate = useNavigate();

    function onClickPrev() {
        navigate('/');
    }

    const fileInputRef = useRef(null);
    const labelAttr = JSON.parse(props.response.replace(/```json/g, '').replace(/```/g, ''));


    // State to store the selected attribute value
    const [selectedAttribute, setSelectedAttribute] = useState(null);

    // Function to handle attribute selection
    const handleAttributeSelect = (attribute) => {
        setSelectedAttribute(attribute);
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
                    <p style = {{fontSize: '20pt', fontWeight: '400'}}>Image successfully uploaded.</p>
                    {/* <p style={{fontSize: "2vh"}}>{labelAttr}</p> */}
                    <div className="attribute-boxes">
                        {/* Map over the keys of the labelAttr object and render a box for each key */}
                        {Object.keys(labelAttr).map((key) => (
                            <div
                                key={key}
                                className={`attribute-box ${selectedAttribute === key ? 'selected' : ''}`}
                                onClick={() => handleAttributeSelect(key)}
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                    {/* Display the selected attribute value */}
                    <p>{selectedAttribute && `${selectedAttribute}: ${labelAttr[selectedAttribute]}`}</p>
                </div>
            </div>
        </div>
    );
}