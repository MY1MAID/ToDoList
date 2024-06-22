import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLists,
  addTask,
  deleteTask,
  updateTask,
} from "../store/features/todo/todoSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoTasksPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const todoLists = useSelector((state) => state.todo.lists);
  const settings = useSelector((state) => state.settings);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    dispatch(fetchLists()); // Загружаем списки задач
  }, [dispatch]);

  useEffect(() => {
    const list = todoLists.find((list) => list._id === id);
    if (list) {
      setTodos(list.todos);
    }
  }, [id, todoLists]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(
        addTask({ listId: id, text: newTodo, priority: newPriority }),
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          dispatch(fetchLists()); // Повторный запрос списков задач
        }
      });
      setNewTodo("");
      setNewPriority("medium");
    }
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTask({ listId: id, todoId })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(fetchLists()); // Повторный запрос списков задач
      }
    });
  };

  const handleBlur = (todoId, text) => {
    const todo = todos.find((t) => t._id === todoId);
    if (todo) {
      dispatch(
        updateTask({ listId: id, todoId, text, priority: todo.priority }),
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setTodos(todos.map((t) => (t._id === todoId ? { ...t, text } : t)));
          dispatch(fetchLists()); // Повторный запрос списков задач
        }
      });
    }
  };

  const handlePriorityChange = (todoId, priority) => {
    const todo = todos.find((t) => t._id === todoId);
    if (todo) {
      dispatch(
        updateTask({ listId: id, todoId, text: todo.text, priority }),
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setTodos(
            todos.map((t) => (t._id === todoId ? { ...t, priority } : t)),
          );
          dispatch(fetchLists()); // Повторный запрос списков задач
        }
      });
    }
  };

  const getPriorityColor = (priority) => {
    return settings.priorityColors[priority] || settings.priorityColors.medium;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Tasks</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          label="New Todo"
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <FormControl sx={{ marginRight: 2, minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            sx={{
              display: "flex",
              alignItems: "center",
              border: `2px solid ${getPriorityColor(todo.priority)}`,
              mb: 1,
              borderRadius: 3,
            }}
          >
            {settings.taskManagement.allowEditing ? (
              <TextField
                variant="outlined"
                value={todo.text}
                onBlur={(e) => handleBlur(todo._id, e.target.value)}
                onChange={(e) =>
                  setTodos(
                    todos.map((t) =>
                      t._id === todo._id ? { ...t, text: e.target.value } : t,
                    ),
                  )
                }
                sx={{
                  flexGrow: 1,
                  marginRight: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            ) : (
              <Typography sx={{ flexGrow: 1, marginRight: 2 }}>
                {todo.text}
              </Typography>
            )}
            {settings.taskManagement.allowEditing && (
              <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={todo.priority}
                  onChange={(e) =>
                    handlePriorityChange(todo._id, e.target.value)
                  }
                  label="Priority"
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            )}
            {settings.taskManagement.allowDeletion && (
              <IconButton
                onClick={() => handleDeleteTodo(todo._id)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoTasksPage;
