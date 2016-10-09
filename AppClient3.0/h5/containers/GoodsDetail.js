//商品详情界面  lxf

import React, { Component } from 'react';
import BaseComponent from './baseComponent';
import styles from '../styles/goodsDetailStyle';
import {browserHistory, Link, hashHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import Swiper from 'swiper';
import { connect } from 'react-redux';
import { queryGoodsDetailData, queryCartCount, queryPushItemToCart, queryDirectchange, queryCollectgoods, queryGoodsDetailImgs } from '../../common/actions/GoodsDetailActions';
import { COOKIE_KEY_LOGINSTATUS , getCookie } from '../../common/config/cookieOperate';

class GoodsDetail extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      goodsId : null,
      isRenderToastView : false,//alert是否展示
      toastState : 0,//alert界面
      setSwiper : 0,//swiper只设置一次
      collectionType : 2,//1收藏2取消
      isRefresh : true,//上拉加载图文详情只加载一次
      isCollected : 1,//是否收藏  1未收藏  2已收藏
    };
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
    this.renderDetailImg = this.renderDetailImg.bind(this);
    this.scrollToDetailImgs = this.scrollToDetailImgs.bind(this);
  }
  componentDidUpdate(){
    if (this.state.setSwiper<1&&this.props.GoodsDetailReducer.goodsDetailData) {
      let swiper = new Swiper ('.swiper-container', {
          pagination : '.swiper-pagination',
          width: window.screen.availWidth,
          height: 230,
          autoplay : 3000,
          margin: 20,
          spaceBetween : 30,
          loop : true,
          lazyLoading : true,
          autoplayDisableOnInteraction : false,
    		});
        this.state.setSwiper =this.state.setSwiper+1;
    }
  }
  componentDidMount() {
    this.props.queryGoodsDetailData(this.props.location.query.goodsId);

    this.props.queryCartCount();

    this.props.queryGoodsDetailImgs(this.props.location.query.goodsId);
    document.body.scrollTop = 0;
	};
  // 界面跳转
  gotoTargetPageOrLoginPage(targetPage,parameter) {
    if (2 == getCookie(COOKIE_KEY_LOGINSTATUS)) {
      hashHistory.push({
        pathname : targetPage,
        query : parameter
      });
    } else {
      hashHistory.push('/login');
    }
  }
  //渲染nav右侧按钮
  headerRightRender() {

      return (
        <div style={ styles.navRightView }>
          {/*<img style = { styles.sharedImg } src = 'common/images/ico_shared.png'/>*/}
        </div>
      )
  }
  //加入购物车
  pushItemToCartAction(goodsId) {
    let pushItemToCartParameter = [{
      goodId : goodsId,
      amount : 1
    }];
    pushItemToCartParameter = JSON.stringify(pushItemToCartParameter);
    this.props.queryPushItemToCart('goods='+pushItemToCartParameter)
  }
  //立即购买
  directMinusPaid(goodsId) {
    if (2 == getCookie(COOKIE_KEY_LOGINSTATUS)) {
      let amount = this.props.GoodsDetailReducer.unpaidGoodsCount?this.props.GoodsDetailReducer.unpaidGoodsCount.data.amount:'0';
      amount = parseInt(amount)-1;
      if (amount===0) {
        return;
      }
      this.props.queryDirectchange(goodsId,amount)
    } else {
      hashHistory.push('/login');
    }
  }
  directPlusPaid(goodsId) {
    if (2 == getCookie(COOKIE_KEY_LOGINSTATUS)) {
      let amount = (this.props.GoodsDetailReducer.unpaidGoodsCount)?(this.props.GoodsDetailReducer.unpaidGoodsCount.data.amount):'0';
      amount = parseInt(amount)+1;
      // console.log('+++',amount);
      this.props.queryDirectchange(goodsId,amount);
    } else {
      hashHistory.push('/login');
    }
  }
  //收藏商品  1收藏   2删除
  collectgoods() {
    this.props.GoodsDetailReducer.goodsDetailData.data.collectioned = (this.props.GoodsDetailReducer.goodsDetailData.data.collectioned==1)?2:1;
    this.props.queryCollectgoods(this.props.location.query.goodsId,this.state.collectionType)
  }
  //活动cell
  renderActivityCell(activityData) {
    if (activityData.inActivity) {
      return (
        <div
          style = { styles.costCell }
          onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView,toastState:1})}
          >
          <p style = { styles.costFont }>促销：{activityData.activities[0].name}</p>
          <img style = { styles.goRightImg } src = 'common/images/icon_right_arrow.png'/>
        </div>
      )
    }
    return(<div />)
  }
  //运费cell
  renderShippingFeeCell(shippingFee) {
    if (parseFloat(shippingFee)) {
      return(
        <div
          style = { styles.costCell }
          onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView,toastState:2})}
          >
          <p style = { styles.costFont }>运费：订单实付满99免运费</p>
          <img style = { styles.goRightImg } src = 'common/images/icon_right_arrow.png'/>
        </div>
      )
    }else {
      return (
        <div
          style = { styles.costCell }
          onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView,toastState:2})}
          >
          <p style = { styles.costFont }>运费：本商品免运费</p>
          <img style = { styles.goRightImg } src = 'common/images/icon_right_arrow.png'/>
        </div>
      )
    }

  }
  //提示框
  renderToast() {
    if (this.state.isRenderToastView) {
      if (this.state.toastState===1) {
        return (
          <div >
            <div style = { styles.toastView } onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView})}>
            </div>

            <div style = { styles.alertView }>
              <div style = { styles.alertName }>
                <p style = { styles.costFont }>促销活动</p>
                <div style = { styles.alertDelView } onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView})}>
                  <img style = { styles.alertDelImg } src = 'common/images/ico_goodsDetailDel.png'/>
                </div>
              </div>
              <div style = {styles.alertDetailView}>
                <p style = { styles.alertBlackFont }>满199减100</p>
              </div>
            </div>
          </div>
        )
      }else if (this.state.toastState===2) {
        return (
          <div >
            <div style = { styles.toastView } onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView})}>
            </div>

            <div style = { styles.alertView }>
              <div style = { styles.alertName }>
                <p style = { styles.costFont }>运费规则</p>
                <div style = { styles.alertDelView } onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView})}>
                  <img style = { styles.alertDelImg } src = 'common/images/ico_goodsDetailDel.png'/>
                </div>
              </div>
              <div style = {styles.alertDetailView}>
                <p style = { styles.alertBlackFont }>订单实付满99元免运费（不含税费、活动及优惠券）</p>
              </div>
            </div>
          </div>
        )
      }else if (this.state.toastState===3) {
        return (
          <div >
            <div style = { styles.toastView } onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView})}>
            </div>

            <div style = { styles.alertView }>
              <div style = { styles.alertName }>
                <p style = { styles.costFont }>税费规则</p>
                <div style = { styles.alertDelView } onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView})}>
                  <img style = { styles.alertDelImg } src = 'common/images/ico_goodsDetailDel.png'/>
                </div>
              </div>
              <div style = {styles.alertDetailView}>
                <p style = { styles.alertBlackFont }>税费=购买单价*件数*税率</p>
                <p style = { styles.alertGrayFont }>根据国家规定，本品使用于跨境综合税率11.9%</p>
                <p style = { styles.alertGrayFont }>注：活动商品买满指定金额可享税费补贴，实际结算税费请以提交订单时的应付金额明细为准。</p>
              </div>
            </div>
          </div>
        )
      }else if (this.state.toastState===4) {
        let directPaidData = this.props.GoodsDetailReducer.unpaidGoodsCount.data;
        let goodsId = this.props.GoodsDetailReducer.goodsDetailData.data.goodsId;
        let leftBtnStyle = (directPaidData.amount===1)?styles.directPaidChangeNumBtnMin:styles.directPaidChangeNumBtnFont;
        return (
          <div>
            <div style = { styles.toastView }>
            </div>

            <div style = { styles.directPaidView }>
              <div style = { styles.directPaidAmount }>
                <div style = { styles.alertDelView }></div>
                <p style = { styles.directPaidPriceFont }>¥{directPaidData.TotalMoney}</p>
                <div style = { styles.alertDelView } onClick = {()=>this.closeDirectPaid()}>
                  <img style = { styles.alertDelImg } src = 'common/images/ico_goodsDetailDel.png'/>
                </div>
              </div>

              <div style = {styles.directPaidNumView}>
                <p style = { styles.costFont }>数量</p>
                <div style = {styles.directPaidChangeNumView}>
        					<div style = {styles.directPaidChangeNumBtn} onClick = {() => this.directMinusPaid(goodsId)} >
        						<p style = {leftBtnStyle}>-</p>
        					</div>
        					<div style = {styles.directPaidChangeNumBoxDiv}>
        						<p style = {styles.directPaidChangeNumBtnFont}>{directPaidData.amount}</p>
        					</div>
        					<div style = {styles.directPaidChangeNumBtn} onClick = {() => this.directPlusPaid(goodsId)} >
        						<p style = {styles.directPaidChangeNumBtnFont}>+</p>
        					</div>
        				</div>
              </div>

              <div style = { styles.costCell }>
                <p style = { styles.costFont }>商品税费</p>
                <p style = { styles.directPaidTaxMoneyFont }>¥{directPaidData.TaxMoney}</p>
              </div>
              <div style = { styles.directPaidBtnView }>
                <Link to = {{pathname:'/makeSureOrder',query:{goodsId: goodsId,count: directPaidData.amount,flag: 1}}} >
                  <div style = { styles.directPaidBtn }>
                    <p style = { styles.addCartsFont }>确认购买</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )
      }else {
        return <div></div>
      }
    }
    return <div></div>
  }
  //关闭立即购买
  closeDirectPaid() {
    this.setState({isRenderToastView:!this.state.isRenderToastView});
    this.props.GoodsDetailReducer.unpaidGoodsCount = null;
  }
  //是否有库存
  renderJudgeStockBtn(data) {

    if (data.stock>=1) {
      return (
        <div style = { styles.hasStock }>
          <div
            style = { styles.addCartsView }
            onClick = {() => this.pushItemToCartAction(data.goodsId)}
          >
            <p style = { styles.addCartsFont }>加入购物车</p>
          </div>
          <div
            style = { styles.immPaidView }
            onClick = {() => this.directPlusPaid(data.goodsId)}
            >
            <p style = { styles.addCartsFont }>立即购买</p>
          </div>
        </div>
      )
    }else {
      return (
        <div style = { styles.noStock }>
          <p style = { styles.addCartsFont }>暂时缺货</p>
        </div>
      )
    }
  }
  //商品轮播图
  renderGoodsBanners(imgs) {
    return imgs.map(function(img,index){
      return(
        <div key = {index} className="swiper-slide" style = { styles.imgDiv }>
          <img style = { styles.goodsImg } src={img.url} />
        </div>
      )
    })
  }
  //渲染图文详情
  renderDetailImg(imgs) {
    // console.log(imgs);
    if (imgs) {
      return (
        imgs.map((img,index)=>{
          return (
            <img key = {index} style = { styles.detailImg } src = {img}/>
          )
        })
      )
    }else {
      return <div></div>
    }
  }
  //滚动到图文详情
  scrollToDetailImgs() {
    // console.log(this.refs.detailImgView.getBoundingClientRect().top);
    let scroll = this.refs.detailImgView.offsetTop-50;
    document.body.scrollTop=scroll;
    // document.getElementById('go_bottom').scrollIntoView(this.refs.detailImgView);
  }
  //加载更多
  // loadMoreData() {
  //   if (this.state.isRefresh) {
	// 		this.state.isRefresh = false;
	// 		this.props.queryGoodsDetailImgs(this.props.location.query.goodsId);
	// 	}else {
	// 		return null;
	// 	}
  // }
  //渲染有数据界面
  hasDataRender() {
    let data = this.props.GoodsDetailReducer.goodsDetailData.data;

    if (!data) { return(<div>无数据</div>) }
    let collectedImg = (data.collectioned==1) ? 'common/images/ico_uncollection.png' : 'common/images/ico_collection.png';
    this.state.collectionType = data.collectioned;
    //购物车商品总数
    let cartCount = this.props.GoodsDetailReducer.pushItemToCart?this.props.GoodsDetailReducer.pushItemToCart.data:(this.props.GoodsDetailReducer.cartCount?this.props.GoodsDetailReducer.cartCount.data:'0');
    if (this.props.GoodsDetailReducer.unpaidGoodsCount) {
      this.state.isRenderToastView = true;
      this.state.toastState = 4;
    }
    let detailImgs = this.props.GoodsDetailReducer.goodsDetailImgs;
    return (
      <div style = { styles.viewDirection }>
        <scrollView style = { styles.scrollView }>

          <div style = { styles.goodsImgsView }>
            <div style = { styles.backImgView } >
              <div className="swiper-container" >
                <div className="swiper-wrapper">
                  {this.renderGoodsBanners(data.imgMain)}
                </div>
                <div className='swiper-pagination'></div>
              </div>
            </div>
            <div style = { styles.contentDetailView } onClick = {() => this.scrollToDetailImgs()}>
              <p style = { styles.contentDetailFont }>图文详情</p>
            </div>
          </div>

          <div style = { styles.goodsInfoView }>
            <div style = { styles.priceView }>
              <p style = { styles.priceFont }>¥{data.goodsSalePrice}</p>
              <p style = { styles.originalPriceFont }>¥{data.goodsMsrp}</p>
              <div >
                <img style = { styles.collectionImg } onClick = {() => this.collectgoods()} src = {collectedImg}/>
              </div>
            </div>
            <div style = { styles.speLine }/>
            <p style = { styles.goodsTitleFont }>{data.goodsName}</p>
            <p style = { styles.goodsBriefly }>{data.goodsBrief}</p>
            <div style = { styles.goodsBrandStorehouse }>
              <img style = { styles.brandImg } src = {data.imgFlag.url}/>
              <p style = { styles.brandFont }>{data.countryNameCh}｜{data.countryNameEn} {data.brandName}</p>
              <p style = { styles.brandFont }>{data.subName}发货</p>
            </div>
          </div>

          <div style = { styles.costView }>
            {this.renderActivityCell(data.activity)}
            {this.renderShippingFeeCell(data.shippingFee)}
            <div
              style = { styles.costCell }
              onClick = {()=>this.setState({isRenderToastView:!this.state.isRenderToastView,toastState:3})}
              >
              <p style = { styles.costFont }>税费：本商品适用税率{(parseFloat(data.goodsRate)*100).toFixed(2)}%</p>
              <img style = { styles.goRightImg } src = 'common/images/icon_right_arrow.png'/>
            </div>
          </div>

          <div ref = 'detailImgView' style = { styles.detailImgView }>
            {this.renderDetailImg(detailImgs)}
          </div>

        </scrollView>
        <div style = { styles.toolBar }>
          <Link to = '/ZtestPage' style = { styles.funView }>
            <img style = { styles.funImg } src = 'common/images/ico_customerServe.png'/>
            <p style = { styles.funFont }>客服</p>
          </Link>
          <Link to = "/CartPage" style = { styles.funView }>
            <img style = { styles.funImg } src = 'common/images/ico_shoppingCart.png'/>
            <p style = { styles.funFont }>购物车</p>
            <div style = { styles.cartNumView }>
              <p style = { styles.cartNumFont }>{cartCount}</p>
            </div>
          </Link>
          {this.renderJudgeStockBtn(data)}
        </div>
        {this.renderToast()}
      </div>
    )
  }

  render () {
    const { GoodsDetailReducer } = this.props;
    var headerParam = {
      isHeaderShow: true,
      headerName: '商品详情',
      isBackShow: true
    };
    var netRequestParam = {
      isRequesting: GoodsDetailReducer.dataRequesting,
      isDataRequestSucc: GoodsDetailReducer.isDataRequestSucc,
      hasData: GoodsDetailReducer.goodsDetailData,
      isDialogLoading: GoodsDetailReducer.isLoading
    };
    return (
      <div style = { styles.container }>
        {super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
  }
}

function mapStateToProps(state){
	const { GoodsDetailReducer } = state;
  return {
		GoodsDetailReducer
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		queryGoodsDetailData,
    queryCartCount,
    queryPushItemToCart,
    queryDirectchange,
    queryCollectgoods,
    queryGoodsDetailImgs
	},dispatch)
}

//将state和dispatch映射在props上
export default connect(mapStateToProps,mapDispatchToProps)(GoodsDetail)
