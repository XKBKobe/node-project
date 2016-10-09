/**
 * Created by zhangheng on 2016/8/20.
 * 确认订单界面 选择优惠券
 */

import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from './baseComponent';
import * as couponExchangeActions from '../../common/actions/couponExchangeActions';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/addressListStyles";
import footStyles from "../styles/couponListStyles";
import confirmStyles from "../styles/confirmOrderAddressStyles";
import conCouponStyles from "../styles/confirmOrderCouponStyles";
import STRING_RESOURCE from '../../common/StringResource';
import { imageUrls } from '../special/stringImage';

class ConfirmOrderCoupon extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            couponCode: "",
            couponList: [],
            isDefault: false,
            couponShow: true
        };
    }

    //render之前 获取props
    componentWillReceiveProps(nextProps) {

        var dataList = this.state.couponList;

        if (nextProps.couponInfoState.isDataRequestSucc) {
            if (nextProps.couponInfoState.couponInfoData) {
                if (nextProps.couponInfoState.couponInfoData.errorcode == 0) {

                    dataList.splice(0, 0, nextProps.couponInfoState.couponInfoData.data);
                    alert("兑换成功");
                } else {
                    //二次兑换  或 兑换失败 或 不适用此订单  提示语
                    alert(nextProps.couponListState.couponInfoData.message);
                }
            } else {
                //数据请求失败
                alert("数据请求失败，请稍候重试");
            }
        }

        if (nextProps.couponListData && this.state.couponCode == null) {
            if (!nextProps.couponListData[0].name.indexOf("不使用") > 0) {
                dataList = nextProps.couponListData;
            } else {
                alert("暂无可用优惠券");
            }
        }

        this.setState({
            couponList: dataList
        });
    }

    //页面销毁
    componentWillUnmount() {
        this.props.couponInfoState.couponInfoData = null;
    }

    handleChange(event) {
        this.setState({ couponCode: event.nativeEvent.text });
    }

    //提交券码 兌換优惠券
    submitCouponCode() {

        if (this.state.couponCode) {
            var obj = {
                copuon: this.state.couponCode,
                mobile: 15868130813
            };
            this.props.couponExchangeActions.couponExchangeData(obj);
        } else {
            alert("请输入优惠券码");
        }
    }

    //不使用优惠券
    unSelectCoupon() {
        browserHistory.goBack();
    }

    //选中一项
    singleSelect(couponId) {

        this.props.couponExchangeActions.sendCouponData(couponId);
        browserHistory.goBack();
    }

    //优惠券列表
    enableUseList() {

        var _this = this;
        if (this.state.couponList) {
            return <ScrollView style={styles.scrollView}>
                     <View style={conCouponStyles.couponList_D}>
                     {this.state.couponList.map(function (couponItem, index) {

                        return <View style={conCouponStyles.couponItemOrderRow_D} key={index} onClick={() => _this.singleSelect(couponItem.id)}>
                                 <Image source = {
                                 require("../../common/images/orderCoupon_used.png")
                            } style={conCouponStyles.couponItemOrderImg_I} />
                                 <View style={conCouponStyles.couponValueStyleNew_D}>
                                     <View style={conCouponStyles.couponValueStyle_D}>
                                         <Text style={footStyles.couponItemRight_P}>
                                             {couponItem.valueMoney}
                                         </Text>
                                         <Text style={footStyles.couponValue_P}>元</Text>
                                     </View>
                                     <Text style={footStyles.couponValueNew_P}>{couponItem.condition}</Text>
                                 </View>

                                 <View style={conCouponStyles.couponItemOrder_D}>
                                     <Text style={footStyles.couponItemFirstText_D}>{couponItem.describe}</Text>
                                     <Text style={footStyles.couponItemSecond_D}>{couponItem.conditionProduct}</Text>
                                     <View style={footStyles.couponItemThird_D}>
                                         <Text style={footStyles.couponItemSecond_D}>{STRING_RESOURCE.couponValueTime}</Text>
                                         <Text style={footStyles.couponItemSecond_D}>{couponItem.beginTime}-</Text>
                                         <Text style={footStyles.couponItemSecond_D}>{couponItem.endTime}</Text>
                                     </View>
                                 </View>

                                 <View style={conCouponStyles.checkStyle_D}>
                                     <Image source={_this.state.isDefault ? imageUrls.addressDetail : imageUrls.addressDetailDown} style={conCouponStyles.checkImg_I} />
                                 </View>
                             </View>;
                    })}
                 </View>
                     <Text style={conCouponStyles.noUsedCoupon_P} onClick={() => this.unSelectCoupon()}>有钱任性，不使用优惠劵</Text>

                 </ScrollView>;
        } else {
            return <View style={conCouponStyles.unUsedCoupon}>
                     <Text style={conCouponStyles.noUsedCoupon_P} onClick={() => this.unSelectCoupon()}>有钱任性，不使用优惠劵</Text>
                 </View>;
        }
    }

    //展示数据
    hasDataRender() {

        return <View style={styles.bgColor}>

                <View style={conCouponStyles.line_D}></View>
                <View style={conCouponStyles.tabLine}></View>

                <View style={conCouponStyles.exchangeCoupon_D}>
                    {/*<p style={conCouponStyles.exchangeCouponText_P}>兑换优惠券</p>*/}
                    <TextInput placeholder={STRING_RESOURCE.couponCodeHint} style={conCouponStyles.exchangeCouponInput_I} value={this.state.couponCode} onChange={this.handleChange.bind(this)} />
                    <Text style={conCouponStyles.exchangeCou_P} onClick={() => this.submitCouponCode()}>{STRING_RESOURCE.couponExchange}</Text>
                </View>

                {this.enableUseList()}

                {/*<scrollView style={styles.scrollView} >*/}

                    {/*{this.enableUseList()}*/}
                    {/*<p style={conCouponStyles.noUsedCoupon_P}*/}
                       {/*onClick={()=> this.unSelectCoupon()}>有钱任性，不使用优惠劵</p>*/}
                {/*</scrollView>*/}
            </View>;
    }

    render() {

        const { couponInfoState, couponExchangeActions, couponListData } = this.props;

        var couponList = [];
        if (this.props.couponListData) {
            couponList = this.props.couponListData;
        } else {
            couponList = null;
        }

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.couponListTitle,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: false, //couponInfoState.dataRequesting
            isDataRequestSucc: true, //couponInfoState.isDataRequestSucc
            hasData: couponList //couponInfoState.couponInfoData
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}

function mapStateToPropsTe(state) {
    const { couponInfoState, makeSureOrderState } = state;
    return {
        couponInfoState,
        couponListData: makeSureOrderState.couponData
    };
}

function mapDispatchToPropsTe(dispatch) {
    return {
        couponExchangeActions: bindActionCreators(couponExchangeActions, dispatch)
    };
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(ConfirmOrderCoupon);