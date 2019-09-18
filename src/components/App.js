import React from 'react';

//import css
import './App.css';

//Components
import Navbar from './dom/navbar/Navbar';
import AppRoutes from '../routes/Routes';

//imports to routes
import { BrowserRouter as Routes } from 'react-router-dom';


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
