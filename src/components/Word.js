import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { Grid, Paper, Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

const cardStyle = {
    backgroundColor: "lightblue",
};
const cardActionStyle = {
    justifyContent: "center",
};
const buttonStyle = {
    backgroundColor: "white",
};

function Word({ customizable }) {
    const [word, setWord] = useState({
        value: "loading...",
        loading: true,
    });
    const [selections, setSelections] = useState({
        name: "example",
        length: "auto",
    });
    const [reload, setReload] = useState(0);
    const [allNames, setAllNames] = useState(["example"]);

    const reloadWord = () => setReload(() => reload + 1);
    useEffect(() => {
        if (!word.loading) {
            setWord({
                ...word,
                loading: true,
            });
        }
        const controller = new AbortController();
        const signal = controller.signal;
        const len = selections.length;
        const lengthPath = len === "auto" ? "" : `/${len}`;
        fetch(
            `https://word-generator-app.herokuapp.com/random_word/${selections.name}${lengthPath}`,
            {
                method: "GET",
                signal: signal,
            }
        )
            .then((r) => r.json())
            .then((data) =>
                setWord({
                    value: data[0],
                    loading: false,
                })
            )
            .catch((error) =>
                console.log("Fetching the word failed... ==>", error)
            );
        return function cleanup() {
            controller.abort();
        };
    }, [reload, selections]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch("https://word-generator-app.herokuapp.com/lexicons", {
            method: "GET",
            signal: signal,
        })
            .then((r) => r.json())
            .then((data) => setAllNames(data.map((row) => row.name).sort()))
            .catch((error) =>
                console.log("Fetching all Lexicon names failed... ==>", error)
            );
        return function cleanup() {
            controller.abort();
        };
    }, []);

    const getNameOptions = (allNames) => {
        let prevLetter = "";
        const returnedArr = [];
        allNames.forEach((name) => {
            if (name[0] !== prevLetter) {
                returnedArr.push(
                    <ListSubheader key={name[0]}>{name[0]}</ListSubheader>
                );
                returnedArr.push(
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                );
                prevLetter = name[0];
            } else {
                returnedArr.push(
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                );
            }
        });
        return returnedArr;
    };
    const getLengthOptions = (min, max) => {
        const returnedArr = [
            <MenuItem key={"auto"} value={"auto"}>
                auto
            </MenuItem>,
        ];
        for (let i = min; i <= max; i++) {
            returnedArr.push(
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            );
        }
        return returnedArr;
    };

    return (
        <Paper sx={{ minWidth: 275 }}>
            <Card style={cardStyle} variant="outlined">
                {customizable && (
                    <CardActions>
                        <Grid item xs={12} md={6}>
                            <InputLabel>Select Lexicon Name</InputLabel>
                            <Select
                                fullWidth
                                style={buttonStyle}
                                value={selections.name}
                                onChange={(e) =>
                                    setSelections({
                                        ...selections,
                                        name: e.target.value,
                                    })
                                }
                            >
                                {getNameOptions(allNames)}
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel>Choose desired length</InputLabel>
                            <Select
                                fullWidth
                                style={buttonStyle}
                                value={selections.length}
                                onChange={(e) =>
                                    setSelections({
                                        ...selections,
                                        length: e.target.value,
                                    })
                                }
                            >
                                {getLengthOptions(3, 20)}
                            </Select>
                        </Grid>
                    </CardActions>
                )}
                <Grid item xs={12}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {word.value}
                        </Typography>
                    </CardContent>
                    <CardActions style={cardActionStyle}>
                        <LoadingButton
                            style={buttonStyle}
                            loading={word.loading}
                            loadingPosition="start"
                            startIcon={<ShortTextIcon />}
                            variant="outlined"
                            size="large"
                            onClick={() => {
                                setWord(() => ({
                                    ...word,
                                    loading: true,
                                }));
                                reloadWord();
                            }}
                        >
                            Get New Word
                        </LoadingButton>
                    </CardActions>
                </Grid>
            </Card>
        </Paper>
    );
}

export default Word;
