import React from 'react';

//import css
import './Task.component.css';

//import a task model, to no repeat the same code
import TaskModel from '../../model/task/Task';

class TaskCompleted extends React.Component {

    //We are using a model (TaskModel), we define their props
    //title, descriptios, user and status
    constructor(props) {

        super(props);

        this.state = {
            lisTask: [],
            ok: false
        };

        this.archiveTask = this.archiveTask.bind(this);
        this.cancelTask = this.cancelTask.bind(this);

    }

    async componentDidMount() {
        console.log("soy componentDidMount");
        const response = await fetch('http://localhost:3500/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();

        let lisTaskCOMPLETED = [];
        if (json.state) {
            for (var i = 0; i < json.lisTask.length; i++) {
                if (json.lisTask[i].status === "COMPLETED") {
                    lisTaskCOMPLETED.push(json.lisTask[i]);
                }
            }
            this.setState({ lisTask: lisTaskCOMPLETED, ok: true });
            console.log(lisTaskCOMPLETED);
        } else {
            this.setState({ lisTask: json.lisTask, ok: true });
        }
    }

    findTask(id) {
        let task = JSON;
        for (var i = 0; i < this.state.lisTask.length; i++) {
            if (this.state.lisTask[i]._id === id) {
                task = this.state.lisTask[i];
            }
        }
        return task;
    }

    async archiveTask(event) {
        const idCard = event.target.value;
        const ediTask = this.findTask(idCard);
        console.log(this.findTask(idCard));
        const update = {
            title: ediTask.title,
            description: ediTask.description,
            user: ediTask.user,
            status: "ARCHIVED"
        }
        const response = await fetch('http://localhost:3500/task/' + ediTask._id, {
            method: 'PUT',
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        if (json.state) {
            this.componentDidMount();
        } else {
            //alert
        }
    }

    async cancelTask(event) {
        const idCard = event.target.value;
        const ediTask = this.findTask(idCard);
        console.log(this.findTask(idCard));
        const update = {
            title: ediTask.title,
            description: ediTask.description,
            user: ediTask.user,
            status: "INPROGRESS"
        }
        const response = await fetch('http://localhost:3500/task/' + ediTask._id, {
            method: 'PUT',
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        if (json.state) {
            this.componentDidMount();
        } else {
            //alert
        }
    }

    render() {
        console.log("soy render task in progress");
        //this.props.socket.emit('send', "helow2 from task");
        const { ok, lisTask } = this.state;
        let empty = false;
        if (!ok) {
            return (
                <div> Loading list of in progress task...</div>
            )
        } else {
            if (!lisTask.length > 0) {
                empty = true;
            }
            return (
                <div className="task container">

                    <div className="row rowOne">

                        <div className="col-lg-12 lisTask">
                            <div className="row rowTwo">

                                {/* Cards model start. Here we use the model and send the props*/}
                                {empty
                                    ?
                                    
                                    <div>There are not In progress tasks</div>

                                    :
                                    
                                    lisTask.map((task, id) =>
                                        <div className="col-lg-3" key={id}>
                                            <TaskModel _id={task._id} title={task.title} description={task.description} archiveTask={this.archiveTask} status={task.status} user={task.user} cancelTask={this.cancelTask} />
                                        </div>
                                    )                                    
                                }
                                {/* Cards model end */}

                            </div>
                        </div>

                    </div>
                </div >
            );
        }

    }
}

export default TaskCompleted;