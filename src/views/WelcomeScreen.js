// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import React, { Component } from 'react'

export default class Index extends Component {
  render() {
    return (
      <div>
        <IndexNavbar />
        <IndexHeader />
      </div>
    )
  }
}

