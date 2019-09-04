import React from 'react';

//import css
import './App.css';

//init Data
//import Data from './data/Data';


//Components
import Navbar from './components/dom/navbar/Navbar.componet';
import AppRoutes from './routes/routes';

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

    return (

      <div className="App">
        {/* To use routes, it's to <Routes/> */}
        <Routes>
          <Navbar />
          <AppRoutes />
        </Routes>
      </div>

    );
  }
}


export default App;
