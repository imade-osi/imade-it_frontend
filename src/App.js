import React, { Component } from 'react'
import MainContainer from './container/MainContainer'

export default class App extends Component {

  state= {
      myCareerServices: [
          {
              
          }
      ]
  }

    addServiceToPage = (serviceName, serviceAddress) => {


        this.setState({

            myCareerServices: [...this.state.myCareerServices,
            {
                name: serviceName,
                address: serviceAddress
            }
            ]
        })

    } 

    render() {
        return (
            <div>
                <MainContainer addServiceToPage={this.addServiceToPage} myCareerServices={this.state.myCareerServices}/>    
            </div>
        )
    }
}
