import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";
import PollDetails from "./components/PollDetails";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import AddPoll from "./components/AddPoll";
import Leaderboard from "./components/LeaderBoard";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const userLogin = useSelector((state) => state.auth.user);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              {userLogin && <Navbar userLogin={userLogin} />}
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <PrivateRoute>
              {userLogin && <Navbar userLogin={userLogin} />}
              <PollDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              {userLogin && <Navbar userLogin={userLogin} />}
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              {userLogin && <Navbar userLogin={userLogin} />}
              <AddPoll />
            </PrivateRoute>
          }
        />
        {/* Redirect other paths to login if not authenticated */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
