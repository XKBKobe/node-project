/**
 * author : jiao.shen
 * date : 2016-08-01
 * description : 首页
 */

'use strict';

import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../styles/homeStyle.js';
import { Actions } from 'react-native-router-flux';
import { fetchCategory, fetchActivity, fetchBanner, fetchGoodList, fetchRecommandGood } from '../../common/actions/homeAction';
import ThematicPoster from '../components/Home/homeThematicPoster';
import SinglePoster from '../components/Home/singlePoster';
import { homePressDown } from "../../common/actions/tabAction";
import { storageKeys, imageUrls } from '../special/stringImage.js';
import { PreLoadHomeBanner } from '../special/preloadingData';
import { isObjectValueEqual, getLocalTime } from '../../common/config/Tools.js';
import STRING_RESOURCE from '../../common/StringResource';
import ViewPager from "react-native-viewpager";

var loadStartTime = 0;
var loadEndTime = 0;
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banners: null,
			categorys: null,
			activitys: null,
			thematics: null,
			recommands: null,
			loading: true
		};
	}

	componentWillMount() {
		loadStartTime = new Date().getTime();
		//console.log("page load start time:"+ loadStartTime);

		this.getDataFromLocalStorage();
		this.getDataFromNetwork();
	}

	componentWillReceiveProps(nextProps) {
		//如果banner、category等值为空
		if (nextProps.bannerDatas && !isObjectValueEqual(this.state.banners, nextProps.bannerDatas)) {
			this.setState({ banners: nextProps.bannerDatas, loading: false });
			AsyncStorage.setItem(storageKeys.HOME_BANNER_KEY, JSON.stringify(nextProps.bannerDatas), error => {
				if (!error) return;
				console.log("AsyncStorage store home banner error: ", error.message);
			});
			//console.log("rerender banner data....");
		}
		if (nextProps.categoryDatas && !isObjectValueEqual(this.state.categorys, nextProps.categoryDatas)) {
			this.setState({ categorys: nextProps.categoryDatas, loading: false });
			AsyncStorage.setItem(storageKeys.HOME_CATEGORY_KEY, JSON.stringify(nextProps.categoryDatas), error => {
				if (!error) return;
				console.log("AsyncStorage store home category error: ", error.message);
			});
		}
		if (nextProps.goodsList && !isObjectValueEqual(this.state.thematics, nextProps.goodsList)) {
			this.setState({ thematics: nextProps.goodsList, loading: false });
			AsyncStorage.setItem(storageKeys.HOME_THEMATIC_KEY, JSON.stringify(nextProps.goodsList), error => {
				if (!error) return;
				console.log("AsyncStorage store home thematic error: ", error.message);
			});
		}
		if (nextProps.activityData && !isObjectValueEqual(this.state.activitys, nextProps.activityData)) {
			this.setState({ activitys: nextProps.activityData, loading: false });
			AsyncStorage.setItem(storageKeys.HOME_ACIVITY_KEY, JSON.stringify(nextProps.activityData), error => {
				if (!error) return;
				console.log("AsyncStorage store home activity error: ", error.message);
			});
		}
		if (nextProps.recommand && !isObjectValueEqual(this.state.recommands, nextProps.recommand)) {
			this.setState({ recommands: nextProps.recommand, loading: false });
			AsyncStorage.setItem(storageKeys.HOME_RECOMMAND_KEY, JSON.stringify(nextProps.recommand), error => {
				if (!error) return;
				console.log("AsyncStorage store home recommand error: ", error.message);
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (isObjectValueEqual(this.state.recommands, nextState.recommands) && isObjectValueEqual(nextState.thematics, this.state.thematics) && isObjectValueEqual(nextState.activitys, this.state.activitys) && isObjectValueEqual(nextState.categorys, this.state.categorys) && isObjectValueEqual(nextState.banners, this.state.banners)) return false;
		return true;
	}

	getDataFromLocalStorage() {
		AsyncStorage.getItem(storageKeys.HOME_BANNER_KEY, (error, result) => {
			if (error) {
				console.log("get banner data error:", error.message);return;
			}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({ banners: array, loading: false });
			//console.log("get local banner data....");
		});
		AsyncStorage.getItem(storageKeys.HOME_CATEGORY_KEY, (error, result) => {
			if (error) {
				console.log("get category data error:", error.message);return;
			}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({ categorys: array, loading: false });
		});
		AsyncStorage.getItem(storageKeys.HOME_ACIVITY_KEY, (error, result) => {
			if (error) {
				console.log("get activity data error:", error.message);return;
			}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({ activitys: array, loading: false });
		});
		AsyncStorage.getItem(storageKeys.HOME_THEMATIC_KEY, (error, result) => {
			if (error) {
				console.log("get thematic data error:", error.message);return;
			}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({ thematics: array, loading: false });
		});
		AsyncStorage.getItem(storageKeys.HOME_RECOMMAND_KEY, (error, result) => {
			if (error) {
				console.log("get recommand data error:", error.message);return;
			}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({ recommands: array, loading: false });
		});
	}

	getDataFromNetwork() {
		this.props.fetchBanner();
		this.props.fetchActivity();
		this.props.fetchCategory();
		this.props.fetchGoodList();
		this.props.fetchRecommandGood();
		this.props.homePressDown();
	}

	componentDidUpdate() {
		loadEndTime = new Date().getTime();
		//release模式下，log打在native
		//NSLogger.writeLogToDocument("load use: "+(loadEndTime-loadStartTime) + "ms");
		console.log("load use: " + (loadEndTime - loadStartTime) + "ms");
	}

	renderBannerRow(data, pageID) {
		let imgURL = data.ad_image.url;
		return <Image style={styles.activity_image} key={pageID} source = {
			 {
				uri: imgURL
			}
		} />;
	}

	renderBanners() {
		const banners = this.state.banners;
		if (!banners) {
			return <View></View>;
		}

		var bannerSource = new ViewPager.DataSource({
			pageHasChanged: (p1, p2) => p1 !== p2
		});

		bannerSource = bannerSource.cloneWithPages(banners);

		return <ViewPager dataSource={bannerSource} renderPage={this.renderBannerRow} autoPlay={true} isLoop={true} />;
	}

	renderCategorys() {
		const categorydata = this.state.categorys;
		if (!categorydata) {
			return;
		}

		return categorydata.categorys.map(function (item, i) {
			return <Button key={i} style={styles.category_item} onPress = {
				 () => Actions.searchModel({
					brandId: item.categoryId,
					categoryName: item.categoryName
				})
			}>
					<Text style={styles.category_text}>{item.categoryName}</Text>
				</Button>;
		});
	}

	renderSinglePoster() {
		const activitys = this.state.activitys;
		if (!activitys) {
			return <View></View>;
		}

		return activitys.map(function (item, i) {
			var datas = {
				goodImage: item.img_main.url,
				goodName: item.name,
				goodIcon: item.img_flag.url,
				activityId: item.id
			};
			return <SinglePoster {...datas} key={i} />;
		});
	}

	renderGoodsSegment(rowData, sectionID, rowID) {
		return <View style={styles.segemnt_bar}>
				<Button onPress = {
				 () => Actions.GoodsDetailModel({
					goodsId: rowData.goodsId
				})
			}>
					<Image source = {
					 {
						uri: rowData.goodsImages
					}
				} style={styles.goodImage} />
				</Button>
				<View style={styles.bottom_segment}>
					<Text style={styles.good_title}>{rowData.goodsName}</Text>
					<View style={styles.price_bar}>
						<Text style={styles.good_price}>{'¥' + rowData.goodsSalePrice}</Text>
						<Text style={styles.good_oldprice}>{'¥' + rowData.goodsMsrp}</Text>
					</View>
				</View>
			</View>;
	}

	renderGoodSement() {
		return goodsData.map(function (rowData, index) {
			return <View style={styles.segemnt_bar} key={index}>
					<Image source = {
					 {
						uri: rowData.img
					}
				} style={styles.goodImage} />
					<View style={styles.bottom_segment}>
						<Text style={styles.good_title}>{rowData.name}</Text>
						<View style={styles.price_bar}>
							<Text style={styles.good_price}>{'¥' + rowData.price}</Text>
							<Text style={styles.good_oldprice}>{'¥' + rowData.oldPrice}</Text>
						</View>
					</View>
				</View>;
		});
	}

	renderRow(rowData, sectionID, rowID) {
		return <ThematicPoster thematicData={rowData} />;
	}

	renderThematic() {
		const thematic = this.state.thematics;
		if (!thematic) {
			return <View></View>;
		}

		return thematic.map(function (rowData, index) {
			return <ThematicPoster thematicData={rowData} key={index} />;
		});
	}

	renderRecommand() {
		if (!this.state.recommands) {
			return <View></View>;
		};
		var goodSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		goodSource = goodSource.cloneWithRows(this.state.recommands);
		return <ListView contentContainerStyle={styles.goodListContainer} contentContainerStyle={styles.goodListContainer} renderRow={this.renderGoodsSegment} dataSource={goodSource} />;
	}

	render() {
		//显示加载界面
		if (this.state.loading) {
			return <View style={styles.contentView}>
                	<Image style={styles.loadingImage} source={imageUrls.loading} />
                	<Text style={styles.loadingText}>
                    	{STRING_RESOURCE.isLoadingWaitMinute}
                	</Text>
            	</View>;
		}

		return <View style={styles.boss_div}>
				<View style={styles.navigationBar}>
					<Button onPress = {
					 Actions.SearchKeyWordsModel
				}>
					<View style={styles.search_nav}>
						<Image source = {
							 require("../../common/images/ic_search@2x.png")
						} style={styles.search_Image} />
					</View>
					</Button>
					<Button onPress = {
					 Actions.settingModel
				}>
						<Image source = {
						 require("../../common/images/ic_message@2x.png")
					} style={styles.category_img} />
					</Button>
				</View>

				<ScrollView style={styles.scrollView}>
					<View style={styles.container}>
					  	{this.renderBanners()}
						<View style={styles.graydiv}></View>
						<View style={styles.categorys_div}>
							{this.renderCategorys()}
						</View>

      					{this.renderThematic()}
						{this.renderSinglePoster()}
						{this.renderRecommand()}
					</View>
				</ScrollView>
			</View>;
	}
}

function mapStateToProps(state) {
	return {
		categoryDatas: state.homeReducer.categoryDatas,
		bannerDatas: state.homeReducer.bannerDatas,
		goodsList: state.homeReducer.goodsList,
		recommand: state.homeReducer.recommandDatas,
		activityData: state.homeReducer.activitys
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchCategory,
		fetchActivity,
		fetchBanner,
		fetchGoodList,
		fetchRecommandGood,
		homePressDown
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);