import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import WelcomeScreen from "views/WelcomeScreen.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import EventPage from "views/examples/EventPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import MapContainer from "./MapContainer.js";
// others

export default class MainContainer extends Component {

    state = { 
              myCareerServices: [],
              currentUserId: 0,
              token: ""
            }
            
   

    addServiceToPage = (serviceName, serviceAddress) => {
        fetch('http://localhost:4000/career_services', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                name: serviceName,
                address: serviceAddress
            })
        })
            .then(r => r.json())
            .then((response) => {

                this.setState({
                    ...this.state,
                    careerServices: {
                        name: serviceName,
                        address: serviceAddress
                    } 
                })
            })
    }  

    // componentDidMount() {
    //     if (window.performance) {
    //         if (performance.navigation.type == 1) {
    //             localStorage.removeItem("user_id")
    //             localStorage.removeItem("name")
    //             localStorage.removeItem("token")
    //             window.location = "http://localhost:3000"
    //         }
    //     }
    // }


  componentDidUpdate = () => {

    let id = this.state.currentUserId
    let token = this.state.token

    fetch(`http://localhost:4000/users/${id}`, {

      headers: {
        "Authorization": token
      }
    })
      .then(r => r.json())
      .then(data => console.log('auth data', data))
  }


    postAuthUser = (userId, token) => {
        // console.log(arg)
       
                this.setState({
                    loggedIn: true,
                    currentUserId: userId,
                    token: token   
                })
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route 
                        path="/home" 
                        render={props => <WelcomeScreen {...props} />} 
                    /> 
                    <Route
                        path="/homepage"
                        render={props => <LandingPage {...props} addServiceToPage={this.addServiceToPage} loggedIn={this.state.loggedIn}  />}
                    />
                    <Route
                        path="/profile-page"
                        render={props => <ProfilePage {...props} loggedIn={this.state.loggedIn}/>}
                    />
                    <Route
                        path="/events-page"
                        render={props => <EventPage {...props} loggedIn={this.state.loggedIn} />}
                    />
                    <Route
                        path="/sign-in"
                        render={props => <RegisterPage  {...props} postAuthUser={this.postAuthUser}/>}
                    />                   
                    <Redirect to="/home" />
                </Switch>
            </BrowserRouter>
        )
    }
}
