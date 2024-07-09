import { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "../config/Axios";
import Footer from "../Footer_Header/footer";
import Header from "../Footer_Header/Header";
import "./Signin.css";

const Signin = () => {
    const [user_name, setEmail] = useState("");
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
            localStorage.setItem("email", user_name); // Store email in localStorage
            navigate("/newpage");
        } catch (err) {
            console.log('Error:', err); // Debug error
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
            <Header/>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="user name"
                    value={user_name}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <button type="button" onClick={() => navigate("/signup")}>Sign Up</button>
            </form>
            <Footer/>
        </div>
    );
}

export default Signin;
