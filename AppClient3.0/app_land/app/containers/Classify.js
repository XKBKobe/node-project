//商品分类  lxf

import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import styles from '../styles/classifyStyles';
import { Actions } from 'react-native-router-flux';
import Special from '../special/stringImage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { queryClassifyData } from '../../common/actions/ClassifyActions';
import { sendMessageHandle } from '../../common/actions/sendMessageActions';
import { classifyPressDown } from "../../common/actions/tabAction";
import merge from 'lodash/merge';

class Classify extends BaseComponent {
	constructor(props) {
		super(props);

		this.renderTypesList = this.renderTypesList.bind(this);
		this.renderBrandsList = this.renderBrandsList.bind(this);
		this.renderGlobalList = this.renderGlobalList.bind(this);
		this.hasDataRender = this.hasDataRender.bind(this);
		this.renderClassAList = this.renderClassAList.bind(this);
		this.renderClassBList = this.renderClassBList.bind(this);
	}

	componentWillMount() {
		this.props.queryClassifyData();
		this.props.classifyPressDown();
	}

	componentDidMount() {}
	//商品类型
	renderTypesList(typeData) {
		let self = this;
		return typeData.map(function (typeCellData, index) {
			return <View key={index}>
						{self.renderClassAList(typeCellData)}
					</View>;
		});
	}
	//商品一级类目list
	renderClassAList(typeCellData) {
		let self = this;
		return <View style={styles.goodsTypeItem}>
				<Button onPress = {
				 () => Actions.searchModel({
					brandId: typeCellData.categoryId
				})
			} onPress={() => self.props.sendMessageHandle(typeCellData.categoryName)}>
					<View style={styles.typeHeader}>
						<Text style={styles.typeFont}>{typeCellData.categoryName}</Text>
						<Text style={styles.typeContent}>全部</Text>
						<Image style={styles.goRightImg} source={Special.imageUrls.ic_right_arrow} />
					</View>
				</Button>
				<View style={styles.typeView}>{self.renderClassBList(typeCellData.childs)}</View>
			</View>;
	}
	//商品二级类目list
	renderClassBList(typesData) {
		let self = this;
		return typesData.map(function (typeData, index) {
			let url = typeData.imgMain ? typeData.imgMain.url : '';
			return <Button key={index} onPress = {
				 () => Actions.searchModel({
					brandId: typeData.categoryId
				})
			} onPress={() => self.props.sendMessageHandle(typeData.categoryName)}>
						<View style={styles.typeInfo}>
							<Text style={styles.typeTitle}>{typeData.categoryName}</Text>
							<Image style={styles.typeImg} source = {
						 {
							uri: url
						}
					} />
						</View>
					</Button>;
		});
	}
	//推荐品牌
	renderBrandsList(brandsData) {
		let self = this;
		return brandsData.map(function (brandData, index) {
			return <Button key={index} onPress = {
				 () => Actions.brandModel({})
			} onPress={() => self.props.sendMessageHandle(brandData.brandName)}>
						<View style={styles.brandsView}>
							<Image style={styles.brandsImg} resizeMode="contain" source = {
						 {
							uri: brandData.imgLogo.url
						}
					} />
						</View>
					</Button>;
		});
	}
	//全球必买
	renderGlobalList(countries) {
		let self = this;
		return countries.map(function (country, index) {
			return <Button key={index} onPress = {
				 () => Actions.searchModel({
					countryId: country.countryId
				})
			} onPress={() => self.props.sendMessageHandle(country.pavilionName)}>
						<View style={styles.infoOutView} key={index}>
							<Text style={styles.globalCountry}>{country.pavilionName}</Text>
							<Text style={styles.globalCountryEng}>{country.countryNameEn}</Text>
							<Image style={styles.infoInsideImg} resizeMode="contain" source = {
						 {
							uri: country.imgMain.url
						}
					} />
						</View>
					</Button>;
		});
	}
	//有数据
	hasDataRender() {
		const { ClassifyReducer } = this.props;
		let classifyData = ClassifyReducer.data.classifyData.data.categorys;
		let recommendedBrandData = ClassifyReducer.data.recommendedBrandData.data;
		let globalBuyData = ClassifyReducer.data.globalBuyData.data.pavilions;

		if (!classifyData || !recommendedBrandData || !globalBuyData) {
			return <View>无数据</View>;
		}
		return <View style={styles.viewDirection}>
				<ScrollView style={styles.scrollView}>
					{this.renderTypesList(classifyData)}

					<View style={styles.brandsHeader}>
						<Text style={styles.brandsTitle}>推荐品牌</Text>
					</View>
					<View style={styles.typeView}>
						{this.renderBrandsList(recommendedBrandData)}
					</View>

					<View style={styles.global}>
						<Text style={styles.globalTitle}>全球必买</Text>
					</View>
					<View style={styles.typeView}>
						{this.renderGlobalList(globalBuyData)}
					</View>
				</ScrollView>
			</View>;
	}

	render() {
		const { ClassifyReducer } = this.props;
		var headerParam = {
			isHeaderShow: false,
			headerName: '分类',
			isBackShow: false
		};
		var netRequestParam = {
			isRequesting: ClassifyReducer.dataRequesting,
			isDataRequestSucc: ClassifyReducer.isDataRequestSucc,
			hasData: ClassifyReducer.data
		};
		return <View style={styles.container}>
				<View style={styles.searchBar}>
					<Button to={"/SearchKeyWords"} style={styles.searchView}>
						<Image style={styles.searchImg} source = {
						 require("../../common/images/ic_search@3x.png")
					} />
					</Button>
					<Button onPress = {
					 () => Actions.ZtestPageModel({
						id: 23
					})
				} style={styles.messageLink}>
						<Image style={styles.messageImg} source = {
						 require("../../common/images/ic_message@3x.png")
					} />
					</Button>
				</View>
				{super.allSceneRender(headerParam, netRequestParam)}
			</View>;
	}
}

function mapStateToProps(state) {
	const { ClassifyReducer } = state;
	return {
		ClassifyReducer
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		queryClassifyData,
		classifyPressDown,
		sendMessageHandle
	}, dispatch);
}

//将state和dispatch映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(Classify);