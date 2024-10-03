import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Paper,
} from "@mui/material";
import { _getUsers } from "../database/_DATA";
import { User } from "database/_DATA";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatarURL: string;
  questionsAsked: number;
  questionsAnswered: number;
  score: number;
}

const Leaderboard: React.FC = () => {
  // State to hold users data
  const [users, setUsers] = useState<LeaderboardEntry[]>([]);

  // Fetch all users info on component mount
  useEffect(() => {
    _getUsers().then((allUsers: Record<string, User>) => {
      const usersArray = Object.values(allUsers).map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionsAsked: user.questions ? user.questions.length : 0,
        questionsAnswered: user.answers ? Object.keys(user.answers).length : 0,
        score:
          (user.questions ? user.questions.length : 0) +
          (user.answers ? Object.keys(user.answers).length : 0),
      }));
      setUsers(usersArray);
    });
  }, []);

  // Sort users by score (desc)
  const sortedLeaderboard = users.sort((a, b) => b.score - a.score);

  return (
    <TableContainer
      component={Paper}
      style={{ width: "600px", margin: "20px auto" }}
    >
      <Table sx={{ minWidth: 500 }} aria-label="leaderboard table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Users</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Answered</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Created</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLeaderboard.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt={user.name} src={user.avatarURL} />
                  <div style={{ marginLeft: 10 }}>
                    <Typography variant="body1">
                      <strong>{user.name}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.id}
                    </Typography>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">{user.questionsAnswered}</TableCell>
              <TableCell align="center">{user.questionsAsked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
