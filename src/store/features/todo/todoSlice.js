import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodoLists,
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
  addTodoList,
} from "../../../api";

export const addList = createAsyncThunk(
  "todo/addList",
  async (listName, { getState }) => {
    const token = getState().user.token;
    const response = await addTodoList(listName, token);
    return response;
  },
);

export const fetchLists = createAsyncThunk(
  "todo/fetchLists",
  async (_, { getState }) => {
    const token = getState().user.token;
    const response = await fetchTodoLists(token);
    return response;
  },
);

export const addTask = createAsyncThunk(
  "todo/addTask",
  async ({ listId, text, priority }, { getState }) => {
    const token = getState().user.token;
    const response = await addTodoItem(listId, text, priority, token);
    return response;
  },
);

export const deleteTask = createAsyncThunk(
  "todo/deleteTask",
  async ({ listId, todoId }, { getState }) => {
    const token = getState().user.token;
    await deleteTodoItem(listId, todoId, token);
    return { listId, todoId };
  },
);

export const updateTask = createAsyncThunk(
  "todo/updateTask",
  async ({ listId, todoId, text, priority }, { getState }) => {
    const token = getState().user.token;
    const response = await updateTodoItem(
      listId,
      todoId,
      text,
      priority,
      token,
    );
    return { listId, todoId, text: response.text, priority: response.priority }; // Возвращаем обновленный текст и приоритет
  },
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    lists: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { listId } = action.meta.arg;
        const list = state.lists.find((list) => list._id === listId);
        if (list) {
          list.todos.push(action.payload);
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { listId, todoId } = action.payload;
        const list = state.lists.find((list) => list._id === listId);
        if (list) {
          list.todos = list.todos.filter((todo) => todo._id !== todoId);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { listId, todoId, text, priority } = action.payload;
        const list = state.lists.find((list) => list._id === listId);
        if (list) {
          const todo = list.todos.find((todo) => todo._id === todoId);
          if (todo) {
            todo.text = text;
            todo.priority = priority;
          }
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
      );
  },
});

export default todoSlice.reducer;
