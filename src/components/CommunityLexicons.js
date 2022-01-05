import { Container, Typography, Grid } from "@mui/material";

import Word from "./Word";

function CommunityLexicons({ lexicons }) {
    return (
        <Container>
            <Grid container spacing={12}>
                <Grid item xs={12}>
                    <Typography variant="h1">Community Lexicons</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Word customizable={true} lexicons={lexicons} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default CommunityLexicons;
