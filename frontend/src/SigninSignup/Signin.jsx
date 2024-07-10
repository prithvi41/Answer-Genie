import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../config/Axios";
import Footer from "../Footer_Header/footer";

import LockIcon from "../logo.png"; // Import your Lock icon

import "./Signin.css";

const Signin = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await Axios.post("/login", {
                user_name,
                password,
            });
            localStorage.setItem("token", JSON.stringify(res.data.accessToken));
            localStorage.setItem("email", user_name); // Store username in localStorage
            navigate("/newpage");
        } catch (err) {
            console.error('Error:', err); // Log the error for debugging
            if (err.response && err.response.data) {
                alert(err.response.data.message || "An error occurred");
            } else {
                alert("An unexpected error occurred.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="signin">
            
            <div className="signin-content">
                <img src={LockIcon} alt="Lock Icon" className="Logo" style={{ width: '140px', height: 'auto' }}/>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-container">
                            
                            <input
                                type="text"
                                placeholder="Username"
                                value={user_name}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-container">
                            
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="login" disabled={loading}>
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                    <button type="button" className="signup-button" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Signin;
