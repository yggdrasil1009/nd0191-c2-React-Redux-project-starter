import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/action";
import { User } from "database/_DATA";

interface NavBarProps {
  userLogin: User;
}

const NavBar: React.FC<NavBarProps> = ({ userLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle logout buton click
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/leaderboard")}>
            Leaderboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/new")}>
            New
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          <Avatar
            alt="User Avatar"
            src={userLogin.avatarURL}
            sx={{ marginLeft: 2 }}
          />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            {userLogin.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
