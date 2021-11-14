import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import { useUploadForm } from "./hooks";

interface PostData {
  title: string;
  body: string;
  image: File | null;
}

const Form: React.FunctionComponent = () => {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    image: null,
  });

  const { isLoading, isSuccess, uploadForm, progress } = useUploadForm(
    "http://localhost:5000/post"
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      title: event.target.value,
    }));
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      body: event.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      image: event.target.files ? event.target.files[0] : null,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("body", formValues.body);
    formValues.image && formData.append("image", formValues.image);
    return await uploadForm(formData);
  };

  return (
    <Box
      display="flex"
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box marginY={2}>
        <TextField
          onChange={handleTitleChange}
          value={formValues.title}
          label="Post Title"
          name="title"
        />
      </Box>
      <Box marginY={2}>
        <TextField
          onChange={handleBodyChange}
          multiline
          minRows={5}
          label="Post Body"
          name="body"
        />
      </Box>
      <Button variant="contained" component="label">
        {formValues.image?.name ?? "Upload File"}
        <input type="file" onChange={handleImageChange} hidden />
      </Button>
      <Box marginY={3}>
        {isSuccess ? (
          <Box color="success.main" display="flex">
            <CheckIcon color="success" />
            <Typography>Success</Typography>
          </Box>
        ) : (
          <>
            <Button onClick={handleSubmit}>Submit Post </Button>
            <LinearProgress variant="determinate" value={progress} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Form;
