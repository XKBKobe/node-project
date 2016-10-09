
export const COOKIE_KEY_LOGINSTATUS = 'COOKIE_KEY_LOGINSTATUS';
export const COOKIE_KEY_LATELYSEARCH = 'COOKIE_KEY_LATELYSEARCH';

export function setCookie(keyName, value, Hours) {
	var d = new Date();
	var offset = 8;
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var nd = utc + (3600000 * offset);
	var exp = new Date(nd);
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = keyName + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";"
}

export function getCookie(keyName) {
	var arr = document.cookie.match(new RegExp("(^| )" + keyName + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null;
}
