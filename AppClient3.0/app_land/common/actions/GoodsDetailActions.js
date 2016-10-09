import * as Types from '../contants/constants';
import requestData from '../config/request';

//请求商品详情
export function queryGoodsDetailData(parameter) {
  return ((dispatch) => {
    requestData('http://api3.bestinfoods.com/item/get/goodsbasicinfobygoodsid', 'POST', parameter)
    .then((successData) => {

      dispatch(gotGoodsDetailData(successData));
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
    requestData('http://api3.bestinfoods.com/order/get/getcartcount', 'POST')
    .then((successData) => {

      dispatch(gotCartCount(successData));
    }, (errorMessage) => {

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
    requestData('http://api3.bestinfoods.com/order/post/addcart', 'POST', parameter)
    .then((successData) => {
      dispatch(gotPushItemToCart(successData));
    }, (errorMessage) => {

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
export function queryDirectchange(parameter) {
  return ((dispatch) => {
    requestData('http://api3.bestinfoods.com/order/get/directchange', 'POST', parameter)
    .then((directData) => {
      dispatch(gotDirectchange(directData));
    }, (errorMessage) => {

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
export function queryCollectgoods(parameter) {
  return ((dispatch) => {
    requestData('http://api3.bestinfoods.com//user/post/collectgoods', 'POST', parameter)
    .then((successData) => {
      dispatch(gotCollectgoods(successData));
    }, (errorMessage) => {

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
    goodsId : 10001
  }
  return ((dispatch) => {
    requestData('http://ndapi.bestinfoods.com/item/get/goodsdetailsbyid', 'POST', parameter)
    .then((successData) => {
      if (successData.length == 0) return "";
      let message = "&lt;p&gt;&lt;br/&gt;&lt;img alt=&quot;酵素粒93粒01.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314491594110.jpg&quot; title=&quot;1457314491594110.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒02.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314500297920.jpg&quot; title=&quot;1457314500297920.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒03.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314509494460.jpg&quot; title=&quot;1457314509494460.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒04.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314518547666.jpg&quot; title=&quot;1457314518547666.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒05.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314529257899.jpg&quot; title=&quot;1457314529257899.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒06.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314549943968.jpg&quot; title=&quot;1457314549943968.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒07.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314563654573.jpg&quot; title=&quot;1457314563654573.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒08.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314583532743.jpg&quot; title=&quot;1457314583532743.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒09.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314602936798.jpg&quot; title=&quot;1457314602936798.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒10.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314618457500.jpg&quot; title=&quot;1457314618457500.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒11.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314635600121.jpg&quot; title=&quot;1457314635600121.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒12.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314650695170.jpg&quot; title=&quot;1457314650695170.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒13.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314682156038.jpg&quot; title=&quot;1457314682156038.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒14.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314699250957.jpg&quot; title=&quot;1457314699250957.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒15.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314749434075.jpg&quot; title=&quot;1457314749434075.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒16.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314769129454.jpg&quot; title=&quot;1457314769129454.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒17.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314781341618.jpg&quot; title=&quot;1457314781341618.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒18.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314789579815.jpg&quot; title=&quot;1457314789579815.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒19.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314796347757.jpg&quot; title=&quot;1457314796347757.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒20.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314804918596.jpg&quot; title=&quot;1457314804918596.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒21.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314811796619.jpg&quot; title=&quot;1457314811796619.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒22.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314818309996.jpg&quot; title=&quot;1457314818309996.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒23.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314834191255.jpg&quot; title=&quot;1457314834191255.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒24.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314862193294.jpg&quot; title=&quot;1457314862193294.jpg&quot;/&gt;&lt;img alt=&quot;酵素粒93粒25.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457314870671560.jpg&quot; title=&quot;1457314870671560.jpg&quot;/&gt;&lt;img alt=&quot;1.jpg&quot; src=&quot;http://desc.bestinfoods.com/itemdesc/20160307/1457315029914033.jpg&quot; title=&quot;1457315029914033.jpg&quot;/&gt;&lt;/p&gt;";
			message = message.replace(/\&gt\;/g, "&");
			message = message.replace(/\&lt\;/g, "<");
			message = message.replace(/\&gt\;/g, ">");
			message = message.replace(/\&nbsp\;/g, " ");
			message = message.replace(/\%27\;/g, "\'");
			message = message.replace(/\&quot\;/g, "\"");
			message = message.replace(/<br>/g, "\n");
			message = message.replace(/\&/g,'>');
      // console.log(message);
      let match_str = /<img alt='' src='([\/\.\w]+)' border='' \/>/
      let resultStr = message.match(match_str);
      // console.log('11111',resultStr);
      dispatch(gotGoodsDetailImgs(resultStr));
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
