import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Paper, Grid } from "@mui/material";

function ForDevelopers() {
    return (
        <Container>
            <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Typography variant="h1">How To Use The API</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} m={2}>
                                <Typography variant="p">
                                    Want to use the Faker Word Maker tool for
                                    your own project? Using the link below, you
                                    can use either the default 'example' lexicon
                                    for random word generation, or you can
                                    upload your own on the{" "}
                                    <Link to="/create-your-own">
                                        Create Your Own
                                    </Link>{" "}
                                    page and use that lexicon in the API.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} m={2}>
                                <Typography variant="p">
                                    Simply use the URL provided below and change
                                    the endpoint as needed. For example, let's
                                    say you created a lexicon called
                                    'spanish-words'. To use it, replace
                                    'example' in the endpoint of
                                    '/random_word/example' with your lexicon
                                    name. It would look like this:
                                    '/random_word/spanish-words'. This will
                                    produce words using the 'spanish-words'
                                    lexicon with a random length between 3 and
                                    10 letters. To force it to be 5 letters (for
                                    example), use
                                    '/random_word/spanish-words/5'.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} m={2}>
                                <Typography variant="p">
                                    To use the API with 'example' lexicon:{" "}
                                    <Typography variant="p">
                                        https://word-generator-app.herokuapp.com/random_word/example
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} m={2}>
                                <Typography variant="p">
                                    To use the API with 'example' lexicon,
                                    forcing the word to be 5 letters long:{" "}
                                    <Typography variant="p">
                                        https://word-generator-app.herokuapp.com/random_word/example/5
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ForDevelopers;
