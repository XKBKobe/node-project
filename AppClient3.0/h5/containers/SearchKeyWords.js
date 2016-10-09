import React from 'react';
import BaseComponent from './baseComponent';
import styles from '../styles/SearchKeyWords';
import StringImgSrc from '../special/stringImage';
import STRING_RESOURCE from '../../common/StringResource';
import {Link} from 'react-router';
import {
    getCookie,
    setCookie,
    COOKIE_KEY_LATELYSEARCH
} from '../../common/config/cookieOperate';

const TAG = 'SearchKeyWords.js';
const HOT_SEARCH_DATA = [
    '中秋',
    '鱼油',
    '阳澄湖大闸蟹',
    '珊瑚钙片',
    '心脑健康',
    '美容养颜',
    '黄金搭档',
    '开发智力',
    '健康生活',
    '黄金鱼油',
    '天天给力',
    '努力奋斗',
];

export default class SearchKeyWords extends BaseComponent {
    constructor(props) {
        super(props);

        this.clearInputIconRender = this.clearInputIconRender.bind(this);
        this._onChange = this._onChange.bind(this);
        this.latelySearchRender = this.latelySearchRender.bind(this);
        this.itemSearchRender = this.itemSearchRender.bind(this);
        this.setLatelySearchKeyWords = this.setLatelySearchKeyWords.bind(this);
        this.clearLatelySearch = this.clearLatelySearch.bind(this);

        this.state = {
            keyWords: '',
            refreshPage: ''
        }
    }

    latelySearchRender() {
        if (null !== getCookie(COOKIE_KEY_LATELYSEARCH)
                && 0 !== getCookie(COOKIE_KEY_LATELYSEARCH).length) {
            var keyWordsArray = getCookie(COOKIE_KEY_LATELYSEARCH).split(',');

            return (
                <div style = {styles.itemsContentView}>
                    {this.itemSearchRender(keyWordsArray)}
                </div>
            );
        } else {
            return (
                <div style = {styles.noLatelySearchView}>
                    <p style = {styles.textStyle2}>无搜索历史</p>
                </div>
            );
        }
    }

    itemSearchRender(itemData) {
        return itemData.map((hotSearchData, indexHot) => {
            return (
                    <Link
                        key = {indexHot}
                        style = {styles.itemView}
                        to = {{pathname: '/search', query:{keyWords: hotSearchData}}}
                        onClick = {() => this.setLatelySearchKeyWords(hotSearchData)}
                    >
                        <p style = {styles.textStyle3}>{hotSearchData}</p>
                    </Link>
            );
        });
    }

    _onChange(event) {
        this.setState({
            keyWords: event.target.value
        });
    }

    clearInputIconRender() {
        if (0 !== this.state.keyWords.length) {
            return (
                <img
                    style = {styles.clearInputIcon}
                    src = {StringImgSrc.imageUrls.ic_clear_input}
                    onClick = {() => this.setState({keyWords: ''})}
                />
            )
        }
    }

    headerMiddleRender() {
        return (
            <div style = {styles.searchBarView}>
                <div style = {styles.searchView}>
                    <img
                        style = {styles.searchIcon}
                        src = {StringImgSrc.imageUrls.ic_search}
                    />
                    <input
                        style = {styles.inputStyle}
                        placeholder = {STRING_RESOURCE.searchKeyWords}
                        onChange = {this._onChange}
                        value = {this.state.keyWords}
                    />
                    {this.clearInputIconRender()}
                </div>
            </div>
        );
    }

    setLatelySearchKeyWords(cacheKeyWord) {
        var latelyKeyWordsArray;
        var filtedArray = [];

        if (null !== getCookie(COOKIE_KEY_LATELYSEARCH)
                && 0 !== getCookie(COOKIE_KEY_LATELYSEARCH).length) {
            latelyKeyWordsArray = getCookie(COOKIE_KEY_LATELYSEARCH).split(',');
        } else {
            latelyKeyWordsArray = [];
        }

        latelyKeyWordsArray.unshift(cacheKeyWord);

        //数组去重
        for (var i = 0; i < latelyKeyWordsArray.length; i++) {
            if (0 === filtedArray.length) {
                filtedArray.push(latelyKeyWordsArray[i]);
            } else {
                var isExist = false;

                for (var j = 0; j < filtedArray.length; j++) {
                    if (latelyKeyWordsArray[i] === filtedArray[j]) {
                        isExist = true;
                        break;
                    }
                }

                if (!isExist) {
                    filtedArray.push(latelyKeyWordsArray[i]);
                }
            }
        }

        setCookie(COOKIE_KEY_LATELYSEARCH, filtedArray.toString());
    }

    headerRightRender() {
        if (0 === this.state.keyWords.length) {
            return (
                <div
                    style = {styles.searchTextView}
                    onClick = {() => alert('请输入搜索关键字')}
                >
                    <p style = {styles.textStyle1}>
                        {STRING_RESOURCE.search}
                    </p>
                </div>
            );
        } else {
            return (
                <Link
                    to = {{pathname: '/search', query:{keyWords: this.state.keyWords}}}
                    style = {styles.searchTextView}
                    onClick = {() => this.setLatelySearchKeyWords(this.state.keyWords)}
                >
                    <p style = {styles.textStyle1}>
                        {STRING_RESOURCE.search}
                    </p>
                </Link>
            );
        }

    }

    clearLatelySearch() {
        setCookie(COOKIE_KEY_LATELYSEARCH, '');
        this.setState({refreshPage: ''});
    }

    hasDataRender() {
        return (
            <div style = {styles.contentView}>
                <div style = {styles.latelySearchBar}>
                    <p style = {styles.textStyle1}>
                        {STRING_RESOURCE.latelySearchKeyWords}
                    </p>
                    <img
                        style = {styles.dustbinIcon}
                        src = {StringImgSrc.imageUrls.ic_dustbin}
                        onClick = {() => this.clearLatelySearch()}
                    />
                </div>
                {this.latelySearchRender()}
                <div style = {styles.hotSearchBar}>
                    <p style = {styles.textStyle1}>
                        {STRING_RESOURCE.hotSearchKeyWords}
                    </p>
                </div>
                <div style = {styles.itemsContentView}>
                    {this.itemSearchRender(HOT_SEARCH_DATA)}
                </div>
            </div>
        );
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
