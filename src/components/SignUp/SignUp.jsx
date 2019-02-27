import React, { Component } from "react";
import "./SignUp.css";
import Form from "react-jsonschema-form";

let seeker = localStorage.getItem("seeker");
let disableCheck = localStorage.getItem("disableRecruiter");
const schema = {
  title: "Join Us",
  type: "object",
  required: ["username", "email", "password"],
  properties: {
    username: {type: "string", title: "Username", default: ""},
    email: {type: "string", title: "Email", default: ""},
    password: {type: "string", title: "Password", default: "*****"},
    confirmpassword: {type: "string", title: "Confirm Password", default: "*****"},
    recruiter: {type: "boolean", title: "I am a Job recruiter", default: !seeker}
  }
};

const uiSchema = {
  title: {
    classNames: "border-bottom mb-4 h3 mb-3 font-weight-normal"
  },
  username: {
    classNames: "form-control-label"
  },
  email: {
    "ui:widget": "email",
    classNames: "form-control-label"
  },
  password: {
    "ui:widget": "password",
    classNames: "form-control-label"
  },
  confirmpassword: {
    "ui:widget": "password",
    classNames: "form-control-label"
  },
  recruiter: {
    "ui:disabled": disableCheck
  }
}

const formData = {
  username: "First task",
};

class SignUp extends Component {
    constructor(props) {
    super(props);
    this.state = {
      
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit({formData}) {
        console.log(formData)
        var myHeaders = new Headers();
        var data = new FormData();
        data.append("body", JSON.stringify(formData))
        myHeaders.append('Content-Type', 'application/form-data');
        fetch('http://a1api.herokuapp.com/api/v1/users', {
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
            localStorage.setItem("username", result.user.username);
            localStorage.removeItem("seeker");
            localStorage.removeItem("disableRecruiter");
            console.log(response);
            }
          })
        });
    this.props.history.push('/editprofile');
    }

  render() {
    return (
      <div className="container" id="signUpContainer">
        <div className="wrap-login-style">
          <fieldset className="form-group">
              <img
                className="mb-3"
                src={require("../../static/images/signup.png")}
                alt="Sign Up"
                width="60"
                height="60"
              />
          <Form schema={schema} uiSchema={uiSchema} formData={formData} method="POST" onSubmit={this.onSubmit} className="form-signin">
          </Form>
            </fieldset>
          <label id="alreadyaMember">
            Already a member?&nbsp;
            <a href="/signin" id="signIn">
              Sign In
            </a>
          </label>
        </div>
      </div>
    );
  }
}

export default SignUp;
