import React, { useState } from "react";
import "./SignupPage.css";
import RegistrationInput from "./RegistrationInput";
import {Link} from "react-router-dom";
import axios from "axios";


const App = () => {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirmPassword: "",
        secretWord: "",
    });

    const inputs = [
        {
            id: 1,
            name: "first_name",
            type: "text",
            placeholder: "Ex: John",
            errorMessage: "Please enter your first name.",
            label: "First Name",
            required: true,
        },
        {
            id: 2,
            name: "last_name",
            type: "text",
            placeholder: "Ex: Doe",
            errorMessage: "Please enter your last name.",
            label: "Last Name",
            required: true,
        },
        {
            id: 3,
            name: "username",
            type: "text",
            placeholder: "Ex: jdoe02",
            errorMessage:
                "Username must be 5-10 characters. No special characters!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{5,10}$",
            required: true,
        },
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "Ex: doe65@purdue.edu",
            errorMessage: "Please use a valid university email (.edu)!",
            label: "Email",
            required: true,
        },
        {
            id: 5,
            name: "birthday",
            type: "date",
            placeholder: "Birthday",
            label: "Birthday",
            required: true,
        },
        {
            id: 6,
            name: "password",
            type: "password",
            placeholder: "Enter A Password",
            errorMessage:
                "Password must be at least 5 characters and include at 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,20}$`,
            required: true,
        },
        {
            id: 7,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Your Password",
            errorMessage: "Passwords don't match! Please try again.",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
        {
            id: 8,
            name: "secretWord",
            type: "text",
            placeholder: "Ex: Name of first pet",
            label: "Secret Word",
            required: true,
        },
    ];

    async function registerUser (ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                email: values.email,
                birthday: values.birthday,
                password: values.password,
                secretWord: values.secretWord,
            })
            alert('Thank you for registering! Welcome to UNEST!');
        } catch (e){
            alert('Oops! Registration failed. Please try again.');
        }
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    function forgotPass (){
        alert("UH-OH, Forgot your Password!")
    }

    function completeForm (){
        alert("Thank you for Registering!")
    }

    function refreshPage(){
        window.location.reload(false);
    }


    return (
        <div className="app">
            <form onSubmit={registerUser}>
                <h1>Sign Up!</h1>
                {inputs.map((input) => (
                    <RegistrationInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <div className="text-center">
                    Already a member? <Link className="reg" to={'/login'} style={{fontWeight:"bold"}}>Sign In Now!</Link>
                </div>
                <button className="btn">Submit</button>
            </form>
        </div>
    );
};

export default App;