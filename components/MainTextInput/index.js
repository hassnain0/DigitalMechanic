import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../themes";
import styles from "./styles";

import { TextInput } from "react-native-paper";
import Text from "../Text";
// import Icon from "../../helpers/Icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const MainTextInput = (props) => {
    const [isSecure, setisSecure] = useState(props.secureTextEntry);

    useEffect(() => {
        setisSecure(props.secureTextEntry);
    }, [props.secureTextEntry]);

    const {
        secureTextEntry,
        onChangeText,
        keyboardType,
        autoCorrect,
        autoCapitalize,
        label,
        placeholder,
        rightIcon,
        passowrdhide,
        rightRenderIcon,
        ...rest
    } = props;

    const onChange = (text) => onChangeText(text);

    const renderRightIcon = () => {
        if (rightIcon && rightRenderIcon) {
            return rightRenderIcon;
        }

        return null;
    };

    const renderHidePasswrd = () => {
        if (rightIcon && passowrdhide) {
            return (
                <MaterialCommunityIcons
                    onPress={() => setisSecure(!isSecure)}
                    name={!isSecure ? "eye-outline" : "eye-off-outline"}
                    style={styles.passwordSecureiconStyle}
                />
            );
        }

        return null;
    };

    const l_keyboardType = keyboardType ? keyboardType : "default";
    const l_autoCorrect = autoCorrect ? autoCorrect : false;
    const l_autoCapitalize = autoCapitalize ? autoCapitalize : "words";

    return (
        <View style={styles.main}>
            <View style={styles.iconsRound}>{props.Icon}</View>
            <TextInput
                InputProps={{ disableUnderline: true }}
                underlineColorAndroid="transparent"
                borderWidth={0}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                label={label}
                placeholder={placeholder}
                placeholderTextColor={Colors.placeholderColor}
                mode="flat"
                underlineColor={Colors.borderColor}
                theme={{ colors: { primary: Colors.themeColor } }}
                style={styles.input}
                dense={true}
                onChangeText={onChange}
                keyboardType={l_keyboardType}
                autoCorrect={l_autoCorrect}
                autoCapitalize={l_autoCapitalize}
                secureTextEntry={isSecure}
                {...rest}
            />
            {renderHidePasswrd()}
            {renderRightIcon()}
        </View>
    );
};

export default MainTextInput;

MainTextInput.propTypes = {
    secureTextEntry: PropTypes.bool,
};

MainTextInput.defaultProps = {
    secureTextEntry: false,
};