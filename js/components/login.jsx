var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Login = React.createClass({

	handleClick: function() {
		$.get('http://local.host:8080/connect/twitter');
	},

	render: function() {
		console.log('login component')
		return (
			<div>
			<h1>Login</h1>
	    <ul>
	      <li onClick={this.handleClick}>Sign In</li>
	    </ul>
			</div>
		)
	}
});

module.exports = Login;