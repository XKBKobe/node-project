/**
 * Created by zhangheng on 2016/8/25.
 * 个人中心  优惠券列表
 */

import * as Types from '../contants/constants';

const  couponListState = {
    dataRequesting: true,
    isDataRequestSucc: false,
    couponListData: null,
    loadingData: false,
    couponInfoData: [],

};


export default function couponListReducer(state = couponListState, action) {
    switch(action.type) {
        case Types.COUPONLIST:
            return Object.assign({}, state, {
                dataRequesting: false,
                couponListData: action.allData,
                isDataRequestSucc: true
            });
        case Types.COUPONINFO:
            return Object.assign({}, state, {
                dataRequesting: false,
                couponInfoData: action.newCouponData,
                isDataRequestSucc: true
            });
        case Types.START_LOADING_DATA:
            return Object.assign({}, state, {
                loadingData: true
            });
        case Types.END_LOADING_DATA:
            return Object.assign({}, state, {
                loadingData: false
            });
        default:
            return state;
    }
}