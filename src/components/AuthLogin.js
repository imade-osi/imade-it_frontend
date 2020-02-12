import React from 'react'

export default class AuthLogin extends React.Component {

    state = {
        user: {},
        name: "",
        password: "",
        createNew: false,
        picture: ""
    }

    swapCreate = () => {
        this.setState({
            createNew: !this.state.createNew
        })
    }


    makeNewUser = () => {
        fetch('http://localhost:4000/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: this.state.name,
                    password: this.state.password,
                }
            })
        })
            .then(r => r.json())
            .then((response) => {

                // console.log(response.user)
                if (response.jwt) {
                    localStorage.token = response.jwt
                    localStorage.user_id = response.user.data.id
                    localStorage.name = response.user.data.attributes.name
                    this.props.postAuthUser(localStorage.user_id)
                } else {
                    alert("Oops, something went wrong")
                }
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        // if (this.state.createNew) {
        //     fetch('http://localhost:4000/api/v1/users', {
        //         method: "POST", 
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }, 
        //         body: JSON.stringify({
        //             user: {
        //                 name: this.state.name, 
        //                 password: this.state.password,
        //                 picture: this.state.picture
        //             }
        //         })
        //     })
        //     .then(r => r.json() )
        //     .then((response) => {

        //         // console.log(response.user)
        //         if (response.jwt) {
        //             localStorage.token = response.jwt
        //             localStorage.user_id = response.user.data.id
        //             localStorage.name = response.user.data.attributes.name
        //             localStorage.picture = response.user.data.attributes.picture
        //             this.props.postAuthUser(localStorage.user_id)
        //         } else {
        //             alert("Oops, something went wrong")
        //         }
        //     })
        // } else {
        fetch('http://localhost:4000/api/v1/auth', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: this.state.name,
                    password: this.state.password
                }
            })
        })
            .then(r => r.json())
            .then((response) => {
                // console.log(response)
                if (response.jwt) {
                    localStorage.token = response.jwt
                    localStorage.user_id = response.user.data.id
                    localStorage.name = response.user.data.attributes.name
                    localStorage.picture = response.user.data.attributes.picture
                    this.props.postAuthUser(localStorage.user_id)
                } else {
                    alert("Invalid Password or Username")
                }
            })
        // }

        // postAuthUser  (when you have user created/get)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addPicture = () => {
        if (this.state.createNew) {
            return (
                <label>
                    Profile Picture:
                <input type="text" name="picture" value={this.state.picture} onChange={this.handleChange} />
                </label>
            )
        }
    }

    render() {
        return (


            <div>
                <h3 className="text-title2">Welcome To The Generic Store</h3>

                <form class="form-2" onSubmit={this.handleSubmit}>
                    <h1><span class="log-in">Log in</span> or <span class="sign-up">sign up</span></h1>
                    <p class="float">
                        <label for="login"><i class="icon-user"></i>Username</label>
                        <input type="text" name="name" placeholder="Username or email" value={this.state.name} onChange={this.handleChange} />
                    </p>
                    <p class="float">
                        <label for="password"><i class="icon-lock"></i>Password</label>
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </p>

                    <p class="clearfix">
                        <a onClick={this.makeNewUser} name="signup" href="#" class="log-twitter">Sign Up</a>
                        <input type="submit" name="submit" />
                    </p>
                </form>
            </div>
        )
    }
}