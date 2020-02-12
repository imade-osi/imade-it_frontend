/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/


// reactstrap components
import { Button, Container, NavLink } from "reactstrap";

// core components

import React, { Component } from 'react'

export default class LandingPageHeader extends Component {


  render() {
    let pageHeader = React.createRef()

    return (
      <div
        style={{
          backgroundImage: "url(" + require("assets/img/daniel-olahh.jpg") + ")"
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
        >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>Welcome{}</h1>
            {/* <h3>The right job starts with the proper network</h3> */}
            <br />
            <Button
              className="btn-round mr-1"
              color="neutral"
              target="_blank"
              outline
              onClick={() => { this.props.getCareerCoordinates() }}
            >
              <i className="nc-icon nc-money-coins" /> Career Service Search
            </Button>


          </div>
        </Container>
      </div>
    )
  }
}




