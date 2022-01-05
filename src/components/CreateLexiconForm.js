import {
    Input,
    InputLabel,
    TextField,
    Grid,
    Paper,
    Container,
    List,
    Alert,
    AlertTitle,
    Stack,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ValidityItem from "./ValiditiyItem";

function CreateLexiconForm() {
    const [showAlert, setShowAlert] = useState({
        success: false,
        failure: false,
    });
    const [allLexiconNames, setAllLexiconNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        lexiconName: {
            blank: true,
            inUse: false,
            notValid: false,
        },
        fileData: {
            csv: true,
            json: true,
        },
    });
    const [formData, setFormData] = useState({
        lexiconName: "",
        fileData: null,
    });
    const anyNameErrors = Object.values(errors.lexiconName).find((er) => er);
    const anyFileErrors = Object.values(errors.fileData).find((er) => er);
    const handleNameChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
        const valueIsValid = value.search(/[^a-zA-Z0-9-_]/) === -1;
        const valueIsUnique = allLexiconNames.indexOf(value) < 0;
        setErrors({
            ...errors,
            lexiconName: {
                blank: !value,
                inUse: !valueIsUnique,
                notValid: !valueIsValid,
            },
        });
        if (showAlert.success) {
            setShowAlert(() => ({
                ...showAlert,
                success: false
            }))
        }
    };
    // console.log("DATA", formData)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            let data;
            let cause;
            let message;
            const fn = file.name;
            const fileExt = fn.slice(fn.search(/\.[a-z]+$/i)).toLowerCase();
            switch (fileExt) {
                case ".csv":
                    const csv = reader.result;
                    if (csv.search(",") >= 0) {
                        message =
                            "CSV file must not contain any commas, because all words should be contained in a single column.";
                        data = null;
                        cause = "csv";
                        break;
                    }
                    data = csv.split("\n").filter((w) => w !== "");
                    break;
                case ".json":
                    const parsedJSON = JSON.parse(reader.result);
                    if (!(parsedJSON instanceof Array)) {
                        message =
                            "JSON file must contain an array/list, not an object/hash/dictionary.";
                        data = null;
                        cause = "json";
                        break;
                    } else if (parsedJSON.find((l) => l instanceof Object)) {
                        message =
                            "JSON file contents must only be one layer deep.";
                        data = null;
                        cause = "json";
                        break;
                    }
                    data = parsedJSON.filter((w) => w !== "");
                    break;
                default:
                    message = `Only .json and .csv files are accepted. You uploaded a ${fileExt} file type.`;
                    break;
            }
            setFormData(() => ({
                ...formData,
                fileData: data,
            }));
            setErrors(() => ({
                ...errors,
                fileData: {
                    [cause]: !data,
                },
            }));
            setShowAlert(() => ({
                success: false,
                failure: message,
            }));
        };
        reader.readAsText(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (anyFileErrors || anyNameErrors) {
            alert(
                "You must fill out all fields and resolve all errors before submitting."
            );
        } else {
            setIsLoading(true);
            const body = {
                name: formData.lexiconName,
                words: formData.fileData,
            };
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
            };
            fetch("https://word-generator-app.herokuapp.com/lexicons", config)
                .then((r) => r.json())
                .then((data) => {
                    setFormData(() => ({
                        ...formData,
                        lexiconName: "",
                    }));
                    setErrors(() => ({
                        ...errors,
                        lexiconName: {
                            ...errors.lexiconName,
                            blank: true,
                        },
                    }));
                    setIsLoading(() => false);
                    setShowAlert(() => ({
                        success: true,
                        failure: false,
                    }));
                })
                .catch((error) =>
                    console.log(
                        "POST error when creating new lexicon... ==>",
                        error
                    )
                );
        }
    };
    useEffect(() => {
        fetch("https://word-generator-app.herokuapp.com/lexicons")
            .then((r) => r.json())
            .then((data) => setAllLexiconNames(data.map((l) => l.name)))
            .catch((error) =>
                console.log("Could not grab all lexicons from server...", error)
            );
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            <Paper elevation={12}>
                <Container>
                    <Grid container spacing={8}>
                        {showAlert.success && (
                            <Grid item xs={12}>
                                <Stack
                                    sx={{ width: "100%", textAlign: "left" }}
                                    spacing={2}
                                >
                                    <Alert severity="success">
                                        Upload to the database was successful! See it on the <Link to="/community-lexicons">Community Lexicons</Link> page.
                                    </Alert>
                                </Stack>
                            </Grid>
                        )}

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="lexiconName"
                                label="Lexicon Name"
                                variant="filled"
                                helperText={
                                    anyNameErrors && "Name is not valid"
                                }
                                onChange={(e) => handleNameChange(e)}
                                value={formData.lexiconName}
                                error={anyNameErrors}
                                fullWidth
                            />
                            <List>
                                <ValidityItem
                                    text="Name cannot be blank."
                                    isValid={!errors.lexiconName.blank}
                                />
                                <ValidityItem
                                    text="Name cannot already be in use."
                                    isValid={!errors.lexiconName.inUse}
                                />
                                <ValidityItem
                                    text="Only valid characters are letters, numbers, '-', and '_'."
                                    isValid={!errors.lexiconName.notValid}
                                />
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {showAlert.failure ? (
                                <Stack
                                    sx={{ width: "100%", textAlign: "left" }}
                                    spacing={2}
                                >
                                    <Alert severity="error">
                                        <AlertTitle>File Error</AlertTitle>
                                        {showAlert.failure}
                                    </Alert>
                                </Stack>
                            ) : (
                                <InputLabel>
                                    Please choose a CSV or json file containing
                                    words
                                </InputLabel>
                            )}
                            <Input
                                name="file"
                                label="Upload File"
                                type="file"
                                onChange={(e) => handleFileChange(e)}
                                error={anyFileErrors}
                                fullWidth
                            />
                            <InputLabel>File upload check-list:</InputLabel>
                            <List>
                                <ValidityItem
                                    text="For CSV, use one column with no headers."
                                    isValid={!errors.fileData.csv}
                                />
                                <ValidityItem
                                    text="For json, let the structure be an array only
                                    a single layer deep."
                                    isValid={!errors.fileData.json}
                                />
                            </List>
                        </Grid>
                        <Grid item xs={12} m={2}>
                            <LoadingButton
                                variant="outlined"
                                type="submit"
                                size="large"
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<UploadIcon />}
                            >
                                Upload
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </form>
    );
}

export default CreateLexiconForm;
