import React, { Component } from "react";
import ReactLoading from 'react-loading';

let userid = localStorage.getItem("userid");

class Myposts extends Component {
	constructor(props) {
		super(props);
		this.state = {
		loaded : false,
		jobs : {}
		}
	}

	componentDidMount()
	{
		//console.log(this.state)
		if(this.state.loaded == true){
			return;
		}

		this._asyncRequest = fetch("http://a1api.herokuapp.com/api/v1/jobs/filter?recruiter="+userid)
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

  onSubmit({formData}) {
    
  }

  render() {
	if(this.state.loaded == false)
	{
		return(<ReactLoading type={'spinningBubbles'} color={'blue'} height={'20%'} width={'20%'} />)
	}
	var html_text  = ''
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
    return (
    	<div className="container">
    		<table class="table">
	  		{html_text}
	  		</table>
	  	</div>
    );
  }
}

export default Myposts;