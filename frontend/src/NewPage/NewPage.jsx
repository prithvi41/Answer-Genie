// NewPage.jsx

import React, { useState } from 'react';
import './NewPage.css';
import Header from "../Footer_Header/Header"; // Assuming you have a Header component
import Footer from "../Footer_Header/footer";

const NewPage = () => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        height: "",
        currentWeight: "",
        targetWeight: "",
        medicalConditions: "",
        allergies: "",
        dietaryPref: "",
        eatingPref: "",
        activityLevel: "",
        exerciseRoutine: "",
        dietaryGoals: "",
        foodAvoid: "",
        budget: ""
    });

    const [plan, setPlan] = useState("");

    function handleChange(event) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    }

    const getPlan = async (data) => {
        console.log("Sending data:", JSON.stringify(data));

        try {
            const response = await fetch('http://localhost:8080/submit-form', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const responseData = await response.json();
            let formattedPlan = responseData.dietPlan.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            setPlan(formattedPlan);
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('An error occurred while fetching data. Please try again later.');
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        getPlan(formData);
    }

    function handleClick() {
        setPlan("");
    }

    return (
        <div className="epic-container">
            <Header /> {/* Include your Header component here */}
            <h1>Welcome to Your Epic Fitness Adventure!</h1>
            {!plan ? (
                
                <form className="epic-form" onSubmit={handleSubmit}>
                    
                    <div className="epic-section">
                        <h2 className="epic-section-title">Basic Information</h2>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="age">How many trips around the sun?</label>
                            <input
                                type="text"
                                className="epic-input"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="e.g., 25"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="gender">Gender: (Tell us who you are!)</label>
                            <input
                                type="text"
                                className="epic-input"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                placeholder="e.g., Awesome"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="height">Height: (How tall are you in bananas?)</label>
                            <input
                                type="text"
                                className="epic-input"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                placeholder="e.g., 175 cm"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="currentWeight">Current Weight: (In stones or feathers?)</label>
                            <input
                                type="text"
                                className="epic-input"
                                id="currentWeight"
                                name="currentWeight"
                                value={formData.currentWeight}
                                onChange={handleChange}
                                placeholder="e.g., 70 kg"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="targetWeight">Target Weight: (Dream big!)</label>
                            <input
                                type="text"
                                className="epic-input"
                                id="targetWeight"
                                name="targetWeight"
                                value={formData.targetWeight}
                                onChange={handleChange}
                                placeholder="e.g., 65 kg"
                            />
                        </div>
                    </div>
                    <div className="epic-section">
                        <h2 className="epic-section-title">Health & Lifestyle</h2>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="medicalConditions">Any cool superpowers or health conditions we should know about?</label>
                            <textarea
                                id="medicalConditions"
                                name="medicalConditions"
                                value={formData.medicalConditions}
                                onChange={handleChange}
                                placeholder="e.g., Laser vision, allergies to kryptonite"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="allergies">Any food villains you need us to watch out for?</label>
                            <textarea
                                id="allergies"
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                placeholder="e.g., Mustache-twirling gluten, lactose intolerance"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="dietaryPref">Any specific food sidekicks? (e.g., Vegetarian, vegan, keto)</label>
                            <textarea
                                id="dietaryPref"
                                name="dietaryPref"
                                value={formData.dietaryPref}
                                onChange={handleChange}
                                placeholder="e.g., Avocado aficionado, tofu tamer"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="eatingPref">Do you prefer cooking at home or going on food quests?</label>
                            <textarea
                                id="eatingPref"
                                name="eatingPref"
                                value={formData.eatingPref}
                                onChange={handleChange}
                                placeholder="e.g., Master chef or tavern explorer?"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="activityLevel">What's your agility level in the real world? (e.g., Couch potato, parkour pro)</label>
                            <textarea
                                id="activityLevel"
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                placeholder="e.g., Agile ninja"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="exerciseRoutine">Is your workout secret more classified than Area 51?</label>
                            <textarea
                                id="exerciseRoutine"
                                name="exerciseRoutine"
                                value={formData.exerciseRoutine}
                                onChange={handleChange}
                                placeholder="e.g., 100 push-ups every hour"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="dietaryGoals">Are you questing for treasure? (e.g., Weight loss, muscle gains, health upgrade)</label>
                            <textarea
                                id="dietaryGoals"
                                name="dietaryGoals"
                                value={formData.dietaryGoals}
                                onChange={handleChange}
                                placeholder="e.g., Become Captain America"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="foodAvoid">Do you have a nemesis food? (e.g., Kale nemesis)</label>
                            <textarea
                                id="foodAvoid"
                                name="foodAvoid"
                                value={formData.foodAvoid}
                                onChange={handleChange}
                                placeholder="e.g., Bitter broccoli, evil eggplants"
                                className="epic-textarea"
                            />
                        </div>
                        <div className="epic-field">
                            <label className="epic-label" htmlFor="budget">What's your gold reserve for food adventures?</label>
                            <textarea
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder="e.g., Gold coins, doubloons"
                                className="epic-textarea"
                            />
                        </div>
                    </div>
                    <button className="epic-button">Embark on the Journey!</button>
                </form>
            ) : (
                <div className="plan">
                    <h1>We have curated a plan for you:</h1>
                    <div
                        className="diet-plan"
                        dangerouslySetInnerHTML={{ __html: plan }}
                    />
                    <button onClick={handleClick}>Go Back</button>
                </div>
            )}
            <Footer /> {/* Include your Footer component here */}
        </div>
    );
}

export default NewPage;
