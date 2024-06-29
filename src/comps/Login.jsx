import { useDispatch } from "react-redux";
import { login } from "../store/features/user/userSlice";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {" "}
        Authentication{" "}
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
