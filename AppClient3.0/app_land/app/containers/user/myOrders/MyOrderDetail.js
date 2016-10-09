/*订单详情*/
import BaseComponent from '../../baseComponent';
import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import styles from '../../../styles/user/orderDetailStyle';
import NavigatorBar from '../../../components/navigatorBar_noRightBtn';
import { imageUrls } from '../../../special/stringImage';
import { GoodsCell } from './MyOrderDetailContainer';
import { queryUserOrderDetailData } from '../../../../common/actions/User_OrderActions';
import { getLocalTime, getOrderStatus } from '../../../../common/config/Tools';

class OrderDetail extends BaseComponent {
	constructor(props) {
		super(props);

		this.renderCountdownView = this.renderCountdownView.bind(this);
		this.renderIdentityCardView = this.renderIdentityCardView.bind(this);
		this.renderWarehouseListView = this.renderWarehouseListView.bind(this);
		this.renderGoodsListView = this.renderGoodsListView.bind(this);
		this.renderLastGoodsCell = this.renderLastGoodsCell.bind(this);
		this.renderFlowView = this.renderFlowView.bind(this);
		this.getAddress = this.getAddress.bind(this);
	}
	componentDidMount() {
		let parameter = {
			orderId: this.props.orderId
		};
		this.props.queryUserOrderDetailData(parameter);
	}
	renderCountdownView(orderDetailData) {
		if (orderDetailData.order_status_id == 2) {
			return <View style={styles.orderCountdownView}>
					<Text style={styles.orderCountdownBlackFont}>订单已取消</Text>
				</View>;
		} else if (orderDetailData.order_status_id == 1) {
			return <View style={styles.orderCountdownView}>
					<Text style={styles.orderCountdownBlackFont}>还剩</Text>
					<Text style={styles.orderCountdownRedFont}> 00:23:10无字段 </Text>
					<Text style={styles.orderCountdownBlackFont}>订单自动取消</Text>
				</View>;
		} else {
			let paidWay = orderDetailData.pay_id ? orderDetailData.pay_id == 4 ? '支付宝' : '微信支付' : '未知';
			return <View style={styles.orderCountdownView}>
					<Text style={styles.orderCountdownBlackFont}>支付方式：{paidWay}</Text>
				</View>;
		}
	}
	renderIdentityCardView(orderDetailData) {
		if (!(orderDetailData.consignee_idcard === '') && orderDetailData.consignee_idcard) {
			return <View style={styles.identityCardView}>
					<Text style={styles.identityCardFont}>身份证号码</Text>
					<Text style={styles.identityCardFont}>{orderDetailData.consignee_idcard}</Text>
				</View>;
		}
		return <View />;
	}
	renderWarehouseListView(goodsData) {
		let self = this;
		return goodsData.map(function (warehouseData, index) {
			return <View key={index} style={styles.warehouseList}>
						<View style={styles.warehouse}>
							<Text style={styles.warehouseFont}>{warehouseData.warehouse}</Text>
						</View>
						{self.renderGoodsListView(warehouseData.goodsList)}
					</View>;
		});
	}
	renderGoodsListView(goodsList) {
		let self = this;
		if (goodsList.length === 1) {
			let data = goodsList[0];
			return <View>
					{this.renderLastGoodsCell(data)}
				</View>;
		} else {
			let length = goodsList.length;
			let lastGoodsData = goodsList[length - 1];
			let datas = goodsList.splice(0, length - 1);
			return datas.map(function (data, index) {
				return <View key={index}>
							<GoodsCell goodsData={data} />
							{self.renderLastGoodsCell(data)}
						</View>;
			});
		}
	}
	renderLastGoodsCell(goodsData) {
		let urlObj = JSON.stringify(goodsData.imgobj);
		let url = urlObj.url ? urlObj.url : '';
		return <View style={styles.lastGoodsCell}>
				<View style={styles.orderLogisticsCell}>
					<Image style={styles.orderLogisticsImg} source = {
					 {
						uri: url
					}
				} />
					<Text style={styles.goodsTitle}>{goodsData.goods_name}</Text>
					<View style={styles.goodsTotal}>
						<Text style={styles.goodsCount}>{goodsData.goods_saleprice}</Text>
						<Text style={styles.goodsNum}>x{goodsData.goods_num}</Text>
					</View>
				</View>
				<Button style={styles.orderLogisticsBtn}>查看物流</Button>
			</View>;
	}
	renderFlowView(orderDetailData) {
		switch (orderDetailData.order_status_id) {
			case 1:
				return <View style={styles.flowView}>
					<Button style={styles.orderBtnBlack}>取消订单</Button>
					<Button style={styles.orderBtnRed}>立即付款</Button>
				</View>;
				break;
			case 3:case 4:
				return <View style={styles.flowView}>
					<Button style={styles.orderBtnRed}>提醒发货</Button>
				</View>;
				break;
			case 5:case 6:case 7:
				return <View style={styles.flowView}>
					<Button style={styles.orderBtnRed}>确认收货</Button>
				</View>;
				break;
			case 8:
				return <View style={styles.flowView}>
					<Button style={styles.orderBtnBlack}>删除订单</Button>
				</View>;
				break;
			default:
				return <View></View>;
		}
	}
	getAddress(orderDetailData) {
		let address = orderDetailData.ship_area.replace(/\|/g, '3') + orderDetailData.ship_address;
		return address;
	}
	hasDataRender() {
		const { userOrderDetailReducer } = this.props;
		let orderDetailData = userOrderDetailReducer.orderDetailData.data;
		let time = getLocalTime(orderDetailData.order_time);
		return <View style={styles.viewDirection}>
				<ScrollView style={styles.scrollView}>
				<View style={styles.orderInfo}>
					<Text style={styles.orderStatusFont}>{orderDetailData.order_status}</Text>
					<Text style={styles.orderStateFont}>订单编号：{orderDetailData.pay_no}</Text>
					<Text style={styles.orderTimeFont}>下单时间：{time}</Text>
					{this.renderCountdownView(orderDetailData)}
				</View>

				<View style={styles.orderAddressView}>
					<View style={styles.consumerView}>
						<Text style={styles.consumerFont}>{orderDetailData.consignee}</Text>
						<Text style={styles.consumerFont}>{orderDetailData.consignee_mobile}</Text>
					</View>
					<Text style={styles.addressFont}>{this.getAddress(orderDetailData)}</Text>
				</View>
				{this.renderIdentityCardView(orderDetailData)}

				{this.renderWarehouseListView(orderDetailData.good)}

				<View style={styles.priceView}>
					<View style={styles.costView}>
						<Text style={styles.identityCardFont}>商品总价</Text>
						<Text style={styles.identityCardFont}>{orderDetailData.order_cost}</Text>
					</View>
					<View style={styles.costView}>
						<Text style={styles.identityCardFont}>活动优惠</Text>
						<Text style={styles.identityCardFont}>???</Text>
					</View>
					<View style={styles.costView}>
						<Text style={styles.identityCardFont}>优惠券</Text>
						<Text style={styles.identityCardFont}>{orderDetailData.discount_total}</Text>
					</View>
					<View style={styles.costView}>
						<Text style={styles.identityCardFont}>运费</Text>
						<Text style={styles.identityCardFont}>{orderDetailData.ship_cost}</Text>
					</View>
					<View style={styles.costView}>
						<Text style={styles.identityCardFont}>税费</Text>
						<Text style={styles.identityCardFont}>{orderDetailData.tax_cost}</Text>
					</View>
					<View style={styles.costView}>
						<Text style={styles.identityCardFont}>总计</Text>
						<Text style={styles.identityCardFont}>{orderDetailData.item_cost}</Text>
					</View>
				</View>
				</ScrollView>
				{this.renderFlowView(orderDetailData)}
			</View>;
	}

	render() {
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
			hasData: orderDetailData
		};
		return <View style={styles.container}>
				{super.allSceneRender(headerParam, netRequestParam)}
      </View>;
	}
}
function getValue(state) {
	const { userOrderDetailReducer } = state;
	return {
		userOrderDetailReducer
	};
}
function changeOrderState(dispatch) {
	return bindActionCreators({
		queryUserOrderDetailData
	}, dispatch);
}

//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(getValue, changeOrderState)(OrderDetail);