import React, { Component } from "react";
import Form from "react-jsonschema-form";
import Idnames from '../Common/Idnames';

const schema = {
  title: "Account Details",
  type: "object",
  required: ["firstname", "lastname", "contactemail", "phoneno", "address", "district", "state"],
  properties: {
    firstname: {type: "string", title: "Firstname", default: ""},
    lastname: {type: "string", title: "Lastname", default: ""},
    contactemail: {type: "string", title: "Contact Email", default: ""},
    phoneno: {type: "number", title: "Contact Number", default: ""},
    "address": {
      "type": "object",
      "properties": {
        "localaddress": {
          "type": "string",
          "title": "Local Address"
        },
        "city": {
        "type": "string",
        "title" : "City/Town/Village"
        }
      },
      "required": [
      "localaddress",
      "city",
      ]
    },
    "district": {
      "type": "integer",
      "title": "District",
      "enum" : [],
      "enumNames" : []
    },
    "state": {
      "type": "integer",
      "title": "State",
      "enum":[1],
      "enumNames":["Andhra Pradesh"]
    }
  }
};

const uiSchema = {
  district: {"ui:field": "districts"}
};

// custom field component
const fields = {
  districts: Idnames
};

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    schemaState : schema,
    formData : {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(name) {
    console.log(name);
    return (event) => {
    console.log(event);
      this.setState({
        [name]: event.target.value
      });
    };
  }
  onSubmit({formData}) {
    let username = localStorage.getItem("username")
    console.log(formData)
    var myHeaders = new Headers();
    var data = new FormData();
    data.append("body", JSON.stringify(formData))
    myHeaders.append('Content-Type', 'application/form-data');
    fetch('http://a1api.herokuapp.com/api/v1/users/'+username+ '/details', {
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
          if(localStorage.getItem("seeker")===true){
            this.props.history.push("/additionaldetails");
          }
          else{
            this.props.history.push("/welcome")
          }
        }
      })

      console.log(response);
    });   
    }
  render() 
  {
    return (
      <Form schema={this.state.schemaState}  uiSchema = {uiSchema} fields={fields} onChange={this.onChange} onSubmit={this.onSubmit} formData={this.formData} className="form-signin">
      </Form>
    );
  }
}

export default Editprofile;
