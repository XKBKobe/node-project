import * as Types from '../contants/constants';
import merge from 'lodash/merge';

var orderState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  orderData : null,
  orderlist : null,
  selected : null,
  cancel : false,
  isLoading : null,
}
var orderDetailState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  orderDetailData : null,
  isLoading : null,
}
var orderCommentListState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  orderCommentListData : null,
  isLoading : null,
}
export function userOrderReducer(state = orderState, action){
  switch (action.type) {
		case Types.USERORDER :
      state.orderData = null;
			return merge({}, state, {
        selected : action.handleId,
        dataRequesting: false,
        isDataRequestSucc: true,
        orderData : action.data,
        cancel : action.cancel,
        isLoading : false,
			})
			break;
    case Types.ORDER_START_LOADING :
      return merge({}, state, {
        isLoading : true,
      })
      break;
    case Types.ORDER_END_LOADING :
      return merge({}, state, {
        isLoading : false,
      })
      break;
		default:
      return state
	}
}

export function userOrderDetailReducer(state = orderDetailState, action) {
  switch (action.type) {
    case Types.USERORDERDETAIL:
      state.orderDetailData = null;
      return merge({}, state, {
        dataRequesting: false,
        isDataRequestSucc: true,
        orderDetailData : action.data,
        isLoading : false,
      })
      break;
    case Types.ORDER_START_LOADING :
      return merge({}, state, {
        isLoading : true,
      })
      break;
    case Types.ORDER_END_LOADING :
      return merge({}, state, {
        isLoading : false,
      })
      break;
    default:
      return orderDetailState
  }
}

export function userOrderCommentlistReducer(state = orderCommentListState, action) {
  switch (action.type) {
    case Types.USERORDERCOMMENTLIST:
      state.orderCommentListData = null;
      return merge({}, state, {
        dataRequesting: false,
        isDataRequestSucc: true,
        orderCommentListData : action.data,
        isLoading : false,
      })
      break;
    default:
      return state
  }
}
