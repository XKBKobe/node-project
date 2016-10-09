/**
 * Created by zhangheng on 2016/8/2.
 * 地址列表
 */

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseComponent from './baseComponent';
import * as addressListActions from '../../common/actions/addressListActions';
import { browserHistory,Link } from 'react-router';
import styles from "../styles/addressListStyles";
import footStyles from "../styles/couponListStyles";
import stylesBase from '../styles/baseComponent';
import {imageUrls} from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';


class AddressList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            addressList:null,
            itemId:null,
            typeClick:null,
            showData:false
        };
        this.addressDataShow = this.addressDataShow.bind(this)
    }


    componentWillMount() {
        this.props.addressListActions.queryAddressListData();
    }


    //地址  1)删除 2)设置默认 3)取消默认 4)编辑
    selectItem(rowID,type) {

        if (type==1){
            this.setState({
                showData:true,
                itemId: rowID
            })
        }else {
            this.props.addressListActions.querySetDefaultAddress(rowID,type);
        }
    }


    //有无数据view
    addressDataShow(){

        return <div style={styles.scrollView_D}>
            {
                this.props.addressListState.addressListData.map((item,index) => {

                    var checkStyle = item.is_default==2 ? styles.defaultTextNext_P : styles.defaultText_P;
                    var checkText = item.is_default==2 ? "默认地址":"设为默认";
                    var addressId = item.address_id;

                    return <div key={index}>
                        <div style={styles.defaultSty_D}>

                            <div style={styles.tabLine_D}/>
                            <div style={styles.nameText_D}>
                                <p style={styles.nameText_P}>{item.consignee}</p>
                                {/*<p style={styles.cardProve_P}>未认证</p>*/}
                                <p style={styles.phoneText_P}>{item.mobile}</p>
                            </div>
                            <p style={styles.addressDetail_P}>{item.province} {item.city} {item.district} {item.address}</p>

                            <div style={styles.newLine_D}/>
                            <div style={styles.addressDetail_D}>
                                <img style={styles.selectImg}
                                     src={(item.is_default==2) ? imageUrls.checkBox: imageUrls.checkBoxDown}
                                     onClick={() => this.selectItem(addressId,2)}/>
                                <p  style={checkStyle}>{checkText}</p>

                                <Link to ={{ pathname:"/AddressDetail",query:{addressId: item.address_id} }} >
                                    <div style={styles.setDefaultAddress_D}>
                                        <img src="common/images/address_item_edit.png"
                                             style={styles.itemDustbin_I}/>
                                        <p style={styles.changeText_P}>{STRING_RESOURCE.edit}</p>
                                    </div>
                                </Link>

                                <div style={styles.setDefaultAddress_D}
                                     onClick={() => this.selectItem(addressId,1)}>
                                    <img src="common/images/dustbin_icon.png"
                                         style={styles.itemEdit_I}/>
                                    <p style={styles.changeText_P}>{STRING_RESOURCE.delete}</p>
                                </div>
                            </div>
                        </div>
                        <div style={styles.lineSty_D}/>
                    </div>
                })
            }
        </div>
    }


    //弹框
    makeSureDelect() {
        if (this.state.showData) {
            return(
                <div>
                    <div style={footStyles.exchangeBombBoxBg_D}/>
                    <div style={footStyles.exchangeBombBoxAddress_D}>
                        <p style={footStyles.exchangeCodeTitleAddress_P}>确认删除收货地址吗？</p>
                        <div style={footStyles.bottomStylesAddress_D}>
                            <button style={footStyles.buttonAddressStyle_B}
                                    onClick={()=> this.dialogCancel()}>取消</button>
                            <div style={footStyles.columnLin_D}></div>
                            <button style={footStyles.buttonAddressStyle_B}
                                    onClick={()=> this.dialogOk()}>确定</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    dialogCancel() {
        this.setState({
            showData:false
        });
    }
    dialogOk() {
        this.props.addressListActions.querySetDefaultAddress(this.state.itemId,1);
        this.setState({
            showData:false
        });
    }


    headerRender(isHeaderShow, headerName, isBackShow) {
        return (
            <div>
                {super.headerRender(true, headerName, isBackShow)}
                <Link to='/AddressDetail'>
                    <button style={styles.button_B}>
                        {STRING_RESOURCE.addAddressTitle}
                    </button>
                </Link>
                {this.isLoadingRenderState()}
                {this.makeSureDelect()}
            </div>
        );
    }


    //加载中
    isLoadingRenderState() {
        if (this.props.addressListState.loadingData){
            return (
                <div style = {stylesBase.contentView}>
                    <img
                        style = {stylesBase.loadingImage}
                        src = {imageUrls.loading}
                    />
                    <p style = {stylesBase.loadingText}>
                        {STRING_RESOURCE.isLoadingWaitMinute}
                    </p>
                </div>
            );
        }
    }


    //展示数据
    hasDataRender(){
        return (
            <div style={styles.bgColor}>
                <div style={styles.line_D}/>
                <scrollView style={styles.scrollViewAddress}>
                        {this.addressDataShow()}
                </scrollView>
            </div>
        )
    }


    noDataRender() {
        return (
            <div style = {stylesBase.contentView}>
                <img src="common/images/icon_addressList_null.png" style={footStyles.couponNull_Im}/>
                <p style = {footStyles.loadingView}>您还没有收货地址~添加一个吧！</p>
            </div>
        );
    }


    render() {

        const {addressListState} = this.props;
        var hasData = false;
        if (null != addressListState.addressListData && 0 != addressListState.addressListData.length) {
            hasData = true;
        }

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.addressListTitle,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: addressListState.dataRequesting,
            isDataRequestSucc: addressListState.isDataRequestSucc,
            hasData: hasData
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}

function mapStateToPropsTe(state) {
    const {addressListState} = state;
    return {
        addressListState
    }
}

function mapDispatchToPropsTe(dispatch) {
    return {
        addressListActions: bindActionCreators(addressListActions, dispatch)
    }
}
export default connect(mapStateToPropsTe, mapDispatchToPropsTe)(AddressList);
