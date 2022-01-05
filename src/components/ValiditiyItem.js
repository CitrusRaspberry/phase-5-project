import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from "@mui/icons-material/Cancel";

function ValidityItem({ text, isValid }) {
    const Icon = ({ isValid }) => {
        if (isValid) {
            return <CheckCircleIcon color="success" />;
        } else {
            return <CancelIcon color="error" />;
        }
    };
    return (
        <ListItem>
            <ListItemAvatar>
                <Icon isValid={isValid} />
            </ListItemAvatar>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default ValidityItem;
