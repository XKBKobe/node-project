/*
 * Name: Cart
 * Creator: ZhangZhao
 * Create Time:
 * Instruction: 主界面购物车页面
 */
import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import styles from '../styles/cart';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shoppingCartActions from '../../common/actions/shoppingCartActions';
import Special from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';
import { homePressDown } from '../../common/actions/tabAction';

const TAG = 'Cart.js';

class Cart extends BaseComponent {
	constructor(props) {
		super(props);

		this.hasDataRender = this.hasDataRender.bind(this);
		this.noDataRender = this.noDataRender.bind(this);

		this.wareHouseRender = this.wareHouseRender.bind(this);
		this.activityRender = this.activityRender.bind(this);
		this.goodsListRender = this.goodsListRender.bind(this);
		this.activityBarRender = this.activityBarRender.bind(this);
		this.invalidGoodsBarRender = this.invalidGoodsBarRender.bind(this);
		this.invalidGoodsRender = this.invalidGoodsRender.bind(this);
		this.editOrIntroBoxRender = this.editOrIntroBoxRender.bind(this);
		this.footerBarRender = this.footerBarRender.bind(this);

		this.deleteIconRender = this.deleteIconRender.bind(this);
		this.settlementButtonRender = this.settlementButtonRender.bind(this);
		this.wareHouseWarningRender = this.wareHouseWarningRender.bind(this);

		this.state = {
			isFinishEdit: true,
			warningStyle: 1
		};
	}

	componentWillMount() {
		this.props.shoppingCartActions.queryShoppingCartData();
	}

	wareHouseWarningRender(showModel) {
		if (2 === showModel) {
			if (2 === this.state.warningStyle) {
				return <View style={styles.moneyExceedDiv}>
						<Image style={styles.warningImage} source={Special.imageUrls.money_exceed_warning} />
					</View>;
			} else {
				return <View style={styles.moneyExceedDiv}>
						<Image style={styles.warningImage} source={Special.imageUrls.money_exceed_prompt} />
					</View>;
			}
		}
	}

	wareHouseRender() {
		const allListData = this.props.shoppingCartState.shoppingCartData.data.whGoods;
		var checkState = 0;

		return allListData.map((whouseData, index) => {
			const activityListData = whouseData.activityGoods;

			this.props.shoppingCartState.checkState.wareHouseCheckStateList.map((wareHouseCheck, indexW) => {
				if (wareHouseCheck.wareHouseName === whouseData.whName) {
					checkState = wareHouseCheck.wareHouseCheckState;
				}
			});

			return <View style={styles.cartItem} key={index}>
					<View style={styles.shopping}>
						<Image onClick={() => this.props.shoppingCartActions.wareHouseCheckBoxClicked(whouseData.whName)} style={styles.checked} source={checkState ? Special.imageUrls.ic_checkbox_org : Special.imageUrls.ic_checkbox_null} />
						<Text style={styles.warehouse}>{whouseData.whName}</Text>
					</View>

					{this.activityRender(activityListData)}

					<View style={styles.warehouseMsg}>
						<View style={styles.wareHouseFooterLeftView}>
							<Text style={styles.cartTotalLeft}>{STRING_RESOURCE.wareHouseTaxation}</Text>
							<Text style={styles.warehouseMsgItem}>{STRING_RESOURCE.activityDiscount}</Text>
							<Text style={styles.warehouseMsgItem}>{STRING_RESOURCE.wareHouseTotalExTax}</Text>
						</View>
						<View style={styles.wareHouseFooterRightView}>
							<Text style={styles.textStyle1}>¥{whouseData.taxMoney}</Text>
							<Text style={styles.textStyle2}>-¥{whouseData.cutMoney}</Text>
							<Text style={styles.textStyle2}>¥{whouseData.payMoney}</Text>
						</View>
					</View>

					{this.wareHouseWarningRender(whouseData.isWarning)}
				</View>;
		});
	}

	activityBarRender(isShow, name, rule) {
		if (isShow) {
			return <View style={styles.activityBarDiv}>
					<View style={styles.activityCategoryDiv}>
						<Text style={styles.activityCategoryP}>{name}</Text>
					</View>
					<Text style={styles.activityIntroP}>{rule}</Text>
				</View>;
		}
	}

	activityRender(activityListData) {
		return activityListData.map((activityData, index) => {
			const goodsListData = activityData.goodsList;

			return <View key={index} style={styles.activityContentView}>
					{this.activityBarRender(activityData.activityId, activityData.activityName, activityData.activityRule)}
					{this.goodsListRender(goodsListData)}
				</View>;
		});
	}

