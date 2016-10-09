import React, { Component } from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from '../../baseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import styles from '../../../styles/user/orderStyle';
import { queryUserOrderData } from '../../../../common/actions/User_orderActions';
import { Actions } from 'react-native-router-flux';

class SuccessfulTrade extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let headerParam = {
      isHeaderShow: true,
      headerName: '交易成功',
      isBackShow: true
    };
    let netRequestParam = {
      isRequesting: userOrderReducer.dataRequesting,
      isDataRequestSucc: userOrderReducer.isDataRequestSucc,
      hasData: true
    };
    return <View style={styles.container}>
				{super.allSceneRender(headerParam, netRequestParam)}
      </View>;
  }
}