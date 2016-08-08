var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionType = require('../constants/ActionType');

var AppActions = {
    saveComment: function(params) {
    	AppDispatcher.dispatch({
    		actionType: ActionType.saveComment,
    		params: params
    	})
    },
    saveReason: function(params) {
    	AppDispatcher.dispatch({
    		actionType: ActionType.saveReason,
    		params: params
    	})
    },
    submitApply: function(params) {
    	AppDispatcher.dispatch({
    		actionType: ActionType.submitApply,
    		params: params
    	})
    },
    saveCancelReason: function(params) {
        AppDispatcher.dispatch({
            actionType: ActionType.saveCancelReason,
            params: params
        })
    },
    submitCancelReason: function(params) {
        AppDispatcher.dispatch({
            actionType: ActionType.submitCancelReason,
            params: params
        })
    },
    queryRefundReasonOptions: function(params){
        AppDispatcher.dispatch({
            actionType: ActionType.queryRefundReasonOptions,
            params: params
        })
    }
};

module.exports = AppActions;