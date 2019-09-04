import React from 'react';

//import css
import './Task.component.css';

//import a task model, to no repeat the same code
import TaskModel from '../../../model/task/Task';

class Task extends React.Component {

    posts = [];

    //We are using a model (TaskModel), we define their props
    //title, descriptios, user and status
    constructor(props) {

        super(props);

        this.state = {
            title: "",
            description: "",
            userMail: "",
            filter: "",
            lisTask: [],
            ok: false,
            newMessage: false,
            message: ""
        };

        this.cardChanged = this.cardChanged.bind(this);
        this.cardChanged2 = this.cardChanged2.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.clearCard = this.clearCard.bind(this);
        this.editCard = this.editCard.bind(this);

    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3500/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);
        this.setState({ lisTask: json, ok: true });
    }

    cardChanged(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    cardChanged2(event) {

        this.cardChanged(event);

        const value = event.target.value;

        var filter = this.usersMails.filter(function (str) {
            return str.includes(value);
        });

        console.log(filter);
    }

    async saveCard() {
        const { title, description, userMail } = this.state;
        if (!title || !description || !userMail) {
            console.log("Error, debe llenar los campos!");
            this.setState({
                newMessage: true,
                message: "You must write all the labels."
            });
        } else {
            const response = await fetch('http://localhost:3500/task', {
                method: 'POST',
                body: JSON.stringify({ title, description, userMail }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            });
            const json = await response.json();
            if(json.state){
                this.setState({
                    newMessage: true,
                    message: "The task has been saved"
                });
                this.componentDidMount();
            }else{
                this.setState({
                    newMessage: true,
                    message: "The task has not been saved"
                });
            }
            //this.setState({ lisTask: [json], ok: true });
        }

    }

    clearCard() {
        this.setState({
            title: "",
            description: ""
        });
    }

    editCard(event) {

        const idCard = event.target.value;
        console.log("editing task id: " + idCard);

    }

    usersMails = [
        "ex1@ex.com", "as123@hotmail.com", "hola99@gmail.com"
    ]

    render() {
        const { ok, lisTask, newMessage, message } = this.state;
        if (!ok) {
            return (
                <div> Loading list of task...</div>
            )
        } else {
            return (
                <div className="task">

                    <div className="row rowOne">
                        <div className="col-lg-3 newTask">

                            {/* New Task. start */}
                            <div className="card mx-auto cardComponent">
                                {newMessage ? <div>{message}</div> : null}
                                {/* Task Title */}
                                <div className="card-header">
                                    <input className="form-control" type="text" name="title" placeholder="Task's title" value={this.state.title} onChange={this.cardChanged}></input>
                                </div>

                                {/* Task Body */}
                                <ul className="list-group list-group-flush">
                                    {/* Task Description */}
                                    <li className="list-group-item">
                                        <textarea className="form-control" type="text" name="description" placeholder="Description..." value={this.state.description}
                                            onChange={this.cardChanged}></textarea>
                                    </li>

                                    <li className="list-group-item">
                                        <div className=" btn-group-sm mx-auto">
                                            {/* Task button Save */}
                                            <button type="submit" className="btn btn-primary mr-3 btnG" onClick={this.saveCard}>
                                                Save
                                            </button>
                                            {/* Task button Clear */}
                                            <button type="submit" className="btn btn-danger btnG" onClick={this.clearCard}>
                                                Clear
                                            </button>
                                        </div>
                                    </li>

                                    {/* Task user */}
                                    <li className="list-group-item">
                                        <input className="form-control" placeholder="@user's mail" name="userMail" value={this.state.userMail} onChange={this.cardChanged2}
                                        />
                                    </li>

                                </ul>
                            </div>
                            {/* New Task. end */}

                        </div>
                        <div className="col-lg-9 lisTask">
                            <div className="row rowTwo">

                                {/* Cards examples start. Here we use the model and send the props*/}
                                {
                                    lisTask.map((task, id) =>
                                        <div className="col" key={id}>
                                            <TaskModel id={id} title={task.title} description={task.description} editCard={this.editCard} />
                                        </div>
                                    )

                                }
                                {/* Cards examples end */}

                            </div>
                        </div>
                    </div>

                    <div className="row ">

                    </div>
                </div>
            );
        }

    }
}

export default Task;