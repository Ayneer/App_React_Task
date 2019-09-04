import React from 'react';
import './Navbar.component.css';

//import Link to use routes
import {Link} from 'react-router-dom';

class Navbar extends React.Component{
    render(){
        return (
                <div className="Navbar">

                <nav className="navbar navbar-expand-lg navbar-light bg-light container ">
                    <Link to="/" className="navbar-brand">Brand</Link>
                    
                    {/* button to responsive navbar */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation"> 
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu */}
                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav mx-auto ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" style={{color: 'black'}}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks" style={{color: 'black'}}>Task</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users" style={{color: 'black'}}>User</Link>
                            </li>
                        </ul>

                    </div>
                </nav>

            </div>
            
        );
    }
}

export default Navbar;