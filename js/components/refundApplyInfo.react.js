var React = require('react');
var AppActions = require('../actions/AppActions');

var childComponent = React.createClass({
  render: function () {
    return (
    	<div className="header">
	    	<div className="wrap">
		    	<div className="left">
		    		<div className="img-bg"><img className="img-1" src={require('../../css/img/1.png')} /></div>
		    	</div>
		    	<div className="right">
		    		<h1>及时处理</h1>
		    		<p className="two-line">24小时内商家未处理，订单会自动取消。可先联系商家以便其及时处理您的退单申请。</p>
		    	</div>
	    	</div>
	    	<div className="divider"></div>
	    	<div className="wrap">
		    	<div className="left">
		    		<div className="img-bg"><img className="img-2" src="http://imgsize.52shangou.com/img/n/07/29/1469762831836_4882.png" /></div>
		    	</div>
		    	<div className="right">
		    		<h1>全额退款</h1>
		    		<p>申请成功后，退款将于1－7个工作日退回到付款账户</p>
		    	</div>
	    	</div>
	    	<div className="divider"></div>
	    	<div className="aside">
	    		<span className="pre">＊</span>
	    		<span className="word">请选择1个退单原因</span>
	    	</div>
    	</div>
    );
  }
});

module.exports = childComponent;
