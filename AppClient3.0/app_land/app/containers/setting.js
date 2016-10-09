/*
 * 用户中心
 */

import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import styles from '../styles/settingStyle';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Order from '../components/order';
import { listItem, imageUrls } from '../special/stringImage';
import { myOrderStateHandle } from '../../common/actions/userAction';
import { settingPressDown } from "../../common/actions/tabAction";
import { queryUserOrderData } from '../../common/actions/User_OrderActions';

class Setting extends Component {
	listItemRender() {
		return listItem.map(function (data, index) {
			return <Button key={index} onPress={Actions[data.link]}>
					<View style={styles.userListItem}>
						<Text style={styles.myOrder}>{data.tip}</Text>
						<Image style={styles.arrowRight} source={imageUrls.ic_right_arrow} />
					</View>
				</Button>;
		});
	}

	componentDidMount() {
		this.props.tabAction();
		this.props.userOrderReducer.selected = null; //订单界面做了状态判断
	}

	render() {
		return <View style={styles.container}>
				<ScrollView>
					<View style={styles.userHeader}>
						<Image style={styles.userBgImg} source={imageUrls.bg_my} />
						<View style={styles.userInfo}>
							<Button onPress = {
							 Actions.loginModel
						}>
								<Image style={styles.userLogo} source = {
								 require("../../common/images/default_profile.jpg")
							} />
							</Button>
						</View>
						<Button onPress = {
						 Actions.user_settingModel
					}>
							<Image style={styles.userSettingImg} source={imageUrls.ic_setting} />
						</Button>
					</View>

					<Button onPress = {
					 () => Actions.UserOrderModel({
						handleId: 0
					})
				}>
						<View style={styles.userOrder}>
						<Text style={styles.myOrder}>我的订单</Text>
						<View style={styles.orderAll}>
							<Text style={styles.checkOrder}>查看所有订单</Text>
							<Image style={styles.arrowRight} source = {
								 require("../../common/images/icon_right_arrow.png")
							} />
						</View>
						</View>
					</Button>

					<View style={styles.orderItem}>
						<Order src = {
						 require("../../common/images/icon_un_payment.png")
					} tip="待付款" handleId={'1'} />

						<Order src = {
						 require("../../common/images/icon_un_deliver.png")
					} tip="待发货" handleId={'2'} />

						<Order src = {
						 require("../../common/images/icon_un_receive.png")
					} tip="待收货" handleId={'3'} />

						<Order src = {
						 require("../../common/images/icon_un_comment.png")
					} tip="待评价" handleId={'4'} />
					</View>
					<View style={styles.userListItems}>
						{this.listItemRender()}
					</View>

					<View style={styles.service}>
						<Text style={styles.myOrder}>源品客服</Text>
						<Image style={styles.arrowRight} source = {
						 require("../../common/images/icon_right_arrow.png")
					} />
					</View>
				</ScrollView>
			</View>;
	}
};

function mapStateToProps(state) {
	const { userOrderReducer } = state;
	return {
		userOrderReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		tabAction: bindActionCreators(settingPressDown, dispatch)
	};
}
//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(Setting);