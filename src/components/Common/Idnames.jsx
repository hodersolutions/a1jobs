import React, { Component } from "react";
import Form from "react-jsonschema-form";
import ReactLoading from 'react-loading';


class Idnames extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.onChange = this.onChange.bind(this);
  }
   
  onChange(formData) {
  //console.log(formData)
  this.props.onChange(formData.formData);
  }

  componentDidMount()
  {	
  	//console.log(this.state)
  	if(this.state.schema.enum > 1){
  		return;
  	}
    this._asyncRequest = fetch("http://a1api.herokuapp.com/api/v1/" + this.state.name + "s/all")
    .then((response) => 
        {
        let promise = response.json();
        promise.then(
          result => {
            if(result.status === "success"){
            	let schema_local = {
            	...this.state.schema, 
            	}
                for(var i=0; i<result.object.length; i++){
                  schema_local.enum.push(result.object[i].id);
                  schema_local.enumNames.push(result.object[i].name);
                }
              	this.setState({schema : schema_local});
            }
          }
        )
      }); 
  }

  componentWillUnmount() 
  {
    //if (this._asyncRequest) {
     // this._asyncRequest.cancel();
    //}
  }

 render() 
  {
    if(this.state.schema.enum.length < 2)
    {
	    return(<ReactLoading type={'spinningBubbles'} color={'blue'} height={'20%'} width={'20%'} />)
    }
    return (
		<Form schema={this.state.schema} onChange={this.onChange} onSubmit={this.props.onSubmit} formData={this.props.formData}>
		<br/>
		</Form>
    );
  }
}

export default Idnames;