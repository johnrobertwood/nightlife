var React = require('react');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;

var Home = React.createClass({

	handleClick: function() {
		console.log('handle click')
		browserHistory.push('/connect/facebook')
		// $.get('http://localhost:8000/connect/twitter')
	},

	render: function() {
		console.log('home component!')

		return (
			<div>
				<h1>Home!!</h1>
				<a href="/connect/facebook" onClick={this.handleClick}>Sign In</a>
			</div>
		)
	}
});

module.exports = Home;