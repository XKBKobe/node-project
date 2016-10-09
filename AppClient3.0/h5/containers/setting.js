/*
 * 用户中心
 */

import React , { Component } from 'react';
import styles from '../styles/settingStyle';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Order from '../components/order';
import {imageUrls} from '../special/stringImage';
import { myOrderStateHandle } from '../../common/actions/userAction';
import { settingPressDown } from "../../common/actions/tabAction";
import { queryUserOrderData } from '../../common/actions/User_OrderActions';
import { COOKIE_KEY_LOGINSTATUS , getCookie } from '../../common/config/cookieOperate';

class Setting extends Component {
	constructor(props) {
		super(props);

		this.gotoTargetPageOrLoginPage = this.gotoTargetPageOrLoginPage.bind(this);
	}

	componentDidMount() {
		this.props.tabAction();
		this.props.userOrderReducer.selected = null;//订单界面做了状态判断
	}
	//判断是否登录
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

	render () {
		var profile = imageUrls.profile_login;

		if (2 == getCookie(COOKIE_KEY_LOGINSTATUS)) {
			profile = imageUrls.profile_logined;
		}

		return (
			<div style = {styles.container} >
				<scrollView>
					<div style = { styles.userHeader } >
						<img style = { styles.userBgImg } src = {imageUrls.bg_my} />
						<div style = { styles.userInfo } >
							<img style = { styles.userLogo } onClick = { () => this.isLogin() } src = {profile} />
						</div>
						<Link to = '/user_setting' >
							<img style = { styles.userSettingImg } src = {imageUrls.ic_setting} />
						</Link>
					</div>

					<div  onClick = {() => this.gotoTargetPageOrLoginPage('/UserOrder',{handleId: '0'}) }>
						<div style = { styles.userOrder } >
						<p style = { styles.myOrder } >我的订单</p>
						<div style = { styles.orderAll } >
							<p style = { styles.checkOrder } >查看所有订单</p>
							<img style = { styles.arrowRight } src = {imageUrls.ic_right_arrow} />
						</div>
						</div>
					</div>

					<div style = { styles.orderItem } >
						<Order
							src = "common/images/icon_un_payment.png"
							tip = "待付款"
							actions={() => this.gotoTargetPageOrLoginPage('/UserOrder',{handleId: '1'}) }
						/>

						<Order
							src = "common/images/icon_un_deliver.png"
							tip = "待发货"
							actions={() => this.gotoTargetPageOrLoginPage('/UserOrder',{handleId: '2'}) }
						/>

						<Order
							src = "common/images/icon_un_receive.png"
							tip = "待收货"
							actions={() => this.gotoTargetPageOrLoginPage('/UserOrder',{handleId: '3'}) }
						/>

						<Order
							src = "common/images/icon_un_comment.png"
							tip = "待评价"
							actions={() => this.gotoTargetPageOrLoginPage('/UserOrder',{handleId: '4'}) }
						/>
					</div>
					<div style = { styles.userListItems } >

							<div
								style = { styles.userListItem }
								onClick = {() => this.gotoTargetPageOrLoginPage('/CouponList')}
							>
								<p style = { styles.myOrder } >我的优惠券</p>
								<img style = { styles.arrowRight } src ={imageUrls.ic_right_arrow} />
							</div>

							<div
								style = { styles.userListItem }
								onClick = {() => this.gotoTargetPageOrLoginPage('/AddressList')}
							>
								<p style = { styles.myOrder } >我的收货地址</p>
								<img style = { styles.arrowRight } src ={imageUrls.ic_right_arrow} />
							</div>

							<Link
								style = { styles.userListItem }
								to = '/userCollection'
							>
								<p style = { styles.myOrder } >我的收藏</p>
								<img style = { styles.arrowRight } src = {imageUrls.ic_right_arrow} />
							</Link>
					</div>

					<div style = { styles.service } >
						<p style = { styles.myOrder } >源品客服</p>
						<img style = { styles.arrowRight } src = {imageUrls.ic_right_arrow} />
					</div>
				</scrollView>
			</div>
		)
	}

	isLogin (){
		if (getCookie(COOKIE_KEY_LOGINSTATUS) == 2) {
			return false;
		}else{
			window.location.href = "#/login";
		}
	}
};

function mapStateToProps(state){
	const { userOrderReducer } = state;

	return {
		userOrderReducer,
	}
}

function mapDispatchToProps(dispatch){
	return {
		tabAction : bindActionCreators(settingPressDown, dispatch),
		// bindActionCreators({},dispatch)
	}
}
//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
