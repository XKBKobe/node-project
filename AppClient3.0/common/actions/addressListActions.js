/**
 * Created by zhangheng on 2016/8/23.
 * 地址列表
 */

import * as Types from '../contants/constants';
import requestData from '../config/request';
import {browserHistory} from 'react-router';

var choosedAddress = null;

//获取地址列表
export function queryAddressListData() {
    return ((dispatch) => {
        requestData('http://api3.bestinfoods.com/user/address/list','POST')
        .then((successData) => {
            if (0 == successData.errorcode) {
                if (0 != successData.data.length && null == choosedAddress) {
                    successData.data.map((addressData, index) => {
                        if (2 == addressData.is_default) {
                            choosedAddress = addressData.address_id;
                        }
                    });
                    dispatch(cacheChoosedAddress(choosedAddress));
                }
                dispatch(gotAddressListData(successData.data));
            } else {
                alert(successData.message);
                browserHistory.goBack();
            }
        }, (errorMessage) => {

        });
    });
}

//设置地址  1 删除 2 设置默认 3 取消默认
export function querySetDefaultAddress(rowID,type) {

        var obj = {
            id: rowID,
            type: type
        };
      return ((dispatch) => {

        dispatch(startLoadingData());
        requestData('http://api3.bestinfoods.com/user/address/status','POST',obj)
            .then((successData) => {

                if (0 == successData.errorcode){
                    if (successData.data){
                        dispatch(queryAddressListData());
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

export function addressItemClick(addressId) {
    return ((dispatch) => {
        choosedAddress = addressId;
        dispatch(cacheChoosedAddress(addressId));
        browserHistory.goBack();
    });
}

export function orderCacheDefaultAddress(addressId) {
    return ((dispatch) => {
        choosedAddress = addressId;
        dispatch(cacheChoosedAddress(addressId));
    });
}

function cacheChoosedAddress(choosedAddressData) {
    return {
        type: Types.CACHE_CHOOSED_ADDRESS,
        choosedAddressData
    }
}

function gotAddressListData(data) {
  return {
    type: Types.ADDRESSLIST,
    data
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