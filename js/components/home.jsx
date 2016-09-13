var React = require('react');
var ReactDOM = require('react-dom');

var Home = React.createClass({
	render: function() {
		console.log('home component!')
		return (
			<h1>Home!</h1>
		)
	}
});

module.exports = Home;