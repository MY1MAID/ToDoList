import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { fetchLists, addList } from "../store/features/todo/todoSlice";
import TodoList from "../comps/TodoList.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const todoLists = useSelector((state) => state.todo.lists);
  const [newListName, setNewListName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const handleAddList = () => {
    if (newListName.trim()) {
      dispatch(addList(newListName));
      setNewListName("");
      setDialogOpen(false);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {todoLists.map((list, index) => (
          <TodoList key={list._id} list={list} index={index} />
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            height: 200,
            border: "2px dashed gray",
            borderRadius: 3,
            cursor: "pointer",
          }}
          onClick={handleDialogOpen}
        >
          <AddCircleIcon fontSize="large" />
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            type="text"
            fullWidth
            variant="standard"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddList}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;
