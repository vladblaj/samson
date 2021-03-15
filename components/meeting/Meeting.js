import React from 'react';
import {StyleSheet, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import MeetingCard from "./MeetingCard";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";

const Meeting = (props) => {
  const {
    block,
    set,
    onChange,
    Clock,
    Value,
    startClock,
    stopClock,
    clockRunning,
    cond,
    spring,

  } = Animated;
  const {id} = props;
  const data = useSelector(state => state.meetings[id])

  const dispatch = useDispatch();
  const array_move = (old_index, new_index) => {
    const dataClone = JSON.parse(JSON.stringify(data));
    if(old_index===data.length-1 || new_index===data.length-1)
      return dataClone
    if (new_index >= dataClone.length) {
      let k = new_index - dataClone.length + 1;
      while (k--) {
        dataClone.push(undefined);
      }
    }
    dataClone.splice(new_index, 0, dataClone.splice(old_index, 1)[0]);
    dispatch(actions.setMeetingData({id: id, value: dataClone}));
    return dataClone; // for testing
  };

  const renderItem = ({item, drag, isActive}) => {
    return (
        <MeetingCard
            item={item}
            drag={drag}
            isActive={isActive}
            scale={isActive ? animState.position : 1}
        />
    );
  };

  const isActive = new Animated.Value(0);
  const clock = new Clock();
  const animConfig = {
    damping: 20,
    mass: 0.4,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
    toValue: new Value(0),
  };
  const animState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(1),
    time: new Value(0),
  };

  return (
      <View style={styles.container}>
        <DraggableFlatList
            data={data}
            renderItem={renderItem}
            onDragBegin={(rowNumber) => {rowNumber===data.length-1?isActive.setValue(0):isActive.setValue(1)}}
            onRelease={(item) => isActive.setValue(0)}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={(swapItem) => {
              array_move(swapItem.from, swapItem.to)
            }}
        />
        <Animated.Code>
          {() =>
              block([
                onChange(isActive, [
                  set(animConfig.toValue, cond(isActive, 1.5, 1)),
                  startClock(clock),
                ]),
                cond(clockRunning(clock), [
                  spring(clock, animState, animConfig),
                  cond(animState.finished, [
                    stopClock(clock),
                    set(animState.finished, 0),
                    set(animState.time, 0),
                    set(animState.velocity, 0),
                  ]),
                ]),
              ])
          }
        </Animated.Code>
      </View>
  );
}

export default Meeting;

const styles = StyleSheet.create({
  container: {
    height: 480,
    margin: 5,
    flex: 1,
    backgroundColor: 'rgb(32,16,23)',
  },
  rowItem: {
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