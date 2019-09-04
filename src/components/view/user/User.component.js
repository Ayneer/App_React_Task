import React from 'react';

class User extends React.Component{
    render(){
        return(
            <div className="to-do">
                <h4>In this app you can:</h4><br/><br/>
                <h5>1. Create/Edit task</h5><br/>
                <h5>2. List of task</h5><br/>
                <h5>3. Search a task</h5><br/>
                <h5>4. Assign a task to a user</h5><br/>
                <h5>5. Remove a user from task</h5><br/>
                <h5>6. List of users</h5><br/>
                <h5>7. Change Status in a task (Open, In-Progress, Completed, Archived)</h5><br/>

                
            </div>
        );
    }
}

export default User;