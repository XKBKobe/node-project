var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "searchBarView": {
        "flexDirection": "row",
        "flex": 9,
        "height": 44,
        "alignItems": "center"
    },
    "searchView": {
        "flexDirection": "row",
        "opacity": 0.7,
        "backgroundColor": "#f0f0f0",
        "height": 28.000000000000004,
        "width": 275,
        "borderRadius": 4,
        "alignItems": "center"
    },
    "searchIcon": {
        "height": 16,
        "width": 16,
        "marginLeft": 9
    },
    "clearInputIcon": {
        "height": 15,
        "width": 15,
        "marginRight": 9
    },
    "inputStyle": {
        "flex": 1,
        "fontSize": 14.000000000000002,
        "color": "#333333",
        "marginLeft": 5,
        "marginRight": 5
    },
    "searchTextView": {
        "flex": 1,
        "height": 44,
        "alignItems": "center",
        "justifyContent": "flex-end"
    },
    "contentView": {
        "flex": 1,
        "flexDirection": "column",
        "paddingBottom": 30,
        "marginTop": 55.00000000000001,
        "backgroundColor": "#ffffff"
    },
    "latelySearchBar": {
        "flexDirection": "row",
        "paddingLeft": 15,
        "paddingRight": 15,
        "alignItems": "center",
        "justifyContent": "space-between",
        "marginTop": 28.000000000000004
    },
    "hotSearchBar": {
        "flexDirection": "row",
        "paddingLeft": 15,
        "paddingRight": 15,
        "alignItems": "center",
        "marginTop": 16
    },
    "dustbinIcon": {
        "height": 16,
        "width": 14.000000000000002
    },
    "noLatelySearchView": {
        "flexDirection": "row",
        "paddingLeft": 15,
        "alignItems": "center",
        "marginTop": 13
    },
    "itemsContentView": {
        "flexDirection": "row",
        "paddingLeft": 15,
        "paddingRight": 15,
        "alignItems": "center",
        "flexWrap": "wrap"
    },
    "itemView": {
        "flexDirection": "row",
        "justifyContent": "center",
        "alignItems": "center",
        "height": 28.000000000000004,
        "borderRadius": 4,
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderColor": "#ff6700",
        "paddingLeft": 10,
        "paddingRight": 10,
        "marginTop": 10,
        "marginRight": 10
    },
    "textStyle1": {
        "fontSize": 14.000000000000002,
        "color": "#333333"
    },
    "textStyle2": {
        "fontSize": 12,
        "color": "#999999"
    },
    "textStyle3": {
        "fontSize": 12,
        "color": "#ff6700"
    }
});