import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Index from '../components/dashboard';
import Task2 from '../components/Task2';
import Task3 from '../components/Task3';
import Task1 from '../components/Task1';
export const router = createBrowserRouter([
  
  {
    path: "/",
    element: (
      <Login/>
    ),
  },
  {
    path: "/register",
    element: (
      <Register/>
    ),
  },
  {
    path: "/home",
    element: (
      <Index/>
    ),
  },
  {
    path: "/task1",
    element: (
      <Task1/>
    ),
  },
  {
    path: "/task2",
    element: (
      <Task2/>
    ),
  },
  {
    path: "/task3",
    element: (
      <Task3/>
    ),
  },

]);
