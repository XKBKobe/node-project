//商品详情界面  lxf

import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import styles from '../styles/goodsDetailStyle';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { queryGoodsDetailData, queryCartCount, queryPushItemToCart, queryDirectchange, queryCollectgoods, queryGoodsDetailImgs } from '../../common/actions/GoodsDetailActions';

class GoodsDetail extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      goodsId: null,
      isRenderToastView: false, //alert是否展示
      toastState: 0, //alert界面
      setSwiper: 0, //swiper只设置一次
      collectionType: 2, //1收藏2取消
      isRefresh: true };
    this.hasDataRender = this.hasDataRender.bind(this);
    this.renderGoodsBanners = this.renderGoodsBanners.bind(this);
    this.renderActivityCell = this.renderActivityCell.bind(this);
    this.renderShippingFeeCell = this.renderShippingFeeCell.bind(this);
    this.pushItemToCartAction = this.pushItemToCartAction.bind(this);
    this.renderToast = this.renderToast.bind(this);
    this.directMinusPaid = this.directMinusPaid.bind(this);
    this.directPlusPaid = this.directPlusPaid.bind(this);
    this.closeDirectPaid = this.closeDirectPaid.bind(this);
    this.collectgoods = this.collectgoods.bind(this);
    this.renderJudgeStockBtn = this.renderJudgeStockBtn.bind(this);
  }
  componentDidUpdate() {
    if (this.state.setSwiper <= 1) {
      let swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        width: 175,
        height: 230,
        margin: 20,
        spaceBetween: 30,
        autoplay: 3000,
        loop: true,
        lazyLoading: true,
        autoplayDisableOnInteraction: false
      });
      this.state.setSwiper = this.state.setSwiper + 1;
    }
  }
  componentDidMount() {
    let queryGoodsDataParameter = {
      goodsId: this.props.goodsId
    };
    this.props.queryGoodsDetailData(queryGoodsDataParameter);

    this.props.queryCartCount();
  }
  //渲染nav右侧按钮
  headerRightRender() {
    return <Button style={styles.navRightView} onPress={() => this.directPlusPaid('10001')}>
          <Image style={styles.sharedImg} source = {
         require("../../common/images/ico_shared.png")
      } />
        </Button>;
  }
  //加入购物车
  pushItemToCartAction(goodId) {
    let pushItemToCartParameter = [{
      goodId: goodId,
      amount: 1
    }];
    pushItemToCartParameter = JSON.stringify(pushItemToCartParameter);
    this.props.queryPushItemToCart('goods=' + pushItemToCartParameter);
  }
  //立即购买
  directMinusPaid(goodId) {
    let amount = this.props.GoodsDetailReducer.unpaidGoodsCount ? this.props.GoodsDetailReducer.unpaidGoodsCount.data.amount : '0';
    amount = parseInt(amount) - 1;
    if (amount === 0) {
      return;
    }
    console.log('---', amount);
    let parameter = {
      goodsId: goodId,
      amount: amount
    };
    this.props.queryDirectchange(parameter);
  }
  directPlusPaid(goodId) {
    let amount = this.props.GoodsDetailReducer.unpaidGoodsCount ? this.props.GoodsDetailReducer.unpaidGoodsCount.data.amount : '0';
    amount = parseInt(amount) + 1;
    // console.log('+++',amount);
    let parameter = {
      goodsId: goodId,
      amount: amount
    };
    this.props.queryDirectchange(parameter);
  }
  //收藏商品
  // http://api3.bestinfoods.com//user/post/collectgoods?goodsId=10010&type=2
  collectgoods() {
    let type = this.state.collectionType === 1 ? 2 : 1;
    this.state.collectionType = type;
    let parameter = {
      goodsId: goodId,
      type: type
    };
    this.props.queryCollectgoods(parameter);
  }
  //活动cell
  renderActivityCell(activityData) {
    if (activityData.inActivity) {
      return <Button style={styles.costCell} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView, toastState: 1 })}>
          <Text style={styles.costFont}>促销：{activityData.activities[0].name}</Text>
          <Image style={styles.goRightImg} source = {
           require("../../common/images/icon_right_arrow.png")
        } />
        </Button>;
    }
    return <View />;
  }
  //运费cell
  renderShippingFeeCell(shippingFee) {
    if (parseFloat(shippingFee)) {
      return <Button style={styles.costCell} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView, toastState: 2 })}>
          <Text style={styles.costFont}>运费：订单实付满99免运费</Text>
          <Image style={styles.goRightImg} source = {
           require("../../common/images/icon_right_arrow.png")
        } />
        </Button>;
    } else {
      return <Button style={styles.costCell} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView, toastState: 2 })}>
          <Text style={styles.costFont}>运费：本商品免运费</Text>
          <Image style={styles.goRightImg} source = {
           require("../../common/images/icon_right_arrow.png")
        } />
        </Button>;
    }
  }
  //提示框
  renderToast() {
    if (this.state.isRenderToastView) {
      if (this.state.toastState === 1) {
        return <View>
            <View style={styles.toastView}>
            </View>

            <View style={styles.alertView}>
              <View style={styles.alertName}>
                <Text style={styles.costFont}>促销活动</Text>
                <Button style={styles.alertDelView} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView })}>
                  <Image style={styles.alertDelImg} source = {
                   require("../../common/images/ico_goodsDetailDel.png")
                } />
                </Button>
              </View>
              <View style={styles.alertDetailView}>
                <Text style={styles.alertBlackFont}>满199减100</Text>
              </View>
            </View>
          </View>;
      } else if (this.state.toastState === 2) {
        return <View>
            <View style={styles.toastView}>
            </View>

            <View style={styles.alertView}>
              <View style={styles.alertName}>
                <Text style={styles.costFont}>运费规则</Text>
                <Button style={styles.alertDelView} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView })}>
                  <Image style={styles.alertDelImg} source = {
                   require("../../common/images/ico_goodsDetailDel.png")
                } />
                </Button>
              </View>
              <View style={styles.alertDetailView}>
                <Text style={styles.alertBlackFont}>订单实付满99元免运费（不含税费、活动及优惠券）</Text>
              </View>
            </View>
          </View>;
      } else if (this.state.toastState === 3) {
        return <View>
            <View style={styles.toastView}>
            </View>

            <View style={styles.alertView}>
              <View style={styles.alertName}>
                <Text style={styles.costFont}>税费规则</Text>
                <Button style={styles.alertDelView} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView })}>
                  <Image style={styles.alertDelImg} source = {
                   require("../../common/images/ico_goodsDetailDel.png")
                } />
                </Button>
              </View>
              <View style={styles.alertDetailView}>
                <Text style={styles.alertBlackFont}>税费=购买单价*件数*税率</Text>
                <Text style={styles.alertGrayFont}>根据国家规定，本品使用于跨境综合税率11.9%</Text>
                <Text style={styles.alertGrayFont}>注：活动商品买满指定金额可享税费补贴，实际结算税费请以提交订单时的应付金额明细为准。</Text>
              </View>
            </View>
          </View>;
      } else if (this.state.toastState === 4) {
        let directPaidData = this.props.GoodsDetailReducer.unpaidGoodsCount.data;
        let goodsId = this.props.GoodsDetailReducer.goodsDetailData.data.goodsId;
        let leftBtnStyle = directPaidData.amount === 1 ? styles.directPaidChangeNumBtnMin : styles.directPaidChangeNumBtnFont;
        return <View>
            <View style={styles.toastView}>
            </View>

            <View style={styles.directPaidView}>
              <View style={styles.directPaidAmount}>
                <View></View>
                <Text style={styles.directPaidPriceFont}>￥{directPaidData.TotalMoney}</Text>
                <Button style={styles.alertDelView} onPress={() => this.closeDirectPaid()}>
                  <Image style={styles.alertDelImg} source = {
                   require("../../common/images/ico_goodsDetailDel.png")
                } />
                </Button>
              </View>

              <View style={styles.directPaidNumView}>
                <Text style={styles.costFont}>数量</Text>
                <View style={styles.directPaidChangeNumView}>
        					<Button style={styles.directPaidChangeNumBtn} onPress={() => this.directMinusPaid(goodsId)}>
        						<Text style={leftBtnStyle}>-</Text>
        					</Button>
        					<View style={styles.directPaidChangeNumBoxDiv}>
        						<Text style={styles.directPaidChangeNumBtnFont}>{directPaidData.amount}</Text>
        					</View>
        					<Button style={styles.directPaidChangeNumBtn} onPress={() => this.directPlusPaid(goodsId)}>
        						<Text style={styles.directPaidChangeNumBtnFont}>+</Text>
        					</Button>
        				</View>
              </View>

              <View style={styles.costCell}>
                <Text style={styles.costFont}>商品税费</Text>
                <Text style={styles.directPaidTaxMoneyFont}>￥{directPaidData.TaxMoney}</Text>
              </View>
              <Button onPress = {
               () => Actions.makeSureOrderModel({
                goodsId: goodsId,
                count: directPaidData.amount
              })
            }>
                <View style={styles.directPaidBtnView}>
                  <Button style={styles.directPaidBtn}>
                    <Text style={styles.addCartsFont}>确认购买</Text>
                  </Button>
                </View>
              </Button>
            </View>
          </View>;
      } else {
        return <View></View>;
      }
    }
    return <View></View>;
  }
  //关闭立即购买
  closeDirectPaid() {
    this.setState({ isRenderToastView: !this.state.isRenderToastView });
    this.props.GoodsDetailReducer.unpaidGoodsCount = null;
  }
  //是否有库存
  renderJudgeStockBtn(data) {

    if (data.stock >= 1) {
      return <View style={styles.hasStock}>
          <Button style={styles.addCartsView} onPress={() => this.pushItemToCartAction(data.goodsId)}>
            <Text style={styles.addCartsFont}>加入购物车</Text>
          </Button>
          <Button style={styles.immPaidView} onPress={() => this.directPlusPaid(data.goodsId)}>
            <Text style={styles.addCartsFont}>立即购买</Text>
          </Button>
        </View>;
    } else {
      return <View style={styles.noStock}>
          <Text style={styles.addCartsFont}>暂时缺货</Text>
        </View>;
    }
  }
  //商品轮播图
  renderGoodsBanners(imgs) {
    return imgs.map(function (img, index) {
      return <Image key={index} className="swiper-slide" style={styles.goodsImg} source = {
         {
          uri: img.url
        }
      } />;
    });
  }
  //加载更多
  loadMoreData() {
    if (this.state.isRefresh) {
      this.state.isRefresh = false;
      this.props.queryGoodsDetailImgs(this.props.goodsId);
    } else {
      return null;
    }
  }
  //渲染有数据界面
  hasDataRender() {
    let data = this.props.GoodsDetailReducer.goodsDetailData.data;
    if (!data) {
      return <View>无数据界面</View>;
    }

    let pushItemToCart = this.props.GoodsDetailReducer.pushItemToCart.errorcode;
    if (pushItemToCart === 0) {
      this.props.GoodsDetailReducer.cartCount.data = parseInt(this.props.GoodsDetailReducer.cartCount.data) + 1;
    }
    let cartCount = this.props.GoodsDetailReducer.cartCount.data; //购物车商品总数
    cartCount = cartCount ? cartCount : 0;
    //{()=>this.setState({isRenderToastView:!this.state.isRenderToastView,toastState:1})}
    if (this.props.GoodsDetailReducer.unpaidGoodsCount) {
      this.state.isRenderToastView = true;
      this.state.toastState = 4;
    }
    return <View style={styles.viewDirection}>
        <ScrollView style={styles.scrollView}>

          <View style={styles.goodsImgsView}>
            <View style={styles.backImgView}>
              <Swiper height={175} width={175} loop={true}>
                                  {this.renderGoodsBanners(data.imgMain)}
                                              </Swiper>
            </View>
            <View style={styles.contentDetailView}>
              <Text style={styles.contentDetailFont}>图文详情</Text>
            </View>
          </View>

          <View style={styles.goodsInfoView}>
            <View style={styles.priceView}>
              <Text style={styles.priceFont}>￥{data.goodsSalePrice}</Text>
              <Text style={styles.originalPriceFont}>￥{data.goodsMsrp}</Text>
              <Button>
                <Image style={styles.collectionImg} source = {
                 require("../../common/images/ico_collection.png")
              } />
              </Button>
            </View>
            <View style={styles.speLine} />
            <Text style={styles.goodsTitleFont}>'{data.goodsName}'</Text>
            <Text style={styles.goodsBriefly}>{data.goodsBrief}</Text>
            <View style={styles.goodsBrandStorehouse}>
              <Image style={styles.brandImg} source = {
               {
                uri: data.imgFlag.url
              }
            } />
              <Text style={styles.brandFont}>{data.countryNameCh}｜{data.countryNameEn} {data.brandName}</Text>
              <Text style={styles.brandFont}>{data.subName}发货</Text>
            </View>
          </View>

          <View style={styles.costView}>
            {this.renderActivityCell(data.activity)}
            {this.renderShippingFeeCell(data.shippingFee)}
            <Button style={styles.costCell} onPress={() => this.setState({ isRenderToastView: !this.state.isRenderToastView, toastState: 3 })}>
              <Text style={styles.costFont}>税费：本商品适用税率{(parseFloat(data.goodsRate) * 100).toFixed(2)}%</Text>
              <Image style={styles.goRightImg} source = {
               require("../../common/images/icon_right_arrow.png")
            } />
            </Button>
          </View>

          <View style={styles.dragTopCell}>
            <Image style={styles.dragImg} source = {
             require("../../common/images/icon_pullTop.png")
          } />
            <Text style={styles.dragFont}>上拉查看图文详情</Text>
          </View>

        </ScrollView>
        <View style={styles.toolBar}>
          <Button onPress = {
           Actions.ZtestPageModel
        } style={styles.funView}>
            <Image style={styles.funImg} source = {
             require("../../common/images/ico_customerServe.png")
          } />
            <Text style={styles.funFont}>客服</Text>
          </Button>
          <Button onPress = {
           Actions.CartPageModel
        } style={styles.funView}>
            <Image style={styles.funImg} source = {
             require("../../common/images/ico_shoppingCart.png")
          } />
            <Text style={styles.funFont}>购物车</Text>
            <View style={styles.cartNumView}>
              <Text style={styles.cartNumFont}>{cartCount}</Text>
            </View>
          </Button>
          {this.renderJudgeStockBtn(data)}
        </View>
        {this.renderToast()}
      </View>;
  }

  render() {
    const { GoodsDetailReducer } = this.props;
    var headerParam = {
      isHeaderShow: true,
      headerName: '商品详情',
      isBackShow: true
    };
    var netRequestParam = {
      isRequesting: GoodsDetailReducer.dataRequesting,
      isDataRequestSucc: GoodsDetailReducer.isDataRequestSucc,
      hasData: GoodsDetailReducer.goodsDetailData
    };
    return <View style={styles.container}>
        {super.allSceneRender(headerParam, netRequestParam)}
      </View>;
  }
}

function mapStateToProps(state) {
  // console.log(state);
  const { GoodsDetailReducer } = state;
  return {
    GoodsDetailReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    queryGoodsDetailData,
    queryCartCount,
    queryPushItemToCart,
    queryDirectchange,
    queryCollectgoods,
    queryGoodsDetailImgs
  }, dispatch);
}

//将state和dispatch映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetail);