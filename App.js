import React from 'react';
import SamsonApp from "./components/app-base/SamsonApp";
import {Drawer, Lightbox, Router, Scene} from "react-native-router-flux";
import EditMeetingScene from "./components/misc/EditMeetingScene";
import SideMenu from "./components/side-menu/SideMenu";
import SamsonHeader from "./components/app-base/SamsonHeader";
import CropVideoOverlay from "./components/meeting/CropVideoOverlay";
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Deprecation in \'createStackNavigator\':', 'Deprecation in \'navigationOptions\':',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
  'Did not receive response to shouldStartLoad in time, defaulting to YES',
  'Warning: componentWillUpdate has been renamed, and is not recommended for use.',
  'Did not receive response to shouldStartLoad in time, defaulting to YES',
  'startLoadWithResult invoked with invalid lockIdentifier:',
  'Error evaluating injectedJavaScript: This is possibly due to an unsupported return type.',
  'Animated: `useNativeDriver` was not specified.']);
LogBox.ignoreAllLogs();
export default function App() {
  return (
      <Router navBar={SamsonHeader}>
        <Scene>
          <Drawer
              key="sideMenu"
              contentComponent={SideMenu}
              tapToClose={true}
              drawerWidth={300}
              captureGestures={true}
              panOpenMask={0.02}
              openDrawerOffset={0.2}
              panCloseMask={0.2}
              negotiatePan={true}
              tweenHandler={(ratio) => ({
                main: {opacity: Math.max(0.54, 1 - ratio)}
              })}>
            <Lightbox>
              <Scene key="root" hideNavBar={true}>
                <Scene key="samsonApp" initial={true} component={SamsonApp}/>
                <Scene key="youtubeSearchOverlay" component={EditMeetingScene}/>
              </Scene>
              <Scene key="cropVideo" component={CropVideoOverlay}/>
            </Lightbox>
          </Drawer>
        </Scene>
      </Router>
  );
}
