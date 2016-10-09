import * as Types from '../contants/constants';
import requestData from '../config/request';

//请求订单数据
export function queryUserOrderData(handleId,page,cancel) {
  page = page?page:1;
  cancel = (cancel==null)?false:true;
  let parameter = {
    condition : handleId,
    page : page,
    perPage : 5,
  }
  return ((dispatch) => {
    requestData('http://api3.bestinfoods.com/order/get/orderlist', 'POST', parameter)
    .then((orderData) => {
      dispatch(gotUserOrderData(orderData,handleId,cancel));
    },(errorMessage) => {

		});
  });
}
function gotUserOrderData(data,handleId,cancel) {
  return {
    type: Types.USERORDER,
    data,
    handleId,
    cancel
  };
}

//取消订单
export function queryCancelOrder(handleId,orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    requestData('http://ndapi.bestinfoods.com/order/put/cancelorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        dispatch(queryUserOrderData(handleId,1,true))
      }else {
        alert(successData.message);
      }
    },(errorMessage) => {

		});
  });
}

//删除订单
export function queryDeleteOrder(handleId,orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    requestData('http://ndapi.bestinfoods.com/order/delete/deleteorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        dispatch(queryUserOrderData(handleId,1,true))
      }else {
        alert(successData.message);
      }
    },(errorMessage) => {

		});
  });
}

//确认收货
export function queryConfirmOrder(handleId,orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    requestData('http://ndapi.bestinfoods.com/order/put/confirmorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        dispatch(queryUserOrderData(handleId,1,true))
      }else {
        alert(successData.message);
      }
    },(errorMessage) => {

		});
  });
}

//请求待评价订单商品列表
export function queryUserOrderCommentList(orderId) {
  let parameter = {
    orderId : orderId,
  }
  return (
    (dispatch) => {
      requestData('http://ndapi.bestinfoods.com/order/get/commentedorder', 'POST', parameter)
      .then((successData) => {
        if (successData.errorcode==0) {
        dispatch(gotUserOrderCommentList(successData));
        }else {
          alert(successData.message);
        }
      },
      (errorMessage) => { });
    }
  )
}
function gotUserOrderCommentList(data) {
  return {
    type: Types.USERORDERCOMMENTLIST,
    data
  };
}
//订单详情数据
export function queryUserOrderDetailData(parameter) {
  return (
    (dispatch) => {
      requestData('http://api3.bestinfoods.com/order/get/orderdetails', 'POST', parameter)
      .then((successData) => {
        dispatch(gotUserOrderDetailData(successData));
      },
      (errorMessage) => { });
    }
  )
}
function gotUserOrderDetailData(data) {
  return {
    type: Types.USERORDERDETAIL,
    data
  };
}
