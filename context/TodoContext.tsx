import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '@/config/config';

type Todo = {
  _id: string;
  title: string;
  description: string;
};

type TodoContextType = {
  todos: Todo[];
  fetchTodos: () => void;
  addTodo: (newTodo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
};

type TodoProviderProps = {
  children: ReactNode;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get<{ data: Todo[] }>(`${API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  // Add a new todo
  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Update an existing todo
  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  // Fetch todos when the provider mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
