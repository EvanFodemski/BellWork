import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/homePage.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import CreateWorkout from './pages/createworkout.jsx'
import AllWorkouts from './pages/allWorkouts.jsx'
import ProfilePage from './pages/profile.jsx'
import NotificationsPage from './components/notifications.jsx'
import Planner from './pages/planner.jsx'
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
      },
      {
        path: 'createworkout',
        element: <CreateWorkout />
      },
      {
        path: 'allworkouts',
        element: <AllWorkouts />
      },
      {
        path: 'profilepage',
        element: <ProfilePage />
      },
      {
        path: 'notifications',
        element: <NotificationsPage/>
      },
      {
        path: 'planner',
        element: <Planner />

      }

    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
