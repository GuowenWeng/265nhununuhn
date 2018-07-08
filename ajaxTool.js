/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-06-09 14:30:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-12 20:02:24
 *  
 */

var $ = {
    
    getparam: function (obj) {
        var str = "";
        for (var key in obj) {
            str += key + "=" + obj[key] + "&";
        }
        str = str.substr(0, str.length - 1);
        return str;
    },
    ajax: function (option) {
        var url = option.url || location.href;
        var type = option.type || "get";
        var data = option.data || {};
        var success = option.success;

        //兼容问题处理,创建出异步对象
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var param = this.getparam(data);
        //设置请求行
        if (type == "get") {
            url += "?" + param;
            param = null;
        }
        xhr.open(type, url);

        //设置请求体
        if (type == "post") {
            //设置请求头
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        xhr.send(param);

        //监听事件状态
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                //获取响应回来的content格式
                var hr = xhr.getResponseHeader("Content-Type");
                if (hr.indexOf("xml") != -1) {
                    var result = xhr.responseXML;
                } else if (hr.indexOf('json') != -1) {
                    var result = JSON.parse(xhr.responseText);
                } else {
                    var result = xhr.responseText;
                }

                success && success(result);
            }
        }
    }
}