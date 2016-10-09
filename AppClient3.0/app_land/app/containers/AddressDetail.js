/**
 * Created by zhangheng on 2016/8/2.
 */

import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { Actions } from 'react-native-router-flux';
import * as addressDetailActions from '../../common/actions/addressDetailActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from './baseComponent';
import AddressRow from "../components/addressRowView";
import footStyles from "../styles/couponListStyles";
import itemStyles from "../styles/addressItemStyles";
import styles from "../styles/addressListStyles";
import { imageUrls } from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';

import AddressBottomView from "../components/addressBottomView";

var oldList = [{ id: 0, name: "请选择" }];
//状态
var listItemState = [{ textColor: "#ff0000", bgColor: "#ff0000" }];

class AddressDetail extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            realName: null,
            phone: null,
            proCityCounty: "请选择",
            detailInfo: null,
            idCard: null,
            isDefault: false,

            addressType: "",
            addressId: "",

            //选中地址
            selectAddressList: oldList,
            //省市县列表
            proCityCountyList: null,
            isShow: false,
            selectIndex: null
        };
    }

    componentWillMount() {

        let addressId = this.props.addressId;
        if (addressId) {
            var obj = {
                id: addressId
            };
            this.setState({
                addressType: 1,
                addressId: addressId
            });

            //获取地址详情
            this.props.addressDetailActions.queryAddressDetailData(obj);
        } else {
            console.log("tttt没有传参过来");
        }
        //获取省list
        this.props.addressDetailActions.queryProvinceListData();
    }

    //render之前 获取props
    componentWillReceiveProps(nextProps) {

        // var object = nextProps.location.query;
        if (this.state.addressType == 1) {
            var addressItem = nextProps.addressDetailState.addressDetailData.data;
            this.setState({
                realName: addressItem.consignee,
                phone: addressItem.mobile,
                proCityCounty: addressItem.province + addressItem.city + addressItem.district,
                detailInfo: addressItem.address,
                idCard: addressItem.idcard,
                isDefault: addressItem.is_default == 2
            });
        }

        if (nextProps.addressDetailState.addressDataChange) {
            alert("修改成功");
            browserHistory.goBack();
        }
        if (nextProps.addressDetailState.addressDataAdd) {
            if (nextProps.addressDetailState.addressDataAdd.data) {
                alert("添加成功");
            } else {
                alert(nextProps.addressDetailState.addressDataAdd.message);
            }
            console.log("添加成功，返回地址id");
            browserHistory.goBack();
        }

        //省list
        if (nextProps.addressDetailState.provinceListData) {
            if (nextProps.addressDetailState.provinceListData.data) {
                this.sameList(nextProps.addressDetailState.provinceListData.data, 1);
            }
        }
        //市list
        if (nextProps.addressDetailState.cityListData) {
            if (nextProps.addressDetailState.cityListData.data) {
                this.sameList(nextProps.addressDetailState.cityListData.data, 2);
            }
        }
        //县list
        if (nextProps.addressDetailState.countyListData) {
            if (nextProps.addressDetailState.countyListData.data) {
                this.sameList(nextProps.addressDetailState.countyListData.data, 3);
            }
        }
    }

    //页面销毁
    componentWillUnmount() {
        this.props.addressId = null;
        this.props.addressDetailState.addressDataChange = null;
        this.props.addressDetailState.addressDataAdd = null;

        oldList = [{ id: 0, name: "请选择" }];
        listItemState = [{ textColor: "#ff0000", bgColor: "#ff0000" }];
    }

    componentDidUpdate() {
        var swiperBanner = new Swiper('.swiperBanner', {
            pagination: '.swiper-pagination',
            width: 375,
            height: 26,
            spaceBetween: 1,
            loop: false,
            lazyLoading: true,
            direction: 'vertical'
        });
    }

    //统一列表
    sameList(list, type) {

        let newList = [];
        var objItem = {};
        for (var i = 0; i < list.length; i++) {
            if (type == 1) {
                objItem = {
                    id: list[i].province_id,
                    name: list[i].province_name
                };
            } else if (type == 2) {
                objItem = {
                    id: list[i].city_id,
                    name: list[i].city_name
                };
            } else if (type == 3) {
                objItem = {
                    id: list[i].area_id,
                    name: list[i].area_name
                };
            }
            newList.push(objItem);
        }

        this.setState({
            proCityCountyList: newList
        });
    }

    handleChange(index, event) {

        switch (index) {
            case "1":
                this.setState({ realName: event.nativeEvent.text });
                break;
            case "2":
                this.setState({ phone: event.nativeEvent.text });
                break;
            case "4":
                this.setState({ detailInfo: event.nativeEvent.text });
                break;
            case "5":
                this.setState({ idCard: event.nativeEvent.text });
                break;
        }
    }

    //是否设为默认地址
    _isDefaultAddress() {

        let isFalse;
        if (this.state.isDefault) {
            isFalse = false;
        } else {
            isFalse = true;
        }
        this.setState({
            isDefault: isFalse
        });
    }

    //提交信息  添加收货地址
    submitPersonInfo() {

        var areaId;
        var address = this.state.detailInfo;
        var name = this.state.realName;
        var idCard = this.state.idCard;
        var mobile = this.state.phone;

        if (!name) {
            alert("请填写收货人姓名");
            return;
        }
        if (mobile) {
            var phoneVal = this.state.phone.replace(/\s/g, "");
            if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneVal)) {
                alert("请正确填写手机号");
                return;
            }
        }
        if (this.state.selectAddressList.length == 4) {
            areaId = this.state.selectAddressList[2].id;
        } else {
            alert("请选择收货地址");
            return;
        }
        if (!address) {
            alert("请填写详细地址");
            return;
        }
        if (idCard) {
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(idCard) === false) {
                alert("请正确填写身份证号");
                return;
            }
        } else {
            alert("请填写身份证号");
            return;
        }

        var submitInfo = {
            areaId: areaId,
            address: address,
            name: name,
            idCard: idCard,
            mobile: mobile,
            isDefault: this.state.isDefault ? 2 : 1,
            id: this.state.addressId
        };

        if (this.state.addressType == 1) {
            //修改地址
            this.props.addressDetailActions.changeAddressDetailData(submitInfo);
        } else {
            //添加地址
            this.props.addressDetailActions.addAddressDetailData(submitInfo);
        }
    }

    //title
    titleView() {
        return <View style={itemStyles.addressDetailColumn_D}>
                <Image source = {
                 require("../../common/images/icon_left_arrow.png")
            } style={itemStyles.back_I} onClick={Actions.pop} />
                <Text style={itemStyles.textFont_P}>{STRING_RESOURCE.addressDetailTitle}</Text>
                <Text style={styles.fillSpan_P}> </Text>
            </View>;
    }

    //显示省市县选项
    onClickShow(type) {
        var isTrue = false;
        if (type == 1) {
            isTrue = true;
        } else if (type == 2) {
            isTrue = false;
        }
        this.setState({
            isShow: isTrue
        });
    }

    //选中 省市县 一项
    chooseAddressItem(listObj) {

        var objBg = { textColor: "#000000", bgColor: "#ffffff" };
        listItemState.splice(listItemState.length - 1, 0, objBg);
        oldList.splice(oldList.length - 1, 0, listObj);

        if (oldList.length > 3) {
            if (oldList.length > 4) {
                oldList.splice(2, 2);
                oldList.splice(2, 0, listObj);
                listItemState.splice(2, 2);
            }
            this.onClickShow(2);
            this.setState({
                proCityCounty: oldList[0].name + " " + oldList[1].name + " " + oldList[2].name
            });
        }

        this.setState({
            selectAddressList: oldList
        });

        switch (oldList.length) {
            case 2:
                //请求市列表
                var objCity = {
                    provinceId: listObj.id
                };
                this.props.addressDetailActions.queryCityListData(objCity);
                break;
            case 3:
                //请求县列表
                var objCounty = {
                    cityId: listObj.id
                };
                this.props.addressDetailActions.queryCountyListData(objCounty);
                break;
        }
    }

    //点击已选中 的第几个
    chooseItem(index) {

        switch (index) {
            case 0:
                //显示省列表
                this.sameList(this.props.addressDetailState.provinceListData.data, 1);
                this.props.addressDetailState.cityListData = null;
                this.props.addressDetailState.countyListData = null;
                oldList.splice(0, oldList.length - 1);
                listItemState.splice(1, listItemState.length - 1);
                break;
            case 1:
                //显示市列表
                this.sameList(this.props.addressDetailState.cityListData.data, 2);
                this.props.addressDetailState.countyListData = null;
                oldList.splice(1, oldList.length - 2);
                listItemState.splice(2, listItemState.length - 2);
                break;
            case 2:
                //显示市列表
                this.sameList(this.props.addressDetailState.countyListData.data, 3);
                oldList.splice(2, 1);
                listItemState.splice(3, 1);
                break;
        }
    }

    //省、市、县 选择
    selectProCityCounty() {
        // style={itemStyles.maskFloor_D}
        var _this = this;

        return <View>
            <View style={itemStyles.areaDetailShadow} />
            <View style={itemStyles.areaDetailContentView}>
                <View style={itemStyles.cancelStyle_D}>
                    <Text style={styles.fillSpan_P}> </Text>
                    <Text style={itemStyles.cancelTitle_P}>所在地区</Text>
                    <Image style={itemStyles.cancelImg_Im} source = {
                         require("../../common/images/icon_close.png")
                    } onClick={() => this.onClickShow(2)} />
                </View>
                <View style={itemStyles.addressDetailLine_D} />

                <View>
                    <AddressBottomView listItem={listItemState} list={this.state.selectAddressList} updateItemChoosen={index => this.chooseItem(index)} />
                </View>

                <View style={itemStyles.addressDetailLine_D} />

                <Swiper style={itemStyles.scrollViewTwo}>
                                            {
                        //地址列表
                        this.state.proCityCountyList.map(function (areaItem, numb) {
                            return <View style={itemStyles.areaList_D} key={numb} onClick={() => _this.chooseAddressItem(areaItem)}>
                                    <Text style={itemStyles.areaItemText_P}>{areaItem.name}</Text>
                                </View>;
                        })}
                                    </Swiper>
            </View>
        </View>;
    }

    //展示数据
    hasDataRender() {

        var showPro = null;
        if (this.state.isShow) {
            showPro = this.selectProCityCounty();
        } else {
            showPro = <View></View>;
        }
        return <View>
                {showPro}
                <View style={itemStyles.addressDetailOrder_D}>

                    <View style={itemStyles.addressDetailLine_D}></View>

                    <View style={footStyles.tabLine}></View>

                    <View style={itemStyles.addressDetailItem_D}>
                        <Text style={itemStyles.addressDetailCheck_I}>*</Text>
                        <Text style={itemStyles.addressDetailDefault_P}>{STRING_RESOURCE.consignee}</Text>
                        <TextInput style={itemStyles.addressDetailInputName_In} value={this.state.realName} onChange={this.handleChange.bind(this, "1")} />
                    </View>
                    <View style={itemStyles.addressDetailLine_D}></View>

                    <View style={itemStyles.addressDetailItem_D}>
                        <Text style={itemStyles.addressDetailCheck_I}>*</Text>
                        <Text style={itemStyles.addressDetailDefault_P}>{STRING_RESOURCE.phoneNumber}</Text>
                        <TextInput style={itemStyles.addressDetailInput_In} value={this.state.phone} onChange={this.handleChange.bind(this, "2")} />
                    </View>
                    <View style={itemStyles.addressDetailLine_D}></View>


                    <View style={itemStyles.addressDetailItem_D}>
                        <Text style={itemStyles.addressDetailCheck_I}>*</Text>
                        <Text style={itemStyles.addressDetailDefault_P}>{STRING_RESOURCE.localArea}</Text>

                        <Text style={itemStyles.areaProCityCounty_P} onClick={() => this.onClickShow(1)}>{this.state.proCityCounty}</Text>
                        <Image source = {
                         require("../../common/images/icon_right_arrow.png")
                    } style={itemStyles.areaProCityCountyImg_I} />
                    </View>
                    <View style={itemStyles.addressDetailLine_D}></View>

                    <View style={itemStyles.addressDetailInfo_D}>
                        <Text style={itemStyles.addressDetailCheck_I}>*</Text>
                        <Text style={itemStyles.addressDetailDefault_P}>{STRING_RESOURCE.detailAddress}</Text>
                        <textarea rows="2" placeholder={STRING_RESOURCE.moreThanFiveChinese} style={itemStyles.addressDetailLongInput_In} value={this.state.detailInfo} onChange={this.handleChange.bind(this, "4")} numberOfLines={2} multiline={true} />
                    </View>
                    <View style={itemStyles.addressDetailLine_D}></View>

                    <View style={itemStyles.addressDetailItem_D}>
                        <Text style={itemStyles.addressDetailDefault_P}>{STRING_RESOURCE.idCard}</Text>
                        <TextInput placeholder={STRING_RESOURCE.customsNeed} style={itemStyles.addressDetailIdCardInput_In} value={this.state.idCard} onChange={this.handleChange.bind(this, "5")} keyboardType="numeric" />
                    </View>
                    <View style={itemStyles.addressDetailLine_D}></View>

                    <View style={footStyles.tabLine}></View>
                    <View style={itemStyles.addressDetailDefault_D}>
                        <Text style={itemStyles.addressDetailDefault_P}>{STRING_RESOURCE.setDetailAddress}</Text>
                        <Image source={this.state.isDefault ? imageUrls.addressDetail : imageUrls.addressDetailDown} style={itemStyles.addressDetailDeta_I} onClick={() => this._isDefaultAddress()} />
                    </View>
                    <View style={itemStyles.addressDetailLine_D}></View>

                    <Button style={itemStyles.saveAddress_B} onPress={() => this.submitPersonInfo()}>
                        {STRING_RESOURCE.saveAddress}
                    </Button>
                </View>
            </View>;
    }

    render() {

        const { addressDetailState, addressDetailActions } = this.props;
        //请求
        if (this.state.addressType == 1) {
            var netRequestParam = {
                isRequesting: addressDetailState.dataRequesting,
                isDataRequestSucc: addressDetailState.isDataRequestSucc,
                hasData: addressDetailState.addressDetailData
            };

            var headerParam = {
                isHeaderShow: true,
                headerName: STRING_RESOURCE.addressDetailTitle,
                isBackShow: true
            };
            return super.allSceneRender(headerParam, netRequestParam);
        } else {
            return <View style={itemStyles.addressDetailTitle_D}>
               {this.titleView()}
               {this.hasDataRender()}
               </View>;
        }
    }
}

function mapStateToPropsTe(state) {
    const { addressDetailState } = state;
    return {
        addressDetailState
    };
}

function mapDispatchToPropsTe(dispatch) {
    return {
        addressDetailActions: bindActionCreators(addressDetailActions, dispatch)
    };
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(AddressDetail);