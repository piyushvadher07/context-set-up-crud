
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';

import { AuthProvider } from './context/RegisterContext';
import Login from './components/Login';
import User from './components/User';
import { UserProvider } from './context/UserContext';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<User />} />





            </Routes>
          </div>

        </UserProvider>


      </AuthProvider>
    </Router>
  );
};

export default App;
