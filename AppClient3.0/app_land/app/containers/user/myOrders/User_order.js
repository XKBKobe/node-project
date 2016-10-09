/*订单*/
import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from '../../baseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../../../styles/user/orderStyle';
import { queryUserOrderData, queryCancelOrder, queryDeleteOrder, queryConfirmOrder } from '../../../../common/actions/User_orderActions';
// import { SegmentBar, OrderList } from './MyOrderContainer';
import { Actions } from 'react-native-router-flux';
import { imageUrls } from "../../../special/stringImage";
import { getLocalTime, getOrderStatus } from '../../../../common/config/Tools';
import { PayWayBar } from '../../../components/makeSureOrder/editBar';

class MyOrder extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			isLoadmore: true, //是否加载更多
			currentPage: 1,
			totalPage: 1,
			is_require: [false, false, false, false, false],
			isAlipayChoosed: true, //是否支付宝支付
			isPaidViewShow: false };
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
	}
	componentDidMount() {
		this.state.currentPage = 1;
		document.body.scrollTop = 86;
		const { userOrderReducer } = this.props;
		let selected = userOrderReducer.selected;
		let handleId = selected ? selected : this.props.handleId;
		this.props.queryUserOrderData(handleId);
	}
	//渲染按钮栏
	renderSegmentBar(selected) {
		return <View style={styles.segmentBar}>
				{this.btnBarAction(selected)}
			</View>;
	}
	//按钮栏按钮
	renderCollectBtn(title, selected, index) {
		if (selected) {
			return <Button style={styles.btnActionView}>
  					<View style={styles.btnDiv}>
  						<Text style={styles.collect}>{title}</Text>
  						<View style={styles.line} />
  					</View>
  				</Button>;
		} else {
			return <Button style={styles.btnActionView} onPress={() => this.repeatLoadData(index.toString())}>
  					<Text style={styles.uncollect}>{title}</Text>
  				</Button>;
		}
	}
	btnBarAction(selected) {
		let titles = [{ title: "全部" }, { title: "待付款" }, { title: "待发货" }, { title: "待收货" }, { title: "待评价" }];
		let btnState = [false, false, false, false, false];
		let flag = parseInt(selected);
		btnState[flag] = true;
		return titles.map((data, index) => {
			return <View key={index} style={styles.btnView}>
            {this.renderCollectBtn(data.title, btnState[index], index)}
          </View>;
		});
	}
	//渲染订单列表
	renderOrderListView(orderData) {
		return <View style={styles.list}>
				{this.renderOrderList(orderData)}
			</View>;
	}
	//订单界面排序
	renderOrderList(orderData) {
		return orderData.map((data, index) => {
			return <View key={index} style={styles.list}>
						{this.renderOrderHeaderCell(data)}
						{this.renderGoodsListView(data)}
						{this.renderOrderFooterCell(data, index)}
					</View>;
		});
	}
	//订单头部cell
	renderOrderHeaderCell(data) {
		let time = getLocalTime(data.order_time);
		let status = getOrderStatus(data.order_status_id);
		return <View style={styles.orderHeader}>
				<Text style={styles.orderHeaderSN}>{time}</Text>
				<Text style={styles.orderHeaderState}>{status}</Text>
			</View>;
	}
	//取消订单
	cancelOrderAction(orderId, index) {
		this.props.queryCancelOrder(this.props.userOrderReducer.selected, orderId);
	}
	//删除订单
	deleteOrderAction(orderId) {
		this.props.queryDeleteOrder(this.props.userOrderReducer.selected, orderId);
	}
	//确认收货
	confirmOrderAction() {
		this.props.queryConfirmOrder(this.props.userOrderReducer.selected, orderId);
	}
	//订单尾部cell
	renderOrderFooterCell(orderData, index) {
		return <View style={styles.orderFooter}>
  			<View style={styles.orderFooterGoods}>
  				<Text style={styles.orderFooterFont}>共{orderData.goodsNum}件商品 应付总额：</Text>
          <Text style={styles.orderFooterAcount}>￥{orderData.order_cost}</Text>
        </View>
        {this.renderOrderFooterBtn(orderData, index)}
      </View>;
	}
	renderOrderFooterBtn(orderData, index) {
		switch (orderData.order_status_id) {
			case 1:
				return <View style={styles.orderFooterBtnView}>
            <Button style={styles.orderFooterBtnBlack} onPress={() => this.cancelOrderAction(orderData.order_id, index)}>
              <Text style={styles.blackBtnFont}>取消订单</Text>
            </Button>
            <Button style={styles.orderFooterBtnRed} onPress={() => this.setState({ isPaidViewShow: !this.state.isPaidViewShow, isLoadmore: false })}>
              <Text style={styles.redBtnFont}>立即付款</Text>
            </Button>
          </View>;
				break;
			case 3:case 4:
				return <View style={styles.orderFooterBtnView}>
              <Button style={styles.orderFooterBtnRed} onPress={() => alert('提醒发货')}>
                <Text style={styles.redBtnFont}>提醒发货</Text>
              </Button>
            </View>;
				break;
			case 5:case 6:case 7:
				return <View style={styles.orderFooterBtnView}>
                <Button onPress = {
						 Actions.UserOrderCommmentModel
					} style={styles.orderFooterBtnBlack}>
                  <Text style={styles.blackBtnFont}>查看物流</Text>
                </Button>
                <Button style={styles.orderFooterBtnRed}>
                  <Text style={styles.redBtnFont}>确认收货</Text>
                </Button>
              </View>;
				break;
			case 8:
				return <View style={styles.orderFooterBtnView}>
                <Button onPress = {
						 () => Actions.UserOrderCommmentListModel({
							orderId: orderData.order_id
						})
					} style={styles.orderFooterBtnRed}>
                  <Text style={styles.redBtnFont}>评价订单</Text>
                </Button>
              </View>;
			default:
				return <View style={styles.orderFooterBtnView}>
            <Button style={styles.orderFooterBtnBlack} onPress={() => this.deleteOrderAction(orderData.order_id)}>
              <Text style={styles.blackBtnFont}>删除订单</Text>
            </Button>
          </View>;
		}
	}
	//渲染商品列表
	renderGoodsListView(data) {
		return <Button onPress = {
			 () => Actions.UserDetailOrderModel({
				orderId: data.order_id
			})
		} style={styles.list}>
				{this.renderGoodsList(data.order_goods_list)}
			</Button>;
	}
	//商品列表排序
	renderGoodsList(goodsData) {
		return goodsData.map(function (data, index) {
			let url = data.imgobj ? data.imgobj.url : '';
			return <View key={index} style={styles.goodsCell}>
    				<Image style={styles.goodsImg} source = {
					 {
						uri: url
					}
				} />
            <Text style={styles.goodsTitle}>{data.goods_name}</Text>
            <View style={styles.goodsTotal}>
              <Text style={styles.goodsCount}>{data.goods_saleprice}</Text>
              <Text style={styles.goodsNum}>x{data.goods_num}</Text>
            </View>
          </View>;
		});
	}
	//立即购买
	renderPaidView() {
		if (this.state.isPaidViewShow) {
			return <View>
					<View style={styles.toastView}>
					</View>

					<View style={styles.directPaidView}>
						<View style={styles.directPaidAmount}>
							<Text style={styles.paidStyle}>支付方式</Text>
							<Text style={styles.directPaidPriceFont}>￥111.11</Text>
							<Button style={styles.alertDelView} onPress={() => this.setState({ isPaidViewShow: !this.state.isPaidViewShow, isLoadmore: false })}>
								<Image style={styles.alertDelImg} source = {
								 require("../../common/images/ico_goodsDetailDel.png")
							} />
							</Button>
						</View>

						{PayWayBar(imageUrls.ic_alipay, '支付宝支付', this.state.isAlipayChoosed, this.chooseAlipayHandle)}
						{PayWayBar(imageUrls.ic_wechat, '微信支付', !this.state.isAlipayChoosed, this.chooseWechatHandle)}

						<View style={styles.directPaidBtnView}>
							<Button style={styles.directPaidBtn}>
								<Text style={styles.paidFont}>确认购买</Text>
							</Button>
						</View>
					</View>
				</View>;
		} else {
			return <View></View>;
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
		var result = [],
		    isRepeated;
		var result = [],
		    hash = {};
		for (var i = 0, elem; (elem = arr[i]) != null; i++) {
			if (!hash[elem.order_id]) {
				result.push(elem);
				hash[elem.order_id] = true;
			}
		}
		return result;
	}
	loadMoreData() {
		if (this.state.isLoadmore && !this.state.isPaidViewShow) {
			this.state.currentPage = this.state.currentPage + 1;
			if (this.state.currentPage <= this.state.totalPage) {
				this.state.isLoadmore = false;
				const { userOrderReducer } = this.props;
				let selected = userOrderReducer.selected;
				let handleId = selected ? selected : this.props.handleId;
				this.props.queryUserOrderData(handleId, this.state.currentPage);
			} else {
				this.state.currentPage = this.state.totalPage;
			}
		} else {
			return null;
		}
	}
	hasDataRender() {
		const { userOrderReducer } = this.props;
		this.state.currentPage = userOrderReducer.cancel ? 1 : this.state.currentPage;
		userOrderReducer.cancel = false;
		let newOrderData = userOrderReducer.orderData.data;
		let allOrderData = userOrderReducer.orderlist;
		this.state.totalPage = newOrderData.totalPage;
		let netCurrentPage = newOrderData.currentPage;
		if (this.state.currentPage == netCurrentPage && this.state.currentPage <= this.state.totalPage) {
			if (!this.state.isLoadmore) {
				this.state.isLoadmore = true;
				allOrderData = allOrderData.concat(newOrderData.orderlist);
				allOrderData = this.unique(allOrderData);
			} else {
				allOrderData = newOrderData.orderlist;
			}
			userOrderReducer.orderlist = allOrderData;
			return <View style={styles.viewDirection}>
					<ScrollView style={styles.scrollView}>
						{this.renderOrderListView(userOrderReducer.orderlist)}
					</ScrollView>
					{this.renderPaidView()}
				</View>;
		} else {
			return <View style={styles.viewDirection}>
					{this.noDataRender()}
				</View>;
		}
	}
	noDataRender() {
		return <View style={styles.noDataContainer}>
				<Image style={styles.noDataImgView} source={imageUrls.icoOrderNoData} />
				<Text style={styles.noDataTipFont}>啊哦，您还没有任何订单哦！</Text>
				<Button style={styles.noDataBtn}>去逛逛</Button>
			</View>;
	}
	repeatLoadData(selected) {
		this.state.isPaidViewShow = false;
		this.state.currentPage = 1;
		this.state.orderData = null;
		this.state.totalOrderData = null;
		document.body.scrollTop = 0;
		this.props.queryUserOrderData(selected);
	}
	render() {
		const { userOrderReducer } = this.props;
		let selected = userOrderReducer.selected;
		// switch (selected) {
		// 	case '0':
		// 		this.state.orderData = userOrderReducer.myAllOrderData?userOrderReducer.myAllOrderData.data:null;
		// 		break;
		// 	case '1':
		// 		this.state.orderData = userOrderReducer.waitPaidOrderData?userOrderReducer.waitPaidOrderData.data:null;
		// 		break;
		// 	case '2':
		// 		this.state.orderData = userOrderReducer.waitSendOrderData?userOrderReducer.waitSendOrderData.data:null;
		// 		break;
		// 	case '3':
		// 		this.state.orderData = userOrderReducer.waitReceiveOrderData?userOrderReducer.waitReceiveOrderData.data:null;
		// 		break;
		// 	case '4':
		// 		this.state.orderData = userOrderReducer.waitCommentOrderData?userOrderReducer.waitCommentOrderData.data:null;
		// 		break;
		// 	default:
		// 		this.state.orderData = null;
		// 		break;
		// }
		// let isUpdate = this.state.orderData&&this.state.orderData.orderlist ? true : false ;

		let headerParam = {
			isHeaderShow: true,
			headerName: '我的订单',
			isBackShow: true
		};
		let netRequestParam = {
			isRequesting: userOrderReducer.dataRequesting,
			isDataRequestSucc: userOrderReducer.isDataRequestSucc,
			hasData: userOrderReducer.orderData
		};
		return <View style={styles.container}>
				{this.renderSegmentBar(selected)}
				{super.allSceneRender(headerParam, netRequestParam)}
      </View>;
	}
}

function getValue(state) {
	const { userOrderReducer } = state;
	return {
		userOrderReducer
	};
}
function changeOrderState(dispatch) {
	return bindActionCreators({
		queryUserOrderData,
		queryCancelOrder,
		queryDeleteOrder,
		queryConfirmOrder
	}, dispatch);
}

//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(getValue, changeOrderState)(MyOrder);