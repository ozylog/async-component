# async-component
Simple Async Component for React

[![Travis](https://img.shields.io/travis/ozylog/async-component.svg)](https://travis-ci.org/ozylog/async-component) [![npm](https://img.shields.io/npm/dt/@ozylog/async-component.svg)](https://www.npmjs.com/package/@ozylog/async-component)

## Installation
```
npm install @ozylog/async-component
```

## Usage Example
```javascript
'use react';

import createAsyncComponent from '@ozylog/async-component';
import DashboardLoaderComponent from './DashboardLoaderComponent';
import {isAuthenticated} from './authApi';

const DashboardContainer = createAsyncComponent({
  getComponent: async () => {
    let component;

    try {
      const isAuth = await isAuthenticated();

      if (isAuth) {
        component = await System.import('./../containers/DashboardContainer');
      } else {
        component = await System.import('./../containers/ErrorForbiddenComponent');
      }
    } catch (err) {
      component = await System.import('./../containers/ErrorInternalServerComponent');
    }

    return component;
  },
  LoaderComponent: DashboardLoaderComponent
});

export default (
  <Route path='/dashboard' render={() => <DashboardContainer />} />
);
```

## License
MIT
