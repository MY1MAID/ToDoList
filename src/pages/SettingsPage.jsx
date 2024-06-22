import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  fetchSettings,
  saveSettings,
  setTheme,
  setPriorityColor,
  setTaskManagementOption,
} from "../store/features/settings/settingsSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleThemeChange = (event) => {
    dispatch(setTheme(event.target.value));
  };

  const handlePriorityColorChange = (priority) => (event) => {
    dispatch(setPriorityColor({ priority, color: event.target.value }));
  };

  const handleTaskManagementChange = (option) => (event) => {
    dispatch(setTaskManagementOption({ option, value: event.target.value }));
  };

  const handleSaveSettings = () => {
    dispatch(saveSettings(settings));
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
      <Box
        sx={{
          flex: "1 1 calc(50% - 16px)",
          minWidth: 300,
          border: "2px solid",
          borderColor: "divider",
          borderRadius: 3,
          padding: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Theme Settings
        </Typography>
        <Divider />
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              top: "-8px",
            }}
          >
            Theme
          </InputLabel>
          <Select value={settings.theme} onChange={handleThemeChange}>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          flex: "1 1 calc(50% - 16px)",
          minWidth: 300,
          border: "2px solid",
          borderColor: "divider",
          borderRadius: 3,
          padding: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Priority Colors
        </Typography>
        <Divider />
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              top: "-8px",
            }}
          >
            High Priority
          </InputLabel>
          <Select
            value={settings.priorityColors.high}
            onChange={handlePriorityColorChange("high")}
          >
            <MenuItem value="#ff0000">Red</MenuItem>
            <MenuItem value="#ffa500">Orange</MenuItem>
            <MenuItem value="#ff4500">Dark Orange</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              top: "-8px",
            }}
          >
            Medium Priority
          </InputLabel>
          <Select
            value={settings.priorityColors.medium}
            onChange={handlePriorityColorChange("medium")}
          >
            <MenuItem value="#ffa500">Orange</MenuItem>
            <MenuItem value="#ffd700">Gold</MenuItem>
            <MenuItem value="#ff8c00">Dark Orange</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              top: "-8px",
            }}
          >
            Low Priority
          </InputLabel>
          <Select
            value={settings.priorityColors.low}
            onChange={handlePriorityColorChange("low")}
          >
            <MenuItem value="#008000">Green</MenuItem>
            <MenuItem value="#32cd32">Lime Green</MenuItem>
            <MenuItem value="#006400">Dark Green</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          flex: "1 1 calc(50% - 16px)",
          minWidth: 300,
          border: "2px solid",
          borderColor: "divider",
          borderRadius: 3,
          padding: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Task Management
        </Typography>
        <Divider />
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              top: "-8px",
            }}
          >
            Allow Deletion
          </InputLabel>
          <Select
            value={settings.taskManagement.allowDeletion}
            onChange={handleTaskManagementChange("allowDeletion")}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel
            sx={{
              top: "-8px",
            }}
          >
            Allow Editing
          </InputLabel>
          <Select
            value={settings.taskManagement.allowEditing}
            onChange={handleTaskManagementChange("allowEditing")}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: "1 1 100%", textAlign: "center", paddingTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
