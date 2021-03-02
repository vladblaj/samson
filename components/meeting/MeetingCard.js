import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import React from "react";

const MeetingCard = ({
  item,
  drag,
  isActive,
  scale,
}) => {
  return (
      <TouchableOpacity style={styles.rowItem} onLongPress={drag}>
        <Animated.View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: item.backgroundColor,
              elevation: isActive ? 10 : 0,
              shadowRadius: isActive ? 10 : 0,
              shadowColor: isActive ? 'black' : 'transparent',
              shadowOpacity: isActive ? 0.25 : 0,
              transform: [{scaleX: scale}, {scaleY: scale}],
              borderRadius: 4
            }}>
          <Text style={styles.text}>{item.label}</Text>
        </Animated.View>
      </TouchableOpacity>
  );
};

export default MeetingCard;

const styles = StyleSheet.create({
  rowItem: {
    backgroundColor: 'rgb(4,4,4)',
    height: 100,
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
    flex: 1,
    textAlign: 'center',
  },
});