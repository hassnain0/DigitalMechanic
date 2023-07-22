import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Colors, Metrics } from "../../themes";
import styles from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import Text from "../Text";
import { ThemeHelper } from "../../helpers";
const ButtonIcon = (props) => {
    return (
        <LinearGradient
            colors={Colors.gradientColor}
            style={styles.main}>

            <TouchableOpacity
                activeOpacity={1}
                style={{
                    ...styles.buttonTouch,

                }}
                onPress={() => props.btnPress()}>
                <View style={styles.iconsRound}>{props.Icon}</View>
                <Text style={styles.buttonText} type={"heading"}>
                    {props.label}
                </Text>
            </TouchableOpacity>

        </LinearGradient>
    );
};
export default ButtonIcon