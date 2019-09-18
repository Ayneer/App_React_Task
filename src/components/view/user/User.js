import React from 'react';

import "./user.css";

let listUserFilter = [];

class User extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            name: "",
            id: "",
            showUser: false,
            listUser: [],
            newMessage: false,
            newMessageListUser: false,
            message: "",
            btnEditUser: false
        }

        this.formUser = this.formUser.bind(this);
        this.newUser = this.newUser.bind(this);
        this.clearCard = this.clearCard.bind(this);
        this.editUser = this.editUser.bind(this);
        this.updateUSer = this.updateUSer.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.filterUser = this.filterUser.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3500/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();

        listUserFilter = json.user;

        if (json.state) {
            this.setState({ listUser: json.user, showUser: true });
        } else {
            this.setState({ ok: false });
        }
    }

    filterUser(event) {

        const value = event.target.value;

        var filter = listUserFilter.filter((str) => {
            return str.name.toLowerCase().includes(value.toLowerCase()) || str.email.toLowerCase().includes(value.toLowerCase());
        });

        this.setState({
            listUser: filter
        });
    }

    formUser(event) {
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

    async newUser() {
        const { email, name } = this.state;
        if (email === "" || name === "") {
            this.setState({
                newMessage: true,
                message: "You have to write all input"
            });
        } else {
            if (this.validateEmail(email)) {
                const response = await fetch('http://localhost:3500/user', {
                    method: 'POST',
                    body: JSON.stringify({ email: email, name: name }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                });
                const json = await response.json();
                if (json.state) {
                    this.setState({
                        newMessage: true,
                        message: json.message
                    });
                    this.componentDidMount();
                    this.clearCard();
                } else {
                    this.setState({
                        newMessage: true,
                        message: json.message
                    });
                }
            } else {
                this.setState({
                    newMessage: true,
                    message: "write a valid email."
                });
            }

        }
    }

    async deleteUser(event) {
        const user_id = event.target.value;
        const response = await fetch('http://localhost:3500/user/' + user_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        if (json.state) {
            this.setState({
                newMessageListUser: true,
                message: json.message
            });
            this.componentDidMount();
        } else {
            this.setState({
                newMessageListUser: true,
                message: json.message
            });
        }

    }

    findUser(id) {
        let user = JSON;
        for (var i = 0; i < this.state.listUser.length; i++) {
            if (this.state.listUser[i]._id === id) {
                user = this.state.listUser[i];
                break;
            }
        }
        return user;
    }

    async editUser(event) {
        const user = this.findUser(event.target.value);
        if (user.name !== undefined) {
            this.setState({
                email: user.email,
                name: user.name,
                id: event.target.value,
                btnEditUser: true
            });
        }
    }

    async updateUSer() {
        const { email, name, id } = this.state;
        if (email === "" || name === "") {
            this.setState({
                newMessage: true,
                message: "You have to write all input"
            });
        } else {
            if (this.validateEmail(email)) {
                const response = await fetch('http://localhost:3500/user/' + id, {
                    method: 'PUT',
                    body: JSON.stringify({ email: email, name: name }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                });
                const json = await response.json();
                if (json.state) {
                    this.setState({
                        newMessage: true,
                        message: json.message
                    });
                    this.componentDidMount();
                    this.clearCard();
                } else {
                    this.setState({
                        newMessage: true,
                        message: json.message
                    });
                }
            } else {
                this.setState({
                    newMessage: true,
                    message: "write a email valid."
                });
            }

        }
    }

    clearCard() {
        this.setState({
            name: "",
            email: "",
            id: "",
            btnEditUser: false,
            newMessage: false
        });
    }

    render() {
        const { email, name, showUser, listUser, newMessage, message, btnEditUser, newMessageListUser } = this.state;
        let ThereUser = false;
        if (showUser) {
            if (listUser.length > 0) {
                ThereUser = true;
            }
            return (
                <div className="user container">
                    <div className="row rowOne">
                        <div className="col-lg-4 newUser">
                            <div className="titleNewUser">
                                <h6>
                                    New user
                                    </h6>
                            </div>
                            {/* New user card start */}
                            <div className="card mx-auto cardComponent">
                                {newMessage ? <div>{message}</div> : null}

                                <div className="card-header">

                                    <input className="form-control inputUser" type="text" name="name" placeholder="User's name" value={name} onChange={this.formUser}></input>

                                    <input className="form-control inputUser" type="text" name="email" placeholder="User's email" value={email} onChange={this.formUser} required />

                                    <div className="btn-group-md">
                                        {btnEditUser ?
                                            <button type="submit" className="btn btn-primary mr-3 btn-newUser inputUser" onClick={this.updateUSer}>
                                                Update user
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-primary mr-3 btn-newUser inputUser" onClick={this.newUser}>
                                                Create user
                                            </button>
                                        }
                                        <button type="submit" className="btn btn-danger btn-newUser inputUser" onClick={this.clearCard}>
                                            Cancel
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {/* New user card end */}

                        </div>
                        <div className="col-lg-8 listUser">

                            {newMessageListUser ? <div>{message}</div> : null}

                            <div className="filterUser">
                                <input className="form-control" type="text" placeholder="Search a user by name or email" aria-label="Search" onChange={this.filterUser} />
                            </div>

                            {ThereUser ?
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Accions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listUser.map((user, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <div className="btn-group-sm">

                                                            <button className="btn btn-primary mr-3" value={user._id} onClick={this.editUser}>Edit</button>

                                                            <button className="btn btn-danger" value={user._id} onClick={this.deleteUser}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div>There is not any user...</div>
                            }
                        </div>
                    </div>
                </div>
            );

        } else {
            return (<div>Loading user...</div>)
        }

    }
}

export default User;