	editOrIntroBoxRender(isFinishEdit, goodsData) {
		if (isFinishEdit) {
			return <Button onPress = {
				 () => Actions.GoodsDetailModel({
					goodsId: goodsData.goodsId
				})
			}>
					<Text style={styles.goodIntro}>
						{goodsData.goodsName}
					</Text>
				</Button>;
		} else {
			return <View style={styles.editBarDiv}>
					<View style={styles.editBoxDiv} onClick={() => this.props.shoppingCartActions.amountMinusClicked(goodsData.goodsId, goodsData.amount)}>
						<Text style={styles.cartTotalLeft}>-</Text>
					</View>
					<View style={styles.editNumBoxDiv}>
						<Text style={styles.cartTotalLeft}>{goodsData.amount}</Text>
					</View>
					<View style={styles.editBoxDiv} onClick={() => this.props.shoppingCartActions.amountPlusClicked(goodsData.goodsId, goodsData.amount)}>
						<Text style={styles.cartTotalLeft}>+</Text>
					</View>
				</View>;
		}
	}

	deleteIconRender(goodsId) {
		if (!this.state.isFinishEdit) {
			return <Image onClick={() => this.props.shoppingCartActions.deleteGoods(goodsId)} style={styles.deleteIconImg} source={Special.imageUrls.ic_dustbin} />;
		}
	}

	goodsListRender(goodsListData) {
		var checkState = 0;

		return goodsListData.map((goodsData, index) => {
			this.props.shoppingCartState.checkState.wareHouseCheckStateList.map((wareHouseCheck, indexW) => {
				wareHouseCheck.goodsCheckStateList.map((goodsCheck, indexG) => {
					if (goodsCheck.goodsId === goodsData.goodsId) {
						checkState = goodsCheck.goodsCheckState;
					}
				});
			});

			return <View style={styles.shopContent} key={index}>
					<View style={styles.goodCheckDiv}>
						<Image onClick={() => this.props.shoppingCartActions.goodsCheckBoxClicked(goodsData.goodsId)} source={checkState ? Special.imageUrls.ic_checkbox_org : Special.imageUrls.ic_checkbox_null} style={styles.goodCheckImg} />
					</View>



					<View style={styles.goodImgDiv}>
						<Button onPress = {
						 () => Actions.GoodsDetailModel({
							goodsId: goodsData.goodsId
						})
					}>
							<View style={styles.goodBorderDiv}>
								<Image source = {
								 {
									uri: goodsData.imgobj.url
								}
							} style={styles.goodImg} />
							</View>
						</Button>
					</View>



					<View style={styles.goodMsgDiv}>

						{this.editOrIntroBoxRender(this.state.isFinishEdit, goodsData)}

						<View style={styles.goodPriceAmountDiv}>
							<Text style={styles.goodPrice}>¥{goodsData.goodsSalePrice}</Text>
							<Text style={styles.goodAmount}>x{goodsData.amount}</Text>
							{this.deleteIconRender(goodsData.goodsId)}
						</View>

					</View>

				</View>;
		});
	}

	invalidGoodsBarRender() {
		if (!this.props.shoppingCartState.shoppingCartData.data.invalidGoods) {
			return;
		}

		return <View style={styles.uselessContentDiv}>
				{this.invalidGoodsRender()}
				<View style={styles.clearUselessColumn}>
					<View onClick={() => this.props.shoppingCartActions.clearInvalidGoods()} style={styles.uselessClearButtonDiv}>
						<Text style={styles.cartTotalLeft}>{STRING_RESOURCE.emptyInvalidGoods}</Text>
					</View>
				</View>
			</View>;
	}

	invalidGoodsRender() {
		const uselessGoods = this.props.shoppingCartState.shoppingCartData.data.invalidGoods;

		return uselessGoods.map((invalidGoodsData, index) => {
			return <View style={styles.uselessGoodsBarDiv} key={index}>
					<View style={styles.goodCheckDiv}>
						<View style={styles.uselessBoxDiv}>
							<Text style={styles.cartTotalLeft}>{STRING_RESOURCE.invalid}</Text>
						</View>
					</View>

					<View style={styles.goodImgDiv}>
						<Image source = {
						 {
							uri: invalidGoodsData.imgobj.url
						}
					} style={styles.goodImg} />
					</View>

					<View style={styles.goodMsgDiv}>
						<Text style={styles.goodIntro}>
							{invalidGoodsData.goodsName}
						</Text>

						<Text style={styles.uselessGoodPrice}>¥{invalidGoodsData.goodsSalePrice}</Text>
					</View>
				</View>;
		});
	}

