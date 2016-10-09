/*
**我的收藏
*罗晓锋
 */
import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { queryUserCollectionData } from '../../common/actions/User_collectionAction';
import styles from '../styles/User_collectionStyle';
import { imageUrls } from "../special/stringImage";

class UserCollection extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalPage: 1,
      isRefresh: true, //是否需要加载刷新
      collectionData: null
    };
    this.hasDataRender = this.hasDataRender.bind(this);
    this.renderListView = this.renderListView.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.unique = this.unique.bind(this);
  }

  componentWillMount() {
    this.state.currentPage = 1;
  }
  componentDidMount() {
    let page = this.state.currentPage;
    this.props.queryUserCollectionData(page);
  }
  loadMoreData() {
    if (this.state.isRefresh) {
      this.state.currentPage = this.state.currentPage + 1;
      if (this.state.currentPage <= this.state.totalPage) {
        this.state.isRefresh = false;
        this.props.queryUserCollectionData(this.state.currentPage);
      }
    } else {
      return null;
    }
  }
  //排除相同数组
  unique(arr) {
    var result = [],
        isRepeated;
    var result = [],
        hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem.goodsId]) {
        result.push(elem);
        hash[elem.goodsId] = true;
      }
    }
    return result;
  }
  hasDataRender() {
    const { userCollectionReducer } = this.props;
    this.state.totalPage = userCollectionReducer.collectionData.data.totalPage;
    let netCurrentPage = parseInt(userCollectionReducer.collectionData.data.currentPage);
    // console.log(this.state.currentPage,netCurrentPage,this.state.currentPage);
    if (this.state.currentPage == netCurrentPage && this.state.currentPage <= this.state.totalPage) {
      var collectionData;
      if (!this.state.isRefresh) {
        this.state.isRefresh = true;
        this.state.collectionData = this.state.collectionData.concat(userCollectionReducer.collectionData.data.goods);
        collectionData = this.unique(this.state.collectionData);
      } else {
        this.state.collectionData = userCollectionReducer.collectionData.data.goods;
        collectionData = this.state.collectionData;
      }
      return <View style={styles.listView}>
          {this.renderListView(collectionData)}
        </View>;
    } else {
      return <View style={styles.listView}>
          无数据
        </View>;
    }
  }
  noDataRender() {
    return <View style={styles.noDataContainer}>
				<Image style={styles.noDataImgView} source={imageUrls.noCollectionHint} />
				<Text style={styles.noDataTipFont}>您还没有任何收藏的商品~</Text>
				<Button style={styles.noDataBtn}>去逛逛</Button>
			</View>;
  }
  renderListView(collectionData) {
    return collectionData.map((data, index) => {
      return <View key={index}>
            {this.renderItem(data)}
          </View>;
    });
  }
  renderItem(data) {
    let url = data.imgMain ? data.imgMain.url : '';
    if (data.sale === 1) {
      if (data.stock >= 1) {
        return <Button onPress = {
           () => Actions.GoodsDetailModel({
            goodsId: data.goodsId
          })
        }>
          <View style={styles.goodsItem}>
            <Image style={styles.goodsImg} source = {
               {
                uri: url
              }
            } />
            <Text style={styles.goodsName}>{data.goodsName}</Text>
            <View style={styles.speView}></View>
            <View style={styles.priceView}>
              <Text style={styles.price}>{data.goodsSalePrice}</Text>
              <Text style={styles.delPrice}>{data.goodsMsrp}</Text>
            </View>
          </View>
          </Button>;
      } else {
        return <View style={styles.goodsItem}>
            <Image style={styles.goodsImg} source = {
             {
              uri: url
            }
          } />
            <View style={styles.overflowView}>
              <Text style={styles.goodsState}>已抢光</Text>
            </View>
            <Text style={styles.goodsName}>{data.goodsName}</Text>
            <View style={styles.priceView}>
              <Text style={styles.price}>{data.goodsSalePrice}</Text>
              <Text style={styles.delPrice}>{data.goodsMsrp}</Text>
            </View>
          </View>;
      }
    } else {
      return <View style={styles.goodsItem}>
          <Image style={styles.goodsImg} source = {
           {
            uri: url
          }
        } />
          <View style={styles.overflowView}>
            <Text style={styles.goodsState}>已下架</Text>
          </View>
          <Text style={styles.goodsName}>{data.goodsName}</Text>
          <View style={styles.priceView}>
            <Text style={styles.price}>{data.goodsSalePrice}</Text>
            <Text style={styles.delPrice}>{data.goodsMsrp}</Text>
          </View>
        </View>;
    }
  }
  render() {
    const { userCollectionReducer } = this.props;
    let collectionData = userCollectionReducer.collectionData ? userCollectionReducer.collectionData.data.goods.length : userCollectionReducer.collectionData;
    let headerParam = {
      isHeaderShow: true,
      headerName: '我的收藏',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: userCollectionReducer.dataRequesting,
      isDataRequestSucc: userCollectionReducer.isDataRequestSucc,
      hasData: collectionData
    };
    console.log(netRequestParam);
    return <View style={styles.container}>
				{super.allSceneRender(headerParam, netRequestParam)}
      </View>;
  }
}

function getValue(state) {
  const { userCollectionReducer } = state;
  return {
    userCollectionReducer
  };
}
function changeOrderState(dispatch) {
  return bindActionCreators({
    queryUserCollectionData
  }, dispatch);
}

//将state的指定值射在props上，将action的所有方法映射在props上
export default connect(getValue, changeOrderState)(UserCollection);