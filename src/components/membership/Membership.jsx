import React, { Component } from "react";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';

class Membership extends Component {
  constructor(props) {
    super(props);
    
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("seeker");
    localStorage.removeItem("userid");
    this.props.history.push('/signin');
  }
  render(){
  //console.log(localStorage.getItem("username"))
      if(localStorage.getItem("username")===null){
        return(
        <ul class="nav navbar-expand-lg navbar-right">
          <li class="nav-link active mb-2 h5"><a class="nav-link mb-2 h5" href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li class="nav-link active mb-2 h5"><a class="nav-link mb-2 h5" href="/signin"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
        );
      }
    else{
    let username = localStorage.getItem("username")
    return (
       <div>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="pe-7s-user"></i>
              <span className="icon-text">{username}</span>
            </a>
            <ul class="dropdown-menu">
              <li><Link to="/myposts">My Posts</Link></li>
              <li><Link to="/editprofile">Profile Settings</Link></li>
              <li class="divider"></li>
              <li><a href="" onClick={this.handleSignOut}>Sign Out</a></li>
            </ul>
          </li>
      </div>
    );
    }
  }
}
export default Membership