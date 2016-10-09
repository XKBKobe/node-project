'use strict';

var React = require('react');
var deviceWidth = window.innerWidth;;
var DOT_SIZE = 6;
var DOT_SAPCE = 4;

var DefaultViewPageIndicator = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activePage: React.PropTypes.number,
    pageCount: React.PropTypes.number
  },

  getInitialState() {
    return {
      viewWidth: 0,
    };
  },

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    var tab = { alignItems: 'center' };
    var dot = {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#E0E1E2',
        marginLeft: DOT_SAPCE,
        marginRight: DOT_SAPCE,
    };
    return (
      <button style={tab} key={'idc_' + page} onClick={() => this.props.goToPage(page)}>
        <div style={dot} />
      </button>
    );
  },

  render() {
    var pageCount = this.props.pageCount;
    var itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
    var offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;

    //var left = offset;
    var offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    })

    var indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i))
    }

    var tabs = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    };
    var curDot = {
        position: 'absolute',
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#80ACD0',
        margin: DOT_SAPCE,
        bottom: 0,
    };
    return (
      <div style={styles.tabs}
        onLayout={(event) => {
            var viewWidth = event.nativeEvent.layout.width;
            if (!viewWidth || this.state.viewWidth === viewWidth) {
              return;
            }
            this.setState({
              viewWidth: viewWidth,
            });
          }}>
        {indicators}
        <div style={[styles.curDot, {left}]} />
      </div>
    );
  },
});

module.exports = DefaultViewPageIndicator;
