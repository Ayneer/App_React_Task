import React from 'react';

//import css
import './Task.css';

class TaskModel extends React.Component {

    render() {
        let btn = "";
        if (this.props.status === "OPEN") {
            btn = "btn btn-primary";
        } else {
            if (this.props.status === "INPROGRESS") {
                btn = "btn btn-secondary";
            } else {
                if (this.props.status === "COMPLETED") {
                    btn = "btn btn-success";
                } else {
                    if (this.props.status === "ARCHIVED") {
                        btn = "btn btn-warning";
                    }
                }
            }
        }

        if (this.props.use === "lisTask") {
            return (
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

                                <div className="btn-group-sm btn-taskModel">

                                    <button type="submit" value={this.props._id} className="btn mr-3 btn-primary" onClick={this.props.editCard}>
                                        Edit
                                    </button>

                                    <button type="submit" className={btn} disabled>
                                        {this.props.status}
                                    </button>

                                </div>

                            </li>

                            {/* Task user */}
                            <li className="list-group-item">
                                <small className="text-muted">{this.props.user}</small>
                            </li>
                        </ul>
                    </div>
                    {/* New Task. end */}
                </div>
            );
        }

    }
}

export default TaskModel;