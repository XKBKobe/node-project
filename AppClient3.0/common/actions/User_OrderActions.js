import * as Types from '../contants/constants';
import requestData from '../config/request';
import {hashHistory, Link} from 'react-router';
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
    requestData('http://api3.bestinfoods.com/order/getec/orderlist', 'POST', parameter)
    .then((orderData) => {
      if (0 == orderData.errorcode) {
        dispatch(gotUserOrderData(orderData,handleId,cancel));
      }else {
        alert(orderData.message);
      }
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
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/putec/cancelorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        dispatch(queryUserOrderData(handleId,1,true))
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }

    },(errorMessage) => {
      dispatch(endLoadingData());
		});
  });
}
export function queryCancelOrder_detail(orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/putec/cancelorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        hashHistory.goBack();
        return ;
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    },(errorMessage) => {
      dispatch(endLoadingData());
		});
  });
}

//删除订单
export function queryDeleteOrder(handleId,orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/deleteec/deleteorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        dispatch(queryUserOrderData(handleId,1,true))
      }else {
        alert(successData.message);
        dispatch(endLoadingData());
      }
    },(errorMessage) => {
      dispatch(endLoadingData());
		});
  });
}
export function queryDeleteOrder_detail(orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/deleteec/deleteorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        hashHistory.goBack();
        return ;
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    },(errorMessage) => {
      dispatch(endLoadingData());
		});
  });
}

//确认收货
export function queryConfirmOrder(handleId,orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/putec/confirmorder', 'POST', parameter)
    .then((successData) => {
      if (0 == successData.errorcode) {
        dispatch(queryUserOrderData(handleId,1,true))
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    },(errorMessage) => {
      dispatch(endLoadingData());
		});
  });
}
export function queryConfirmOrder_detail(orderId) {
  let parameter = {
    orderId : orderId,
  }
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/putec/confirmorder', 'POST', parameter)
    .then((successData) => {
      if (successData.errorcode==0) {
        hashHistory.goBack();
        return ;
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    },(errorMessage) => {
      dispatch(endLoadingData());
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
      requestData('http://api3.bestinfoods.com/order/getec/commentedorder', 'POST', parameter)
      .then((successData) => {
        if (0 == successData.errorcode) {
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

//提交评价
export function querySubmitCommentMessage(orderId,goodsId,content,score,imgs) {
  let parameter = {
    orderId : orderId,
    goodsId : goodsId,
    content : content,
    score : score,
    // imgs : imgs
  }
  // console.log(parameter);
  return (
    (dispatch) => {
      dispatch(startLoadingData());
      requestData('http://api3.bestinfoods.com/cms/postec/commentgoods', 'POST', parameter)
      .then((successData) => {
        // console.log('result',successData);
        if (successData.errorcode==0) {
          hashHistory.goBack();
          return ;
        }else {
          dispatch(endLoadingData());
          alert(successData.message);
        }
      },
      (errorMessage) => {
        dispatch(endLoadingData());
      });
    }
  )
}

//订单详情数据
export function queryUserOrderDetailData(orderId) {
  let parameter = {
    orderId : orderId
  }
  return (
    (dispatch) => {
      requestData('http://api3.bestinfoods.com/order/getec/orderdetails', 'POST', parameter)
      .then((successData) => {
        if (0 == successData.errorcode) {
          // console.log(successData);
          dispatch(gotUserOrderDetailData(successData));
        }else {
          alert(successData.message);
        }
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

//是否正在加载   防止多次点击
function startLoadingData() {
    return {
        type: Types.ORDER_START_LOADING
    };
}

function endLoadingData() {
    return {
        type: Types.ORDER_END_LOADING
    }
}
