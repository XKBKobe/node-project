/*
 * Name: PaymentSuccess
 * Creator: ZhangZhao
 * Create Time: 2016-09-12
 * Instruction: 支付成功后页面
 */

import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import styles from '../styles/PaymentSuccess';
import StringImgSrc from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';
import { Actions } from 'react-native-router-flux';

export default class PaymentSuccess extends BaseComponent {
    constructor(props) {
        super(props);
    }

    hasDataRender() {
        return <View style={styles.contentView}>
                <Image style={styles.imageStyle1} source={StringImgSrc.imageUrls.ic_payment_success} />
                <Text style={styles.textStyle1}>
                    {STRING_RESOURCE.paymentSuccess}
                </Text>
                <View style={styles.barView1}>
                    <Text style={styles.textStyle2}>{STRING_RESOURCE.amountPaid}</Text>
                    <Text style={styles.textStyle3}>¥ xxx.xx</Text>
                </View>
                <View style={styles.barView2}>
                    <Text style={styles.textStyle2}>{STRING_RESOURCE.payWayDot}</Text>
                    <Text style={styles.textStyle3}>支付宝支付</Text>
                </View>

                <View style={styles.barView1}>
                    <Button to={'/UserOrder'}>
                        <Button style={styles.buttonStyle}>
                            {STRING_RESOURCE.checkOrders}
                        </Button>
                    </Button>

                    <View style={{ width: '0.6rem' }} />

                    <Button to={'/'}>
                        <Button style={styles.buttonStyle}>
                            {STRING_RESOURCE.backToHome}
                        </Button>
                    </Button>
                </View>
            </View>;
    }

    render() {
        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.paymentSuccess,
            isBackShow: false
        };

        var netRequestParam = {
            isRequesting: false,
            isDataRequestSucc: true,
            hasData: true,
            isDialogLoading: false
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}