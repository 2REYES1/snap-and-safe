import './Email.css';
import axios from 'axios';
import * as React from 'react';
import EmailInputForm from './EmailInputForm';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Email() {
    return (
        <div>
            <EmailInputForm/>
        </div>

    );
}