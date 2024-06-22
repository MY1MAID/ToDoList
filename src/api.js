import axios from "axios";

const API_URL = "http://localhost:5001";

// Устанавливаем базовый URL для всех запросов
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Регистрация пользователя
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Вход пользователя
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

// Получение настроек пользователя
export const fetchUserSettings = async (token) => {
  try {
    const response = await api.get("/api/settings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user settings:", error.response.data);
    throw error;
  }
};

// Сохранение настроек пользователя
export const saveUserSettings = async (settings, token) => {
  try {
    const response = await api.post("/api/settings", settings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving user settings:", error.response.data);
    throw error;
  }
};

export const addTodoList = async (listName, token) => {
  try {
    const response = await api.post(
      "/api/todos",
      { name: listName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Возвращаем новый список задач
  } catch (error) {
    console.error(
      "Error adding todo list:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const fetchTodoLists = async (token) => {
  try {
    const response = await api.get("/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching todo lists:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const addTodoItem = async (listId, text, priority, token) => {
  try {
    const response = await api.post(
      `/api/todos/${listId}`,
      { text, priority },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding todo item:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteTodoItem = async (listId, todoId, token) => {
  try {
    await api.delete(`/api/todos/${listId}/${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(
      "Error deleting todo item:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateTodoItem = async (listId, todoId, text, priority, token) => {
  try {
    const response = await api.put(
      `/api/todos/${listId}/${todoId}`,
      { text, priority },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating todo item:", error.response.data);
    throw error;
  }
};
