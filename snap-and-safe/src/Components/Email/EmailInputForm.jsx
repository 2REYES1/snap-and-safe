import * as React from 'react';
import axios from 'axios';

export default function EmailInputForm() {
    async function emailSubmit(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        console.log("Email submitted:", email);
        axios.get('http://localhost:5000/email')
            .then(response => {
                console.log('Email sent:', response.data);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    }

    return (
        <form onSubmit={emailSubmit}>
            <label>
                Enter your email:
                <input type="email" name="email" />
                <br></br>
                <input type="time" name="time to take" />
            </label>
            <br></br>
            <button type="submit">Submit</button>
        </form>
    );
};