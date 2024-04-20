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
                Snap & Safe
            </div>
            <div className={"dashButtons"}>
                <button id={"clickPills"} onClick={onClickPills}>
                    check pills
                </button>
                <button id={"clickFood"} onClick={onClickFood}>
                    check food label
                </button>
            </div>
        </div>
    );
}