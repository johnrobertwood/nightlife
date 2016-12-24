var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route; 
var hashHistory = require('react-router').hashHistory;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var Home = require('./js/components/home.jsx');
var App = require('./js/components/app.jsx');
var Login = require('./js/components/login.jsx');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={Login} />
      <Route path="*" component={Home} />
    </Route>
  </Router>,
  document.getElementById('container')
)