import {registerRootComponent} from 'expo';

import React from "react";
import App from "./App";
import {Root} from "native-base";
import SamsonContext from "./store/appStore";

const RootApp = () => (
    <Root>
      <SamsonContext>
        <App/>
      </SamsonContext>
    </Root>
);

registerRootComponent(RootApp);
