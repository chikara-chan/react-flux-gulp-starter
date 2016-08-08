module.exports = {
    post: function(url, options, callback) {
        var opts = options;
        opts.data = opts.data || '{}';
        if (!opts.ContentType) {
            opts.ContentType = 'application/json';
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(e) {
            var xmlhttp = e.target;
            //判断对象状态是交互完成，接收服务器返回的数据
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200 || xmlhttp.status == 0) {
                    //纯文本的数据
                    var responseText = xmlhttp.responseText;
                    var res = JSON.parse(responseText);
                    callback && callback(res);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", opts.ContentType);
        xhr.send(opts.data);
    },
    get: function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(e) {
            var xmlhttp = e.target;
            //判断对象状态是交互完成，接收服务器返回的数据
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    //纯文本的数据
                    var responseText = xmlhttp.responseText;
                    var res = JSON.parse(responseText);
                    callback && callback(res);
                }
            }
        };
        xhr.open("get", url, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    },
    jsonp: function(url, callbackName, callback, timeout) {
        var _this = this;
        var abortTimeout;
        var responseData;
        var callbackName = callbackName;
        var originalCallback = window[callbackName];
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);

        script.onload = function(e, errorType) {
            clearTimeout(abortTimeout);
            if (e.type == 'error') {
                alert(errorType || 'error');
            } else {
                _this.jsonpBack(responseData[0], callback);
            }

            window[callbackName] = originalCallback;
            if (responseData && typeof originalCallback == "function") {
                originalCallback(responseData[0]);
            }

            originalCallback = responseData = undefined;
        }

        window[callbackName] = function() {
            responseData = arguments;
        }

        if (timeout) {
            abortTimeout = setTimeout(function() {
                alert('timeout');
            }, timeout);
        }
    },
    jsonpBack: function(res, callback) {
        callback && callback(res);
    },
    getUrlParam: function(sKey, sUrl) {
        var re = /(\?|&)([^&#]*)/g;
        var url = sUrl || window.location.href;
        var arr = url.match(re) || [];
        var result = {};
        for (var i = 0; i < arr.length; i++) {
            var nArr = arr[i].substr(1).split("=");
            if (nArr[0] in result) {
                result[nArr[0]] instanceof Array ?
                    result[nArr[0]].push(nArr[1]) :
                    result[nArr[0]] = [result[nArr[0]], nArr[1]];
            } else {
                result[nArr[0]] = nArr[1];
            }
        }
        return sKey ? (result[sKey] || "") : result;
    },
    hasClass: function(className, name) {
        var re = new RegExp('(^|\\s)' + name + '(\\s|$)');
        if (name.length < 1) return false
        else return re.test(className);
    },
    _prefixStyle: function(style) {
        var _elementStyle = document.createElement('div').style;
        var _vendor = (function() {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;

            for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
            }

            return false;
        })();
        if (_vendor === false) return false;
        if (_vendor === '') return style;
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    },
    alert: function(str, type, time, callback) {
        var self = this;
        var dft = ' com-alert-' + (type || 'ok');
        time = time || 2000;
        var TPL = [
            '<div class="com-alert-wrap' + dft + '" id="J_alert">',
            '<div class="com-alert">' + str + '</div>',
            '</div>'
        ].join('');
        $(TPL).appendTo('body');
        $('#J_alert .com-alert')[0].style[self._prefixStyle('animationDuration')] = time + 'ms';
        setTimeout(function() {
            $('#J_alert').remove();
            callback && callback();
        }, time);
    },
    method: {
        y: function(d) {
            return d.getFullYear()
        },
        M: function(d) {
            return d.getMonth() + 1
        },
        d: function(d) {
            return d.getDate()
        },
        H: function(d, halfMode) {
            var val = d.getHours();
            return halfMode ? val % 12 : val;
        },
        h: function(d) {
            return this.method.H(d, true)
        },
        m: function(d) {
            return d.getMinutes();
        },
        s: function(d) {
            return d.getSeconds();
        },
        w: (function() {
            var WeekName = ['日', '一', '二', '三', '四', '五', '六'];
            return function(d) {
                return WeekName[d.getDay()]
            }
        })()
    },
    formatDate: function(oDate, sFormation) {
        var _this = this;
        if (sFormation && oDate && !isNaN(oDate.getTime())) {
            return sFormation.replace(/y+|M+|d+|H+|h+|m+|s+|w+/g, function(found) {
                var getter = _this.method[found[0]],
                    val = getter && getter.call(_this, oDate);
                return found.length === 2 ? ("0" + val).slice(-2) : "" + val;
            });
        } else {
            return "";
        }
    },
    formatNumber: function(str) {
        var re = /(.{4})/g;
        var result = str.replace(re, '$1 ');
        return result;
    },
    formatMobile: function(mobile) {
        var re = /(.{3})(.{4})/;
        var result = mobile.replace(re, '$1 $2 ');
        return result;
    },
    msTransMin: function(ms) {
        var result;
        result = ms / 60000;
        return result;
    },
    getParam: function(name) {
        var value = JSON.parse(localStorage.getItem(name));

        if (!value || !(value instanceof Object)) {
            value = {};
        }
        return value;
    },
    getBestImgUrl: function(url, width, height) {
        var suffer = url.match(/\.(jpg|png|gif|webp)$/g);
        suffer = suffer ? suffer[0] : '.jpg';
        var sSrc = "http://imgsize.52shangou.com/img/" + url + '@' + width + 'w_' + height + 'h_80q_100sh' + suffer;
        return sSrc;
    },
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return arr[2];
        }
    }
}