import React from 'react';

//import css
import './Task.css';

class TaskModel extends React.Component{
    render() {

        return(
            <div>
                {/* New Task. start */}
                <div className="card mx-auto cardModel">
                    {/* Task title */}
                    <div className="card-header" >
                        {this.props.title}
                    </div>

                    <ul className="list-group list-group-flush">
                        {/* Task description */}
                        <li className="list-group-item"> 
                            <textarea disabled className="form-control" type="text" value={this.props.description} name="b">
                            </textarea>           
                        </li>

                        {/* Task edit button */}
                        <li className="list-group-item">

                            <div className=" btn-group-sm mx-auto">

                                <button type="submit" value={this.props.id} className="btn btn-primary" onClick={this.props.editCard}>
                                    Edit
                                </button>

                            </div>

                        </li>
                        
                        {/* Task user */}
                        <li className="list-group-item">
                            <small className="text-muted">ayneer12@gmail.com</small>
                        </li>                
                    </ul>
                </div>
                {/* New Task. end */}
            </div>
        );
    }
}

export default TaskModel;