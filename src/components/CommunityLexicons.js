import { useState, useEffect } from "react";

import Word from "./Word";
import FavoritesList from "./FavoritesList";

import { Typography, Container, Grid } from "@mui/material";

function CommunityLexicons({ lexicons, selectionsState }) {
    const [selections, setSelections] = selectionsState;
    const [faveWords, setFaveWords] = useState([]);

    useEffect(() => {
        if (selections.lexicon.id) {
            const controller = new AbortController();
            const signal = controller.signal;
            fetch(
                `http://word-generator-app.herokuapp.com/lexicons/${selections.lexicon.id}`,
                {
                    method: "GET",
                    signal: signal,
                }
            )
                .then((r) => r.json())
                .then((data) => setFaveWords(data.favorite_words))
                .catch((error) =>
                    console.log("Failed to get fave words... ==>", error)
                );
            return function cleanup() {
                controller.abort();
            };
        }
    }, [selections.lexicon]);

    const handleFaveAdd = (word) => {
        const wordObj = faveWords.find((w) => w.word === word);
        if (!wordObj) {
            const body = { id: -1, word: word };
            const extendedWords = [...faveWords, body];
            setFaveWords(() => extendedWords);
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
            };
            fetch(
                `http://word-generator-app.herokuapp.com/lexicons/${selections.lexicon.id}`,
                config
            )
                .then((r) => r.json())
                .then((data) => {
                    console.log("ADDED FAVE", data);
                    setFaveWords(() =>
                        extendedWords.map((w) => (w.id < 0 ? data : w))
                    );
                })
                .catch((error) => {
                    console.error("Adding favorite word failed... ==>", error);
                    setFaveWords(() =>
                        faveWords.filter((w) => w.word !== body.word)
                    );
                });
        } else {
            handleFaveDelete(wordObj);
        }
    };

    const handleFaveDelete = (wordObj) => {
        const filteredWords = faveWords.filter((w) => w.id !== wordObj.id);
        setFaveWords(() => filteredWords);
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        fetch(
            `http://word-generator-app.herokuapp.com/lexicons/${selections.lexicon.id}/${wordObj.id}`,
            config
        )
            .then((r) => r.json())
            .then((data) => console.log("DELETED FAVE", data))
            .catch((error) => {
                console.error("Deleting favorite word failed... ==>", error);
                setFaveWords(() => [...filteredWords, wordObj]);
            });
    };

    return (
        <Container>
            <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Typography variant="h1">Community Lexicons</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Word
                        customizable={true}
                        lexicons={lexicons}
                        selectionsState={[selections, setSelections]}
                        handleFaveAdd={handleFaveAdd}
                        faveWords={faveWords}
                    />
                </Grid>
                {!!faveWords.length && (
                    <Grid item xs={12}>
                        <Typography variant="h2">
                            Community Favorites from '{selections.lexicon.name}'
                        </Typography>
                        <FavoritesList
                            handleFaveDelete={handleFaveDelete}
                            faveWords={faveWords}
                        />
                    </Grid>
                )}
                <Grid item xs={12}></Grid>
            </Grid>
        </Container>
    );
}

export default CommunityLexicons;
