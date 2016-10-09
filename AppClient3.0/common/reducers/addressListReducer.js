/**
 * Created by zhangheng on 2016/8/23.
 * 地址列表
 */

import * as Types from '../contants/constants';

const  addressListState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  addressListData: null,
  loadingData: false,
  choosedAddressId: null
};


export default function addressListReducer(state = addressListState, action) {
    switch(action.type) {
        case Types.ADDRESSLIST:
            return Object.assign({}, state, {
                dataRequesting: false,
                addressListData: action.data,
                isDataRequestSucc: true
            });
        case Types.CACHE_CHOOSED_ADDRESS:
            return Object.assign({}, state, {
                choosedAddressId: action.choosedAddressData
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
