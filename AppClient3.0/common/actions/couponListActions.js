/**
 * Created by zhangheng on 2016/8/25.
 * 个人中心  优惠券列表接口
 */

import * as Types from '../contants/constants';
import requestData from '../config/request';
import {browserHistory} from 'react-router';


//获取 已使用 未使用 已过期 优惠券列表
export function queryCouponListData(statusParam) {
    var obj = {
        type:1,
        status:statusParam
    };

    return ((dispatch) => {
        dispatch(startLoadingData());

        requestData('http://api3.bestinfoods.com/activity/couponec/user_coupon','POST',obj)
        .then((successData) => {
            if (0 == successData.errorcode) {
                dispatch(gotCouponListData(successData));
            }else {
                alert(successData.message);
            }
            dispatch(endLoadingData());
        }, (errorMessage) => {
            dispatch(endLoadingData());
        });
    });
}

//兑换优惠券
export function exchangeCouponData(couponCode, flag) {
    var obj={
        copuon: couponCode,
    };

    return ((dispatch) => {
        dispatch(startLoadingData());
        requestData('http://api3.bestinfoods.com/activity/couponec/exchange','POST',obj)
        .then((successData) => {
            if (0 == successData.errorcode) {
                if (0 == flag) {
                    dispatch(queryCouponListData(1));
                }
            } else {
                alert(successData.message);
            }
            dispatch(endLoadingData());
        }, (errorMessage) => {
            dispatch(endLoadingData());
        });
    });
}


function gotCouponListData(allData) {
    return {
        type: Types.COUPONLIST,
        allData
    };
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