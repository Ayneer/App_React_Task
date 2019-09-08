import React from 'react';

//import css
import './Task.component.css';

//import a task model, to no repeat the same code
import TaskModel from '../../model/task/Task';

class Task extends React.Component {

    //We are using a model (TaskModel), we define their props
    //title, descriptios, user and status
    constructor(props) {

        super(props);

        this.state = {
            title: "",
            description: "",
            user: "",
            status: "",
            _id: 0,
            filter: "",
            lisTask: [],
            ok: false,
            newMessage: false,
            message: "",
            show: false,//show edit button
            disableUser: true
        };

        this.cardChanged = this.cardChanged.bind(this);
        this.cardChanged2 = this.cardChanged2.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.clearCard = this.clearCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.upDateCard = this.upDateCard.bind(this);
        this.checkbox = this.checkbox.bind(this);

    }

    setShow(estate) {
        this.setState({
            show: estate
        })
    }
    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);

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

        let lisTaskOpen = [];
        if (json.state) {
            for (var i = 0; i < json.lisTask.length; i++) {
                if (json.lisTask[i].status === "OPEN") {
                    lisTaskOpen.push(json.lisTask[i]);
                }
            }
            this.setState({ lisTask: lisTaskOpen, ok: true });
            console.log(lisTaskOpen);
        } else {
            this.setState({ lisTask: json.lisTask, ok: true });
        }
    }

    cardChanged(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    cardChanged2(event) {

        const value = event.target.value;

        var filter = this.usersMails.filter(function (str) {
            return str.includes(value);
        });
        console.log(filter);
        this.setState({
            user: value
        });
    }

    async saveCard() {
        let user = "";
        if(this.state.disableUser){
            user = "Not assigned";
        }else{
            user = this.state.user;
        }
        const { title, description } = this.state;
        console.log(title, description, user);
        if (!title || !description || !user) {
            console.log("Error, debe llenar los campos!");
            this.setState({
                newMessage: true,
                message: "You must write all the labels."
            });
        } else {
            const response = await fetch('http://localhost:3500/task', {
                method: 'POST',
                body: JSON.stringify({ title, description, user, status: "OPEN" }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            });
            const json = await response.json();
            if (json.state) {
                this.setState({
                    newMessage: true,
                    message: "The task has been saved"
                });
                this.componentDidMount();
                this.clearCard();
            } else {
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
            description: "",
            user: "",
            _id: 0,
            show: false
        });
    }

    findTask(id) {
        let task = JSON;
        for (var i = 0; i < this.state.lisTask.length; i++) {
            if (this.state.lisTask[i]._id === id) {
                task = this.state.lisTask[i];
                console.log(task);
            }
        }
        return task;
    }

    editCard(event) {

        const idCard = event.target.value;

        const ediTask = this.findTask(idCard);
        this.setState({
            title: ediTask.title,
            description: ediTask.description,
            user: ediTask.user,
            status: ediTask.status,
            _id: ediTask._id,
            show: true
        });

    }

    async upDateCard() {

        let user = "";
        if(this.state.disableUser){
            user = "Not assigned";
        }else{
            user = this.state.user;
        }

        const update = {
            title: this.state.title,
            description: this.state.description,
            user: user,
            status: this.state.status
        }

        const response = await fetch('http://localhost:3500/task/' + this.state._id, {
            method: 'PUT',
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });

        const json = await response.json();
        if (json.state) {
            this.setState({
                newMessage: true,
                message: "The task has been updated",
                show: false
            });
            this.clearCard();
            this.componentDidMount();
        } else {
            this.setState({
                newMessage: true,
                message: "The task has not been updated"
            });
        }
    }

    checkbox(event){
        const state = event.target.checked;
        if(state){
            this.setState({
                disableUser: false
            });
        }else{
            this.setState({
                disableUser: true
            });
        }
    }

    usersMails = [
        "ex1@ex.com", "as123@hotmail.com", "hola99@gmail.com"
    ]

    render() {
        console.log("soy render");
        const { ok, lisTask, newMessage, message, show, disableUser } = this.state;
        let empty = false;
        if (!ok) {
            return (
                <div> Loading list of task...</div>
            )
        } else {
            if (lisTask.length > 0) {
                empty = true;
            }
            return (
                <div className="task container">

                    <div className="row rowOne">

                        <div className="col-lg-3 newTask">
                            <div className="titleNewTask">
                                <h6>
                                    Open New Task
                                </h6>
                            </div>
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
                                        <textarea className="form-control textAreaNewTask" type="text" name="description" placeholder="Description..." value={this.state.description}
                                            onChange={this.cardChanged}></textarea>
                                    </li>

                                    <li className="list-group-item">

                                        {
                                            show
                                                ?
                                                //Button Edit
                                                <div className="btn-group-md">

                                                    < button type="submit" className="btn btn-primary mr-3 btn-EdiTask" onClick={this.upDateCard}>
                                                        Save changes
                                                    </button>

                                                    <button type="submit" className="btn btn-danger btn-EdiTask" onClick={this.clearCard}>
                                                        Cancel
                                                    </button>

                                                </div>
                                                :
                                                //Button Save
                                                <div className="btn-group-sm btn-newTask">

                                                    < button type="submit" className="btn btn-primary mr-3 btnG" onClick={this.saveCard}>
                                                        Save
                                                    </button>

                                                    <button type="submit" className="btn btn-danger btnG" onClick={this.clearCard}>
                                                        Clear
                                                    </button>

                                                </div>
                                        }

                                    </li>

                                    {/* Task user */}
                                    <li className="list-group-item">
                                        <div className="chekbox">
                                            <input className="form-check-input" type="checkbox" id="assignUser" onChange={this.checkbox}  />
                                            <label className="form-check-label" htmlFor="assignUser">Assing a User.</label>
                                        </div>
                                        <input className="form-control" placeholder="@user's mail" name="user" value={this.state.user} onChange={this.cardChanged2} disabled={disableUser}
                                        />
                                    </li>

                                </ul>
                            </div>
                            {/* New Task. end */}

                        </div>
                        <div className="col-lg-9 lisTask">
                            <div className="row rowTwo">

                                {/* Cards examples start. Here we use the model and send the props*/}
                                {empty
                                    ?
                                    lisTask.map((task, id) =>
                                        <div className="col-lg-3" key={id}>
                                            <TaskModel _id={task._id} title={task.title} description={task.description} editCard={this.editCard} status={task.status} user={task.user} use={"lisTask"} />
                                        </div>
                                    )
                                    :
                                    <div>There are not Open tasks</div>
                                }
                                {/* Cards examples end */}

                            </div>
                        </div>

                    </div>
                </div >
            );
        }

    }
}

export default Task;