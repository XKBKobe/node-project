import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';

const TEST_DATA = ['test data 1', 'test data 2', 'test data 3', 'test data 4', 'test data 5', 'test data 6', 'test data 7', 'test data 8', 'test data 9', 'test data 10', 'test data 11', 'test data 12', 'test data 13', 'test data 14', 'test data 15', 'test data 16', 'test data 17', 'test data 18', 'test data 19', 'test data 20'];

const pageSize = 5;
var pageIndex = 1;

export default class ZtestPage extends BaseComponent {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.touchStartHandle = this.touchStartHandle.bind(this);
        this.touchEndHandle = this.touchEndHandle.bind(this);

        this.state = {
            testData: []
        };
    }

    componentWillMount() {
        super.componentWillMount();
        window.addEventListener('touchstart', this.touchStartHandle);
        window.addEventListener('touchend', this.touchEndHandle);
        var tempData = [];

        pageIndex = 1;
        for (var i = 0; i < 5; i++) {
            tempData.push(TEST_DATA[i]);
        }

        this.setState({
            testData: tempData
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener('touchstart', this.touchStartHandle);
        window.removeEventListener('touchend', this.touchEndHandle);
    }

    touchStartHandle(event) {
        // console.log('zhangzhao_start', event);
        // console.log('zhangzhao_start', event.changedTouches[0]);
    }

    touchEndHandle(envent) {
        // console.log('zhangzhao_end', event);
        // console.log('zhangzhao_end', event.changedTouches[0]);
    }

    deleteItem(index) {
        var tempData = [];

        for (var i = 0; i < this.state.testData.length; i++) {
            tempData.push(this.state.testData[i]);
        }

        console.log('zhangzhao0', tempData);
        tempData.splice(index, 1);
        console.log('zhangzhao1', tempData);

        this.setState({
            testData: tempData
        });

        console.log('zhangzhao2', this.state.testData);
    }

    hasDataRender() {
        return this.state.testData.map((data, index) => {
            return <View style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1.1rem',
                borderBottom: '1px solid #dddddd',
                width: '7.5rem',
                height: '2rem'
            }} key={index}>
                    <Text>{data}</Text>
                    <Text style={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '0.4rem',
                    width: '0.9rem',
                    border: '1px solid #dddddd',
                    borderRadius: '0.08rem',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onClick={() => this.deleteItem(index)}>
                        删除
                    </Text>
                </View>;
        });
    }

    loadMoreData() {
        if (pageIndex < 4) {

            var tempData = [];

            for (var i = 0; i < 5; i++) {
                tempData.push(TEST_DATA[i + pageIndex * 5]);
            }

            this.setState({
                testData: this.state.testData.concat(tempData)
            });

            pageIndex++;
        }
    }

    render() {
        console.log('zhangzhao3', 'render');
        var headerParam = {
            isHeaderShow: true,
            headerName: '测试页面',
            isBackShow: true
        };

        var netRequestParam = {
            isRequesting: false,
            isDataRequestSucc: true,
            hasData: true
        };

        return super.allSceneRender(headerParam, netRequestParam);
    }
}