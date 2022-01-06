import './App.css';
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import HowItWorks from './components/HowItWorks';
import CreateYourOwn from './components/CreateYourOwn';
import CommunityLexicons from "./components/CommunityLexicons";
import ForDevelopers from './components/ForDevelopers';
import { useEffect, useState } from 'react';

import theme from "./theme";


function App() {
    const [ lexicons, setLexicons ] = useState([{ name: "example" }]);
    const [ selections, setSelections ] = useState({
        lexicon: { name: "example" },
        length: "auto",
    });

    useEffect(() => {
        fetch("https://word-generator-app.herokuapp.com/lexicons")
            .then((r) => r.json())
            .then((data) => {
                const allLexicons = data.sort((a, b) => a.name - b.name);
                setSelections(() => ({
                    ...selections,
                    lexicon: allLexicons.find(l => l.name === "example"),
                }));
                setLexicons(() => allLexicons);
            })
            .catch((error) =>
                console.error("Fetching all Lexicon names failed... ==>", error)
            );
    }, [])
    
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/how-it-works" element={<HowItWorks />}/>
                    <Route path="/create-your-own" element={<CreateYourOwn
                        lexiconsState={[ lexicons, setLexicons ]}
                    />}/>
                    <Route path="/community-lexicons" element={<CommunityLexicons
                        lexicons={lexicons}
                        selectionsState={[selections, setSelections]}
                    />}/>
                    <Route path="/for-developers" element={<ForDevelopers />}/>
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
