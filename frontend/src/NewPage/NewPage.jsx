import React, { useEffect, useState } from 'react';
import Header from '../Footer_Header/Header';
import Footer from '../Footer_Header/footer';
const NewPage = () => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
    }, []);

    return (
        <div>
            <Header/>
            <h1>Hi {email}, this email is from sign in form</h1>
            <Footer/>
        </div>
    );
}

export default NewPage;
