import React from 'react';

//import css
import './task.css';

//import a task model, to no repeat the same code
import TaskModel from '../../model/task/Task';

let listTaskFilter = [];
let usersMails = [];
class Task extends React.Component {

    //We are using a model (TaskModel), we define their props
    //title, descriptios, user and status
    constructor(props) {

        super(props);

        this.state = {
            title: "",
            description: "",
            user: "Not assigned",
            name: "",
            status: "",
            _id: 0,
            filter: "",
            lisTask: [],
            ok: false,
            newMessage: false,
            message: "",
            classNewMessage: "alert alert-primary",
            show: false,//show edit button
            disableUser: true,
            showRemoveUser: false,
            showNewEmail: false
        };

        this.cardChanged = this.cardChanged.bind(this);
        this.cardChanged2 = this.cardChanged2.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.clearCard = this.clearCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.startTask = this.startTask.bind(this);
        this.upDateCard = this.upDateCard.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.filterTask = this.filterTask.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.closeNewMessage = this.closeNewMessage.bind(this);

    }

    closeNewMessage() {
        this.setState({
            newMessage: false,
            message: ""
        })
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3500/task', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();

        let lisTaskOpen = [];
        listTaskFilter = [];
        usersMails = [];

        if (json.state) {
            for (var i = 0; i < json.lisTask.length; i++) {
                if (json.lisTask[i].status === "OPEN") {
                    lisTaskOpen.push(json.lisTask[i]);
                    listTaskFilter.push(json.lisTask[i]);
                }
                let cont = 0;
                if (json.lisTask[i].user) {
                    for (let index = 0; index < usersMails.length; index++) {
                        const element = usersMails[index];
                        if (element === json.lisTask[i].user || json.lisTask[i].user === "Not assigned") {
                            cont++;
                        }
                    }
                    if (cont === 0) {
                        usersMails.push(json.lisTask[i].user);
                    }
                }
            }
            this.setState({ lisTask: lisTaskOpen, ok: true });
        } else {
            this.setState({ lisTask: json.lisTask, ok: true });
        }
    }

    filterTask(event) {
        const value = event.target.value;

        var filter = listTaskFilter.filter((str) => {
            return str.title.toLowerCase().includes(value.toLowerCase()) || str.description.toLowerCase().includes(value.toLowerCase()) || str.user.toLowerCase().includes(value.toLowerCase());
        });

        this.setState({
            lisTask: filter
        });
    }

