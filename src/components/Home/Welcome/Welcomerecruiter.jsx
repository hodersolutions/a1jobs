import React, { Component } from "react";
import "../Home.css";

class Welcomerecruiter extends Component {
	constructor(props) {
    super(props);
	};
	 
	
  render() {
  	let username = localStorage.getItem("username");
    return (
    	<div class="flex-container">
		<div class="container">
			<div class="col-sm-12">
				<h4>Welcome, {username}</h4>
				<ul>Want to create a new teacher opening?</ul>
				<ul>Just fill in the details to make it available.</ul>
				<a href="/createjob">click here</a>
			</div>
			</div>
		<div class="container">
			<div class="col-xs-15">
				<h3>Refer Now</h3>
				<ul>Refer the site to peer or a friend</ul>
				<ul>Increase the chances of closing the appplication you posted</ul>
				<a href="/refernow">Refer Now</a>
			</div>
			</div>
		</div>
    );
  }
}

export default Welcomerecruiter;