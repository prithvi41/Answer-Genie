const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // To load environment variables from .env file

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Function to generate the diet plan based on user responses
async function generateDietPlan(context) {
    const fullPrompt = `${context}\n\nPlease provide a professional and detailed diet plan for the user based on the provided information. Ensure the response is structured, informative, and sounds like it's from a certified dietitian or nutritionist.`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

// Function to format the context based on user responses
function formatContext(data) {
    let context = "The user provided the following information:\n";
    context += `Age: ${data.age}\n`;
    context += `Gender: ${data.gender}\n`;
    context += `Height: ${data.height}\n`;
    context += `Current Weight: ${data.currentWeight}\n`;
    context += `Target Weight: ${data.targetWeight}\n`;
    context += `Medical Conditions: ${data.medicalConditions}\n`;
    context += `Allergies: ${data.allergies}\n`;
    context += `Dietary Preferences: ${data.dietaryPref}\n`;
    context += `Eating Preferences: ${data.eatingPref}\n`;
    context += `Activity Level: ${data.activityLevel}\n`;
    context += `Exercise Routine: ${data.exerciseRoutine}\n`;
    context += `Dietary Goals: ${data.dietaryGoals}\n`;
    context += `Foods to Avoid: ${data.foodAvoid}\n`;
    context += `Budget: ${data.budget}\n`;
    return context;
}

// Function to handle incoming data and generate the diet plan
async function handleIncomingData(data) {
    const context = formatContext(data);
    const dietPlan = await generateDietPlan(context);
    return dietPlan;
}

module.exports = { handleIncomingData };
