import React, { Component } from "react";
import "./Home.css";
import Welcomeseeker from "./Welcome/Welcomeseeker"
import Welcomerecruiter from "./Welcome/Welcomerecruiter"

class Home extends Component {
	constructor(props) {
    super(props);
	};
	 
	clickSeeker = () => {
	  	localStorage.setItem("seeker", true);
	  	localStorage.setItem("disableRecruiter", true);
	  }
	clickRecruiter = () => {
	  	localStorage.setItem("seeker", false);
	  	localStorage.setItem("disableRecruiter", true);
	  }
  render() {
  	let username = localStorage.getItem("username");
  	let welcome;
  	if(username === null){
		welcome=<div class="flex-container">
		<div class="container">
		<div class="col-lg-10">
			<p>Want to be a recruiter?</p>
			<a href="/signup" onClick={this.clickRecruiter}>click here</a>
		</div></div>
		<div class="container">
		<div class="col-lg-10">
			<p> Searching for a Job?</p>
			<a href="/signup" onClick={this.clickSeeker}>click here</a>
		</div></div></div>;
  	}
  	else{
  		let seeker = localStorage.getItem("seeker");
  		if(seeker === true) {
  			welcome = <Welcomeseeker/>;
  		}
  		else{
  			welcome = <Welcomerecruiter/>;
  		}

  	}
    return (<div class="hero-image">
				
					{welcome}
				
      		</div>
      		);
  }
}

export default Home;
