import App from "./App";
import {Root} from "native-base";
import SamsonContext from "./store/SamsonContextProvider";
import {StateInspector} from "reinspect";
import {registerRootComponent} from 'expo';
import React from "react";

const RootApp = () => {
  return (
      <StateInspector name="Samson">
        <SamsonContext>
          <Root>
            <App/>
          </Root>
        </SamsonContext>
      </StateInspector>
  );
}
registerRootComponent(RootApp);
