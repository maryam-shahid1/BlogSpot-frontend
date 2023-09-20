import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://localhost:8080',
})

function App() {

  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const {access_token} = useSelector(state => state.auth)

  return (
    <>
      <div>
        <Router>
        <Routes>
                <Route exact path="/" />
                <Route path="/sign-in" 
                  element={ !access_token ?
                    <Login 
                      client={client} 
                      alert={alert} 
                      setAlert={setAlert} 
                      open={open} 
                      setOpen={setOpen} 
                      severity={severity} 
                      setSeverity={setSeverity} 
                    /> : 
                    <Navigate to='/home'></Navigate>
                  } 
                />
                <Route path="/sign-up" 
                  element={
                    <Signup 
                      client={client} 
                      alert={alert} 
                      setAlert={setAlert} 
                      open={open} 
                      setOpen={setOpen} 
                      severity={severity} 
                      setSeverity={setSeverity}
                      />
                    }
                />
                <Route path='/home' element={<Home/>}></Route>
              </Routes>
        </Router>
      </div>  
    </>  
    
  );
}

export default App;
