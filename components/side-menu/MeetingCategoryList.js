import React from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";
import {MeetingCategory} from "./MeetingCategory";
import {THEME} from "../../color-theme";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Itemsssss',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const MeetingCategoryList = (props) => {
  const dispatch = useDispatch();
  const selectedMeeting = useSelector(state => state.selectedMeeting)
  const {categories} = props;
  const renderItem = ({item}) => (
      <MeetingCategory item={item} selected={selectedMeeting===item.id} save={saveCategory} setSelectedCategory={setSelectedCategory}/>
  );
  const addNewCategory = () => {
    dispatch(actions.addEmptyCategory());
  }
  const saveCategory = (id, name) => {
    dispatch(actions.saveCategory({id, name}));
  }
  const setSelectedCategory = (id) =>{
    dispatch(actions.setFieldValue({name: 'selectedMeeting', value: id}));
  }
  const deleteCategory = () =>{
    dispatch(actions.deleteSelectedCategory());
  }
  const duplicateCategory= ()=>{
    dispatch(actions.duplicateSelectedCategory());
  }
  return (
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.meetingCategoryList}
                  data={categories}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
        />
        <View style={styles.controlButtons}>
          <Button color = {THEME.FILLER_COLOR} onPress={addNewCategory}  small style={{width: 90, justifyContent: 1}}>
            <Text>Add</Text>
          </Button>
          <Button danger onPress={deleteCategory} small  style={{width: 90, justifyContent: 1}}>
            <Text>Delete</Text>
          </Button>
          <Button warning  onPress={duplicateCategory} small style={{width: 90, justifyContent: 1}}>
            <Text>Duplicate</Text>
          </Button>
        </View>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  controlButtons: {
    color: THEME.FILLER_COLOR,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  meetingCategoryList: {
    flexGrow: 0
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    marginVertical: 2,
  },
  title: {
    fontSize: 32,
  },
});

export default MeetingCategoryList;