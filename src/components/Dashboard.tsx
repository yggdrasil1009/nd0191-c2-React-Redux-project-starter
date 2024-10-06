import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Questions, Question } from "database/_DATA";
import { _getQuestions } from "../database/_DATA";
import { formatDate } from "../utils/ConvertUtils";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [unansweredQuestions, setUnansweredQuestions] = useState<Question[]>(
    []
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [showAnswered, setShowAnswered] = useState(false); // Toggle state to show answered or unanswered questions

  // Get user info from redux store
  const userLogin = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (userLogin) {
      // Fetch all questions
      _getQuestions().then((questions: Questions) => {
        const answered: Question[] = [];
        const unanswered: Question[] = [];

        Object.values(questions).forEach((question: Question) => {
          if (
            question.optionOne.votes.includes(userLogin.id) ||
            question.optionTwo.votes.includes(userLogin.id)
          ) {
            answered.push(question);
          } else {
            unanswered.push(question);
          }
        });

        // Sort by timestamp (most recent first)
        answered.sort((a, b) => b.timestamp - a.timestamp);
        unanswered.sort((a, b) => b.timestamp - a.timestamp);

        setAnsweredQuestions(answered);
        setUnansweredQuestions(unanswered);
      });
    }
  }, [userLogin]);

  // Function to navigate to poll details
  const handleViewPoll = (id: string) => {
    navigate(`/questions/${id}`);
  };

  // Render questions based on current toggle view
  const renderQuestions = (questions: Question[]) =>
    questions.map((question) => (
      <Grid item xs={12} sm={6} md={4} key={question.id}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" align="center">
              {question.author}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {formatDate(question.timestamp)}
            </Typography>
            <Box textAlign="center" mt={2}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleViewPoll(question.id)}
              >
                Show
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <Box>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Toggle buttons to switch between Answered and Unanswered questions */}
        <ToggleButtonGroup
          value={showAnswered}
          exclusive
          onChange={(event, newValue) => setShowAnswered(newValue)}
          aria-label="question toggle"
          sx={{ marginBottom: 2 }}
        >
          <ToggleButton value={false} aria-label="unanswered">
            New Questions
          </ToggleButton>
          <ToggleButton value={true} aria-label="answered">
            Done
          </ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {showAnswered ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Done
                </Typography>
                <Grid container spacing={2}>
                  {renderQuestions(answeredQuestions)}
                </Grid>
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  New Questions
                </Typography>
                <Grid container spacing={2}>
                  {renderQuestions(unansweredQuestions)}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
