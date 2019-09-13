import React from 'react';

//import css
import './Task.css';

class TaskModel extends React.Component {

    render() {
        let btn = "";
        let open = false;
        let INPROGRESS = false;
        let COMPLETED = false;
        let ARCHIVED = false;
        if (this.props.status === "OPEN") {
            btn = "btn btn-primary";
            open = true;
        } else {
            if (this.props.status === "INPROGRESS") {
                btn = "btn btn-secondary";
                INPROGRESS = true;
            } else {
                if (this.props.status === "COMPLETED") {
                    btn = "btn btn-success";
                    COMPLETED = true;
                } else {
                    if (this.props.status === "ARCHIVED") {
                        btn = "btn btn-warning";
                        ARCHIVED = true;
                    }
                }
            }
        }

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
                                    {open ?
                                        <button type="submit" value={this.props._id} className="btn mr-3 btn-primary" onClick={this.props.editCard}>
                                            Edit
                                        </button>
                                        :
                                        null
                                    }
                                    <button type="submit" id={btn} className={btn} disabled>
                                        {this.props.status}
                                    </button>
                                </div>

                            </li>

                            {/* Task user */}
                            <li className="list-group-item">
                                <small className="text-muted">{this.props.user}</small>
                            </li>

                            {/* Change status */}

                            <li className="list-group-item">
                                {open ?
                                    <button type="button" value={this.props._id} className="btn btn-secondary btn-start" onClick={this.props.startTask}>
                                        Start task
                                </button>
                                    :
                                    null
                                }


                                {INPROGRESS
                                    ?
                                    <div>

                                        <button type="button" value={this.props._id} className="btn btn-success" onClick={this.props.taskCompleted}>
                                            Completed
                                        </button>

                                        <button type="button" id="btn-danger" value={this.props._id} className="btn btn-danger" onClick={this.props.cancelTask}>
                                            Cancel
                                        </button>

                                    </div>
                                    :
                                    null
                                }

                                {COMPLETED
                                    ?
                                    <div>

                                        <button type="button" value={this.props._id} className="btn btn-warning" onClick={this.props.archiveTask}>
                                            Archive
                                        </button>

                                        <button type="button"  id="btn-danger" value={this.props._id} className="btn btn-danger" onClick={this.props.cancelTask}>
                                            Cancel
                                        </button>

                                    </div>
                                    :
                                    null
                                }

                                {ARCHIVED
                                    ?
                                    <div>

                                        <button type="button"  id="btn-danger" value={this.props._id} className="btn btn-danger" onClick={this.props.cancelTask}>
                                            Cancel
                                        </button>

                                    </div>
                                    :
                                    null
                                }
                            </li>
                        </ul>
                    </div>
                    {/* New Task. end */}
                </div>
            );
        

    }
}

export default TaskModel;