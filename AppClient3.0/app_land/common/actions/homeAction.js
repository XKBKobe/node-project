//import { CALL_API, Schema } from '../middleware/api';
import {
	FETCH_ACTIVITY,
	FETCH_CATEGORY,
	FETCH_BANNER,
	FETCH_GOOD_LIST,
	FETCH_RECOMMEND
} from '../contants/constants.js';
import requestData from '../config/request';

function fetchCategoryAction(datas) {
	return {
		type: FETCH_CATEGORY,
		categoryDatas: datas
	}
}

function fetchActivityAction(activitydatas) {
	return {
		'type': FETCH_ACTIVITY,
		'activitys': activitydatas
	}
}

function getBannerImageAction(data) {
	return {
		"type": FETCH_BANNER,
		"bannerDatas": data
	}
}

function getGoodsListAction(data) {
	return {
		type: FETCH_GOOD_LIST,
		goodList: data
	}
}

function getRecommandAction(data) {
	return {
		type: FETCH_RECOMMEND,
		recommandDatas: data
	}
}

export function fetchActivity() {
	return (dispatch, getState) => {
		requestData('http://api3.bestinfoods.com/market/get/speciallyselected','POST')
		.then((response) => {
			if (response.errorcode !== 0) {
				throw new Error("Bad response from server,message is:"+response.message);
			}
			dispatch(fetchActivityAction(response.data));
		})
	}
}

export function fetchCategory() {
	return (dispatch, getState) => {
		requestData('http://api3.bestinfoods.com/item/get/topsimplecategorys', 'POST')
		.then((json) => {
			//console.log('get data from fetch:',json);
			if (json.errorcode !== 0) {
				throw new Error("Bad response from server,message is:"+json.message);
			}
			dispatch(fetchCategoryAction(json.data));
		})
	}
}

export function fetchBanner() {
	return (dispatch, getState) => {
		requestData('http://api3.bestinfoods.com/market/get/ad', 'POST', 'classId=1&type=1')
		.then((json) => {
			//console.log('get data from fetch:',json);
			if (json.errorcode !== 0) {
				throw new Error("Bad response from server,message is:"+json.message);
			}
			dispatch(getBannerImageAction(json.data));
		})
	}
}

export function fetchGoodList() {
	return (dispatch, getState) => {
		requestData('http://api3.bestinfoods.com/item/get/specialactsclient', 'POST')
		.then((json) => {
			//console.log('get data from fetch:',json);
			if (json.errorcode !== 0) {
				throw new Error("Bad response from server,message is:"+json.message);
			}
			dispatch(getGoodsListAction(json.data));
		})
	}
}

export function fetchRecommandGood() {
	return (dispatch, getState) => {
		requestData('http://api3.bestinfoods.com/item/get/recommendgoods', 'POST')
		.then((json) => {
			//console.log('get data from fetch:',json);
			if (json.errorcode !== 0) {
				throw new Error("Bad response from server,message is:"+json.message);
			}
			dispatch(getRecommandAction(json.data));
		})
	}
}
