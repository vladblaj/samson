import {registerRootComponent} from 'expo';

import React from "react";
import App from "./App";
import {Root} from "native-base";
import SamsonContext from "./store/appStore";
import { StateInspector} from "reinspect";


const RootApp = () => (
    <StateInspector name="Samson">
    <Root>
      <SamsonContext>
        <App/>
      </SamsonContext>
    </Root>
    </StateInspector>
);

registerRootComponent(RootApp);
