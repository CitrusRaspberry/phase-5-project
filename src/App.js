import './App.css';
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import HowItWorks from './components/HowItWorks';
import CreateYourOwn from './components/CreateYourOwn';
import CommunityLexicons from "./components/CommunityLexicons";
import { useEffect, useState } from 'react';

function App() {
    const [ lexicons, setLexicons ] = useState([{ name: "example" }]);
    console.log("LEXINAMEs", lexicons)
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch("https://word-generator-app.herokuapp.com/lexicons", {
            method: "GET",
            signal: signal,
        })
            .then((r) => r.json())
            .then((data) => setLexicons(data.sort((a, b) => a.name - b.name)))
            .catch((error) =>
                console.log("Fetching all Lexicon names failed... ==>", error)
            );
        return function cleanup() {
            controller.abort();
        };
    }, [])
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/how-it-works" element={<HowItWorks />}/>
                <Route path="/create-your-own" element={<CreateYourOwn
                    lexiconsState={[ lexicons, setLexicons ]}
                />}/>
                <Route path="/community-lexicons" element={<CommunityLexicons
                    lexicons={lexicons}
                />}/>
                <Route path="/for-developers" element={<p>dev</p>}/>
            </Routes>
        </div>
    );
}

export default App;
