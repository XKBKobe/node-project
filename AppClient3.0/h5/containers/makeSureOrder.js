import React from 'react';
import BaseComponent from './baseComponent';
import {Link} from 'react-router';
import {
    EditBar,
    ChooseAddBar,
    CouponBar,
    PayWayBar
} from '../components/makeSureOrder/editBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/makeSureOrder/makeSureOrder';
import Special from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';
import * as makeSureOrderActions from '../../common/actions/MakeSureOrderActions';
import * as orderCacheDefaultAddress from '../../common/actions/addressListActions';

var goodsParam = [];
var addressIdParam = null;
var totalSalePriceParam = null;
var couponIdParam = null;

class MakeSureOrder extends BaseComponent {
    constructor(props) {
        super(props);

        this.hasDataRender = this.hasDataRender.bind(this);
        this.contentRender = this.contentRender.bind(this);
        this.orderFooterRender = this.orderFooterRender.bind(this);
        this.orderDetailRender = this.orderDetailRender.bind(this);

        this.addBarRender = this.addBarRender.bind(this);
        this.hasDefaultAddRender = this.hasDefaultAddRender.bind(this);
        this.noDefaultAddRender = this.noDefaultAddRender.bind(this);
        this.addAddressPromptRender = this.addAddressPromptRender.bind(this);

        this.whouseListRender = this.whouseListRender.bind(this);
        this.activityListRender = this.activityListRender.bind(this);
        this.goodsListRender = this.goodsListRender.bind(this);

        this.consigneeonChangeHandle = this.consigneeonChangeHandle.bind(this);
        this.phoneNumberonChangeHandle = this.phoneNumberonChangeHandle.bind(this);
        this.detailAddonChangeHandle = this.detailAddonChangeHandle.bind(this);
        this.idNumberonChangeHandle = this.idNumberonChangeHandle.bind(this);

        this.state = {
            isOrderDetailShow: false,
            consignee: '',
            phoneNumber: '',
            detailAddress: '',
            idNumber: '',
        }
    }

    componentWillMount() {
        goodsParam = [];
        addressIdParam = null;
        totalSalePriceParam = null;
        couponIdParam = null;

        if ('2' === this.props.location.query.flag) {
            this.props.makeSureOrderActions.queryShoppingCartOrderData();
        } else {
            var goodsId = this.props.location.query.goodsId;
            var amount = this.props.location.query.count;

            this.props.makeSureOrderActions.queryImmediatelyBuyOrderData(goodsId, amount);
        }
    }

    componentWillUnmount() {
        this.props.makeSureOrderActions.initState();
    }

    hasDefaultAddRender() {
        var consignee = '';
        var phoneNumber = '';
        var detailAddress = '';

        this.props.makeSureOrderState.addressData.map((data, index) => {
            if (2 == data.is_default) {
                consignee = data.consignee;
                phoneNumber = data.mobile;
                detailAddress =
                    data.province + ' '
                    + data.city + ' '
                    + data.district + ' '
                    + data.address;

                addressIdParam = data.address_id;
            }

            if (null != this.props.choosedAddressId) {
                if (this.props.choosedAddressId == data.address_id) {
                    consignee = data.consignee;
                    phoneNumber = data.mobile;
                    detailAddress =
                        data.province + ' '
                        + data.city + ' '
                        + data.district + ' '
                        + data.address;

                    addressIdParam = data.address_id;
                }
            }
        });

        return (
            <Link
                to = '/ConfirmOrderAddress'
                style = {styles.addContentView}
                onClick = {() => this.props.cacheChoosedAddressActions.orderCacheDefaultAddress(addressIdParam)}
            >
                <div style = {styles.addInfoContentView}>
                    <div style = {styles.addNamePhoneContentView}>
                        <p style = {styles.textSt1}>
                            {consignee}
                        </p>
                        <p style = {styles.textSt1}>
                            {phoneNumber}
                        </p>
                    </div>

                    <div style = {styles.addDetailContentView}>
                        <p style = {styles.textSt2}>
                            {detailAddress}
                        </p>
                    </div>
                </div>

                <div style = {styles.addArrowContentView}>
                    <img
                        style = {styles.imgSt1}
                        src = {Special.imageUrls.ic_right_arrow}
                    />
                </div>
            </Link>
        );
    }

