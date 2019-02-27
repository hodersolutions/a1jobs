import React, { Component } from "react";
import Form from "react-jsonschema-form";
import Idnames from '../Common/Idnames';

const schema = {
  title: "Please select a value fromm the dropdown",
  "type": "object"
};  //schema


const formData = {

};

class Jobs extends Component {
	constructor(props) {
    super(props);
    
    this.state = {
      schemaState : {...schema},
      uiSchema : {},
      fields : {},
      paramValue : this.props.match.params.name,
      jobs : {}
    }
    
    //console.log(this.state)
    //this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount()
  {	
  	let schema = this.state.schemaState
    schema.title = "Select a "+ this.state.paramValue
    schema.type = "object"
    schema.properties = {[this.state.paramValue] : 
    						{ type: "integer",
    						title: this.state.paramValue,
    						enum :[],
    						enumNames:[] }}

   // let Names = this.state.paramValue+"s"
   	let uiSchemalocal = this.state.uiSchema
   	uiSchemalocal = {
   	[this.state.paramValue] :{"ui:field" : "Names"}
   	}
   	let fieldslocal = this.state.fields
   	fieldslocal = {
   	Names : Idnames
   	}

    this.setState({schemaState : schema});
    this.setState({uiSchema : uiSchemalocal});
    this.setState({fields : fieldslocal});
  }

  onSubmit({formData}) {
  	//console.log(formData)
  	let id = formData[this.state.paramValue]
  	this._asyncRequest = fetch("http://a1api.herokuapp.com/api/v1/jobs/filter?"+this.state.paramValue+"="+id)
		.then((response) => 
			{
			let promise = response.json();
			promise.then(
			  result => {
			    if(result.status === "success"){
			    	this.setState({loaded : true})
			    	this.setState({jobs: result.object})
			    	//console.log(result);
					}
			    }
			)
		}); 
    
    }
	render() {
		
		var html_text  = ''
		if(this.state.jobs.length < 1)
		{
		html_text = 'No Jobs found with the selected criteria'
		}
		for(var i = 0; i < this.state.jobs.length; i++)
		  {
		  	var id = this.state.jobs[i]['Id']
		  	var title = this.state.jobs[i]['Title']
		  	var experience = this.state.jobs[i]['Minimum years of Experience']
		  	var location = this.state.jobs[i]['District']
		  	var href = "/viewjob/" + id
		  	html_text = <fragment>
		  	{html_text}
	  		<div className="row">
	  			<ul>
	  			<div className="form-group-lg">
	  				<tr><td>
	  				<a href={href}> 
	  				<div>{title}</div>
	  				<div className="col-xs">Location:{location}   Experience Required:{experience}</div>
	  				</a>
	  				</td></tr>
	  			</div>
	  			</ul>
	  		</div>
	  		</fragment>
		 }
		return(
		<div className="container">
		<Form schema={this.state.schemaState} uiSchema={this.state.uiSchema} formData={formData} fields={this.state.fields}  onSubmit={this.onSubmit} className="form-signin">
          </Form>
         {html_text}
		</div>
		);
	}
};
export default Jobs;