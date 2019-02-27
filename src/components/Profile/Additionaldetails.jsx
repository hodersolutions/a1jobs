import React, { Component } from "react";
import Form from "react-jsonschema-form";
import Idnames from '../Common/Idnames';

const schema = {
  title: "Background Experience Details",
  "type": "object",
  "properties": {
    "experiences": {
        "type": "array",
        "title": "Institution Details",
        "items": {
          "type": "object",
          "required": [
            "institution"
        ],
        "properties": {
          "institution": {
            "type": "string",
            "title": "Name  of the Institution",
          },
          "experience": {
            "type": "string",
            "title": "Years of Experience",
            "default":"0"
          },
          "from-date": {
            "type": "string",
            "format": "date",
            "title": "From"
          },
          "to-date": {
            "type": "string",
            "format": "date",
            "title": "To"
          },
          "currentinst": {
            "type": "boolean",
            "title": "Current Institution?",
            "default": false
          }  //experiences properties
        }
      } //items
    }, //experiences
    "qualification" : {
        type : "integer", 
        title : "Educational Qualification", 
        enum: [],
        enumNames: []  
    },
    "subject" : {
      "type": "integer",
      "title": "Specialization in the Subject",
      "enum" : [],
      "enumNames" : []
    },
    medium: {
      type: "integer",
      title: "Specialization Medium",
      default: "",
      enum:[1,2],
      enumNames:["English", "Telugu"]
    },
    experience: {type: "string", title: "Total Years of Experience(in years)", default: ""},
    "expectedpack":{
      "type" : "integer",
      "title": "Expected package(per anum)"
    },
    "currentpack":{
      "type" : "integer",
      "title": "Current package(per anum)"
    },
    "file": {
      "type": "string",
      "format": "data-url",
      "title": "Upload Resume"
    }

  }  //properties
};  //schema

const uiSchema = 
{
  "experiences": {
    "from-date": {
      "ui:widget": "alt-date",
      "ui:help": "example: for 13th Feb 1999 enter 13/02/1999",
      "ui:options": {
        "yearsRange": [
          1980,
          2030
        ]
      }
    },
    "to-date": {
      "ui:field": "alt-date",
      "ui:help": "example: for 13th Feb 1999 enter 13/02/1999",
      "ui:options": {
        "yearsRange": [
          1980,
          2030
        ]
      }
    }
  },
  qualification: {"ui:field": "qualifications"},
  subject:{"ui:field": "subjects"}
};

// custom field component
const fields = {
  qualifications : Idnames,
  subjects : Idnames
};
const formData = {

};

class Additionaldetails extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      schemaState : {...schema},
    }
    //this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({formData}) {
    let username = localStorage.getItem("username")
    //console.log(formData)
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
      //console.log(result)
        if(result.status === "success"){
          this.props.history.push("/welcome");
          }
        })

      //console.log(response);
    });   
    }
    
    render(){
      return (
        <div className="container" id="container">
          <Form schema={this.state.schemaState} uiSchema={uiSchema} formData={formData} fields={fields}  onSubmit={this.onSubmit} className="form-signin">
          </Form>
        </div>
    );
  }
}

export default Additionaldetails;
