import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './SigninSignup/Signin';
import Signup from './SigninSignup/Signup';
import NewPage from './NewPage/NewPage'; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newpage" element={<NewPage />} /> {/* Add this route */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
