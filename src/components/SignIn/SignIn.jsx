import React, { Component } from "react";
import './SignIn.css';
import Form from "react-jsonschema-form";

const schema = {
  title: "Please Sign In",
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {type: "string", title: "Email", default: ""},
    password: {type: "string", title: "Password", default: "*****"},
  }
};

const uiSchema = {
  title: {
    classNames: "border-bottom mb-4 h3 mb-3 font-weight-normal"
  },
  email: {
    "ui:widget": "email",
    classNames: "form-control-label"
  },
  password: {
    "ui:widget": "password",
    classNames: "form-control-label"
  }
}

const formData = {
  email: "gtg@gmail.com",
  password:"1234"
};

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({
			[e.target.name]:e.target.value
		});
	}
	onSubmit({formData}) {
		console.log(formData)
        var myHeaders = new Headers();
        var data = new FormData();
        data.append("body", JSON.stringify(formData))
        myHeaders.append('Content-Type', 'application/form-data');
        fetch('http://a1api.herokuapp.com/api/v1/auth/login', {
            'method': 'POST',
            'mode': 'cors',
            'header':myHeaders,
            'body': data
        })
        .then((response) => 
        { 
        let promise = response.json();
	     promise.then(
			result => {
			console.log(result)
				if(result.status === "success"){
					//add the details to the localstorage for now
					localStorage.setItem("username", result.username)
					localStorage.setItem("auth_token", result.auth_token)
					localStorage.setItem("userid", result.id)
					localStorage.setItem("seeker", !result.recruiter)
		        	this.props.history.push('/');
				}
				else{
					alert("Login Failed")
				}
			}
		);
        })
        .catch((error) =>
        {

        });
    }

  render() {
  	localStorage.removeItem("username")
  	localStorage.removeItem("auth_token")
  	localStorage.removeItem("userid")
    return (
		<div className="container" id="signInContainer">
			<div className="wrap-login-style">
				<fieldset className="form-group">
	              <img
	                className="mb-3"
	                src={require("../../static/images/login.png")}
	                alt="Sign Up"
	                width="60"
	                height="60"
	              />
		          <Form schema={schema} uiSchema={uiSchema} formData={formData} method="POST"  onSubmit={this.onSubmit} className="form-signin">
		          	<div className="form-group">
						<input className="btn btn-md btn-primary btn-block" id="submit" name="submit" type="submit" value="Sign In"/>
					</div>
		          </Form>
		        </fieldset>
				
				<label id="notaMember">Not a member?&nbsp;<a href="/signup" id="signUp">Join Us</a></label>        
			</div>
		</div>
    )
  }
}

export default SignIn;
