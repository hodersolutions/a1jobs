import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Asyncsearch from "../Common/Asyncsearch"
import Membership from "../membership/Membership"

class Header extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
        <div class="container-fluid">
          <div class="navbar-header">
            <span class="navbar-brand" mb-0 h1>A1Jobs</span>
          </div>
          <ul class="nav navbar-expand-lg navbar-left">
            <li class="nav-link active mb-2 h5"><a class="nav-link mb-2 h5" href="/">Home</a></li>
            <li  class="nav-link mb-2 h5" >
              <a class="nav-link mb-2 h5" data-toggle="dropdown" href="#">Search Jobs</a>
              <ul class="dropdown-menu">
                <li><a class="nav-text" href="/jobs/subject">By Subject</a></li>
                <li><a class="nav-text" href="/jobs/district">By District</a></li>
                <li><a href="/jobs/qualification">By Qualification</a></li>
              </ul>
            </li>
            <li  class="nav-link mb-2 h5" >
              <a class="nav-link mb-2 h5" data-toggle="dropdown" href="#">Search Profiles</a>
              <ul class="dropdown-menu">
                <li><a class="nav-text" href="/teachers/subject">By Subject</a></li>
                <li><a class="nav-text" href="/teachers/district">By District</a></li>
                <li><a href="/jobs/qualification">By Qualification</a></li>
              </ul>
            </li>
            <li class="nav-link mb-2 h5"><a  class="nav-link mb-2 h5" href="/contact">Contact Us</a></li>
            <li class="nav-link mb-2 h5"><a  class="nav-link mb-2 h5" href="/about">About</a></li>
          </ul>
          <Asyncsearch />
          <Membership />
        </div>
      </nav>
    );
  }
}

export default Header;
