/*
*订单商品评价列表
*/
import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from '../../baseComponent';
import styles from '../../../styles/user/User_OrderCommentListStyle';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { queryUserOrderCommentList } from '../../../../common/actions/User_orderActions';

class CommentList extends BaseComponent {
  constructor(props) {
    super(props);

    this.renderCommentGoodsCell = this.renderCommentGoodsCell.bind(this);
    this.renderCommentGoodsList = this.renderCommentGoodsList.bind(this);
    this.renderCommentBtn = this.renderCommentBtn.bind(this);
  }

  componentDidMount() {
    let orderId = this.props.orderId;
    this.props.queryUserOrderCommentList(orderId);
  }
  //待评价商品cell
  renderCommentGoodsCell() {
    return <View style={styles.list}>
        <View style={styles.orderCommentCell}>
  				<Image style={styles.orderCommentImg} src="" />
          <Text style={styles.goodsTitle}>fafafafdweacEfFSACXZC</Text>
          <View style={styles.goodsTotal}>
            <Text style={styles.goodsCount}>2.00</Text>
            <Text style={styles.goodsNum}>x2</Text>
          </View>
        </View>
        <Button style={styles.orderCommentBtn}>评价晒单</Button>
      </View>;
  }
  //评价按钮
  renderCommentBtn(isCommented, index) {
    if (isCommented) {
      return <Button style={styles.orderCommentBtn}>
          <Text style={styles.commentBtnFont}>已评价</Text>
        </Button>;
    } else {
      return <Button onPress = {
         () => Actions.UserOrderCommmentModel({
          flag: index
        })
      } style={styles.orderUncommentBtn}>
          <Text style={styles.commentBtnFont}>评价晒单</Text>
        </Button>;
    }
  }
  //
  renderCommentGoodsList(listData) {
    let self = this;
    return listData.map(function (data, index) {
      let url = data.good_img ? data.good_img.url : '';
      let isCommented = data.commented ? true : false;
      return <View key={index} style={styles.list}>
            <View style={styles.orderCommentCell}>
      				<Image style={styles.orderCommentImg} source = {
             {
              uri: url
            }
          } />
              <Text style={styles.goodsTitle}>{data.goods_name}</Text>
              <View style={styles.goodsTotal}>
                <Text style={styles.goodsCount}>{data.goods_saleprice}</Text>
                <Text style={styles.goodsNum}>{data.goods_num}</Text>
              </View>
            </View>
            {self.renderCommentBtn(isCommented, index)}
          </View>;
    });
  }
  hasDataRender() {
    let orderCommentData = this.props.userOrderCommentlistReducer.orderCommentListData.data.goodList;
    return <View style={styles.goodsListView}>
        {this.renderCommentGoodsList(orderCommentData)}
      </View>;
  }

  render() {
    const { userOrderCommentlistReducer } = this.props;
    let orderCommentData = userOrderCommentlistReducer.orderCommentListData ? userOrderCommentlistReducer.orderCommentListData.data.goodList.length : null;

    let headerParam = {
      isHeaderShow: true,
      headerName: '评价晒单',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: false,
      isDataRequestSucc: true,
      hasData: orderCommentData
    };
    return <View style={styles.container}>
				{super.allSceneRender(headerParam, netRequestParam)}
      </View>;
  }
}

function mapStateToProps(state) {
  const { userOrderCommentlistReducer } = state;
  return {
    userOrderCommentlistReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    queryUserOrderCommentList
  }, dispatch);
}

//将state和dispatch映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);