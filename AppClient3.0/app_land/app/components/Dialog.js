/*
 * Name: ChoosePayWay
 * Creator: ZhangZhao
 * Create Time: 2016-09-12
 * Instruction: 对话框组件
 */
import React from "react";
import {View,Text,Image,TextInput,ScrollView,ListView,AsyncStorage}from "react-native";
import Button from "react-native-button";
import Swiper from "react-native-swiper";
import { Actions } from 'react-native-router-flux';
import styles from '../styles/Dialog';

export function standardDialog(isShow, title, leftEventHandle, rightEventHandle, leftText = '确定', rightText = '取消') {
    if (isShow) {
        return <View>
                <View style={styles.backgroundView} />
                <View style={styles.standardDialogView}>
                    <Text style={styles.standardDialogTitleText}>
                        {title}
                    </Text>

                    <View style={styles.standardDialogButtonView}>
                        <Button to={leftEventHandle} style={styles.standardDialogLeftLink}>
                            <Text style={styles.buttonText}>
                                {leftText}
                            </Text>
                        </Button>

                        <Button onPress={rightEventHandle} style={styles.standardDialogRightButton}>
                            {rightText}
                        </Button>
                    </View>
                </View>
            </View>;
    }
}