    consigneeonChangeHandle(event) {
        this.setState({
            consignee: event.target.value
        });
    }

    phoneNumberonChangeHandle(event) {
        if (event.target.value.length > 11) {
            return ;
        }
        this.setState({
            phoneNumber: event.target.value
        });
    }

    detailAddonChangeHandle(event) {
        this.setState({
            detailAddress: event.target.value
        });
    }

    idNumberonChangeHandle(event) {
        if (event.target.value.length > 18) {
            return ;
        }
        this.setState({
            idNumber:event.target.value
        })
    }

    noDefaultAddRender() {
        return (
            <div>
                {EditBar(STRING_RESOURCE.consignee, '', this.consigneeonChangeHandle, this.state.consignee)}
                {EditBar(STRING_RESOURCE.phoneNumber, '', this.phoneNumberonChangeHandle, this.state.phoneNumber)}
                {ChooseAddBar()}
                {EditBar(STRING_RESOURCE.detailAddress, STRING_RESOURCE.moreThanFiveChinese, this.detailAddonChangeHandle, this.state.detailAddress)}
                {EditBar(STRING_RESOURCE.idCard, STRING_RESOURCE.customsNeed, this.idNumberonChangeHandle, this.state.idNumber)}
                <div style = {styles.saveAddContentView}>
                    <div
                        style = {styles.saveAddButtonView}
                        onClick = {() => this.props.makeSureOrderActions.saveDefaultAddress(
                            this.state.consignee,
                            this.state.phoneNumber,
                            this.state.detailAddress,
                            this.state.idNumber
                        )}
                    >
                        <p style = {styles.saveAddButtonText}>
                            {STRING_RESOURCE.saveAndUse}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    addAddressPromptRender() {
        return (
            <Link
                to = '/ConfirmOrderAddress'
                style = {styles.promptAddAddressView}
            >
                <img
                    style = {styles.imgSt3}
                    src = {Special.imageUrls.ic_add_address}
                />
                <p style = {styles.textSt10}>
                    {STRING_RESOURCE.clickToAddAddress}
                </p>
            </Link>
        );
    }

    addBarRender() {
        if (0 === this.props.makeSureOrderState.addressData.length) {
            return this.addAddressPromptRender();
        } else {
            return this.hasDefaultAddRender();
        }
    }

    whouseListRender() {
        return this.props.makeSureOrderState.makeSureOrderData.whGoods.map((whouseData, index) => {
            return (
                <div style = {styles.whouseContentView} key = {index}>
                    <div style = {styles.whouseHeaderView}>
                        <p style = {styles.textSt2}>
                            {whouseData.whName}
                        </p>
                    </div>

                    {this.activityListRender(whouseData.activityGoods)}

                    <div style = {styles.whouseFooterView}>
                        <p style = {styles.textSt2}>
                            {STRING_RESOURCE.totalGoodsPayable}{whouseData.totalMoney}
                        </p>
                    </div>
                </div>
            );
        });
    }

    activityListRender(activityListData) {
        return activityListData.map((activityData, index) => {
            return (
                <div key = {index}>
                    {this.goodsListRender(activityData.goodsList)}
                </div>
            );
        });
    }

    goodsListRender(goodsListData) {
        return goodsListData.map((goodsData, index) => {
            var goodParam = {
                goodId: goodsData.goodsId,
                amount: goodsData.amount
            };

            goodsParam.push(goodParam);

            return (
                <div key = {index} style = {styles.goodsContentView}>
                    <div style = {styles.goodsIntroContentView}>
                        <img
                            style = {styles.goodsImg}
                            src = {goodsData.imgobj.url}
                        />
                        <div style = {styles.goodsNameContentView}>
                            <p styles = {styles.textSt2}>{goodsData.goodsName}</p>
                        </div>
                    </div>

                    <div style = {styles.goodsPriceAmountContentView}>
                        <div style = {styles.goodsPriceAmountView}>
                            <p style = {styles.textSt2}>¥{goodsData.goodsSalePrice}</p>
                            <p style = {styles.textSt3}>x{goodsData.amount}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }

    orderFooterRender() {
        let detailArrow = this.state.isOrderDetailShow
                ? Special.imageUrls.ic_up_arrow
                : Special.imageUrls.ic_down_arrow;

        return (
            <div style = {styles.orderFooterContentView}>
                <div style = {styles.orderFooterMsgView}>
                    <div style = {styles.orderFooterPriceView}>
                        <p style = {styles.textSt2}>{STRING_RESOURCE.total}</p>
                        <p style = {styles.textSt4}>￥{this.props.makeSureOrderState.makeSureOrderData.allPayMoney}</p>
                    </div>

                    <div
                        onClick = {() => this.setState({isOrderDetailShow: !this.state.isOrderDetailShow})}
                        style = {styles.orderFooterDetailView}
                    >
                        <p style = {styles.textSt2}>{STRING_RESOURCE.payableDetail}</p>
                        <img
                            style = {styles.imgSt2}
                            src = {detailArrow}
                        />
                    </div>
                </div>


                <div
                    style = {styles.orderFooterPayView}
                    onClick = {
                        () => this.props.makeSureOrderActions.payEventHandle(
                            goodsParam,
                            addressIdParam,
                            totalSalePriceParam
                        )
                    }
                >
                    <p style = {styles.textSt5}>
                        {STRING_RESOURCE.goToPay}
                    </p>
                </div>
            </div>
        );
    }

    contentRender() {
        return (
            <div style = {styles.mainContentView}>
                {this.addBarRender()}
                {this.whouseListRender()}
                {CouponBar()}
            </div>
        );
    }

    orderDetailRender() {
        if (this.state.isOrderDetailShow) {
            return (
                <div>
                    <div style = {styles.orderDetailContentView}>
                        <div style = {styles.orderDetailLeftView}>
                            <p style = {styles.textSt2}>{STRING_RESOURCE.goodsTotalPrice}</p>
                            <p style = {styles.textSt7}>{STRING_RESOURCE.activityDiscount}</p>
                            <p style = {styles.textSt7}>{STRING_RESOURCE.coupon}</p>
                            <p style = {styles.textSt7}>{STRING_RESOURCE.freight}</p>
                            <p style = {styles.textSt7}>{STRING_RESOURCE.taxation}</p>
                            <p style = {styles.textSt7}>{STRING_RESOURCE.total}</p>
                        </div>

                        <div style = {styles.orderDetailRightView}>
                            <p style = {styles.textSt8}>￥199.00</p>
                            <p style = {styles.textSt9}>-￥20.00</p>
                            <p style = {styles.textSt9}>￥20.00</p>
                            <p style = {styles.textSt9}>包邮</p>
                            <p style = {styles.textSt9}>￥2.23</p>
                            <p style = {styles.textSt9}>￥697.00</p>
                        </div>
                    </div>
                    <div style = {styles.orderDetailShadow} />
                </div>
            );
        }
    }

    hasDataRender() {
        totalSalePriceParam = this.props.makeSureOrderState.makeSureOrderData.allPayMoney;

        return (
            <div>
                {this.contentRender()}
                {this.orderFooterRender()}
                {this.orderDetailRender()}
            </div>
        )
    }

    render() {
        goodsParam = [];
        const {makeSureOrderState} = this.props;

        var headerParam = {
            isHeaderShow: true,
            headerName: STRING_RESOURCE.confirmOrder,
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: makeSureOrderState.dataRequesting,
            isDataRequestSucc: makeSureOrderState.isDataRequestSucc,
            hasData: makeSureOrderState.makeSureOrderData,
            isDialogLoading: makeSureOrderState.loadingData,
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}

function mapStateToProps(state) {
	const {makeSureOrderState, addressListState, couponInfoState} = state;
	return {
		makeSureOrderState,
        choosedAddressId: addressListState.choosedAddressId,
        couponId: couponInfoState.couponId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		makeSureOrderActions: bindActionCreators(makeSureOrderActions, dispatch),
        cacheChoosedAddressActions: bindActionCreators(orderCacheDefaultAddress, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeSureOrder);
