var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	render: function() {
		console.log('app component')
		return (
			<div>
				<h1>App</h1>
				{this.props.children}
			</div>
		)
	}
});

module.exports = App;
