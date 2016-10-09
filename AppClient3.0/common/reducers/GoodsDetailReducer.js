import * as Types from '../contants/constants';
import merge from 'lodash/merge';

const goodsDetailData = {
  dataRequesting: true,
  isDataRequestSucc: false,
  goodsDetailData : null,
  cartCount : null,
  pushItemToCart : null,
  unpaidGoodsCount : null,
  collectionGoods : null,
  goodsDetailImgs : null,
  isLoading : false,
}

export default function GoodsDetailReducer(state = goodsDetailData, action) {
  switch(action.type) {
    case Types.GOT_GOODSDETAILDATA_DATA:
      return merge({}, state, {
        dataRequesting: false,
        goodsDetailData: action.data,
        isDataRequestSucc: true,
        isLoading : false,
      });
      break;
    case Types.GOT_CARTCOUNT:
      return merge({}, state, {
        cartCount : action.data,
        isLoading : false,
      });
      break;
    case Types.PUSH_ITEMTOCART:
      return merge({}, state, {
        pushItemToCart : action.data,
        isLoading : false,
      });
      break;
    case Types.DIRECTCHANGE:
      return merge({}, state, {
        unpaidGoodsCount : action.data,
        isLoading : false,
      });
      break;
    case Types.COLLECTIONGOODS:
      return merge({}, state, {
        collectionGoods : action.data,
        isLoading : false,
      });
      break;
    case Types.GOODSDETAILIMGS:
      return merge({}, state, {
        goodsDetailImgs : action.data,
        isLoading : false,
      });
      break;
    case Types.GOODSDETAIL_START_LOADING :
      return merge({}, state, {
        isLoading : true,
      })
      break;
    case Types.GOODSDETAIL_END_LOADING :
      return merge({}, state, {
        isLoading : false,
      })
      break;
    default:
      return goodsDetailData;
  }
}