    //method to catch the new card' inputs
    cardChanged(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    cardChanged2(event) {

        const value = event.target.value;

        let status = false;

        var listUser = document.getElementById('listUser');

        var filter = usersMails.filter(function (str) {
            return str.includes(value);
        });

        listUser.innerHTML = "";

        for (var i = 0; i < filter.length; i++) {
            var option = document.createElement('option');
            option.value = filter[i];
            listUser.appendChild(option);
        }

        if (this.validateEmail(value)) {
            if (filter[0] !== value) {
                status = true;
            }
        }
        this.setState({
            user: value,
            showNewEmail: status
        });

    }

    throwMessage(message, classNewMessage) {
        this.setState({
            newMessage: true,
            message: message,
            classNewMessage: classNewMessage
        });
    }

    async saveCard() {

        const { title, description, user, name, showNewEmail } = this.state;
        if (!title || !description || !user || (showNewEmail && !name)) {
            this.throwMessage("You must write all the labels.", "alert alert-danger");
        } else {
            let valEmail = false;
            if (user === "Not assigned") {
                valEmail = true;
            } else {
                valEmail = this.validateEmail(user);
            }
            if (valEmail) {
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
                    if (showNewEmail) {
                        const response_2 = await fetch('http://localhost:3500/user', {
                            method: 'POST',
                            body: JSON.stringify({ email: user, name: name }),
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8',
                                'Accept': 'application/json'
                            }
                        });
                        const json_2 = await response_2.json();
                        if (json_2.state) {
                            this.throwMessage("The task and user have been saved", "alert alert-success");
                            this.componentDidMount();
                            this.clearCard();
                        } else {
                            this.throwMessage("Error: The task has been saved but the user has not.", "alert alert-danger");
                        }
                    } else {
                        this.throwMessage(json.message, "alert alert-success");
                        this.componentDidMount();
                        this.clearCard();
                    }
                } else {
                    this.throwMessage(json.message, "alert alert-danger");
                }
            } else {
                this.throwMessage("Write a valid email, example@domain.com", "alert alert-danger");
            }
        }
    }

    clearCard() {
        if (!this.state.showRemoveUser) {
            document.getElementById("assignUser").checked = false;
        }
        this.setState({
            title: "",
            description: "",
            user: "Not assigned",
            name: "",
            _id: 0,
            show: false,
            disableUser: true,
            showRemoveUser: false,
            showNewEmail: false
        });
    }

    removeUser() {
        document.getElementById("btnRemove").setAttribute("disabled", "disabled");
        var inputUser = document.getElementById("inputUser");
        inputUser.value = "Not assigned";
        document.getElementById("inputUser").setAttribute("disabled", "disabled");
        this.setState({
            user: "Not assigned",
            newMessage: true,
            message: "The user will be deleted.",
            classNewMessage: "alert alert-warning"
        });
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

    editCard(event) {

        const idCard = event.target.value;
        const ediTask = this.findTask(idCard);
        let showRemoveUser = false;
        let disableUser = true;
        if (ediTask.user !== "Not assigned") {
            showRemoveUser = true;
            disableUser = false;
        }
        this.setState({
            title: ediTask.title,
            description: ediTask.description,
            user: ediTask.user,
            status: ediTask.status,
            _id: ediTask._id,
            show: true,
            showRemoveUser: showRemoveUser,
            disableUser: disableUser
        });

    }

    async upDateCard() {

        const { title, description, user, status, name, showNewEmail } = this.state;

        const update = {
            title: title,
            description: description,
            user: user,
            status: status
        }

        let valEmail = false;

        if (user === "Not assigned") {
            valEmail = true;
        } else {
            valEmail = this.validateEmail(user);
        }

        if (valEmail) {

            if (showNewEmail) {
                if (!name) {
                    this.throwMessage("You have write a user's name.", "alert alert-danger");
                } else {
                    const response_2 = await fetch('http://localhost:3500/user', {
                        method: 'POST',
                        body: JSON.stringify({ email: user, name: name }),
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Accept': 'application/json'
                        }
                    });
                    const json_2 = await response_2.json();
                    if (json_2.state) {
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
                                message: "Task updated and user add successfuly!",
                                classNewMessage: "alert alert-success",
                                show: false//hide the update button
                            });
                            this.clearCard();
                            this.componentDidMount();
                        } else {
                            this.throwMessage("Error: User add successfuly! But the task could not update!", "alert alert-danger");
                            this.componentDidMount();
                        }
                    } else {
                        this.throwMessage("Error: The user could not be add and the task could not update!", "alert alert-danger");
                    }
                }
            } else {
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
                        classNewMessage: "alert alert-success",
                        show: false//hide the update button
                    });
                    this.clearCard();
                    this.componentDidMount();
                } else {
                    this.throwMessage("The task has not been updated", "alert alert-danger");
                }
            }
        } else {
            this.throwMessage("Write a valid email, example@domain.com", "alert alert-danger");
        }
    }

    checkbox(event) {
        const state2 = event.target.checked;
        if (state2) {
            this.setState({
                disableUser: false,
                user: ""
            });
        } else {
            this.setState({
                disableUser: true,
                user: "Not assigned"
            });
        }
    }

    async startTask(event) {
        const idCard = event.target.value;
        const ediTask = this.findTask(idCard);
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
            this.throwMessage("Error to start the task!", "alert alert-danger");
        }
    }

    render() {
        const { ok, lisTask, newMessage, message, show, disableUser, showRemoveUser, showNewEmail, name, classNewMessage } = this.state;
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
                                    New open Task
                                </h6>
                            </div>
                            {/* New Task. start */}
                            <div className="card mx-auto cardComponent">

                                {newMessage ?
                                    <div className={classNewMessage} role="alert">
                                        {message}
                                        <button type="button" className="close" onClick={this.closeNewMessage}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div> 
                                    : null}

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

                                        {showNewEmail ?
                                            <div className="alert alert-warning" role="alert">
                                                <strong>
                                                    <h6>
                                                        This email don't exist. It will be add
                                                    </h6>
                                                </strong>
                                            </div>
                                            :
                                            null
                                        }

                                        {showRemoveUser ?

                                            <button type="submit" id="btnRemove" className="btn btn-danger btnUser" onClick={this.removeUser}>
                                                Remove this user
                                            </button> :

                                            <div className="chekbox">

                                                <input className="form-check-input" type="checkbox" id="assignUser" onChange={this.checkbox} />

                                                <label className="form-check-label" htmlFor="assignUser">Assing a User.</label>

                                            </div>
                                        }

                                        <input className="form-control imputUser" list="listUser" placeholder="user@mail.com" name="user" id="inputUser" value={this.state.user} onChange={this.cardChanged2} disabled={disableUser}
                                        />

                                        <datalist id="listUser">
                                            <option></option>
                                        </datalist>

                                        {showNewEmail ?
                                            <input className="form-control" type="text" name="name" placeholder="User's name" value={name} onChange={this.cardChanged}></input>
                                            : null
                                        }

                                    </li>
                                </ul>
                            </div>
                            {/* New Task. end */}

                        </div>
                        <div className="col-lg-9 lisTask">

                            <div className="row rowTwo">
                                <div className="col-lg-12 search-task">
                                    <input className="form-control" type="text" placeholder="Search a Task" aria-label="Search" onChange={this.filterTask} />
                                </div>
                                {/* Cards examples start. Here we use the model and send the props*/}
                                {empty
                                    ?
                                    lisTask.map((task, id) =>
                                        <div className="col-lg-3" key={id}>
                                            <TaskModel _id={task._id} title={task.title} description={task.description} editCard={this.editCard} status={task.status} user={task.user} startTask={this.startTask} />
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