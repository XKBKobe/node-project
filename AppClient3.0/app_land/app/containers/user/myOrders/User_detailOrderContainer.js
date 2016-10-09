/*订单详情*/
import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import styles from '../../../styles/user/orderStyle';

export class GoodsCell extends Component {
	render() {
		const { goodsData } = this.props;
		let urlObj = JSON.stringify(goodsData.imgobj);
		let url = urlObj.url ? urlObj.url : '';
		return <View style={styles.goodsCell}>
				<Image style={styles.goodsImg} source = {
				 {
					uri: url
				}
			} />
				<Text style={styles.goodsTitle}>{goodsData.goods_name}</Text>
				<View style={styles.goodsTotal}>
					<Text style={styles.goodsCount}>{goodsData.goods_saleprice}</Text>
					<Text style={styles.goodsNum}>x{goodsData.goods_num}</Text>
				</View>
			</View>;
	}
}