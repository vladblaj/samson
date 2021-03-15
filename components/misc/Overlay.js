import React, {useEffect} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from "react-redux";
import actions from "../../actions/actions";
import {Icon, Title, View} from "native-base";
import {useState} from "reinspect";
import YoutubeSearch from "../youtube-search/YoutubeSearch";
import {Actions} from "react-native-router-flux";
import DropDownPicker from 'react-native-dropdown-picker';

const Overlay = () => {
  const dispatch = useDispatch();
  const [meetingCardName, setMeetingCardName] = useState();
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [country, setCountry] = useState();
  const toggleOverlay = () => {
    dispatch(actions.toggle({name: 'searchOverlay'}))
  };

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 120,
      toValue: 1,
    }).start();
  }, [])

  const renderClose = () => {
    return (
        <View style={styles.closeBtnContainer}>
          <TouchableOpacity onPress={Actions.pop}>
            <Text style={{color: 'white'}}>Close</Text>
          </TouchableOpacity>
        </View>
    );
  };
  return (
      <Animated.View style={[styles.container, {opacity: opacity}]}>
        <View style={styles.overlayContent}>
          {renderClose()}
          <Title style={styles.title}>New Meeting</Title>
          <DropDownPicker
              placeholder="Select meeting type"
              items={[
                {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900"/>, hidden: true},
                {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900"/>},
                {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900"/>},
              ]}
              defaultValue={country}
              containerStyle={{height: 40, width: '80%', marginBottom: 10}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',

              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => {
                setCountry(item.value)
              }}
          />
          <YoutubeSearch/>

        </View>
      </Animated.View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 100,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  overlayContent: {
    alignItems: "center",
    backgroundColor: 'rgb(25,25,25)',
    height: '60%',
    width: '90%',
    opacity: 1,
    borderRadius: 4
  },
  title: {
    color: 'rgb(255,255,255)',
    marginBottom: 20
  },
  searchInput: {
    color: 'rgb(255,255,255)'
  },
  closeBtnContainer: {
    width: '100%',
    color: 'white',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
export default Overlay;
