/*
 * Name: ChoosePayWay
 * Creator: ZhangZhao
 * Create Time: 2016-09-12
 * Instruction: 对话框组件
 */
import React from 'react';
import styles from '../styles/AlertViewStyle';

export function AlertView (isShow, title, leftEventHandle,
    rightEventHandle, leftText = '取消', rightText = '确定') {
    if (isShow) {
        return (
            <div>
                <div style = {styles.backgroundView} />
                <div style = {styles.standardDialogView}>
                    <p style = {styles.standardDialogTitleText}>
                        {title}
                    </p>

                    <div style = {styles.standardDialogButtonView}>
                        <div
                            onClick = {leftEventHandle}
                            style = {styles.standardDialogLeftLink}
                        >
                            <p style = {styles.buttonText}>
                                {leftText}
                            </p>
                        </div>

                        <div
                            onClick = {rightEventHandle}
                            style = {styles.standardDialogLeftLink}
                        >
                        <p style = {styles.buttonText}>
                            {rightText}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
