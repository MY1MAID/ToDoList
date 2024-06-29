import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import Login from "../comps/Login";
import Registration from "../comps/Registration";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const token = useSelector((state) => state.user.token);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/"); // Перенаправить на домашнюю страницу, если пользователь аутентифицирован
    }
  }, [token, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
        margin: 0,
        padding: 0,
        height: "100vh",
      }}
    >
      {showLogin ? <Login /> : <Registration />}
      <Button onClick={() => setShowLogin(!showLogin)} sx={{ mt: 2 }}>
        {showLogin ? "Switch to Registration" : "Switch to Login"}
      </Button>
    </Box>
  );
};

export default MainPage;
