import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom
import Axios from "../config/Axios"; // Adjust import path as per your project structure
import Footer from "../Footer_Header/footer"; // Adjust import path as per your project structure
import LockIcon from "../logo.png"; // Import your logo image
import "./Signin.css"; // Import Signin.css for consistent styling

const Signup = () => {
    const navigate = useNavigate();

    const [user_name, setUserName] = useState("");
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
            if (res.status === 201) {
                navigate("/signin"); // Redirect to signin page after successful registration
            } else {
                alert("User data is not valid"); // Handle other status codes or errors
            }
        } catch (err) {
            setError(err.response.data.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin">
            <div className="signin-content">
                <img src={LockIcon} alt="Lock Icon" className="logo" style={{ width: '140px', height: 'auto' }} /> {/* Use your logo here */}
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Enter User Name"
                                value={user_name}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                placeholder="Username@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-container">
                            <input
                                type="password"
                                name="password"
                                placeholder="············"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="login" disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                    {error && <span className="error">{error}</span>}
                </form>
            </div>
            <Footer /> {/* Include Footer component at the bottom */}
        </div>
    );
}

export default Signup;
