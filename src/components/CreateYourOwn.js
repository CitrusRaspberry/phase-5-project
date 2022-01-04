import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";

import CreateLexiconForm from "./CreateLexiconForm";

function CreateYourOwn() {
    return (
        <Container>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="h1">Create Your Own!</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="p">
                        Here, you can add to the public database by adding your
                        own collection of words (
                        <a target="_blank" href="https://www.google.com/search?q=what+is+a+lexicon&oq=what+is+a+lexicon&aqs=chrome..69i57j0i512l9.1817j0j7&sourceid=chrome&ie=UTF-8">
                            a lexicon
                        </a>
                        ) for the algorithm to use as a base for creating fake
                        words. Simply give your collection a unique name,{" "}
                        <em>upload a csv or json file</em> containing your
                        collection of words, then go to the{" "}
                        <Link to="/community-lexicons">Community Lexicons</Link>{" "}
                        page and select your chosen name there.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CreateLexiconForm />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CreateYourOwn;
