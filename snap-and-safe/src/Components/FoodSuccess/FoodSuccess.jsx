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
                    back
                </button>
            </div>
            <div className={"box-center"}>
                <div className={"upload-box box-center"}>
                    <p style = {{fontSize: '14pt', fontWeight: '300', fontStyle: 'italic', margin: '5px'}}>image successfully uploaded</p>
                    <p style = {{fontSize: '23pt', fontWeight: '900', margin: '5px', marginBottom: '10px'}}>select food label attribute:</p>
                    {/* <p style={{fontSize: "2vh"}}>{labelAttr}</p> */}
                    <div className={"attribute-boxes"}>
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
                    {/* <p>{selectedAttribute && `${selectedAttribute}: ${labelAttr[selectedAttribute]}`}</p> */}
                    <p>
                    {selectedAttribute && (
                        <>
                        <span style={{ fontWeight: '300', fontSize: '42pt' }}>{selectedAttribute}:</span>&nbsp;
                        <span style={{ fontSize: '45pt' }}>{labelAttr[selectedAttribute]}</span>
                        </>
                    )}
                    </p>

                </div>
            </div>
        </div>
    );
}