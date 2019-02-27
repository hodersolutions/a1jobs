import React, { Component } from "react";
import ReactLoading from 'react-loading';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {AsyncTypeahead} from 'react-bootstrap-typeahead'; // ES2015

class Asyncsearch extends React.Component {
  state = {
    isLoading: false,
    options: [],
    selected:[]
    };

  render() {
    var path = "/viewprofile/"+this.state.selected.id
    //console.log(this.state.defaultSelected)
    return (
		<form action={path}>
		<div>
		<AsyncTypeahead
		placeholder="Find a Teacher..."
		onInputChange={(text) => {
			//console.log(text)
			if (this.state.options.length) {
					this.setState({options: []});
			}
		}}
		  onSearch={this.handleSearch.bind(this)}
		  minLength={3}
		  options={this.state.options}/>
		</div>
		</form>
    );
  }

  handleSearch = (query) => {
  //console.log(query)
    this.setState({isLoading: true});
    fetch("http://a1api.herokuapp.com/api/v1/users/search/"+query)
    .then((response) => 
		{
		let promise = response.json();
		promise.then(
			result => {
				if(result.status === "success"){
					this.setState({isLoading : false});
			    	this.setState({options : result.options});
				//console.log(result);
				}
				else{
				}
			}
		)
	}); 
  }
}

export default Asyncsearch;