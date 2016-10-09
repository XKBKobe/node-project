/*
 * Name: ChoosePayWay
 * Creator: ZhangZhao
 * Create Time: 2016-09-12
 * Instruction: 支付失败后重新选择支付方式界面
 */
import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import styles from '../styles/ChoosePayWay';
import { Actions } from 'react-native-router-flux';
import StringImgSrc from '../special/stringImage';
import { PayWayBar } from '../components/makeSureOrder/editBar';
import STRING_RESOURCE from '../../common/StringResource';
import { standardDialog } from '../components/Dialog';

export default class ChoosePayWay extends BaseComponent {
    constructor(props) {
        super(props);

        this.chooseAlipayHandle = this.chooseAlipayHandle.bind(this);
        this.chooseWechatHandle = this.chooseWechatHandle.bind(this);
        this.resumePay = this.resumePay.bind(this);
        this.confirmPay = this.confirmPay.bind(this);

        this.state = {
            isAlipayChoosed: true,
            isGiveUpDialogShow: false
        };
    }

    chooseAlipayHandle() {
        if (!this.state.isAlipayChoosed) {
            this.setState({
                isAlipayChoosed: !this.state.isAlipayChoosed
            });
        }
    }

    chooseWechatHandle() {
        if (this.state.isAlipayChoosed) {
            this.setState({
                isAlipayChoosed: !this.state.isAlipayChoosed
            });
        }
    }

    headerLeftRender() {
        return <View onClick={() => this.setState({ isGiveUpDialogShow: true })} style={styles.headerLeftView}>
                <Image style={styles.headerLeftArrowImg} source={StringImgSrc.imageUrls.ic_left_arrow} />
            </View>;
    }

    resumePay() {
        this.setState({
            isGiveUpDialogShow: false
        });
    }

    confirmPay() {
        var payWayUrl = '';

        if (this.state.isAlipayChoosed) {
            payWayUrl = 'http://v3.bestinfoods.com/malipay?orderId=' + this.props.orderSn;
        } else {
            payWayUrl = 'http://v3.bestinfoods.com/wechatpay?orderId=' + this.props.orderSn;
        }

        window.location.href = payWayUrl;
    }

    hasDataRender() {
        return <View style={styles.contentView}>
                <View style={styles.priceBarView}>
                    <Text style={styles.textStyle1}>¥{this.props.totalPrice}</Text>
                    <View style={styles.commitOrderBarView}>
                        <Image style={styles.imgStyle1} source={StringImgSrc.imageUrls.ic_checkbox_gr} />
                        <Text style={styles.textStyle2}>
                            {STRING_RESOURCE.orderHasBeenSubmit}
                        </Text>
                    </View>
                    <Text style={styles.textStyle3}>
                        {STRING_RESOURCE.pleaseFinishPaymentIn24Hours}
                    </Text>
                </View>
                <Text style={styles.textStyle4}>{STRING_RESOURCE.payWay}</Text>
                {PayWayBar(StringImgSrc.imageUrls.ic_alipay, STRING_RESOURCE.alipayPay, this.state.isAlipayChoosed, this.chooseAlipayHandle)}
                {PayWayBar(StringImgSrc.imageUrls.ic_wechat, STRING_RESOURCE.wechatPay, !this.state.isAlipayChoosed, this.chooseWechatHandle)}


                <Button style={styles.confirmButton} onPress={() => this.confirmPay()}>
                    {STRING_RESOURCE.confirmPay}
                </Button>

                {standardDialog(this.state.isGiveUpDialogShow, '订单已生成，真的不要了吗', '/shopCart', this.resumePay, '狠心放弃', '继续买买买')}
            </View>;
    }

    render() {
        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.confirmPayment,
            isBackShow: true
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