/**
 * [requestData description]
 * @param  {[string]} api    [请求地址]
 * @param  {[string]} method [请求方式 GET | POST ]
 * @param  {[object]} data   [请求参数]
 * @return {[object]}        [返回的数据对象]
 */

import crypto from 'crypto';
//import querystring from 'querystring';
import uuid from 'react-native-uuid';
import {Platform} from 'react';

const COOKIE_KEY_UUID = 'COOKIE_KEY_UUID';
const COOKIE_KEY_SESSIONID = 'COOKIE_KEY_SESSIONID';
const MD5_KEY = '3DQEBAQUAA4GNADCBiQKBgQCqWT3C34iIruDvDf86w8zP5cAv';

export default function requestData(api, method, data = "") {
	var xmlhttp;
	var str = "";
	var obj = {};
	var platfromValue = "ANDROID";
	if (Platform.OS === 'ios') platfromValue = "IOS";

	if (typeof data === "string") {
		if (0 !== data.length) {
			var paramItem = data.split('&');

			for (var i = 0; i < paramItem.length; i++) {
				if (0 !== paramItem[i]) {
					var objectParam = paramItem[i].split('=');
					var key = objectParam[0];
					var value = objectParam[1];

					obj[key] = value;
				}
			}

			data = data + '&signTime=' + Math.ceil((+new Date)/1000) + '&platform='+ platfromValue + '&sessionId=' + getSessionId() + '&guid=' + createOrGetUniqueCode();
		} else {
			data = 'signTime=' + Math.ceil((+new Date)/1000) + '&platform=' + platfromValue + '&sessionId=' + getSessionId() + '&guid=' + createOrGetUniqueCode();
		}

		obj["signTime"] = Math.ceil((+new Date)/1000);
		obj["platform"] = platfromValue;
		obj["sessionId"] = getSessionId();
		obj["guid"] = createOrGetUniqueCode();

		str = data + '&secret=' + sortAndEncryption(obj);
	} else if (typeof data === "object") {
		data["signTime"] = Math.ceil((+new Date)/1000);
		data["platform"] = platfromValue;
		data["sessionId"] = getSessionId();
		data["guid"] = createOrGetUniqueCode();

		//str = querystring.stringify(data) + '&secret=' + sortAndEncryption(data);
		str = 'signTime='+ data["signTime"] + '&platform=' + platfromValue + '&sessionId=' +getSessionId()
			+ '&guid=' + data["guid"] + '&secret=' + sortAndEncryption(data);
	}

	console.log('zhangzhao', str);

	// str = (str.indexOf("?") == -1 ? "?" : "&" )+ str ;
	return new Promise((resolve, reject) => {
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	 		xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var serviceData = JSON.parse(xmlhttp.responseText);

				// setCookie(COOKIE_KEY_SESSIONID, serviceData.sessionInfo.sessionId);
				resolve(serviceData);
			}
		}
		xmlhttp.open(method, api, true);
		if (method == "POST") {
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send(str);
		} else {
			xmlhttp.send();
		}
	});
};

function sortAndEncryption(object) {
	var password = '';
	var sortedObject = {};
	var md5 = crypto.createHash('md5');

	var keys = Object.keys(object).sort();
	var objectString = "";
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		//sortedObject[key] = object[key];
		objectString += key + '=' + object[key];
		if (i !== keys.length-1) 
			objectString += '&';
	}

	//var objectString = querystring.stringify(sortedObject);

	password = md5.update(MD5_KEY + objectString + MD5_KEY).digest('hex');

	return password;
}

function setCookie(keyName, value, Hours) {
	var d = new Date();
	var offset = 8;
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var nd = utc + (3600000 * offset);
	var exp = new Date(nd);
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = keyName + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";"
}

function getCookie(keyName) {
	var arr = document.cookie.match(new RegExp("(^| )" + keyName + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null;
}

function createOrGetUniqueCode() {
	if (null === getCookie(COOKIE_KEY_UUID)) {
		var uuidValue = uuid.v4();

		setCookie(COOKIE_KEY_UUID, uuidValue);

		return uuidValue;
	} else {
		return getCookie(COOKIE_KEY_UUID);
	}
}

function getSessionId() {
	if (null === getCookie(COOKIE_KEY_SESSIONID)) {
		return '';
	} else {
		return getCookie(COOKIE_KEY_SESSIONID);
	}
}
