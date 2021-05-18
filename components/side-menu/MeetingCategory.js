import {StyleSheet, View, TouchableOpacity} from "react-native";
import {Icon, Input, Item, Title} from "native-base";
import React, {useState} from "react";
import {THEME} from "../../color-theme";

export const MeetingCategory = (props) => {
  const {item, save, setSelectedCategory, selected} = props;
  const [name, setName] = useState();
  return (<View style={[styles.item, {backgroundColor: selected ? THEME.SELECTED : THEME.FILLER_COLOR}]}>
    {item.isEmpty ? (
            <Item>
              <Input style={{height: '75%'}} placeholder='Category Name' onChangeText={setName}/>
              <TouchableOpacity onPress={() => save(item.id, name)}>
                <Icon active name='checkbox-outline' onPress={() => save(item.id, name)}/>
              </TouchableOpacity>
            </Item>) :
        (
            <Title style={styles.title} onPress={() => setSelectedCategory(item.id)}>{item.name}</Title>
        )}

  </View>)
}
const styles = StyleSheet.create({

  item: {
    borderRadius: 4,
    flex: 1,
    marginVertical: 2,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 18,
  },
});

