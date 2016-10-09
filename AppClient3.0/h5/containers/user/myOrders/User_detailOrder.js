/*订单详情*/
import BaseComponent 					from '../../baseComponent';
import React , { Component } 	from 'react';
import { connect } 						from 'react-redux';
import {browserHistory, Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { AlertView } from '../../../components/AlertView';
import styles 								from '../../../styles/user/orderDetailStyle';
import orderStyles 						from '../../../styles/user/orderStyle';
import {imageUrls} 						from '../../../special/stringImage';
import { queryUserOrderDetailData, queryCancelOrder_detail, queryDeleteOrder_detail,queryConfirmOrder_detail } from '../../../../common/actions/User_orderActions';
import { getLocalTime, add0, getOrderStatus, getCountdown, getCountdownTimestamp } 			from '../../../../common/config/Tools';
import { PayWayBar } from '../../../components/makeSureOrder/editBar';

class OrderDetail extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			orderStateId : null,
			Countdown : 0,
			expireFlag : true,
			expireTime : '00:00:00',
			timer : null,
			isAlipayChoosed: true,//是否支付宝支付
			isPaidViewShow: false,//是否展示支付界面
			orderPrice : 0,
			is_showAlertView : false,
			alertViewTitle : '',
			alertViewLeftAction : {
				action:() => this.setState({is_showAlertView : false})
			},
			alertViewRightAction : {
				action : null
			},
		}
		this.renderCountdownView = this.renderCountdownView.bind(this);
		this.renderIdentityCardView = this.renderIdentityCardView.bind(this);
		this.renderWarehouseListView = this.renderWarehouseListView.bind(this);
		this.renderGoodsListView = this.renderGoodsListView.bind(this);
		this.renderGoodsCell = this.renderGoodsCell.bind(this);
		this.renderFlowView = this.renderFlowView.bind(this);
		this.getAddress = this.getAddress.bind(this);
		this.countdownTime = this.countdownTime.bind(this);
		this.cancelOrderAction = this.cancelOrderAction.bind(this);
		this.deleteOrderAction = this.deleteOrderAction.bind(this);
		this.confirmOrderAction = this.confirmOrderAction.bind(this);
		this.renderPaidView = this.renderPaidView.bind(this);
    this.chooseAlipayHandle = this.chooseAlipayHandle.bind(this);
    this.chooseWechatHandle = this.chooseWechatHandle.bind(this);
    this.confirmPay = this.confirmPay.bind(this);
	}
	componentWillUnmount() {
		super.componentWillUnmount();
		clearInterval(this.state.timer);
	}
	componentDidMount() {
		this.props.queryUserOrderDetailData(this.props.location.query.orderId);
	}
	//倒计时
	countdownTime(nS,type) {
		let self = this;
		if (this.state.expireFlag) {
			this.state.expireFlag = false;
			this.state.timer  = setInterval(function(){
				let expireTime = getCountdownTimestamp(nS,type);
				--expireTime;
				if (0==expireTime) {
					clearInterval(this.state.timer);
					self.setState({
						expireTime : '00:00:00',
					})
				}else {
					let h = parseInt(expireTime/3600);
				  let mm = parseInt(expireTime%3600/60);
				  let s = parseInt(expireTime%3600%60);
				  let countdownTime =  add0(h)+':'+add0(mm)+':'+add0(s);
					self.setState({
						expireTime : countdownTime,
					})
				}
			},1000);
		}
	}
	//倒计时控件
	renderCountdownView(orderDetailData) {
		if (orderDetailData.order_status_id==2) {
			return (
				<div style = { styles.orderCountdownView }>
					<p style = { styles.orderCountdownBlackFont }>订单已取消</p>
				</div>
			)
		}else if (orderDetailData.order_status_id==1) {
			this.state.expireTime = getCountdown(orderDetailData.order_time,orderDetailData.type)
			{this.countdownTime(orderDetailData.order_time,orderDetailData.type)}
			return (
				<div style = { styles.orderCountdownView }>
					<p style = { styles.orderCountdownBlackFont }>还剩</p>
					<p style = { styles.orderCountdownRedFont }> {this.state.expireTime} </p>
					<p style = { styles.orderCountdownBlackFont }>订单自动取消</p>
				</div>
			)
		}else {
			let paidWay = orderDetailData.pay_id ? (orderDetailData.pay_id==4?'支付宝':'微信支付') : '未知';
			return (
				<div style = { styles.orderCountdownView }>
					<p style = { styles.orderCountdownBlackFont }>支付方式：{paidWay}</p>
				</div>
			)
		}
	}
	//取消订单
	cancelOrderAction() {
		this.state.alertViewRightAction = {
			action:() => {
				this.props.queryCancelOrder_detail(this.props.location.query.orderId),
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
	deleteOrderAction() {
		this.state.alertViewRightAction = {
			action:() => {
				this.props.queryDeleteOrder_detail(this.props.location.query.orderId),
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
	//确认收货
	confirmOrderAction() {
		this.state.alertViewRightAction = {
			action:() => {
				this.props.queryConfirmOrder_detail(this.props.location.query.orderId),
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
	//立即购买
	confirmPay() {
		var payWayUrl = '';

		if (this.state.isAlipayChoosed) {
				payWayUrl = 'http://v3.bestinfoods.com/malipay?orderId=' + this.props.location.query.orderId;
		} else {
				payWayUrl = 'http://v3.bestinfoods.com/wechatpay?orderId=' + this.props.location.query.orderId;
		}
		window.location.href = payWayUrl;
	}
	renderPaidView() {
		if (this.state.isPaidViewShow) {
			return (
				<div>
					<div style = { orderStyles.toastView }>
					</div>

					<div style = { orderStyles.directPaidView }>
						<div style = { orderStyles.directPaidAmount }>
							<p style= { orderStyles.paidStyle }>支付方式</p>
							<p style = { orderStyles.directPaidPriceFont }>¥{this.state.orderPrice}</p>
							<div style = { orderStyles.alertDelView } onClick = {()=>this.setState({isPaidViewShow:!this.state.isPaidViewShow})}>
								<img style = { orderStyles.alertDelImg } src = 'common/images/ico_goodsDetailDel.png'/>
							</div>
						</div>

						{PayWayBar(imageUrls.ic_alipay, '支付宝支付', this.state.isAlipayChoosed, this.chooseAlipayHandle)}
						{PayWayBar(imageUrls.ic_wechat, '微信支付', !this.state.isAlipayChoosed, this.chooseWechatHandle)}

						<div style = { orderStyles.directPaidBtnView }>
							<div style = { orderStyles.directPaidBtn } onClick = { ()=>this.confirmPay() }>
								<p style = { orderStyles.paidFont }>确认购买</p>
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
	//身份证控件
	renderIdentityCardView(orderDetailData) {
		if (!(orderDetailData.consignee_idcard==='')&&orderDetailData.consignee_idcard) {
			return (
				<div style = { styles.identityCardView }>
					<p style = { styles.identityCardFont }>身份证号码</p>
					<p style = { styles.identityCardFont }>{orderDetailData.consignee_idcard}</p>
				</div>
			)
		}
		return (<div />)
	}
	//仓库list
	renderWarehouseListView(goodsData){
		let self = this;
		return goodsData.map(function(warehouseData,index){
				return (
					<div key = { index } style = { styles.warehouseList }>
						<div style = { styles.warehouse }>
							<p style = { styles.warehouseFont }>{warehouseData.warehouse}</p>
						</div>
						{self.renderGoodsListView(warehouseData.goodsList)}
					</div>
				)
			}
		)
	}
	//商品list
	renderGoodsListView(goodsList){
		let self = this;
		let length = goodsList.length;
		return (
			goodsList.map(function(data,index){
				return (
					<div key = {index}>
						{self.renderGoodsCell(data,index,length)}
					</div>
				)
			})
		)
	}
	//商品cell
	renderGoodsCell(goodsData,index,length) {
		// console.log(goodsData);
		let url = goodsData.imgobj ? goodsData.imgobj.url : '';
		if (index+1 == length&&(this.state.orderStateId == 7||this.state.orderStateId == 8)) {
			return (
				<div style = { styles.lastGoodsCell }>
					<div style = {styles.orderLogisticsCell} >
						<img style = { styles.orderLogisticsImg } src = {url}/>
						<p style = { styles.goodsTitle }>{goodsData.goods_name}</p>
						<div style = { styles.goodsTotal }>
							<p style = { styles.goodsCount }>¥{goodsData.goods_saleprice}</p>
							<p style = { styles.goodsNum }>x{goodsData.goods_num}</p>
						</div>
					</div>
					<Link to = '/UserOrderLogistics' style = { styles.orderLogisticsBtn } >
						<p style = { styles.orderLogisticsBtnFont }>查看物流</p>
					</Link>
				</div>
			)
		}else {
			return (
				<div style = {orderStyles.goodsCell} >
					<img style = { orderStyles.goodsImg } src = { url }/>
					<p style = { orderStyles.goodsTitle }>{ goodsData.goods_name }</p>
					<div style = { orderStyles.goodsTotal }>
						<p style = { orderStyles.goodsCount }>¥{ goodsData.goods_saleprice }</p>
						<p style = { orderStyles.goodsNum }>x{ goodsData.goods_num }</p>
					</div>
				</div>
			)
		}
	}
	//底部悬浮框
	renderFlowView(orderDetailData) {
		switch (orderDetailData.order_status_id) {
			case 1:case 4:
			return (
				<div style = { styles.flowView }>
					<div style = { styles.orderBtnBlack } onClick = {()=>this.cancelOrderAction()}>
						<p style = { styles.blackBtnFont }>取消订单</p>
					</div>
					<div style = { styles.orderBtnRed }
						onClick = { ()=>this.setState({
							isPaidViewShow:!this.state.isPaidViewShow,
							orderPrice : orderDetailData.order_cost,
						}) }>
						<p style = { styles.redBtnFont }>立即付款</p>
					</div>
				</div>
			)
				break;
			case 3:case 5:case 6:
			return (
				<div style = { styles.flowView }>
					<div style = { styles.orderBtnRed } onClick = { ()=>alert('提醒订单发货成功') }>
						<p style = { styles.redBtnFont }>提醒发货</p>
					</div>
				</div>
			)
				break;
			case 7:
			return (
				<div style = { styles.flowView }>
					<div style = { styles.orderBtnRed } onClick = {()=>this.confirmOrderAction()}>
						<p style = { styles.redBtnFont }>确认收货</p>
					</div>
				</div>
			)
				break;
			case 8:
			return (
				<div style = { styles.flowView }>
					<Link to = {{ pathname:'/UserOrderCommmentList',query:{orderId: this.props.location.query.orderId} }} style = { orderStyles.orderFooterBtnRed }>
						<p style = { orderStyles.redBtnFont }>评价订单</p>
					</Link>
				</div>
			)
				break;
			default:
			return (
				<div style = { styles.flowView }>
					<div style = { styles.orderBtnBlack } onClick  ={()=>this.deleteOrderAction()}>
						<p style = { styles.blackBtnFont }>删除订单</p>
					</div>
				</div>
			)
		}
	}
	//得到地址信息
	getAddress(orderDetailData) {
		let address = orderDetailData.ship_area.replace(/\|/g,'') + orderDetailData.ship_address;
		return address;
	}

	hasDataRender() {
		const { userOrderDetailReducer } = this.props;
		let orderDetailData = userOrderDetailReducer.orderDetailData.data;
		let time = getLocalTime(orderDetailData.order_time);
		let status = getOrderStatus(orderDetailData.order_status_id);
		this.state.orderStateId = orderDetailData.order_status_id;
		return (
			<div style = {styles.viewDirection}>
				<scrollView style = { styles.scrollView }>
				<div style = { styles.orderInfo }>
					<p style = { styles.orderStatusFont }>{status}</p>
					<p style = { styles.orderStateFont }>订单编号：{orderDetailData.order_id}</p>
					<p style = { styles.orderTimeFont }>下单时间：{time}</p>
					{this.renderCountdownView(orderDetailData)}
				</div>

				<div style = { styles.orderAddressView }>
					<div style = { styles.consumerView }>
						<p style = { styles.consumerFont }>{orderDetailData.consignee}</p>
						<p style = { styles.consumerFont }>{orderDetailData.consignee_mobile}</p>
					</div>
					<p style = { styles.addressFont }>{this.getAddress(orderDetailData)}</p>
				</div>
				{this.renderIdentityCardView(orderDetailData)}

				{this.renderWarehouseListView(orderDetailData.good)}

				<div style = { styles.priceView }>
					<div style = { styles.costView }>
						<p style = { styles.identityCardFont }>商品总价</p>
						<p style = { styles.identityCardFont }>¥{orderDetailData.order_cost}</p>
					</div>
					<div style = { styles.costView }>
						<p style = { styles.identityCardFont }>活动优惠</p>
						<p style = { styles.identityCardFont }>-¥0.00</p>
					</div>
					<div style = { styles.costView }>
						<p style = { styles.identityCardFont }>优惠券</p>
						<p style = { styles.identityCardFont }>-¥{orderDetailData.discount_total}</p>
					</div>
					<div style = { styles.costView }>
						<p style = { styles.identityCardFont }>运费</p>
						<p style = { styles.identityCardFont }>¥{orderDetailData.ship_cost}</p>
					</div>
					<div style = { styles.costView }>
						<p style = { styles.identityCardFont }>税费</p>
						<p style = { styles.identityCardFont }>¥{orderDetailData.tax_cost}</p>
					</div>
					<div style = { styles.costView }>
						<p style = { styles.identityCardFont }>总计</p>
						<p style = { styles.identityCardFont }>¥{orderDetailData.item_cost}</p>
					</div>
				</div>
				</scrollView>
				{this.renderFlowView(orderDetailData)}
				{this.renderPaidView()}
				{AlertView(this.state.is_showAlertView,this.state.alertViewTitle,this.state.alertViewLeftAction.action,this.state.alertViewRightAction.action)}
			</div>
		)
	}

	render () {
		const { userOrderDetailReducer } = this.props;
		let orderDetailData = userOrderDetailReducer.orderDetailData;

		let headerParam = {
      isHeaderShow: true,
      headerName: '订单详情',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: userOrderDetailReducer.dataRequesting,
      isDataRequestSucc: userOrderDetailReducer.isDataRequestSucc,
      hasData: orderDetailData,
			isDialogLoading: userOrderDetailReducer.isLoading
    };
    return (
      <div style = { styles.container }>
				{super.allSceneRender(headerParam, netRequestParam)}
      </div>
    )
	}
}
function getValue(state){
	const { userOrderDetailReducer } = state;
  return {
    userOrderDetailReducer,
  }
}
function changeOrderState(dispatch){
	return bindActionCreators({
		queryUserOrderDetailData,
		queryCancelOrder_detail,
		queryDeleteOrder_detail,
		queryConfirmOrder_detail,
	},dispatch)
}

//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(getValue,changeOrderState)(OrderDetail)
