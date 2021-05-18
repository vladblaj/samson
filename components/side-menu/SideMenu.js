import React, {useState} from "react";
import {Icon, Title, View} from "native-base";
import {StyleSheet} from "react-native";
import {setTheme, THEME, THEME_LIGHT} from "../../color-theme";
import MeetingCategoryList from "./MeetingCategoryList";
import {useDispatch, useSelector} from "react-redux";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import { Switch } from 'react-native-switch';
import actions from "../../actions/actions";

const SideMenu = (props) => {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const toggleThemeSwitch = (val) =>{

    dispatch(actions.setFieldValue({name: 'isLightTheme', value: val}));
  }
  return (

      <View style={styles.container}>
        <Collapse style={styles.collapsible} onToggle={() => setIsToggled(!isToggled)}>
          <CollapseHeader>
            <View style={styles.header}>
              <Title style={styles.title}>Categories</Title>
              <Icon name={isToggled ? 'caret-down' : 'caret-up'} style={{color: THEME.FILLER_COLOR}}/>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <MeetingCategoryList categories={store.categories}/>
          </CollapseBody>
        </Collapse>
        <View style={styles.footer}>
          <Title>Theme</Title>
          <View style={{width: 8}}/>
          <Switch
              value={store.isLightTheme}
              onValueChange={toggleThemeSwitch}
              disabled={false}
              activeText={'Light'}
              inActiveText={'Dark'}
              circleSize={30}
              barHeight={30}

              backgroundActive={THEME.SELECTED}
              backgroundInactive={'gray'}
              circleActiveColor={THEME.SECONDARY_COLOR}
              circleInActiveColor={THEME.SECONDARY_COLOR}
              changeValueImmediately={false}
               innerCircleStyle={{borderColor: THEME.SECONDARY_COLOR, alignItems: "center", justifyContent: "center"}} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={3} // multipled by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
          />
          </View>
      </View>

  );

}
const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    color: THEME.FILLER_COLOR
  },
  collapsible: {
    flex: 1,
    flexGrow: 8
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: THEME.SECONDARY_COLOR,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flex: 1,
    height: 10,
    width: '100%',
    backgroundColor: THEME.FILLER_COLOR,
  }

});
export default SideMenu;