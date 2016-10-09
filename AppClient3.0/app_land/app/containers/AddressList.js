/**
 * Created by zhangheng on 2016/8/2.
 * 地址列表
 */

import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from './baseComponent';
import * as addressListActions from '../../common/actions/addressListActions';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/addressListStyles";
import footStyles from "../styles/couponListStyles";
import { imageUrls } from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';

class AddressList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            addressList: null,
            itemId: null,
            typeClick: null
        };
    }

    componentWillMount() {
        this.props.addressListActions.queryAddressListData();
    }

    //render之前 获取props
    componentWillReceiveProps(nextProps) {
        // console.log("nextProps is:", nextProps);
        if (nextProps.addressListState.isDataRequestSucc) {
            if (nextProps.addressListState.addressListData.data) {
                this.setState({
                    addressList: nextProps.addressListState.addressListData.data
                });
            } else {}
            //响应成功 没有地址数据


            //设置地址  1 删除 2 设置默认 3 取消默认
            if (nextProps.addressListState.addressListDefault) {
                if (nextProps.addressListState.addressListDefault.data) {
                    this.handleResult();
                    alert("设置成功");
                }
            }
        } else {
            //数据请求失败
        }
    }

    //页面销毁
    componentWillUnmount() {
        this.props.addressListState.addressListDefault = null;
    }

    //处理结果
    handleResult() {

        var rowID = this.state.itemId;
        var type = this.state.typeClick;
        var addressListResult = [];

        if (!this.state.addressList) {
            addressListResult = this.props.addressListState.addressListData.data;
        } else {
            addressListResult = this.state.addressList;
        }

        switch (type) {
            case 1:
                addressListResult.splice(rowID, 1);
                break;
            case 2:
                if (!(addressListResult[rowID].is_default == 2)) {
                    for (var j = 0; j < addressListResult.length; j++) {
                        if (addressListResult[j].is_default == 2) {
                            addressListResult[j].is_default = 1;
                            break;
                        }
                    }
                    addressListResult[rowID].is_default = 2;
                }
                break;
            case 3:
                break;
            case 4:
                break;
        }
        this.setState({
            loaded: true,
            addressList: addressListResult
        });
    }

    //地址  1)删除 2)设置默认 3)取消默认 4)编辑
    selectItem(rowID, type) {

        var addressList = [];

        if (!this.state.addressList) {
            addressList = this.props.addressListState.addressListData.data;
        } else {
            addressList = this.state.addressList;
        }

        this.setState({
            itemId: rowID,
            typeClick: type
        });

        switch (type) {
            case 1:
                var obj1 = {
                    id: addressList[rowID].address_id,
                    type: 1
                };
                this.props.addressListActions.querySetDefaultAddress(obj1);
                break;
            case 2:
                if (!(addressList[rowID].is_default == 2)) {
                    var obj = {
                        id: addressList[rowID].address_id,
                        type: 2
                    };
                    this.props.addressListActions.querySetDefaultAddress(obj);
                }
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }

    //展示数据
    hasDataRender() {

        var _this = this;
        var addressListNew = [];
        if (!this.state.addressList) {
            addressListNew = this.props.addressListState.addressListData.data;
        } else {
            addressListNew = this.state.addressList;
        }
        return <View style={styles.bgColor}>
                <View style={styles.line_D}></View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.listSty_D}>
                        {addressListNew.map(function (item, index) {

                        var checkStyle = item.is_default == 2 ? styles.defaultTextNext_P : styles.defaultText_P;
                        var checkText = item.is_default == 2 ? "默认地址" : "设为默认";

                        return <View key={index}>
                                    <View style={styles.defaultSty_D}>

                                        <View style={footStyles.tabLine}></View>
                                        <View style={styles.nameText_D}>
                                            <Text style={styles.nameText_P}>{item.consignee}</Text>
                                            {/*<p style={styles.cardProve_P}>未认证</p>*/}
                                            <Text style={styles.phoneText_P}>{item.mobile}</Text>
                                        </View>
                                        <Text style={styles.addressDetail_P}>{item.address}</Text>

                                        <View style={styles.newLine_D}></View>
                                        <View style={styles.addressDetail_D}>
                                            <Image style={styles.selectImg} source={item.is_default == 2 ? imageUrls.checkBox : imageUrls.checkBoxDown} onClick={() => _this.selectItem(index, 2)} />
                                            <Text style={checkStyle}>{checkText}</Text>

                                            {/*to ={{ pathname:"/AddressDetail",query:item }}*/}
                                            <Button onPress = {
                                         () => Actions.AddressDetailModel({
                                            addressId: item.address_id
                                        })
                                    }>
                                                <View style={styles.setDefaultAddress_D}>
                                                    <Image source = {
                                                 require("../../common/images/address_item_edit.png")
                                            } style={styles.itemDustbin_I} />
                                                    <Text style={styles.changeText_P}>{STRING_RESOURCE.edit}</Text>
                                                </View>
                                            </Button>

                                            <View style={styles.setDefaultAddress_D} onClick={() => _this.selectItem(index, 1)}>
                                                <Image source = {
                                             require("../../common/images/dustbin_icon.png")
                                        } style={styles.itemEdit_I} />
                                                <Text style={styles.changeText_P}>{STRING_RESOURCE.delete}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.lineSty_D}></View>
                                </View>;
                    })}
                    </View>
                </ScrollView>

                <Button onPress = {
                 Actions.AddressDetailModel
            }>
                    <Button style={styles.button_B}>
                        {STRING_RESOURCE.addAddressTitle}
                    </Button>
                </Button>
            </View>;
    }

    render() {

        const { addressListState, addressListActions } = this.props;

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.addressListTitle,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: addressListState.dataRequesting,
            isDataRequestSucc: addressListState.isDataRequestSucc,
            hasData: addressListState.addressListData.data
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}

function mapStateToPropsTe(state) {
    const { addressListState } = state;
    return {
        addressListState
    };
}

function mapDispatchToPropsTe(dispatch) {
    return {
        addressListActions: bindActionCreators(addressListActions, dispatch)
    };
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(AddressList);