
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavLink
} from "reactstrap";

import swal from 'sweetalert'
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class RegisterPage extends Component {

state={
  currentUser: {},
  username: '',
  password: '',
  token: "",
  user_id: ""
}




  swapCreate = () => {
    this.setState({
      createNew: !this.state.createNew
    })
  }



  handleSignup = () => {

    let signup = {
      name: this.state.username,
      password: this.state.password
    }

    fetch('http://localhost:4000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signup)
    })
      .then(r => r.json())
      .then(response => { 

        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('name', response.name);
          this.props.postAuthUser(localStorage.user_id, localStorage.token, localStorage.name )
        } else {
          swal({
            title: "Oops something went wrong, please try again!",
            icon: "error",
            button: "Close",
          })
        } 
      })

       //=> {

        // console.log(response.user)
        // if (response.jwt) {
        //   localStorage.token = response.jwt
        //   localStorage.id = response.user._id
        //   localStorage.name = response.user.data.attributes.name
        //   this.props.postAuthUser(localStorage.user_id)
        // } else {
        //   alert("Oops, something went wrong")
        // }
      //})
  }

  handleLogin = () => {
    //debugger 
    
    let user = {
      name: this.state.username,
      password: this.state.password 
    }

    fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(r => r.json())
      .then(response => {
        
        if (response.token) {
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.id);
          localStorage.setItem('name', response.name);
          //debugger 
          this.props.postAuthUser(response.id, response.token, response.name)
          
        } else {
            swal({
              title: "Please check your password/username and try again",
              icon: "error",
              button: "Close"
            })
          }
      })
  }

  handleChange = (evt) => {
    // console.log(evt.target.name, evt.target.value)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  handleClick = (evt) => {
    
    if (evt.target.innerText === 'LOGIN')
    {
      this.handleLogin()
    }
    else {
      this.handleSignup();
    }

  }
  

  render() { 
    if(localStorage.token){
      
      return <Redirect to="/homepage"></Redirect>
    }
  return (
  
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto">Welcome</h3>
                <Form className="register-form">
                  <label>Username</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText >
                        <i className="nc-icon nc-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input onChange={this.handleChange} name="username" placeholder="Username" type="text" />
                  </InputGroup>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                  <Input onChange={this.handleChange} name="password" placeholder="Password" type="password" />
                  </InputGroup>
                  {/* <NavLink
                    //data-placement="bottom"
                    //href="https://www.github.com/CreativeTimOfficial/paper-kit-react?ref=creativetim"
                    //target="_blank"
                    href="/homepage"
                  >    */}
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    onClick={this.handleClick}
                  >
                    Login
                  </Button>
                  {/* </NavLink> */}
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={this.handleClick}
                  >
                    Signup
                  </Button>
                </div>
              </Card>
              <div className="col text-center">
                <NavLink
                  
                  href="/home">
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  href="/home"
                  size="lg"
                  target="_blank"
                >
                  Homepage
                </Button>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  
  );
}
}
