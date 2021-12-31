import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import Word from "./Word";

function Home() {
    
    
    return (
        <>
            <Typography variant="h1">Word Generator</Typography>
            <Typography variant="p">
                Welcome to the Word Generator App! This app algorithmically
                 generates words that look like English words, and do 
                 <em>not</em> already exist in the English dictionary. 
                 How does it work? <Link to="/how-it-works">Click here to see!</Link> 
                 If you want to see it in action, see below! ⬇️
            </Typography>
            <Typography variant="h2">See it in action!</Typography>
            <Word />
            
        </>
    )
}

export default Home;