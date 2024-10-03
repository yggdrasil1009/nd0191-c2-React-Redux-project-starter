import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../reducers/store";
import { _getQuestions, _getUsers } from "../database/_DATA";
import { User } from "database/_DATA";
import { voteOnPoll } from "../actions/action";
import { AppState } from "../reducers/appReducer";
import {
  Box,
  Typography,
  Avatar,
  Button,
  LinearProgress,
  Grid,
} from "@mui/material";

const PollDetails = () => {
  const { question_id } = useParams<{ question_id?: string }>();
  const [poll, setPoll] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<
    "optionOne" | "optionTwo" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [avtAthor, setAvtAuthor] = useState("");
  const userLogin = useSelector((state: AppState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!userLogin) {
      navigate("/login");
    }

    if (question_id) {
      // Fetch the poll data based on question_id
      _getQuestions().then((questions) => {
        const question = questions[question_id];
        if (!question) {
          setNotFound(true);
        } else {
          setPoll(question);
        }

        if (userLogin && question.author === userLogin.id) {
          setAvtAuthor(userLogin.avatarURL.slice(1));
        } else {
          _getUsers().then((allUsers: Record<string, User>) => {
            const usersArray = Object.values(allUsers);
            // Find the user who matches the question's author
            const authorUser = usersArray.find(
              (user) => user.id === question.author
            );

            if (authorUser) {
              setAvtAuthor(authorUser.avatarURL.slice(1)); // Set the avatar if the author is found
            } else {
              setAvtAuthor(""); // Set an empty avatar
            }
          });
        }

        if (userLogin) {
          if (question.optionOne.votes.includes(userLogin.id)) {
            setSelectedOption("optionOne");
          } else if (question.optionTwo.votes.includes(userLogin.id)) {
            setSelectedOption("optionTwo");
          }
        }

        setLoading(false);
      });
    }
  }, [question_id, userLogin, navigate]);

  const handleVote = () => {
    if (!question_id || !selectedOption || !userLogin?.id) {
      console.error("Missing required data for voting", [
        question_id,
        selectedOption,
        userLogin,
      ]);
      return;
    }

    // Dispatch the vote action
    dispatch(voteOnPoll(question_id!, selectedOption!, userLogin.id));
  };

  if (loading) return <LinearProgress />; // Show loading spinner
  if (notFound)
    return <Typography variant="h4">404 - Poll Not Found</Typography>; // Show 404 if poll not found

  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;
  const optionOnePercentage = (
    (poll.optionOne.votes.length / totalVotes) *
    100
  ).toFixed(1);
  const optionTwoPercentage = (
    (poll.optionTwo.votes.length / totalVotes) *
    100
  ).toFixed(1);

  const userVote = userLogin
    ? poll.optionOne.votes.includes(userLogin.id)
      ? "optionOne"
      : poll.optionTwo.votes.includes(userLogin.id)
      ? "optionTwo"
      : null
    : null;

  return (
    <Box p={4}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Typography variant="h4" textAlign="center">
          Poll by {poll.author}
        </Typography>
        <Avatar
          alt={poll.author}
          src={avtAthor}
          sx={{ width: 200, height: 200 }}
        />
        <Typography variant="h5" textAlign="center">
          Would You Rather
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant={userVote === "optionOne" ? "contained" : "outlined"}
            color={userVote === "optionOne" ? "primary" : "inherit"}
            fullWidth
            onClick={() => setSelectedOption("optionOne")}
            sx={{
              borderRadius: 0,
              backgroundColor:
                selectedOption === "optionOne" ? "green" : "inherit",
              "&:hover": {
                backgroundColor:
                  selectedOption === "optionOne" ? "green" : "lightgray",
              },
            }}
          >
            {poll.optionOne.text}
          </Button>
          {userVote && (
            <Box mt={1}>
              <Typography variant="body1">
                {poll.optionOne.votes.length} out of {totalVotes} votes (
                {optionOnePercentage}%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={parseFloat(optionOnePercentage)}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant={userVote === "optionTwo" ? "contained" : "outlined"}
            color={userVote === "optionTwo" ? "primary" : "inherit"}
            fullWidth
            onClick={() => setSelectedOption("optionTwo")}
            sx={{
              borderRadius: 0,
              backgroundColor:
                selectedOption === "optionTwo" ? "green" : "inherit",
              "&:hover": {
                backgroundColor:
                  selectedOption === "optionTwo" ? "green" : "lightgray",
              },
            }}
          >
            {poll.optionTwo.text}
          </Button>
          {userVote && (
            <Box mt={1}>
              <Typography variant="body1">
                {poll.optionTwo.votes.length} out of {totalVotes} votes (
                {optionTwoPercentage}%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={parseFloat(optionTwoPercentage)}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      {!userVote && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVote}
            disabled={!selectedOption}
          >
            Submit Vote
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PollDetails;
