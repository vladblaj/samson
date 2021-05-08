import React, {useState} from "react";
import {Text, View, Title, Icon,Item} from "native-base";
import {StyleSheet} from "react-native";
import {THEME} from "../../color-theme";
import MeetingCategoryList from "./MeetingCategoryList";
import {useSelector} from "react-redux";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

const SideMenu = (props) => {
  const store = useSelector(state => state);
  const [isToggled, setIsToggled] = useState(false);
  return (

      <View style={styles.container}>
        <Collapse style={styles.collapsible} onToggle={()=>setIsToggled(!isToggled)}>
          <CollapseHeader>
            <View style={styles.header}>
              <Title style={styles.title}>Categories</Title>
              <Icon name={isToggled?'caret-down':'caret-up'} style={{color: THEME.FILLER_COLOR}}/>
            </View>

          </CollapseHeader>
          <CollapseBody>
        <MeetingCategoryList categories={store.categories}/>
          </CollapseBody>
        </Collapse>
        <View style={styles.footer}><Text>Footer</Text></View>
      </View>

  );

}
const styles = StyleSheet.create({
  header:{
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    color: THEME.FILLER_COLOR
  },
  collapsible:{

    flex: 1,
    flexGrow: 11
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: THEME.SECONDARY_COLOR,
  },
  footer: {
    flexGrow: 1,
    flex: 1,
    height: 10,
    width: '100%',
    backgroundColor: THEME.FILLER_COLOR,
  }

});
export default SideMenu;