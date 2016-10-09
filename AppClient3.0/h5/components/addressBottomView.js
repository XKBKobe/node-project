/**
 * Created by zhangheng on 2016/8/1.
 *
 *  編輯地址界面  省市县  选中地址
 */

import React from "react";
import itemStyles from "../styles/addressItemStyles";


export default class AddressBottomView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listState: this.props.list,
            listItemState: this.props.listItem,
            selectBg: this.props.listItem[this.props.listItem.length-1].bgColor,
        }
    }


    //选项栏
    chooseItem(index) {

        if (this.props.updateItemChoosen) {
            this.props.updateItemChoosen(index)
        }
    }


    render() {

        var showArea = this.state.listItemState.length-1;
        var selectBg = this.state.selectBg;
        var selectBg_D = itemStyles.selectAddressText_P;
        var unSelectBg_D = itemStyles.unSelectAddressText_P;

        var _Fthis = this;
        return (
            <div>
                <div style={itemStyles.chooseItem_D}>
                    {
                        this.state.listItemState.map(function (item, index) {

                            var tabButton_D = item.bgColor == selectBg ? selectBg_D : unSelectBg_D;
                            var valueText = _Fthis.state.listState[index];
                            var textArea = index==showArea ? valueText.name : valueText.name+" > ";
                            return <p style={tabButton_D}
                                      key={index}
                                      onClick={()=> _Fthis.chooseItem(index)}>{textArea}</p>
                        })
                    }
                </div>
            </div>
        )
    }
}
