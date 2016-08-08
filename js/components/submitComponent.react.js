var React = require('react');
var AppActions = require('../actions/AppActions');

var childComponent = React.createClass({
	_onClick: function(event) {
		var target=event.target;
		target.disabled=true;
		this.props.submitForm();
		target.disabled=false;
	},
	render: function() {
		return (
			<div className="footer">
         		<button onClick={this._onClick}>{this.props.content}</button>
      		</div>
		);
	}
});

module.exports = childComponent;