	settlementButtonRender() {
		if (0 !== this.props.shoppingCartState.shoppingCartData.data.checkedGood) {
			var warehouseExceedPrice = false;

			this.props.shoppingCartState.shoppingCartData.data.whGoods.map((warehouseData, indexW) => {
				if (2 === warehouseData.isWarning) {
					warehouseExceedPrice = true;
				}
			});

			if (warehouseExceedPrice) {
				return <View style={styles.settleWrap} onClick={() => this.setState({
					warningStyle: 2
				})}>
						<Text style={styles.settleInfo}>{STRING_RESOURCE.settlement}</Text>
					</View>;
			} else {
				return <Button style={styles.settleWrap} onPress = {
					 () => Actions.makeSureOrderModel({})
				}>
						<Text style={styles.settleInfo}>{STRING_RESOURCE.settlement}</Text>
					</Button>;
			}
		} else {
			return <View style={styles.settleWrap} onClick={() => alert('请选择商品')}>
					<Text style={styles.settleInfo}>{STRING_RESOURCE.settlement}</Text>
				</View>;
		}
	}

	footerBarRender() {
		if (0 !== this.props.shoppingCartState.shoppingCartData.data.whGoods.length) {
			let checkState = this.props.shoppingCartState.checkState.allCheckState;

			return <View style={styles.cartAccount}>
					<View style={styles.accountLeft}>
						<View style={styles.checkAll}>
							<Image onClick={() => this.props.shoppingCartActions.checkAllCheckBoxClicked(checkState)} style={styles.checked} source={checkState ? Special.imageUrls.ic_checkbox_org : Special.imageUrls.ic_checkbox_null} />
							<Text style={styles.warehouse}>{STRING_RESOURCE.checkAll}</Text>
						</View>

						<View style={styles.cartTotal}>
							<View style={styles.cartTotalBox}>
								<Text style={styles.cartTotalLeft}>{STRING_RESOURCE.summation}</Text>
								<Text style={styles.cartTotalRight}>
									¥ {this.props.shoppingCartState.shoppingCartData.data.allPayMoney}
								</Text>
							</View>
							<Text style={styles.cartTotalRate}>
								{STRING_RESOURCE.includeTaxation}{this.props.shoppingCartState.shoppingCartData.data.allTaxMoney}{STRING_RESOURCE.excludeFreight}
							</Text>
						</View>
					</View>

					{this.settlementButtonRender()}
				</View>;
		}
	}

	noDataRender() {
		return <View style={styles.noDataContentView}>

				<Image style={styles.noDataImg} source={Special.imageUrls.bg_shoppingcart_null} />
				<Text style={styles.noDataText}>
					{STRING_RESOURCE.shoppingCartNull}
				</Text>
				<Button onPress = {
				 homeModel
			} onPress={() => this.props.goShoppingActions()} style={styles.goShoppingButtonView}>
					<Text style={styles.warehouse}>
						{STRING_RESOURCE.goShopping}
					</Text>
				</Button>
			</View>;
	}

	hasDataRender() {
		return <View style={styles.cartItems}>
				<ScrollView style={styles.scrollView}>
					{this.wareHouseRender()}
					{this.invalidGoodsBarRender()}
				</ScrollView>
				{this.footerBarRender()}
			</View>;
	}

	headerRightRender() {
		let editOrFinishText = this.state.isFinishEdit ? STRING_RESOURCE.edit : STRING_RESOURCE.finish;

		return <View onClick={() => this.setState({ isFinishEdit: !this.state.isFinishEdit })} style={styles.headerRightView}>
				<Text style={styles.edit}>{editOrFinishText}</Text>
			</View>;
	}

	render() {
		const { shoppingCartState, shoppingCartActions } = this.props;
		let hasData = false;

		if (null !== shoppingCartState.shoppingCartData && 0 !== shoppingCartState.shoppingCartData.data.length) {
			if (0 !== shoppingCartState.shoppingCartData.data.whGoods.length || 0 !== shoppingCartState.shoppingCartData.data.invalidGoods.length) {
				hasData = true;
			}
		}

		var headerParam = {
			isHeaderShow: true,
			headerName: STRING_RESOURCE.shoppingCart,
			isBackShow: false
		};

		var netRequestParam = {
			isRequesting: shoppingCartState.dataRequesting,
			isDataRequestSucc: shoppingCartState.isDataRequestSucc,
			hasData: hasData,
			isDialogLoading: shoppingCartState.loadingData
		};

		return super.allSceneRender(headerParam, netRequestParam);
	}
}

function mapStateToProps(state) {
	const { shoppingCartState } = state;
	return {
		shoppingCartState
	};
}

function mapDispatchToProps(dispatch) {
	return {
		shoppingCartActions: bindActionCreators(shoppingCartActions, dispatch),
		goShoppingActions: bindActionCreators(homePressDown, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);