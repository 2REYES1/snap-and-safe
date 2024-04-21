import './Dashboard.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';


export default function Dashboard() {
    const navigate = useNavigate();
    function onClickPills() {
        navigate('/pillCheck');
    }
    function onClickFood() {
        navigate('/foodCheck');
    }
    return (
        <div className={"dash"}>
            <div className={"logo"}>
                SNAP <span style={{ fontWeight: '250' }}>&</span>&nbsp;SAFE
            </div>
            <div className='button-align'>
                <button id={"clickPills"} onClick={onClickPills}>
                    <p>check pills</p>
                </button>
            </div>
            <div className='box-center'>
                <button id={"clickFood"} onClick={onClickFood}>
                    <p>check food label</p>
                </button>
            </div>
    
        </div>
    );
}