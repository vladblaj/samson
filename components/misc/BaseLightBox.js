import React, {useEffect, useState} from 'react';
import {Button, Text} from 'native-base';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {THEME} from "../../color-theme";

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

const BaseLightBox = (props) => {

  const [opacity, setOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true
    }).start();
  }, [])

  const closeModal = () => {
    Animated.timing(opacity, {
      duration: 500,
      toValue: 0,
      useNativeDriver: true
    }).start(Actions.pop);
  };

  const renderLightBox = () => {
    const {children, horizontalPercent = 1, verticalPercent = 1} = props;
    const height = verticalPercent
        ? deviceHeight * verticalPercent
        : deviceHeight;
    const width = horizontalPercent
        ? deviceWidth * horizontalPercent
        : deviceWidth;
    return (
        <View
            style={{
              borderRadius:10,
              width,
              height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: THEME.SECONDARY_COLOR,
            }}>
          {children}
          <Button style={{alignSelf: 'center', backgroundColor: THEME.SECONDARY_COLOR}}
                  onPress={closeModal}><Text style={{color:THEME.FILLER_COLOR}}>Close</Text></Button>
        </View>
    );
  };

  return (
      <Animated.View style={[styles.container, {opacity}]}>
        {renderLightBox()}
      </Animated.View>
  );

}
export default BaseLightBox;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.6)',
    position: 'absolute',
    top: -100,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});