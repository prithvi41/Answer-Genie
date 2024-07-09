import React, { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "../config/Axios";
import "./Signup.css";
import Footer from "../Footer_Header/footer";
import Header from "../Footer_Header/Header";
const Signup = () => {
    const navigate = useNavigate();

    const [user_name, setuser_name] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await Axios.post("/register", {
                user_name,
                email,
                password,
            });
            if(res.status === 201){
                // alert("User registered successfully")
                navigate("/signin");
            }
            else alert("User data is not valid");
        } catch (err) {
            setError(err.response);
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <Header/>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="user_name"
                    value={user_name}
                    onChange={(e) => setuser_name(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                {error && <span className="error">{error}</span>}
            </form>
            <Footer/>
        </div>
    );
}

export default Signup;

