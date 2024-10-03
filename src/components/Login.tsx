import { useEffect, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Avatar,
  Box,
  styled,
  Switch,
} from "@mui/material";
import { _getUsers } from "../database/_DATA";
import { User } from "database/_DATA";
import { useTranslation } from "react-i18next";
import { login } from "../actions/action";

const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all users info
  useEffect(() => {
    _getUsers().then((allUsers: Record<string, User>) => {
      const usersArray = Object.values(allUsers);
      setUsers(usersArray);
    });
  }, []);

  // Handle login
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedUser && password) {
      const user = users.filter((u) => u.id === selectedUser)[0] || null;

      if (user && user.password === password) {
        dispatch(login(user)); // Store user info in redux
        navigate("/");
      } else {
        setError(t("err.incorrectPassword"));
      }
    } else {
      setError(t("err.missingFields"));
    }
  };

  // Handle language change
  const handleLanguageChange = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("vi");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><text x="5" y="15" font-size="12" fill="${encodeURIComponent(
            "#fff"
          )}">VI</text></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><text x="5" y="15" font-size="12" fill="${encodeURIComponent(
          "#fff"
        )}">EN</text></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
    },
  })) as typeof Switch;

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <MaterialUISwitch
          checked={i18n.language === "vi"}
          onChange={handleLanguageChange}
        />
      </Box>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4">{t("app.appNm")}</Typography>
        <Avatar
          sx={{ width: 200, height: 200, margin: "auto" }}
          src={require("../assets/logo.png")}
          alt="Logo"
        />
        <form onSubmit={handleLogin}>
          <TextField
            select
            fullWidth
            label={t("app.user")}
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            margin="normal"
          >
            {users.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label={t("app.pw")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {t("buttonNm.login")}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
