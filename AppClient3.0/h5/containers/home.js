/**
 * author : jiao.shen
 * date : 2016-08-01
 * description : 首页
 */

'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../styles/homeStyle.js';
import {Link} from 'react-router';
import {
	fetchCategory,
	fetchActivity,
	fetchBanner,
	fetchGoodList,
	fetchRecommandGood
} from '../../common/actions/homeAction';
import ListView from "../special/ListView/ListView";
import ListViewDataSource from '../special/ListView/ListViewDataSource';
import ThematicPoster from '../components/Home/homeThematicPoster';
import SinglePoster from '../components/Home/singlePoster';
import { homePressDown } from "../../common/actions/tabAction";
import {storageKeys,imageUrls} from '../special/stringImage.js';
import { PreLoadHomeBanner } from '../special/preloadingData';
import {isObjectValueEqual,getLocalTime} from '../../common/config/Tools.js';
import STRING_RESOURCE from '../../common/StringResource';
import ViewPager from '../special/ViewPager';
import ViewPagerDataSource from '../special/ViewPagerDataSource';
import AsyncStorage from '../special/AsyncStorage';

var loadStartTime = 0;
var loadEndTime = 0;
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banners: null,
			categorys: null,
			activitys: null,
			thematics: null,
			recommands: null,
			loading: true,
		}
	}

	componentWillMount() {
		loadStartTime = new Date().getTime();
		//console.log("page load start time:"+ loadStartTime);

		this.getDataFromLocalStorage();
		this.getDataFromNetwork();
	}

	componentWillReceiveProps(nextProps) {
		//如果banner、category等值为空
		if (nextProps.bannerDatas 
			&& !isObjectValueEqual(this.state.banners, nextProps.bannerDatas)) {
			this.setState({banners: nextProps.bannerDatas,loading:false});
			AsyncStorage.setItem(storageKeys.HOME_BANNER_KEY,JSON.stringify(nextProps.bannerDatas), (error) => {
				if (!error) return;
				console.log("AsyncStorage store home banner error: ", error.message);
			});
			//console.log("rerender banner data....");
		}
		if (nextProps.categoryDatas
			&& !isObjectValueEqual(this.state.categorys,nextProps.categoryDatas)) {
			this.setState({categorys: nextProps.categoryDatas,loading:false});
			AsyncStorage.setItem(storageKeys.HOME_CATEGORY_KEY,JSON.stringify(nextProps.categoryDatas), (error) => {
				if (!error) return;
				console.log("AsyncStorage store home category error: ", error.message);
			});
		}
		if (nextProps.goodsList
			&& !isObjectValueEqual(this.state.thematics,nextProps.goodsList)) {
			this.setState({thematics: nextProps.goodsList,loading:false});
			AsyncStorage.setItem(storageKeys.HOME_THEMATIC_KEY,JSON.stringify(nextProps.goodsList), (error) => {
				if (!error) return;
				console.log("AsyncStorage store home thematic error: ", error.message);
			});
		}
		if (nextProps.activityData
			&& !isObjectValueEqual(this.state.activitys,nextProps.activityData)) {
			this.setState({activitys: nextProps.activityData,loading:false});
			AsyncStorage.setItem(storageKeys.HOME_ACIVITY_KEY,JSON.stringify(nextProps.activityData), (error) => {
				if (!error) return;
				console.log("AsyncStorage store home activity error: ", error.message);
			});
		}
		if (nextProps.recommand
			&& !isObjectValueEqual(this.state.recommands, nextProps.recommand)) {
			this.setState({recommands: nextProps.recommand,loading:false});
			AsyncStorage.setItem(storageKeys.HOME_RECOMMAND_KEY,JSON.stringify(nextProps.recommand), (error) => {
				if (!error) return;
				console.log("AsyncStorage store home recommand error: ", error.message);
			});
		}
	};

	shouldComponentUpdate(nextProps, nextState) {
		if(isObjectValueEqual(this.state.recommands, nextState.recommands)
			&&isObjectValueEqual(nextState.thematics, this.state.thematics)
			&&isObjectValueEqual(nextState.activitys, this.state.activitys)
			&&isObjectValueEqual(nextState.categorys,this.state.categorys)
			&&isObjectValueEqual(nextState.banners,this.state.banners))
			return false;
		return true;
	}

	getDataFromLocalStorage() {
		AsyncStorage.getItem(storageKeys.HOME_BANNER_KEY, (error, result) => {
			if (error) {console.log("get banner data error:",error.message);return;}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({banners: array,loading: false});
			//console.log("get local banner data....");
		});
		AsyncStorage.getItem(storageKeys.HOME_CATEGORY_KEY, (error, result) => {
			if (error) {console.log("get category data error:",error.message);return;}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({categorys: array,loading: false})
		});
		AsyncStorage.getItem(storageKeys.HOME_ACIVITY_KEY, (error, result) => {
			if (error) {console.log("get activity data error:",error.message);return;}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({activitys: array,loading:false})
		});
		AsyncStorage.getItem(storageKeys.HOME_THEMATIC_KEY, (error, result) => {
			if (error) {console.log("get thematic data error:",error.message);return;}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({thematics: array,loading:false})
		});
		AsyncStorage.getItem(storageKeys.HOME_RECOMMAND_KEY, (error, result) => {
			if (error) {console.log("get recommand data error:",error.message);return;}
			if (!result) return;
			var array = JSON.parse(result);
			this.setState({recommands: array,loading:false})
		})
	}

	getDataFromNetwork() {
		this.props.fetchBanner();
		this.props.fetchActivity();
		this.props.fetchCategory();
		this.props.fetchGoodList();
		this.props.fetchRecommandGood();
		this.props.homePressDown();
	}

	componentDidUpdate() {
		loadEndTime = new Date().getTime();
		//release模式下，log打在native
		//NSLogger.writeLogToDocument("load use: "+(loadEndTime-loadStartTime) + "ms");
		console.log("load use: "+(loadEndTime-loadStartTime) + "ms")
	}

	renderBannerRow(data, pageID) {
		let imgURL = data.ad_image.url;
		return <img style={styles.activity_image} key={pageID} src = {imgURL} />
	}

	  renderBanners() {
		const banners = this.state.banners;
		if (!banners) { return<div></div>; } 
	
		var bannerSource = new ViewPagerDataSource({
			pageHasChanged: (p1, p2) => p1 !== p2
		});

		bannerSource = bannerSource.cloneWithPages(banners);
		
		return (
			<ViewPager
				dataSource={bannerSource}
				renderPage={this.renderBannerRow}
				autoPlay={true}
				isLoop={true}
			/>
		);	
	};

	renderCategorys() {
		const categorydata = this.state.categorys;
		if (!categorydata) { return; }

		return categorydata.categorys.map(function(item, i){
			return (
				<Link key={i} style={styles.category_item} to={{pathname:"/search",
					query:{brandId: item.categoryId,categoryName: item.categoryName}}}>
					<p style={styles.category_text}>{item.categoryName}</p>
				</Link>
			);
		})
	};

	renderSinglePoster() {
		const activitys = this.state.activitys;
		if (!activitys) {return <div></div>}

		return activitys.map(function(item, i) {
			var datas = {
				goodImage: item.img_main.url,
				goodName: item.name,
				goodIcon: item.img_flag.url,
				activityId: item.id
			}
			return (<SinglePoster {...datas} key={i}/>)
		})
	};

	renderGoodsSegment(rowData,sectionID, rowID) {
		return (

			<div style={styles.segemnt_bar}>
				<Link to={{pathname: "/GoodsDetail", query:{goodsId: rowData.goodsId} }}>
					<img src={rowData.goodsImages} style={styles.goodImage}/>
				</Link>
				<div style={styles.bottom_segment}>
					<p style={styles.good_title}>{rowData.goodsName}</p>
					<div style={styles.price_bar}>
						<p style={styles.good_price}>{'¥'+rowData.goodsSalePrice}</p>
						<p style={styles.good_oldprice}>{'¥'+rowData.goodsMsrp}</p>
					</div>
				</div>
			</div>
		)
	}

	renderGoodSement() {
		return goodsData.map(function(rowData, index){
			return (
				<div style={styles.segemnt_bar} key={index}>
					<img src={rowData.img} style={styles.goodImage}/>
					<div style={styles.bottom_segment}>
						<p style={styles.good_title}>{rowData.name}</p>
						<div style={styles.price_bar}>
							<p style={styles.good_price}>{'¥'+rowData.price}</p>
							<p style={styles.good_oldprice}>{'¥'+rowData.oldPrice}</p>
						</div>
					</div>
				</div>
			)
		})
	}

	renderRow(rowData, sectionID, rowID){
    	return (<ThematicPoster thematicData={rowData} />);
  	};

	renderThematic() {
		const thematic = this.state.thematics;
		if (!thematic) { return<div></div>; }

		return thematic.map(function(rowData, index) {
			return (<ThematicPoster thematicData={rowData} key={index} />);
		})
	}

	renderRecommand() {
		if (!this.state.recommands){return <div></div>};
		var goodSource = new ListViewDataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		goodSource = goodSource.cloneWithRows(this.state.recommands);
		return (
			<ListView 
				style={styles.goodListContainer}
				contentContainerStyle={styles.goodListContainer} 
				renderRow={this.renderGoodsSegment} 
				dataSource={goodSource} 
			/>
		)		
	}

	render() {
		//显示加载界面
		if (this.state.loading) {
			return (
				<div style={styles.contentView}>
                	<img style={styles.loadingImage} source={imageUrls.loading} />
                	<p style={styles.loadingText}>
                    	{STRING_RESOURCE.isLoadingWaitMinute}
                	</p>
            	</div>
			)
		}

		return (
			<div style={styles.boss_div}>
				<div style={styles.navigationBar}>
					<Link to="/SearchKeyWords">
					<div style={styles.search_nav}>
						<img src="common/images/ic_search@2x.png" style={styles.search_Image} />
					</div>
					</Link>
					<Link to="/setting">
						<img src="common/images/ic_message@2x.png" style={styles.category_img} />
					</Link>
				</div>

				<scrollView style={styles.scrollView} >
					<div style={styles.container}>

						<div className = "swiper-container swiperBanner" height={188} loop={true}>
					  		<div className = "swiper-wrapper">
						    	{this.renderBanners()}
					  		</div>
					  		<div className="swiper-pagination"></div>
						</div>

						<div style={styles.graydiv}></div>
						<div style={styles.categorys_div}>
							{this.renderCategorys()}
						</div>

      					{this.renderThematic()}
						{this.renderSinglePoster()}
						{this.renderRecommand()}
					</div>
				</scrollView>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
        categoryDatas: state.homeReducer.categoryDatas,
        bannerDatas: state.homeReducer.bannerDatas,
        goodsList: state.homeReducer.goodsList,
        recommand: state.homeReducer.recommandDatas,
        activityData: state.homeReducer.activitys
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchCategory,
        fetchActivity,
        fetchBanner,
        fetchGoodList,
        fetchRecommandGood,
				homePressDown
    }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(Home);
