import React from 'react';

//import complements to routing
import { Route, Switch } from 'react-router-dom';

//Component's list to be routes.
import Task from '../components/view/task/Task.component';
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
                    <Route path="/tasks" component={Task}  />
                    <Route path="/users" component={User}  />
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
            
        );
    }
}


export default AppRoutes;