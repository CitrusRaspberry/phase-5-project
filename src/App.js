import './App.css';
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/how-it-works" element={<p>Products</p>}/>
                <Route path="/add-your-own" element={<p>add</p>}/>
                <Route path="/for-developers" element={<p>dev</p>}/>
            </Routes>
        </div>
    );
}

export default App;
