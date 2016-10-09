/**
 * Created by zhangheng on 2016/8/25.
 * 兑换优惠券
 */

import * as Types from '../contants/constants';

const  couponInfoState = {
    dataRequesting: true,
    isDataRequestSucc: false,
    couponId: "",
    loadingData: false,
    couponCodeData:[]
};


export default function couponInfoReducer(state = couponInfoState, action) {
    switch(action.type) {
        case Types.COUPONCODE:
            return Object.assign({}, state, {
                dataRequesting: false,
                couponCodeData: action.data,
                isDataRequestSucc: true
            });
        case Types.COUPONID:
            return Object.assign({}, state, {
                couponId: action.couponId
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