import {registerRootComponent} from 'expo';

import React from "react";
import App from "./App";
import {Root} from "native-base";
import SamsonContext from "./store/SamsonContextProvider";
import {StateInspector} from "reinspect";

const RootApp = () => (
    <StateInspector name="Samson">
      <SamsonContext>
        <Root>
          <App/>
        </Root>
      </SamsonContext>
    </StateInspector>
);

registerRootComponent(RootApp);
