var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var Login = React.createClass({

	handleClick: function() {
		console.log('handle click')
		// browserHistory.push('/connect/twitter')
		$.get('http://local.host:8000/connect/facebook')
	},

	render: function() {
		console.log('login component')
		return (
			<div>
			<h1>Login!</h1>
      <button onClick={this.handleClick}>Sign In</button>
			</div>
		)
	}
});

module.exports = Login;