import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";

let theme = createTheme({
    typography: {
        h1: {
            marginTop: "1em",
        },
        h2: {
            marginBottom: "0.5em",
        },
    },
    components: {
        Paper: {
            styleOverrides: {
                root: {
                    margin: "10px",
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#243E36",
        },
        secondary: {
            main: "#F1F7ED",
        },
        tertiary: {
            main: "#7CA982",
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
