import React, { Component } from "react";
import "../../App.css";
import {withRouter} from 'react-router-dom';
import Form from "react-jsonschema-form";

//todo: move all the fetch calls to one module
let subjects;
fetch('http://a1api.herokuapp.com/api/v1/subjects/all', {
    'method': 'GET',
    'mode': 'cors',
})
.then((response) => 
  {
  let promise = response.json();
  promise.then(
    result => {
      console.log(result)
      if(result.status === "success"){
        //this.props.history.push("/welcome");
      }
    })
}); 

const schema = {
  title: "Admin tools",
  "type": "object",
  "properties": {
    "subjects": {
      "type": "array",
      "title": "Add/Modify Subjects",
      "items": {
          "subject": {
            "type": "array",
            "title": "Subject",
          }
        }
      } 
    }
  }  //properties
};  //schema

const uiSchema = 
{
};
const formData = {

};

class Additionaldetails extends Component {