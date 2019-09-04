import React from 'react';

//import css
import './Index.component.css';

//import images
import imgNodejs from '../../image/nodejs.png';
import imgMongodb from '../../image/mongodb.png';
import imgBootstrap from '../../image/bootstrap.png';
import imgReactjs from '../../image/reactjs.png';

class Index extends React.Component{
    
  render(){
    
    return(
      
      <div className="Index">
        <div className="to-do">
                <h4>In this app you can:</h4><br/><br/>
                <h5>1. Create/Edit task</h5><br/>
                <h5>2. List of task</h5><br/>
                <h5>3. Search a task</h5><br/>
                <h5>4. Assign a task to a user</h5><br/>
                <h5>5. Remove a user from task</h5><br/>
                <h5>6. List of users</h5><br/>
                <h5>7. Change Status in a task (Open, In-Progress, Completed, Archived)</h5><br/><br/><br/>

                <img src={imgNodejs} alt="f" width="150px" height="150px"/>
                <img src={imgMongodb} alt="f" width="150px" height="150px"/>
                <img src={imgBootstrap} alt="f" width="180px" height="180px"/>
                <img src={imgReactjs} alt="f" width="170px" height="170px"/>
            </div>
      </div>
    
    );
  }
}


export default Index;
