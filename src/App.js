import React, { Component } from 'react'
import MainContainer from './container/MainContainer'

export default class App extends Component {

  state= {
      myCareerServices: [
          {
              name: "Career Service Name: Philadelphia Works, Inc.",
              address: "Address: 1617 John F Kennedy Blvd 13th floor, Philadelphia, PA 19103, United States"
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
