import React from 'react';

//import complements to routing
import { Route, Switch } from 'react-router-dom';

//Component's list to be routes.
import Task from '../components/view/task/Task.component';
import TaskInProgress from '../components/view/task/Task_in_progress';
import TaskCompleted from '../components/view/task/Task_Completed';
import TaskArchived from '../components/view/task/Task_Archived';
import User from '../components/view/user/User.component';
import Index from '../components/view/index/Index.component';

function ErrorPage(){
    return(
        <div>Error Page.</div>
    );
}

class AppRoutes extends React.Component{
    render(){
        return(
            <div className="paperRoute">
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/tasks" exact render={()=><Task /*socket={this.props.socket}*/ />} />
                    <Route path="/tasks_InProgress" exact component={TaskInProgress} />
                    <Route path="/tasks_Completed" exact component={TaskCompleted} />
                    <Route path="/tasks_Archived" exact component={TaskArchived} />
                    <Route path="/users" exact component={User}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
            
        );
    }
}


export default AppRoutes;