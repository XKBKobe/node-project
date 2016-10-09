/*订单*/
import React , { Component } from 'react';
import BaseComponent from '../../baseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../../../styles/user/orderStyle';
import { queryUserOrderData, queryCancelOrder, queryDeleteOrder, queryConfirmOrder } from '../../../../common/actions/User_orderActions';
import { AlertView } from '../../../components/AlertView';
import { Link } from 'react-router';
import {imageUrls} from "../../../special/stringImage";
import { getLocalTime, getOrderStatus } from '../../../../common/config/Tools';
import { PayWayBar } from '../../../components/makeSureOrder/editBar';
import { homePressDown } from '../../../../common/actions/tabAction';

class MyOrder extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			isLoadmore : true,//是否加载更多
			currentPage : 1,
			totalPage : 1,
			is_require : [false,false,false,false,false],
			isAlipayChoosed: true,//是否支付宝支付
			isPaidViewShow: false,//是否展示支付界面
			orderId : null,
			orderPrice : null,
			is_showAlertView : false,
			alertViewTitle : '',
			alertViewLeftAction : {
				action:() => this.setState({is_showAlertView : false})
			},
			alertViewRightAction : {
				action : null
			},
		}
		this.hasDataRender = this.hasDataRender.bind(this);
		this.noDataRender = this.noDataRender.bind(this);
		this.unique = this.unique.bind(this);
		this.repeatLoadData = this.repeatLoadData.bind(this);
		this.renderSegmentBar = this.renderSegmentBar.bind(this);
		this.btnBarAction = this.btnBarAction.bind(this);
		this.renderCollectBtn = this.renderCollectBtn.bind(this);
		this.renderOrderListView = this.renderOrderListView.bind(this);
		this.renderOrderList = this.renderOrderList.bind(this);
    this.renderOrderHeaderCell = this.renderOrderHeaderCell.bind(this);
    this.renderOrderFooterCell = this.renderOrderFooterCell.bind(this);
    this.renderOrderFooterBtn = this.renderOrderFooterBtn.bind(this);
    this.renderGoodsListView = this.renderGoodsListView.bind(this);
    this.renderGoodsList = this.renderGoodsList.bind(this);
		this.cancelOrderAction = this.cancelOrderAction.bind(this);
		this.deleteOrderAction = this.deleteOrderAction.bind(this);
		this.confirmOrderAction = this.confirmOrderAction.bind(this);
		this.renderPaidView = this.renderPaidView.bind(this);
    this.chooseAlipayHandle = this.chooseAlipayHandle.bind(this);
    this.chooseWechatHandle = this.chooseWechatHandle.bind(this);
    this.confirmPay = this.confirmPay.bind(this);

	}
	componentDidMount() {
		this.state.currentPage = 1;
		document.body.scrollTop=0;
		const { userOrderReducer } = this.props;
		let selected = userOrderReducer.selected;
		let handleId = selected?selected:this.props.location.query.handleId;
		this.props.queryUserOrderData(handleId);
	}
	//渲染按钮栏
	renderSegmentBar(selected) {
		return (
			<div style = {styles.segmentBar}>
				{this.btnBarAction(selected)}
			</div>
		)
	}
	//按钮栏按钮
  renderCollectBtn(title,selected,index) {
  		if (selected) {
  			return (
  				<div style = {styles.btnActionView}>
  					<div style = {styles.btnDiv}>
  						<p style = {styles.collect}>{title}</p>
  						<div style = {styles.line} />
  					</div>
  				</div>
  			)
  		}else {
  			return (
  				<div style = {styles.btnActionView} onClick = { ()=>this.repeatLoadData(index.toString()) }>
  					<p style = {styles.uncollect}>{title}</p>
  				</div>
  			)
  		}
  }
  btnBarAction (selected) {
		let titles = [
			{ title : "全部" },
			{ title : "待付款" },
			{ title : "待发货" },
			{ title : "待收货" },
			{ title : "待评价" },
		];
    let btnState = [false,false,false,false,false];
    let flag = parseInt(selected);
    btnState[flag] = true;
		return titles.map((data,index)=>{
			return (
          <div key = { index } style = {styles.btnView}>
            {this.renderCollectBtn(data.title,btnState[index],index)}
          </div>
			)
		})
	}
	//渲染订单列表
	renderOrderListView(orderData) {
		return (
			<div style = { styles.list }>
				{this.renderOrderList(orderData)}
			</div>
		)
	}
	//订单界面排序
	renderOrderList(orderData){
		return(
			orderData.map((data,index)=>{
				return (
					<div key = { index } style = { styles.list }>
						{this.renderOrderHeaderCell(data)}
						{this.renderGoodsListView(data)}
						{this.renderOrderFooterCell(data,index)}
					</div>
				)
			})
		)
	}
  //订单头部cell
  renderOrderHeaderCell(data) {
    let time = getLocalTime(data.order_time);
    let status = getOrderStatus(data.order_status_id);
		return (
			<div style = { styles.orderHeader }>
				<p style = { styles.orderHeaderSN }>{ time }</p>
				<p style = { styles.orderHeaderState }>{ status }</p>
			</div>
		)
  }
	//取消订单
	cancelOrderAction(orderId,index) {
		this.state.alertViewRightAction = {
			action:() => {
				this.props.queryCancelOrder(this.props.userOrderReducer.selected,orderId),
				this.setState({
				is_showAlertView : false,
				})
			}
		};
		this.state.alertViewTitle = '您确定取消订单吗？';
		this.setState({
			is_showAlertView : true,
		})
	}
	//删除订单
	deleteOrderAction(orderId) {
		this.state.alertViewRightAction = {
			action:() => {
				this.props.queryDeleteOrder(this.props.userOrderReducer.selected,orderId),
				this.setState({
				is_showAlertView : false,
				})
			}
		};
		this.state.alertViewTitle = '您确定取消订单吗？';
		this.setState({
			is_showAlertView : true,
		})
	}
	//确认收货
	confirmOrderAction(orderId) {
		this.state.alertViewRightAction = {
			action:() => {
				this.props.queryConfirmOrder(this.props.userOrderReducer.selected,orderId),
				this.setState({
				is_showAlertView : false,
				})
			}
		};
		this.state.alertViewTitle = '您确定取消订单吗？';
		this.setState({
			is_showAlertView : true,
		});
	}
	//订单尾部cell
  renderOrderFooterCell(orderData,index) {
		return (
      <div style = { styles.orderFooter }>
  			<div style = { styles.orderFooterGoods }>
  				<p style = { styles.orderFooterFont }>共{orderData.goodsNum}件商品 应付总额：</p>
          <p style = { styles.orderFooterAcount }>¥{orderData.order_cost}</p>
        </div>
        {this.renderOrderFooterBtn(orderData,index)}
      </div>
		)
  }
  renderOrderFooterBtn(orderData,index) {
    switch (orderData.order_status_id) {
      case 1:case 4:
        return(
          <div style = { styles.orderFooterBtnView }>
            <div style = { styles.orderFooterBtnBlack } onClick = {()=>this.cancelOrderAction(orderData.order_id,index)}>
              <p style = { styles.blackBtnFont }>取消订单</p>
            </div>
            <div style = { styles.orderFooterBtnRed }
							onClick = { ()=>this.setState({
								isPaidViewShow:!this.state.isPaidViewShow,
								isLoadmore:false,
								orderId : orderData.order_id,
								orderPrice : orderData.order_cost,
							}) }>
              <p style = { styles.redBtnFont }>立即付款</p>
            </div>
          </div>
        )
        break;
        case 3:case 5:case 6:
          return(
            <div style = { styles.orderFooterBtnView }>
              <div style = { styles.orderFooterBtnRed } onClick = { ()=>alert('提醒订单发货成功') }>
                <p style = { styles.redBtnFont }>提醒发货</p>
              </div>
            </div>
          )
          break;
          case 7:
            return(
              <div style = { styles.orderFooterBtnView }>
                <Link to = '/UserOrderLogistics' style = { styles.orderFooterBtnBlack }>
                  <p style = { styles.blackBtnFont }>查看物流</p>
                </Link>
                <div style = { styles.orderFooterBtnRed } onClick = { ()=>this.confirmOrderAction(orderData.order_id,index) }>
                  <p style = { styles.redBtnFont }>确认收货</p>
                </div>
              </div>
            )
            break;
          case 8:
            return (
              <div style = { styles.orderFooterBtnView }>
                <Link to = {{ pathname:'/UserOrderCommmentList',query:{orderId: orderData.order_id} }} style = { styles.orderFooterBtnRed }>
                  <p style = { styles.redBtnFont }>评价订单</p>
                </Link>
              </div>
            )
      default:
        return(
          <div style = { styles.orderFooterBtnView }>
            <div style = { styles.orderFooterBtnBlack } onClick = { ()=>this.deleteOrderAction(orderData.order_id) }>
              <p style = { styles.blackBtnFont }>删除订单</p>
            </div>
          </div>
        )
    }
  }
  //渲染商品列表
  renderGoodsListView(data) {
		return (
			<Link to = {{ pathname:"/UserDetailOrder",query:{orderId: data.order_id} }}  style = {styles.list}>
				{this.renderGoodsList(data.order_goods_list)}
			</Link>
		)
  }
  //商品列表排序
  renderGoodsList(goodsData){
		return(
			goodsData.map(function(data,index){
        let url = data.imgobj ? data.imgobj.url : '';
				return (
          <div key = { index } style = {styles.goodsCell} >
    				<img style = { styles.goodsImg } src = { url }/>
            <p style = { styles.goodsTitle }>{ data.goods_name }</p>
            <div style = { styles.goodsTotal }>
              <p style = { styles.goodsCount }>¥{ data.goods_saleprice }</p>
              <p style = { styles.goodsNum }>x{ data.goods_num }</p>
            </div>
          </div>
				)
			})
		)
	}
	//立即购买
	confirmPay() {
		var payWayUrl = '';

		if (this.state.isAlipayChoosed) {
				payWayUrl = 'http://v3.bestinfoods.com/malipay?orderId=' + this.state.orderId;
		} else {
				payWayUrl = 'http://v3.bestinfoods.com/wechatpay?orderId=' + this.state.orderId;
		}
		window.location.href = payWayUrl;
	}
	renderPaidView() {
		if (this.state.isPaidViewShow) {
			return (
				<div>
					<div style = { styles.toastView }>
					</div>

					<div style = { styles.directPaidView }>
						<div style = { styles.directPaidAmount }>
							<p style= { styles.paidStyle }>支付方式</p>
							<p style = { styles.directPaidPriceFont }>¥{this.state.orderPrice}</p>
							<div style = { styles.alertDelView } onClick = {()=>this.setState({isPaidViewShow:!this.state.isPaidViewShow,isLoadmore:false})}>
								<img style = { styles.alertDelImg } src = 'common/images/ico_goodsDetailDel.png'/>
							</div>
						</div>

						{PayWayBar(imageUrls.ic_alipay, '支付宝支付', this.state.isAlipayChoosed, this.chooseAlipayHandle)}
						{PayWayBar(imageUrls.ic_wechat, '微信支付', !this.state.isAlipayChoosed, this.chooseWechatHandle)}

						<div style = { styles.directPaidBtnView }>
							<div style = { styles.directPaidBtn } onClick = { ()=>this.confirmPay() }>
								<p style = { styles.paidFont }>确认购买</p>
							</div>
						</div>
					</div>
				</div>
			)
		}else {
			return <div></div>
		}
	}
	chooseAlipayHandle() {
			if (!this.state.isAlipayChoosed) {
					this.setState({
							isAlipayChoosed: !this.state.isAlipayChoosed
					});
			}
	}
	chooseWechatHandle() {
			if (this.state.isAlipayChoosed) {
					this.setState({
							isAlipayChoosed: !this.state.isAlipayChoosed
					});
			}
	}
	//
	unique(arr) {
		var result = [], isRepeated;
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem.order_id]) {
            result.push(elem);
            hash[elem.order_id] = true;
        }
    }
    return result;
	}
	loadMoreData() {
		if (this.state.isLoadmore&&!this.state.isPaidViewShow) {
			this.state.currentPage = this.state.currentPage+1;
			if (this.state.currentPage<=this.state.totalPage) {
				this.state.isLoadmore = false;
				const { userOrderReducer } = this.props;
				let selected = userOrderReducer.selected;
				let handleId = selected?selected:this.props.location.query.handleId;
				this.props.queryUserOrderData(handleId,this.state.currentPage);
			}else {
				this.state.currentPage=this.state.totalPage;
			}
		}else {
			return null;
		}
	}
	hasDataRender() {
		const { userOrderReducer } = this.props;
		this.state.currentPage = userOrderReducer.cancel?1:this.state.currentPage;
		userOrderReducer.cancel = false;
		let newOrderData = userOrderReducer.orderData.data;
		let allOrderData = userOrderReducer.orderlist;
		this.state.totalPage = newOrderData.totalPage;
    let netCurrentPage = newOrderData.currentPage;
    if (this.state.currentPage==netCurrentPage&&this.state.currentPage<=this.state.totalPage) {
      if (!this.state.isLoadmore) {
        this.state.isLoadmore = true;
        allOrderData = allOrderData.concat(newOrderData.orderlist);
        allOrderData = this.unique(allOrderData);
      }else {
        allOrderData = newOrderData.orderlist;
      }
			userOrderReducer.orderlist = allOrderData;
      return(
				<div style = { styles.viewDirection }>
					<scrollView style={styles.scrollView} >
						{this.renderOrderListView(userOrderReducer.orderlist)}
					</scrollView>
					{this.renderPaidView()}
					{AlertView(this.state.is_showAlertView,this.state.alertViewTitle,this.state.alertViewLeftAction.action,this.state.alertViewRightAction.action)}
				</div>
      )
    }else {
			return (
				<div style = { styles.viewDirection }>
					{this.noDataRender()}
				</div>
			)
    }
	}
	noDataRender() {
		return (
			<div style = { styles.noDataContainer }>
				<img style = { styles.noDataImgView } src ={imageUrls.icoOrderNoData}/>
				<p style = { styles.noDataTipFont }>啊哦，您还没有任何订单哦！</p>
				<Link
					to = '/'
					onClick = {() => this.props.homePressDown()}
					style = { styles.noDataBtn }>
					<p style = { styles.noDataBtnFont }>去逛逛</p>
				</Link>
			</div>
		)
	}
	repeatLoadData(selected) {
		this.state.isPaidViewShow = false;
		this.state.currentPage = 1;
		this.state.orderData = null;
		this.state.totalOrderData = null;
		document.body.scrollTop=0;
		this.props.queryUserOrderData(selected);
	}
	render () {
  	const { userOrderReducer } = this.props;
		let selected = userOrderReducer.selected;

		let headerParam = {
      isHeaderShow: true,
      headerName: '我的订单',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: userOrderReducer.dataRequesting,
      isDataRequestSucc: userOrderReducer.isDataRequestSucc,
      hasData: userOrderReducer.orderData,
			isDialogLoading: userOrderReducer.isLoading
    };
    return (
      <div style = { styles.container }>
				{this.renderSegmentBar(selected)}
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
	}
}

function getValue(state){
	const { userOrderReducer } = state;
  return {
    userOrderReducer,
  }
}
function changeOrderState(dispatch){
	return bindActionCreators({
		queryUserOrderData,
		queryCancelOrder,
		queryDeleteOrder,
		queryConfirmOrder,
		homePressDown,
	},dispatch)
}

//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(getValue,changeOrderState)(MyOrder)
