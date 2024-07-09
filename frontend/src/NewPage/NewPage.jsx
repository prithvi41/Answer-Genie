import React, { useEffect, useState } from 'react';

const NewPage = () => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
    }, []);

    return (
        <div>
            <h1>Hi {email}, this email is from sign in form</h1>
        </div>
    );
}

export default NewPage;
