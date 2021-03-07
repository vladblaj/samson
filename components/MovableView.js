import React, {useEffect} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useState} from "reinspect";
import AnimatedHideView from "react-native-animated-hide-view";

const MovableView = props => {

  const [pan, setPan] = useState(new Animated.ValueXY(), 'MovableView-pan');
  const [disabled, setDisable] = useState(props.disabled, 'MovableView-disabled');
  const [xOffset, setXOffset] = useState(0, 'MovableView-xOffset');
  const [yOffset, setYOffset] = useState(0, 'MovableView-yOffset');

  useEffect(() => {
    if (typeof props.onMove === 'function') {
      pan.addListener((values) => props.onMove(values));
    }
    return () => {
      pan.removeAllListeners();
    };
  }, [])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const {dx, dy} = gestureState
      return dx > 2 || dx < -2 || dy > 2 || dy < -2
    },
    onPanResponderGrant: () => {
      pan.setOffset({x: xOffset, y: yOffset});
      props.onDragStart();
    },
    onPanResponderMove:
        Animated.event([null, {
          dx: pan.x,
          dy: pan.y,
        }], {useNativeDriver: false}),
    onPanResponderRelease: (e, gestureState) => {
      const xOffsetVar = xOffset + gestureState.dx;
      const yOffsetVar = yOffset + gestureState.dy;
      setXOffset(xOffsetVar);
      setYOffset(yOffsetVar)
      props.onDragEnd();
    }
  });

  const changeDisableStatus = () => {
    setDisable(!disabled);
  };

  const onPresss = () => {
    console.log('aaaaaaa');
  }

  return <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, props.style, pan.getLayout()]}>
    <AnimatedHideView
        visible={props.isVisible} style={styles.container}>
      {props.children}
    </AnimatedHideView>
  </Animated.View>
}
export default MovableView;
MovableView.propTypes = {
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onMove: PropTypes.func,
  disabled: PropTypes.bool,
  isVisible: PropTypes.bool
};

MovableView.defaultProps = {
  onDragStart: () => {
  },
  onDragEnd: () => {
  },
  disabled: false,
};
