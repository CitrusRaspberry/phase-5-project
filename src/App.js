import './App.css';
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import HowItWorks from './components/HowItWorks';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/how-it-works" element={<HowItWorks />}/>
                <Route path="/add-your-own" element={<p>Products</p>}/>
                <Route path="/for-developers" element={<p>dev</p>}/>
            </Routes>
        </div>
    );
}

export default App;
