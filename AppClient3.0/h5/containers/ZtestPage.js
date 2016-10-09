import React from 'react';
import BaseComponent from './baseComponent';
import requestData from '../../common/config/request';

export default class ZtestPage extends BaseComponent {
    constructor(props) {
        super(props);
 
        this._onChangeProvince = this._onChangeProvince.bind(this);
        this._onChangeCity = this._onChangeCity.bind(this);
        this._onChangeRegion = this._onChangeRegion.bind(this);

        this.provinceItemOptionRender = this.provinceItemOptionRender.bind(this);
        this.cityItemOptionRender = this.cityItemOptionRender.bind(this);
        this.regionItemOptionRender = this.regionItemOptionRender.bind(this);

        this.state = {
            provinceData: [],
            cityData: [],
            regionData: [],
            choosedProvince: 0,
            choosedCity: 0,
            choosedRegion: 0
        }
    }

    componentWillMount() {
        console.log('zhangzhao', this.props.location.query.addressId);
        if (this.props.location.query.addressId) {
            requestData('http://api3.bestinfoods.com/user/address/info', 'POST', 'id=' + this.props.location.query.addressId)
            .then((successData) => {
                if (0 == successData.errorcode) {
                    var provinceRequest = requestData('http://api3.bestinfoods.com/user/get/province', 'POST');
                    var cityRequest = requestData('http://api3.bestinfoods.com/user/get/city', 'POST', 'provinceId=' + successData.data.province_id);
                    var areaRequest = requestData('http://api3.bestinfoods.com/user/get/area', 'POST', 'cityId=' + successData.data.city_id);

                    Promise.all([provinceRequest, cityRequest, areaRequest])
                    .then(([pData, cData, rData]) => {
                        if (0 == pData.errorcode && 0 == cData.errorcode && 0 == rData.errorcode) {
                            this.setState({
                                provinceData: pData.data,
                                cityData: cData.data,
                                regionData: rData.data,
                                choosedProvince: successData.data.province_id,
                                choosedCity: successData.data.city_id,
                                choosedRegion: successData.data.district_id
                            });
                        }
                    });
                }

            }, (errorData) => {

            });
        } else {
            requestData('http://api3.bestinfoods.com/user/get/province', 'POST')
            .then((successData) => {
                if (0 == successData.errorcode) {
                    this.setState({
                        provinceData: successData.data
                    });
                }
            }, (errorData) => {

            });
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(){

    }

    componentWillUnmount() {

    }

    _onChangeProvince(event) {
        console.log('zhangzhao', event.target.value);

        if (0 == event.target.value) {
            this.setState({
                cityData: [],
                regionData: []
            });
        } else {
            requestData('http://api3.bestinfoods.com/user/get/city', 'POST', 'provinceId=' + event.target.value)
            .then((successData) => {
                if (0 == successData.errorcode) {
                    this.setState({
                        cityData: successData.data,
                        regionData: []
                    });
                }
            }, (errorData) => {

            });
        }



        this.setState({
            choosedProvince: event.target.value
        });
    }

    _onChangeCity(event) {
        if (0 == event.target.value) {
            this.setState({
                regionData: []
            });
        } else {
            requestData('http://api3.bestinfoods.com/user/get/area', 'POST', 'cityId=' + event.target.value)
            .then((successData) => {
                if (0 == successData.errorcode) {
                    this.setState({
                        regionData: successData.data
                    });
                }
            }, (errorData) => {

            });
        }

        this.setState({
            choosedCity: event.target.value
        });
    }

    _onChangeRegion(event) {
        this.setState({
            choosedRegion: event.target.value
        });
    }

    provinceItemOptionRender() {
        return this.state.provinceData.map((itemData, index) => {
            return (
                <option key = {index} value = {itemData.province_id}>{itemData.province_name}</option>
            );
        });
    }

    cityItemOptionRender() {
        return this.state.cityData.map((itemData, index) => {
            return (
                <option key = {index} value = {itemData.city_id}>{itemData.city_name}</option>
            );
        });
    }

    regionItemOptionRender() {
        return this.state.regionData.map((itemData, index) => {
            return (
                <option key = {index} value = {itemData.area_id}>{itemData.area_name}</option>
            );
        });
    }

    hasDataRender() {
        return (
            <div style = {styles.contentView}>
                <div style = {styles.selectContentView}>
                    <div style = {styles.textContentView}>
                        <p style = {styles.textStyle1}>*</p>
                        <p style = {styles.textStyle2}>所在省份</p>
                    </div>

                    <select
                        style = {styles.selectView}
                        onChange = {this._onChangeProvince}
                        defaultValue = {this.state.choosedProvince}
                        value = {this.state.choosedProvince}
                    >
                        <option value = {0}>请选择...</option>
                        {this.provinceItemOptionRender()}
                    </select>
                </div>

                <div style = {styles.selectContentView}>
                    <div style = {styles.textContentView}>
                        <p style = {styles.textStyle1}>*</p>
                        <p style = {styles.textStyle2}>所在城市</p>
                    </div>


                    <select
                        style = {styles.selectView}
                        onChange = {this._onChangeCity}
                        defaultValue = {this.state.choosedCity}
                        value = {this.state.choosedCity}
                    >
                        <option value = {0}>请选择...</option>
                        {this.cityItemOptionRender()}
                    </select>
                </div>

                <div style = {styles.selectContentView}>
                    <div style = {styles.textContentView}>
                        <p style = {styles.textStyle1}>*</p>
                        <p style = {styles.textStyle2}>所在区县</p>
                    </div>


                    <select
                        style = {styles.selectView}
                        onChange = {this._onChangeRegion}
                        defaultValue = {this.state.choosedRegion}
                        value = {this.state.choosedRegion}
                    >
                        <option value = {0}>请选择...</option>
                        {this.regionItemOptionRender()}
                    </select>
                </div>

            </div>
        );
    }

    render() {
        var headerParam = {
            isHeaderShow: true,
            headerName: '测试页面',
            isBackShow: true
        };

        var netRequestParam = {
            display: 'flex',
            alignItems: 'center',
            isRequesting: false,
            isDataRequestSucc: true,
            hasData: true
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}

const styles = {
    contentView: {
        paddingTop: '0.9rem'
    },
    titleView: {
        display: 'flex',
        flex: 'row',
        backgroundColor: '#ffffff',
        height: '0.88rem',
        borderBottom: '1px solid #dddddd',
        paddingLeft: '0.3rem',
        paddingRight: '0.3rem'
    },
    titleLeftView: {
        diplay: 'flex',
        flex: 1
    },
    titleCenterView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleRightView: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    titleText: {
        fontSize: '0.32rem',
        color: '#333333'
    },
    closeImage: {
        height: '0.3rem',
        width: '0.3rem'
    },
    selectContentView: {
        display: 'flex',
        flex: 'row',
        height: '0.88rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #dddddd',
    },
    textContentView: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '0.3rem',
    },
    selectView: {
        display: 'flex',
        flex: 3,
        flexDirection: 'row',
        fontSize: '0.28rem',
        color: '#333333'
    },
    addressContentView: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: '5.2rem',
        borderBottom: '1px solid #dddddd'
    },
    textStyle1: {
        fontSize: '0.28rem',
        color: '#ff6700'
    },
    textStyle2: {
        fontSize: '0.28rem',
        color: '#333333',
        marginLeft: '0.1rem'
    }
};
