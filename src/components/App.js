import React from 'react';
//import socketIOClient from "socket.io-client";

//import css
import './App.css';

//Components
import Navbar from './dom/navbar/Navbar.componet';
import AppRoutes from '../routes/Routes';

//imports to routes
import { BrowserRouter as Routes } from 'react-router-dom';

//const socket = socketIOClient('http://localhost:3500');//Me suscribo al socket del servidor
//socket.on('connect', function () { });

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    }
  }
  render() {
    
    //socket.emit('send', "helow from App");
    return (

      <div className="App">
        {/* To use routes, it's to <Routes/> */}
        <Routes>
          <Navbar />
          <div className="container title">
            <h1>To-do!</h1>
          </div>
          <AppRoutes /*socket={socket}*/ />
        </Routes>
      </div>

    );
  }
}


export default App;
