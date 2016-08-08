var React = require('react');
var AppStores = require('../stores/refundApplyStores');
var AppActions = require('../actions/AppActions');
var Header = require('../components/refundApplyInfo.react');
var MainSection = require('../components/refundApplyReason.react');
var SecondSection = require('../components/refundApplyTextarea.react');
var Footer = require('../components/submitComponent.react');

function getNewState() {
    return AppStores.getAllData();
}

var parentComponent = React.createClass({
    getInitialState: function() {
        return getNewState();
    },
    componentDidMount: function() {
        AppStores.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStores.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getNewState());
    },
    _submitForm: function(){
        AppActions.submitApply();
    },
    render: function() {
        return (
            <div className="container">
                <Header />
                <MainSection data={this.state.reasons}/>
                <SecondSection />
                <Footer submitForm={this._submitForm} content="提交申请" />
            </div>
        );
    }
});

module.exports = parentComponent;