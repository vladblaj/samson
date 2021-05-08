import React from 'react';
import SamsonApp from "./components/app-base/SamsonApp";
import {Drawer, Lightbox, Router, Scene} from "react-native-router-flux";
import Overlay from "./components/misc/Overlay";
import SideMenu from "./components/side-menu/SideMenu";
import SamsonHeader from "./components/app-base/SamsonHeader";

export default function App() {
  return (
      <Router>
        <Lightbox key="overlay" hideNavBar={true}>
          <Scene key="root" hideNavBar={true}>
            <Scene key="samsonApp" initial={true} component={SamsonApp}/>
          </Scene>
          <Scene key="youtubeSearchOverlay" component={Overlay}/>
        </Lightbox>
      </Router>
  );
}
