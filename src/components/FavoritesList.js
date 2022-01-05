import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function FavoritesList({ faveWords, handleFaveDelete }) {
    return (
        <List>
            <Container maxWidth="md">
            {faveWords.map((wordObj) => (
                <React.Fragment key={wordObj.id}>
                    <ListItem
                        secondaryAction={
                            <IconButton 
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleFaveDelete(wordObj)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={wordObj.word} />
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            ))}
            </Container>
        </List>
    );
}

export default FavoritesList;
