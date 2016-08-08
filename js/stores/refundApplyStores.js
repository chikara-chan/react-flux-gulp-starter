var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionType = require('../constants/ActionType');
var Utils = require('../lib/utils');
var FastClick = require('../lib/fastclick');

FastClick(document.body);

var EVENT_CHANGE = 'store::change';

var CACHE_DATA = {
    req: {
        bizOrderId: Utils.getUrlParam('bizOrderId')
    }
};

var AppStores = assign({}, EventEmitter.prototype, {
    getAllData: function() {
        return CACHE_DATA;
    },
    addChangeListener: function(callback) {
        this.on(EVENT_CHANGE, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(EVENT_CHANGE, callback);
    },
    emitChange: function() {
        this.emit(EVENT_CHANGE);
    },
});

AppDispatcher.register(function(payload) {
    var action = payload;
    switch (action.actionType) {
        case ActionType.saveComment:
            saveComment(action.params);
            break;
        case ActionType.saveReason:
            saveReason(action.params);
            break;
        case ActionType.submitApply:
            submitApply(action.params);
            break;
        case ActionType.queryRefundReasonOptions:
            queryRefundReasonOptions(action.params);
            break;
    }
});

/**
 * 获取域名
 */
function getdomain() {
    var host = document.domain;
    if (host.indexOf('www') != -1 || host.indexOf('h5.m') != -1) {
        return 'http://www.52shangou.com'
    } else if (host.indexOf('daily') != -1 || host.indexOf('localhost') != -1) {
        return 'http://daily.52shangou.com'
    } else if (host.indexOf('gray') != -1) {
        return 'http://gray.52shangou.com'
    }
}

/**
 * 获取退款申请理由选项
 */
function queryRefundReasonOptions(callback) {
    // lib.ajax({
    //     url: getdomain() + '/trade/buyer/refund/queryRefundReasonOptions',
    //     type: 'get',
    //     data: {
    //         accept: 'after'
    //     },
    //     dataType: 'json',
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     success: function(res) {
    //         if (res) {
    //             var status = res.status;
    //             if (status == true) {
    //                 CACHE_DATA.reasons = res.entry;
    //                 AppStores.emitChange();
    //                 callback();
    //             } else {
    //                 Utils.alert(res.message, 'error');
    //             }
    //         } else {
    //             Utils.alert('出错了', 'error');
    //         }
    //     }
    // });
}

/**
 * 保存评论内容
 */
function saveComment(comment) {
    CACHE_DATA.req.detailedRefundReason = comment;
}

/**
 * 保存退单理由
 */
function saveReason(reasonCode) {
    CACHE_DATA.req.refundReasonCode = reasonCode;
}

/**
 * 提交申请
 */
function submitApply() {
    // lib.ajax({
    //     url: getdomain() + '/trade/order/cancelOrder',
    //     type: 'post',
    //     data: JSON.stringify(CACHE_DATA.req),
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     success: function(res) {
    //         if (res) {
    //             var status = res.status;
    //             if (status == true) {
    //                 Utils.alert(res.message, 'ok', 1500, function() {
    //                     lib.bridge.callNative('backNavigation', true, {
    //                         "animation": 'true'
    //                     });
    //                 });
    //             } else {
    //                 Utils.alert(res.message, 'error');
    //             }
    //         } else {
    //             Utils.alert('出错了', 'error');
    //         }
    //     }
    // });
}

module.exports = AppStores;