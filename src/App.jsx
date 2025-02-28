import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import Chat from './components/Chat';
import './index.css'

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/chat" /> : <UserLogin setUser={setUser} />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;