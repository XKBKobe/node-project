/**
 * @Name: ViewPager
 * @Author: jiao.shen
 * @Description: 与native协调统一的轮播图控件，实现优化
 */

'use strict'

var React = require('react');
var { PropTypes } = React;
import "babel-polyfill";
import "swiper";
import styles from '../styles/homeStyle';

export default class ViewPager extends React.Component {
  	componentDidMount(){
      var screenWidth = screen.width;
      var swiperBanner = new Swiper ('.swiperBanner', {
        pagination : '.swiper-pagination',
        width: screenWidth,
        height: 188,
        spaceBetween : 10,
        autoplay : 3000,
        loop : true,
        lazyLoading : true,
        });
  	}


    renderRow() {
      var dataSource = this.props.dataSource._dataBlob;
      if(!dataSource || !dataSource.length) return <div></div>
      var self = this;
      return dataSource.map(function(rowData, pageIdx) {
        let imgURL = rowData.ad_image.url;
		    return (
          <div className = "swiper-slide" key={pageIdx} style={{width: 375}}>
            <img style={styles.activity_image} src = {imgURL} />
          </div>
        )
      })
    };

  render() {
    return (
          <div className = "swiper-container swiperBanner" height={188} loop={true}>
              <div className = "swiper-wrapper">
                {this.renderRow()}
              </div>
              <div className="swiper-pagination"></div>
          </div>
    );
  }
}
