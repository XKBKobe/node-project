import * as Types from '../contants/constants';
import merge from 'lodash/merge';

var orderState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  orderData : null,
  orderlist : null,
  selected : null,
  cancel : false,
}
var orderDetailState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  orderDetailData : null,
}
var orderCommentListState = {
  dataRequesting: true,
  isDataRequestSucc: false,
  orderCommentListData : null,
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
      })
      break;
    default:
      return state
  }
}
