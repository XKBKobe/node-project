/**
 * Created by zhangheng on 2016/8/3.
 * 个人中心  优惠券列表
 */

import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from './baseComponent';
import * as couponListActions from '../../common/actions/couponListActions';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/addressListStyles";
import TopTabView from "../components/topTabView";
import footStyles from "../styles/couponListStyles";
import STRING_RESOURCE from '../../common/StringResource';
import conCouponStyles from "../styles/confirmOrderCouponStyles";

var listText = ["未使用", "已使用", "已过期"];
var listItemState = [{ textColor: "#FF6700", bgColor: "#FF6700" }, { textColor: "#333333", bgColor: "#ffffff" }, { textColor: "#333333", bgColor: "#ffffff" }];

class CouponList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isTrue: false,
            isShow: false,
            couponCode: null,
            couponList: null
        };

        this.submitCouponCodeTouch = this.submitCouponCodeTouch.bind(this);
    }

    //userId 待定
    //请求  status=1(可用) =2(已使用) =3(已过期)
    componentWillMount() {

        var obj = {
            userId: 1,
            type: 1,
            status: 1
        };
        this.props.couponListActions.queryCouponListData(obj);
    }

    //render之前 获取props
    componentWillReceiveProps(nextProps) {

        if (nextProps.couponListState.isDataRequestSucc) {
            if (nextProps.couponListState.couponListData.data.length > 0) {
                this.setState({
                    couponList: nextProps.couponListState.couponListData.data,
                    isTrue: false
                });
            } else {
                //响应成功 没有数据
                this.setState({
                    couponList: null,
                    isTrue: true
                });
            }

            //兑换成功
            if (nextProps.couponListState.couponInfoData && this.state.couponCode == null) {
                if (nextProps.couponListState.couponInfoData.errorcode == 0) {

                    if (this.state.couponList[0].status == 1) {
                        this.state.couponList.splice(0, 0, nextProps.couponListState.couponInfoData.data);
                    }
                    alert("兑换成功");
                } else {
                    //二次兑换  或 兑换失败   提示语
                    alert(nextProps.couponListState.couponInfoData.message);
                }
            }
        } else {
            //数据请求失败
            alert("数据请求失败，请稍候重试");
        }
    }

    submitCouponCodeTouch() {
        this.setState({
            isShow: true
        });
    }

    //券码  兌換优惠券
    handleChange(event) {
        this.setState({ couponCode: event.nativeEvent.text });
    }

    //弹框
    submitCouponCode() {
        return <View>
                <View style={footStyles.exchangeBombBoxBg_D} />

                <View style={footStyles.exchangeBombBox_D}>
                    <Text style={footStyles.exchangeCodeTitle}>请输入优惠券码</Text>
                    <TextInput style={footStyles.couponCodeInput_In} value={this.state.couponCode} onChange={this.handleChange.bind(this)} />
                    <View style={footStyles.bottomStyles_D}>
                        <Button style={footStyles.buttonStyle_B} onPress={() => this.onClickButton(2)}>取消</Button>
                        <View style={footStyles.columnLin_D}></View>
                        <Button style={footStyles.buttonStyle_B} onPress={() => this.onClickButton(1)}>确定</Button>
                    </View>
                </View>
            </View>;
    }

    //确定 取消
    onClickButton(type) {

        switch (type) {
            case 1:
                //提交券码
                var obj;
                if (this.state.couponCode) {
                    obj = {
                        copuon: this.state.couponCode,
                        mobile: 15868130813
                    };
                    this.props.couponListActions.exchangeCouponData(obj);
                    this.setState({
                        isShow: false,
                        couponCode: null
                    });
                } else {
                    alert("请输入优惠券码");
                }
                break;
            case 2:
                //取消 不兑换
                this.setState({
                    isShow: false,
                    couponCode: null
                });
                break;
        }
    }

    //选项栏 选中第几个tan
    chooseItem(index) {

        switch (index) {
            case 0:
                //可使用
                var obj = {
                    userId: 1,
                    type: 1,
                    status: 1
                };
                this.props.couponListActions.queryCouponListData(obj);
                break;
            case 1:
                //已使用
                var obj = {
                    userId: 1,
                    type: 1,
                    status: 2
                };
                this.props.couponListActions.queryCouponListData(obj);
                break;
            case 2:
                //已过期
                var obj = {
                    userId: 1,
                    type: 1,
                    status: 3
                };
                this.props.couponListActions.queryCouponListData(obj);
                break;
        }
    }

    //格式时间
    formatDate(now) {

        var dataTime = new Date(now);
        var year = dataTime.getFullYear();
        var month = dataTime.getMonth() + 1;
        var date = dataTime.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        return year + "." + month + "." + date;
    }

    //导航栏
    tabColumn() {
        return <View style={footStyles.wholeHintStyle}>
                <View style={footStyles.line_D}></View>
                <View style={footStyles.topTab_D}>
                    <View style={footStyles.tabLine}></View>
                    <TopTabView listItem={listItemState} list={listText} updateItemChoosen={index => this.chooseItem(index)} />
                </View>
            </View>;
    }

    //没点击兑换之前
    beforeCode() {
        return <View></View>;
    }

    //导航栏 右边按钮
    headerRightRender() {
        return <Text style={styles.addressDetailSave_P} onClick={() => this.submitCouponCodeTouch()}>{STRING_RESOURCE.couponExchange}</Text>;
    }

    //没有数据
    emptyList() {
        return <View style={footStyles.contentView}>
             <Text>没有数据~</Text>
         </View>;
    }

    //有数据 优惠券列表
    couponListView() {
        var _this = this;
        return <ScrollView style={styles.scrollViewCoupon}>
                 <View style={footStyles.couponList_D}>
                     {this.state.couponList.map(function (couponItem, index) {

                    var star_time = _this.formatDate(couponItem.star_time * 1000);
                    var end_time = _this.formatDate(couponItem.end_time * 1000);

                    return <View style={footStyles.couponItemRow_D} key={index}>

                                 <Image source = {
                             require("../../common/images/orderCoupon_used.png")
                        } style={footStyles.couponItemOrderImg_I} />
                                 <View style={footStyles.couponValueStyle_D}>
                                     <Text style={footStyles.couponItemRight_P}>
                                         {couponItem.coupon_award}
                                     </Text>
                                     <Text style={footStyles.couponValue_P}>元</Text>
                                 </View>

                                 <View style={footStyles.couponItemLeft_D}>
                                     <Text style={footStyles.couponItemFirstText_D}>满{couponItem.coupon_condition}元使用</Text>
                                     <Text style={footStyles.couponItemSecond_D}>适用范围：{couponItem.good_type}</Text>
                                     <View style={footStyles.couponItemThird_D}>
                                         <Text style={footStyles.couponItemSecond_D}>{STRING_RESOURCE.couponValueTime}</Text>
                                         <Text style={footStyles.couponItemSecond_D}>{star_time}-</Text>
                                         <Text style={footStyles.couponItemSecond_D}>{end_time}</Text>
                                     </View>
                                 </View>
                             </View>;
                })}
                 </View>
             </ScrollView>;
    }

    //展示数据
    hasDataRender() {

        let isShowView = null;
        let emptyView = null;
        if (this.state.isShow) {
            isShowView = this.submitCouponCode();
        } else {
            isShowView = this.beforeCode();
        }

        if (this.state.isTrue) {
            emptyView = this.emptyList();
        } else {
            emptyView = this.couponListView();
        }
        return <View style={styles.bgColor}>
                 {isShowView}
                 {this.tabColumn()}
                 {emptyView}
             </View>;
    }

    render() {

        const { couponListState, couponListActions } = this.props;

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.couponTitle,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: couponListState.dataRequesting,
            isDataRequestSucc: couponListState.isDataRequestSucc,
            hasData: couponListState.couponListData
        };
        return super.allSceneRender(headerParam, netRequestParam);
    }
}

function mapStateToPropsTe(state) {
    const { couponListState } = state;
    return {
        couponListState
    };
}

function mapDispatchToPropsTe(dispatch) {
    return {
        couponListActions: bindActionCreators(couponListActions, dispatch)
    };
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(CouponList);