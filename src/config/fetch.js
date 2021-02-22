import { baseUrl,loginUrl } from './env';
import 'whatwg-fetch'

export default async(url = '', data = {}, type = 'GET',isMoblie = '', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
  }
	if (window.fetch && method == 'fetch') {
  // console.log("token:",sessionStorage.getItem('token'),)
      let requestConfig = {};
      if(isMoblie == 'true'){
        requestConfig = {
          method: type,
          // mode: "cors",
          headers: {
            'Accept': 'application/json',
          },
          mode: "cors",
          cache: "no-store"
        }
      }else{
        requestConfig = {
          method: type,
          // mode: "cors",
          headers: {
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Expose-Headers':'*',
			'Access-Control-Allow-Headers':'Content-Type,Accept,token',
            // 'Accept': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'token':sessionStorage.getItem('token'),
            // 'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            // 'Language': localStorage.getItem("Language")
          },
          mode: "cors",
          cache: "no-store"
        }
      }
		
    if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		try {
			const response = await fetch(url, requestConfig);
			// 判断返回状态
			let _status = response.status;
			//debugger
			_status = _status.toString()
			let _str = _status.substring(0,1);
			if(_str != "2"){
				alert("error:"+_str)
			}
			// if(_str == "3"){//重定向
			// 	$("#errorPopup3").show();
			// 	$("#errorPopup3 p .errorPopupMsg").text(response.status);
			// }else if(_str == "4"){//客户端错误
			// 	$("#errorPopup4").show();
			// 	$("#errorPopup4 p .errorPopupMsg").text(response.status);
			// 	}else if(_str == "5"){//服务器端错误
			// 	$("#errorPopup5").show();
			// 	$("#errorPopup5 p .errorPopupMsg").text(response.status);
			// }else if(_str == "2"){//请求成功
			// 	debugger
			// }
	  const responseJson = await response.json();
      // 判断token失效
      // token失效
      if(responseJson.orsuccess =='-98'){
        // alert('token失效')
        $("#errorPopup3").show();
      }
      // 无效的token
      if(responseJson.orsuccess =='-99'){
        alert('token无效')
        $("#errorPopup3").show();
      }
      // 操作失败
      if(responseJson=='-1'){
        alert('操作失败！')
      }

			// if(responseJson.Message == 'Authorization has been denied for this request.'||responseJson.Message == '已拒绝为此请求授权。'){
			// 	// location.href = loginUrl;
			// 	window.event.returnValue =false;
			// }else if(responseJson.success == 0){
			// }			
      return responseJson
    } catch (error) {
		alert(error)

    //   throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }
      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }
      if (type == 'POST2') {
        sendData = data;
      }

      requestObj.open(type, url, true);
      
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
export function ajax(cfg) {
	if (!cfg.url) {
		return;
	}
	if (!cfg.type) {
		cfg.type = "get";
	}
	if (cfg.async != false && cfg.async != true) {
		cfg.async = true;
	}
	var xmlHttp;
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
	else {
		return;
	}
	if (!cfg.dataType) {
		cfg.dataType = "";
	}
	else {
		cfg.dataType = cfg.dataType.toLowerCase();
	}
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			if (cfg.onAjaxReady) {
				cfg.onAjaxReady.call(xmlHttp);
			}
			if (xmlHttp.status == 200) {
				if (cfg.success) {
					var contentType = xmlHttp.getResponseHeader("Content-Type");
					if (contentType == null) {
						cfg.success(null);
					}
					else if (contentType.indexOf("application/json") > -1 || cfg.dataType == "json") {
						cfg.success(parseJson(xmlHttp.responseText));
					}
					else {
						cfg.success(xmlHttp.responseText);
					}
				}
			}
			else if (xmlHttp.status == 600) {
				window.top.location.href = xmlHttp.statusText;
			}
			else {
				if (cfg.error) {
					cfg.error(xmlHttp.responseText);
				}
			}
			if (cfg.complete) {
				if (cfg.complete) {
					cfg.complete();
				}
			}
		}
	}
	xmlHttp.open(cfg.type, cfg.url, cfg.async);
	if (!cfg.contentType) {
		cfg.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
	}
	if (cfg.headers && cfg.headers.length > 0) {
		for (var i = 0; i < cfg.headers.length; i++) {
			xmlHttp.setRequestHeader(cfg.headers[i].name, cfg.headers[i].value);
		}
	}
	if (cfg.data) {
		if (typeof (cfg.data) == "object") {
			var temp = "", flag = 0;
			for (var i in cfg.data) {
				if (flag == 1) {
					temp += "&";
				}
				else {
					flag = 1;
				}
				temp += i + "=" + encodeURIComponent(cfg.data[i]);
			}
			cfg.data = temp;
		}
	}
	if (cfg.onAjaxSend) {
		cfg.onAjaxSend.call(xmlHttp);
	}
	xmlHttp.send(cfg.data);
}

function parseJson(data) {
	return (new Function("return " + data))();
}

