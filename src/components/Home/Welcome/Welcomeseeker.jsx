import React, { Component } from "react";
import "../Home.css";

class Welcomeseeker extends Component {
  render() {
  	let username = localStorage.getItem("username");
    return (
    	<div class="flex-container">
		<div class="container">
			<div class="col-lg-10">
				<h4>Welcome, {username}</h4>
				<p>- Want to move to a new town?</p>
				<p>- Need a growth in your teaching career?</p>
				<a href="/findjobs">click here</a>
			</div></div>
		<div class="container">
			<div class="col-lg-10">
				<h3>Refer and earn gifts</h3>
				<ul>- Refer a peer or a friend</ul>
				<ul>- You will be eleigible for free job alerts</ul>
				<ul>- Free mail notifications for new openings</ul>
				<ul>- Get to know which recruiters viewed your profile</ul>
				<a href="/refernow">Refer Now</a>
			</div></div>
		</div>
    );
  }
}

export default Welcomeseeker;