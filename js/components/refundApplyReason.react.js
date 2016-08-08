var React = require('react');
var AppActions = require('../actions/AppActions');

var childComponent = React.createClass({
	componentDidMount: function(){
		var self = this;
		AppActions.queryRefundReasonOptions(function(){
			self.setState({
				relatedTarget: self.refs.firstReason
			});
			AppActions.saveReason(self.refs.firstReason.dataset.value);
		});
	},
	_onClick: function(event) {
		var target = event.currentTarget;
		var relatedTarget = this.state.relatedTarget;
		relatedTarget.getElementsByTagName('img')[0].src = "http://imgsize.52shangou.com/img/n/07/29/1469762831839_4847.png";
		target.getElementsByTagName('img')[0].src = "http://imgsize.52shangou.com/img/n/07/29/1469762831836_8300.png";
		this.setState({
			relatedTarget: target
		});
		AppActions.saveReason(target.dataset.value);
	},
	render: function() {
		var reasons = this.props.data;
		var items = [];
		for (var i in reasons) {
			if (i == 0) {
				items.push(
					<div
						ref="firstReason"
						className="item"
						onClick={this._onClick}
						data-value={reasons[i].id}
						key={i}>
						{reasons[i].desc}
						<img src="http://imgsize.52shangou.com/img/n/07/29/1469762831836_8300.png"/>
					</div>
				);
			} else {
				items.push(
					<div
						className="item"
						onClick={this._onClick}
						data-value={reasons[i].id}
						key={i}>
						{reasons[i].desc}
						<img src="http://imgsize.52shangou.com/img/n/07/29/1469762831839_4847.png"/>
					</div>
				);
			}
		}
		return (
			<div className="main">{items}</div>
		);
	}
});

module.exports = childComponent;