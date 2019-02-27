import React, { Component } from "react";
import ReactLoading from 'react-loading';
import {withRouter} from 'react-router-dom';

let userid = localStorage.getItem("userid");

class Viewjob extends Component {
	constructor(props) {
		super(props);
		//console.log(this.props)
		this.state = {
		paramValue : this.props.match.params.id,
		loaded : false,
		job : {}
		}
	}

	componentDidMount()
	{
		//console.log(this.state)
		if(this.state.loaded == true){
			return;
		}

		this._asyncRequest = fetch("http://a1api.herokuapp.com/api/v1/job/"+ this.state.paramValue)
		.then((response) => 
			{
			let promise = response.json();
			promise.then(
			  result => {
			    if(result.status === "success"){
			    	this.setState({loaded : true});
			    	this.setState({job : result.job});
			    	//console.log(result);
				}
				else{
				}
			   }
			)
		}); 
	}

  onSubmit({formData}) {
    
  }

  render() {
  //console.log(this.state)
	if(this.state.loaded == false)
	{
		return(<ReactLoading type={'spinningBubbles'} color={'blue'} height={'20%'} width={'20%'} />)
	}
	var html_text  = ''
	for (const [key, value] of Object.entries(this.state.job))
    	{	
    	html_text = <fragment>
    				{html_text}
    				<div><tr>
			  		<td>{key}</td>
			  		<td>{value}</td>
			  		</tr></div>
			  		</fragment>
    	}
    return (
    	<div className="container">
    	<table className="table">
    	{html_text}
    	</table>
	  	</div>
    );
  }
}

export default withRouter(Viewjob);