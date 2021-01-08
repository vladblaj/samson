import {registerRootComponent} from 'expo';

import React from "react";
import App from "./App";
import { store } from './store/appStore';
import {Provider} from 'react-redux';
import {Root} from "native-base";

const RootApp = () => (
    <Root>
      <Provider store={store}>
        <App/>
      </Provider>
    </Root>
);

registerRootComponent(RootApp);
