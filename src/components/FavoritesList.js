import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    Container,
    Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function FavoritesList({ faveWords, handleFaveDelete }) {
    return (
        <Paper elevation={3}>
            <List sx={{ minWidth: 275 }}>
                <Container maxWidth="md">
                    {faveWords.map((wordObj, index) => (
                        <React.Fragment key={wordObj.id}>
                            {!!index && <Divider component="li" />}
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() =>
                                            handleFaveDelete(wordObj)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={wordObj.word} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </Container>
            </List>
        </Paper>
    );
}

export default FavoritesList;
