var React = require('react');
var AppActions = require('../actions/AppActions');

var childComponent = React.createClass({
	_onChange: function(event) {
		var target = event.target;
		var content = target.value;
		//统计字符串中回车出现的次数
		var count = 0;
		for (var i in content) {
			if (content[i] == '\n') {
				count++;
			}
		}
		var len = content.length + count;
		this.refs.num.innerHTML = len > 50 ? 50 : len;
		AppActions.saveComment(target.value);
	},
	render: function() {
		return (
			<div className="textarea-wrap">
	      		<textarea
	      			placeholder="请尽量详细描述退单的原因"
	      			maxLength="50"
	      			onChange={this._onChange}>
	      		</textarea>
	      		<span className="limit"><span ref="num">0</span>/50字</span>
      		</div>
		);
	}
});

module.exports = childComponent;