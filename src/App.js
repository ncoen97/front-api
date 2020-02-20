import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
import {useSelector, useDispatch} from 'react-redux'
import login from './actions'


function App() {
  const loginData = useSelector(state => state.session)
  const dispatch = useDispatch();
  const asd = "ASD"
  
  return (
    <div className="App">
      <h1>TP API REST!</h1>
      <Button variant="contained" color="primary" onClick={() => {dispatch(login())}}>Login</Button>
      <h2>login: {loginData.logged ? "True" : "False"}</h2>
    </div>
  );
}

export default App;


