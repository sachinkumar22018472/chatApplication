import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUsers from './customHooks/getOtherUsers'
import { io } from "socket.io-client"
import { serverUrl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'

function App() {

  getCurrentUser()
  getOtherUsers()

  let { userData, socket, onlineUsers } = useSelector(state => state.user)
  let dispatch = useDispatch()
useEffect(() => {

  if (userData?._id) {

    const socketio = io(serverUrl, {
      query: {
        userId: userData._id
      },
      transports: ["websocket", "polling"]
    });

    dispatch(setSocket(socketio));

    socketio.on("connect", () => {
      console.log("Connected:", socketio.id);
    });

    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socketio.close();
      dispatch(setSocket(null));
    };

  } else {
    if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }

}, [userData?._id]);

  return (
    <Routes>

      <Route
        path='/'
        element={<Navigate to={userData ? "/home" : "/login"} replace />}
      />

      <Route
        path='/login'
        element={!userData ? <Login /> : <Navigate to="/home" replace />}
      />

      <Route
        path='/signup'
        element={!userData ? <SignUp /> : <Navigate to="/profile" replace />}
      />

      <Route
        path='/home'
        element={userData ? <Home /> : <Navigate to="/login" replace />}
      />

      <Route
        path='/profile'
        element={userData ? <Profile /> : <Navigate to="/login" replace />}
      />

      <Route
        path='*'
        element={<Navigate to={userData ? "/home" : "/login"} replace />}
      />

    </Routes>
  )
}

export default App