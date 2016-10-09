import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import BaseComponent from './baseComponent';
import styles from '../styles/SearchKeyWords';
import StringImgSrc from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';
import { Actions } from 'react-native-router-flux';

const TAG = 'SearchKeyWords.js';
const HOT_SEARCH_DATA = ['中秋', '鱼油', '阳澄湖大闸蟹', '珊瑚钙片', '心脑健康', '美容养颜', '黄金搭档', '开发智力', '健康生活', '黄金鱼油', '天天给力', '努力奋斗', 'ZhangZhao'];

const LATELY_SEARCH_DATA = ['大理', '玉龙雪山', '丽江古城', '香格里拉', '独宗克古城', '噶丹松赞林', '苍山', '洱海', '崇圣寺三塔'];

export default class SearchKeyWords extends BaseComponent {
    constructor(props) {
        super(props);
        this.clearInputIconRender = this.clearInputIconRender.bind(this);
        this._onChange = this._onChange.bind(this);
        this.latelySearchRender = this.latelySearchRender.bind(this);
        this.itemSearchRender = this.itemSearchRender.bind(this);

        this.state = {
            keyWords: ''
        };
    }

    latelySearchRender(hasLatelySearch) {
        if (hasLatelySearch) {
            return <View style={styles.itemsContentView}>
                    {this.itemSearchRender(LATELY_SEARCH_DATA)}
                </View>;
        } else {
            return <View style={styles.noLatelySearchView}>
                    <Text style={styles.textStyle2}>无搜索历史</Text>
                </View>;
        }
    }

    itemSearchRender(itemData) {
        return itemData.map((hotSearchData, indexHot) => {
            return <Button key={indexHot} style={styles.itemView} onPress = {
                 () => Actions.searchModel({
                    keyWords: hotSearchData
                })
            }>
                        <Text style={styles.textStyle3}>{hotSearchData}</Text>
                    </Button>;
        });
    }

    _onChange(event) {
        this.setState({
            keyWords: event.nativeEvent.text
        });
    }

    clearInputIconRender() {
        if (0 !== this.state.keyWords.length) {
            return <Image style={styles.clearInputIcon} source={StringImgSrc.imageUrls.ic_clear_input} onClick={() => this.setState({ keyWords: '' })} />;
        }
    }

    headerMiddleRender() {
        return <View style={styles.searchBarView}>
                <View style={styles.searchView}>
                    <Image style={styles.searchIcon} source={StringImgSrc.imageUrls.ic_search} />
                    <TextInput style={styles.inputStyle} placeholder={STRING_RESOURCE.searchKeyWords} onChange={this._onChange} value={this.state.keyWords} />
                    {this.clearInputIconRender()}
                </View>
            </View>;
    }

    headerRightRender() {
        if (0 === this.state.keyWords.length) {
            return <View style={styles.searchTextView} onClick={() => alert('请输入搜索关键字')}>
                    <Text style={styles.textStyle1}>
                        {STRING_RESOURCE.search}
                    </Text>
                </View>;
        } else {
            return <Button onPress = {
                 () => Actions.searchModel({
                    keyWords: this.state.keyWords
                })
            } style={styles.searchTextView}>
                    <Text style={styles.textStyle1}>
                        {STRING_RESOURCE.search}
                    </Text>
                </Button>;
        }
    }

    hasDataRender() {
        return <View style={styles.contentView}>
                <View style={styles.latelySearchBar}>
                    <Text style={styles.textStyle1}>{STRING_RESOURCE.latelySearchKeyWords}</Text>
                    <Image style={styles.dustbinIcon} source={StringImgSrc.imageUrls.ic_dustbin} />
                </View>
                {this.latelySearchRender(false)}
                <View style={styles.hotSearchBar}>
                    <Text style={styles.textStyle1}>{STRING_RESOURCE.hotSearchKeyWords}</Text>
                </View>
                <View style={styles.itemsContentView}>
                    {this.itemSearchRender(HOT_SEARCH_DATA)}
                </View>
            </View>;
    }

    render() {
        var headerParam = {
            isHeaderShow: true,
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