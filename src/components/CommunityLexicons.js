import { Container, Typography, Grid } from "@mui/material";

import Word from "./Word";

function CommunityLexicons() {
    return (
        <Container>
            <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Typography variant="h1">Community Lexicons</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Word customizable={true} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CommunityLexicons;
