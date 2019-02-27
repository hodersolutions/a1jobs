import React, { Component } from "react";
import Form from "react-jsonschema-form";
import Idnames from '../Common/Idnames';

let username = localStorage.getItem("username");

const schema = {
  "title": "New Job Opening form",
  "type": "object",
  "required": [
    "subject",
    "minexperience",
    "institution"
  ],
  "properties": {
    "description": {
      "type": "string",
      "title": "Title",
    },
    "subject": {
      "type": "integer",
      "title": "Subject",
      "enum" : [],
      "enumNames" : []
    },
    "jobdetails": {
      "type": "string",
      "title": "Job Description"
    },
    "minexperience": {
      "type": "integer",
      "title": "Minimum Experience Required"
    },
    "maxexperience": {
      "type": "integer",
      "title": "Maximum Experience(Optional)",
      defaullt: ""
    },
    "qualification": {
      "type": "integer",
      "title": "Minimum Degree Required",
      "enum" : [],
      "enumNames" : []
    },
    "institution": {
      "type": "string",
      "title": "School Name"
    },
    "submitter": {
      "type": "string",
      "title": "Recruiter",
      "default": username,
    },
    "telephone": {
      "type": "string",
      "title": "Contact number",
      "minLength": 10
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
  jobdetails : {"ui:widget" : "textarea"},
  qualification: {"ui:field": "qualifications"},
  subject:{"ui:field": "subjects"},
  district:{"ui:field": "districts"}
};

// custom field component
const fields = {
  qualifications: Idnames,
  subjects : Idnames,
  districts : Idnames
};
const formData = {

};

class Createjob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaState : {...schema}
    }
    //this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({formData}) {
    var myHeaders = new Headers();
    var data = new FormData();
    data.append("body", JSON.stringify(formData))
    myHeaders.append('Content-Type', 'application/form-data');
    fetch('http://a1api.herokuapp.com/api/v1/jobs', {
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
        console.log(response);
        }
      })
    });
    this.props.history.push('/myposts');
  }
  render() {
    return (
      <Form schema={this.state.schemaState} uiSchema={uiSchema} formData={formData} fields={fields} onSubmit={this.onSubmit} className="form-signin"/>
    );
  }
}

export default Createjob;