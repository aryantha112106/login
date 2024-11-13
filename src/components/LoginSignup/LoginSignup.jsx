import React, { useState } from 'react';
import './LoginSignup.css';

import user_icon from '../assets/user.png.png';
import email_icon from '../assets/email.png.png';
import password_icon from '../assets/password.png.png';

export const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    // Handle input changes for both signup and login forms
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (action === "Sign Up") {
            setUserData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setLoginData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Handle signup
    const handleSignup = () => {
        if (userData.email && userData.password && userData.name) {
            localStorage.setItem("user", JSON.stringify(userData));
            setMessage("Signup successful! Please login.");
            setAction("Login");
            setUserData({ name: "", email: "", password: "" });
        } else {
            setMessage("Please fill in all fields.");
        }
    };

    // Handle login
    const handleLogin = () => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser && savedUser.email === loginData.email && savedUser.password === loginData.password) {
            alert("Login successful!");
          window.location.href = "https://rococo-fudge-8f2665.netlify.app/"

        } else {
            setMessage("Invalid email or password.");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="User Icon" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                )}

                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Id"
                        value={action === "Sign Up" ? userData.email : loginData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={action === "Sign Up" ? userData.password : loginData.password}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            {action === "Login" && (
                <div className="forget-password">
                    Lost Password? <span>Click Here</span>
                </div>
            )}
            <div className="submit-container">
                {action === "Sign Up" ? (
                    <div className="submit" onClick={handleSignup}>
                        Sign Up
                    </div>
                ) : (
                    <div className="submit" onClick={handleLogin}>
                        Login
                    </div>
                )}
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction(action === "Sign Up" ? "Login" : "Sign Up");
                        setMessage("");
                    }}
                >
                    {action === "Sign Up" ? "Login" : "Sign Up"}
                </div>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};
