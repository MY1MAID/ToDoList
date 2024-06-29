import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Header from "../comps/Header.jsx";
import { fetchSettings } from "../store/features/settings/settingsSlice.js";
import PrivateRoute from "../comps/PrivateRoute.jsx";
import HomePage from "../pages/HomePage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import TodoTasksPage from "../pages/TodoTasksPage.jsx";
import MainPage from "../pages/MainPage.jsx";
import { lightTheme } from "../themes/LightTheme.jsx";
import { darkTheme } from "../themes/DarkTheme.jsx";
import LoginPage from "../pages/LoginPage.jsx";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            element={
              <>
                <Header />
                <Outlet />
              </>
            }
          >
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/list/:id"
              element={
                <PrivateRoute>
                  <TodoTasksPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
