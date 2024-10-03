import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../reducers/store";
import { addPoll } from "../actions/action";
import { AppState } from "../reducers/appReducer";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

const AddPoll = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: AppState) => state.auth.user);

  const handleSubmit = async () => {
    if (!optionOne || !optionTwo) {
      setError("Both options are required.");
      return;
    }

    if (!userLogin) {
      setError("You must be logged in to submit a poll.");
      return;
    }

    try {
      const newPoll = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: userLogin.id,
      };

      // Dispatch the add poll action
      dispatch(addPoll(newPoll));

      // Redirect to the home page after the poll is successfully created
      navigate("/");
    } catch (error) {
      console.error("Failed to add poll:", error);
      setError("Failed to create a new poll. Please try again.");
    }
  };

  return (
    <Box p={4}>
      <Paper
        elevation={3}
        sx={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create a New Poll
        </Typography>
        <Typography variant="h6" align="center">
          Would You Rather...
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextField
              label="Option One"
              variant="outlined"
              fullWidth
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Option Two"
              variant="outlined"
              fullWidth
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
            />
          </Grid>
        </Grid>
        {error && (
          <Typography variant="body1" color="error" mt={2}>
            {error}
          </Typography>
        )}
        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddPoll;
