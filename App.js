import React from 'react';
import SamsonApp from "./components/app-base/SamsonApp";
import {Lightbox, Router, Scene} from "react-native-router-flux";
import Overlay from "./components/misc/Overlay";

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
