import React, { useEffect, useState } from 'react';
import './NewPage.css';

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

        await fetch('http://localhost:8080/submit-form', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Received data:", data);
            let formattedPlan = data.dietPlan.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            setPlan(formattedPlan);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        getPlan(formData);
    }

    function handleClick() {
        setPlan("");
    }

    return (
        !plan ?
        (
            <div className="App">
                <h1>Enter the following details so that we can get started on your fitness journey.</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='input'
                        placeholder="Enter your age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className='input'
                        placeholder="Enter your gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className='input'
                        placeholder="Enter your height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className='input'
                        placeholder="Enter your current weight"
                        name="currentWeight"
                        value={formData.currentWeight}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className='input'
                        placeholder="Enter your target weight"
                        name="targetWeight"
                        value={formData.targetWeight}
                        onChange={handleChange}
                    />
                    <div className='text'>
                        <label htmlFor="medicalConditions">Do you have any existing medical conditions (e.g., diabetes, hypertension, allergies)?</label>
                        <textarea
                            name="medicalConditions"
                            id="medicalConditions"
                            value={formData.medicalConditions}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="allergies">Do you have any food allergies or intolerances?</label>
                        <textarea
                            name="allergies"
                            id="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="dietaryPref">Do you follow any specific dietary preferences (e.g., vegetarian, vegan, keto)?</label>
                        <textarea
                            name="dietaryPref"
                            id="dietaryPref"
                            value={formData.dietaryPref}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="eatingPref">Do you prefer cooking at home or eating out?</label>
                        <textarea
                            name="eatingPref"
                            id="eatingPref"
                            value={formData.eatingPref}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="activityLevel">How would you describe your physical activity level (e.g., sedentary, light, moderate, active)?</label>
                        <textarea
                            name="activityLevel"
                            id="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="exerciseRoutine">Do you have a regular exercise routine? If so, please describe it.</label>
                        <textarea
                            name="exerciseRoutine"
                            id="exerciseRoutine"
                            value={formData.exerciseRoutine}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="dietaryGoals">What are your dietary goals (e.g., weight loss, muscle gain, maintaining current weight, improving health)?</label>
                        <textarea
                            name="dietaryGoals"
                            id="dietaryGoals"
                            value={formData.dietaryGoals}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="foodAvoid">Are there any foods you dislike or prefer to avoid?</label>
                        <textarea
                            name="foodAvoid"
                            id="foodAvoid"
                            value={formData.foodAvoid}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='text'>
                        <label htmlFor="budget">Do you have a budget for groceries and food expenses?</label>
                        <textarea
                            name="budget"
                            id="budget"
                            value={formData.budget}
                            onChange={handleChange}
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
        :
        (
            <div className='plan'>
                <h1>We have curated a plan for you:</h1>
                <div
                    className="diet-plan"
                    dangerouslySetInnerHTML={{ __html: plan }}
                />
                <button onClick={handleClick}>Go Back</button>
            </div>
        )
    );
}

export default NewPage;
