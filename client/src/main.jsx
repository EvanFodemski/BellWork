import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/homePage.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong!</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
