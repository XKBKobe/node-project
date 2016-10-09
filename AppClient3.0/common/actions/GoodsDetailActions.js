import * as Types from '../contants/constants';
import requestData from '../config/request';

//请求商品详情
export function queryGoodsDetailData(goodsId) {
  let parameter = {
    goodsId : goodsId
  }
  return ((dispatch) => {
    requestData('http://api3.bestinfoods.com/item/get/goodsbasicinfobygoodsid', 'POST', parameter)
    .then((successData) => {
      if (0 == successData.errorcode) {
        dispatch(gotGoodsDetailData(successData));
      }else {
        alert(successData.message);
      }
    }, (errorMessage) => {

    });
  });
}
function gotGoodsDetailData(data) {
  return {
    type: Types.GOT_GOODSDETAILDATA_DATA,
    data
  };
}

//请求购物车数量
export function queryCartCount() {
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/get/getcartcount', 'POST')
    .then((successData) => {
      if (0 == successData.errorcode) {
        dispatch(gotCartCount(successData));
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    }, (errorMessage) => {
      dispatch(endLoadingData());
    });
  });
}
function gotCartCount(data) {
  return {
    type: Types.GOT_CARTCOUNT,
    data
  };
}

//添加购物车
export function queryPushItemToCart(parameter) {
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/post/addcart', 'POST', parameter)
    .then((successData) => {
      if (0 == successData.errorcode) {
        dispatch(gotPushItemToCart(successData));
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    }, (errorMessage) => {
      dispatch(endLoadingData());
    });
  });
}
function gotPushItemToCart(data) {
  return {
    type: Types.PUSH_ITEMTOCART,
    data
  };
}

//立即购买
export function queryDirectchange(goodId,amount) {
  let parameter = {
    goodsId : goodId,
    amount : amount
  };
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com/order/getec/directchange', 'POST', parameter)
    .then((directData) => {
      if (0 == directData.errorcode) {
      dispatch(gotDirectchange(directData));
      }else {
        dispatch(endLoadingData());
        alert(directData.message);
      }
    }, (errorMessage) => {
      dispatch(endLoadingData());
    });
  });
}
function gotDirectchange(data) {
  return {
    type: Types.DIRECTCHANGE,
    data
  };
}

//收藏商品
export function queryCollectgoods(goodsId,type) {
  let parameter = {
    goodsId : goodsId,
    type : type
  };
  return ((dispatch) => {
    dispatch(startLoadingData());
    requestData('http://api3.bestinfoods.com//user/post/collectgoods', 'POST', parameter)
    .then((successData) => {
      if (0 == successData.errorcode) {
        dispatch(gotCollectgoods(successData));
      }else {
        dispatch(endLoadingData());
        alert(successData.message);
      }
    }, (errorMessage) => {
      dispatch(endLoadingData());
    });
  });
}
function gotCollectgoods(data) {
  return {
    type: Types.COLLECTIONGOODS,
    data
  };
}
//图文详情
export function queryGoodsDetailImgs(goodsId) {
  let parameter = {
    goodsId : goodsId
  }
  return ((dispatch) => {
    requestData('http://api3.bestinfoods.com/item/get/goodsdetailsbyid', 'POST', parameter)
    .then((successData) => {
      if (0 == successData.errorcode) {
        if (!successData.data.goodsDetails) return
        let message = successData.data.goodsDetails;
        message = message.replace(/\&gt\;/g, "&");
  			message = message.replace(/\&lt\;/g, "<");
  			message = message.replace(/\&gt\;/g, ">");
  			message = message.replace(/\&nbsp\;/g, " ");
  			message = message.replace(/\%27\;/g, "\'");
  			message = message.replace(/\&quot\;/g, "\"");
  			message = message.replace(/<br>/g, "\n");
  			message = message.replace(/\&/g,'>');
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var arr = message.match(imgReg);
        arr = arr?arr:[];
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let resultArr = [];
        for (var i = 0; i < arr.length; i++) {
          var src = arr[i].match(srcReg);
          //获取图片地址
          if(src[1]){
            resultArr.push(src[1]);
          }
        }
        dispatch(gotGoodsDetailImgs(resultArr));
      }
    }, (errorMessage) => {

    });
  });
}
function gotGoodsDetailImgs(data) {
  return {
    type: Types.GOODSDETAILIMGS,
    data
  };
}


//是否正在加载   防止多次点击
function startLoadingData() {
    return {
        type: Types.GOODSDETAIL_START_LOADING
    };
}

function endLoadingData() {
    return {
        type: Types.GOODSDETAIL_END_LOADING
    }
}
