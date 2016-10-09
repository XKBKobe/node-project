/**
 * Created by zhangheng on 2016/8/25.
 * 兑换优惠券接口
 */

import * as Types from '../contants/constants';
import requestData from '../config/request';

//确认订单界面 兑换优惠券
export function couponExchangeData(data) {

    var obj={copuon : data};
    return ((dispatch) => {
        dispatch(startLoadingData());
        requestData('http://api3.bestinfoods.com/activity/couponec/exchange', 'POST',obj)
            .then((successData) => {

                if (0==successData.errorcode){
                    if (successData.data.length>0){
                        dispatch(gotCouponInfoData(successData));
                    }
                }else {
                    alert(successData.message);
                }
                dispatch(endLoadingData());
            }, (errorMessage) => {
                dispatch(endLoadingData());
            });
    });
}

//传优惠券 id
export function sendCouponData(couponId) {
    return ((dispatch) => {
        dispatch(sendCouponId(couponId));
    });
}

function gotCouponInfoData(data) {
    return {
        type: Types.COUPONCODE,
        data
    };
}

function sendCouponId(couponId) {
    return {
        type: Types.COUPONID,
        couponId
    }
}

function startLoadingData() {
    return {
        type: Types.START_LOADING_DATA
    };
}

function endLoadingData() {
    return {
        type: Types.END_LOADING_DATA
    }
}