/*
*订单评价
*/
import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from '../../baseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../../../styles/user/User_orderCommentStyle';
// import { myOrderStateHandle, orderDetailDataHandle } from '../../../../common/actions/userAction';
// import { queryUserOrderData } from '../../../../common/actions/User_orderActions';
// import { SegmentBar, OrderList } from './MyOrderContainer';
import { Actions } from 'react-native-router-flux';

class CommentView extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      starts: [1, 1, 1, 1, 1],
      goodsImgs: [],
      mark: 5,
      message: '123'
    };
    this.renderStartView = this.renderStartView.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
    this.renderGoodsImgView = this.renderGoodsImgView.bind(this);
  }
  //星星界面
  renderStartView() {
    for (var i = 5; i > this.state.mark; i--) {
      this.state.starts[i - 1] = 0;
    }
    return this.state.starts.map((select, index) => {
      let url = select ? 'common/images/star_select.png' : 'common/images/star_unSelect.png';
      let start = index + 1;
      return <Button key={index} style={styles.starView} onPress={() => this.setState({ mark: start, starts: [1, 1, 1, 1, 1] })}>
            <Image style={styles.startImg} source = {
           {
            uri: url
          }
        } />
          </Button>;
    });
  }
  //渲染nav右侧按钮
  headerRightRender() {
    return <Button style={styles.navRightView}>
          <Text style={styles.submitFont}>提交</Text>
        </Button>;
  }
  //
  changeComponent(change) {
    this.state.message = change.nativeEvent.text;
  }
  //
  renderGoodsImgView() {
    if (this.state.goodsImgs.length >= 1) {
      return this.state.goodsImgs.map(function (img, index) {
        return <View></View>;
      });
    } else {
      return <View></View>;
    }
  }
  //
  hasDataRender() {
    const { userOrderCommentlistReducer } = this.props;
    let index = this.props.flag;
    let goodsData = userOrderCommentlistReducer.orderCommentListData.data.goodList[index];
    console.log(goodsData);
    let url = goodsData.good_img ? goodsData.good_img.url : '';
    console.log(url);
    return <View style={styles.commentView}>
        <View style={styles.markView}>
          <Image style={styles.goodsImg} source = {
           {
            uri: url
          }
        } />
          <Text style={styles.markFont}>评分：</Text>
          {this.renderStartView()}
        </View>
        <View style={styles.ideaView}>
          <textarea style={styles.ideaInput} onChange={e => this.changeComponent(e)} placeholder=" 写下购买体会和使用感受来帮助其他小伙伴~" />
        </View>
        <Text style={styles.brefs}>有图有真相，给小伙伴们晒一晒~</Text>
        <View style={styles.goodsImgsView}>
          {this.renderGoodsImgView()}
        </View>
      </View>;
  }

  render() {
    // const { userOrderDetailReducer } = this.props;
    // let orderDetailData = userOrderDetailReducer.orderDetailData;

    let headerParam = {
      isHeaderShow: true,
      headerName: '评价晒单',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: false,
      isDataRequestSucc: true,
      hasData: true
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
  return bindActionCreators({}, dispatch);
}

//将state和dispatch映射在props上
export default connect(mapStateToProps, mapDispatchToProps)(CommentView);