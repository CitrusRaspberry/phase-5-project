import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from "@mui/material/Typography";
import ShortTextIcon from '@mui/icons-material/ShortText';

import { useState, useEffect } from "react";

const cardStyle = {
    backgroundColor: "lightblue"
}
const cardActionStyle = {
    justifyContent: "center"
}
const buttonStyle = {
    backgroundColor: "white",
}

function Word() {
    const [ word, setWord ] = useState("loading...");
    const [ reload, setReload ] = useState(0)
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        fetch("https://word-generator-app.herokuapp.com/random_word", {
            method: "GET",
            signal: signal,
        })
        .then((r) => r.json())
        .then((data) => {
            setWord(() => data[0])
            setLoading(() => false)
        })
        .catch((error) => console.log(error));
        return function cleanup() { controller.abort(); }
    }, [reload]);
    
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card style={cardStyle} variant="outlined">
                <CardActions></CardActions>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {word}
                    </Typography>
                </CardContent>
                <CardActions
                    style={cardActionStyle}
                >
                    <LoadingButton 
                        style={buttonStyle}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<ShortTextIcon />}
                        variant="outlined"
                        size="large"
                        onClick={() => {
                            setLoading(() => true)
                            setReload(() => reload + 1)
                        }}
                    >
                        Get New Word
                    </LoadingButton>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Word;
