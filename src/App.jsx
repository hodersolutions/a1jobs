import React, { Component } from "react";
import Main from "./components/Routes/Routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

class App extends Component {
	constructor(props) {
    super(props);
	console.log(props)
    this.state = {
    	loggeduser : "",
    	recruiter : false
    };
    //this.handleLoggedUserChange = this.handleLoggedUserChange.bind(this)
    this.handleRecruiterChange = this.handleRecruiterChange.bind(this);
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
  handleRecruiterChange () {
  	this.setState({recruiter: true});
  	alert("yes");
  };
  render() {
    return (
      <div className="App">
        <div>
        <Header />
        </div>
        <div className="container"><Main handler= {this.handleRecruiterChange}/></div>
        <Footer />
      </div>
    );
  }
}

export default App;
