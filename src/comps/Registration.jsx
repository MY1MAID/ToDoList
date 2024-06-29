import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/features/user/userSlice";
import { Box, TextField, Button, Typography } from "@mui/material";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {" "}
        Registration{" "}
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
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
        Register
      </Button>
    </Box>
  );
};

export default Registration;
