# flipper-plugin-react-native-redux-debugger
Flipper desktop plugin for react native redux logs via [Client Plugin](https://github.com/aseemc/redux-middleware-flipper)

> ❗For Flipper setup in your react native project, please refer to the [setup guide.](https://fbflipper.com/docs/getting-started/react-native)

![Workflow](./assets/rn-redux-flipper.gif)

## Features ✨

- Log all dispatched redux actions
- Show details about the action dispatched (action, state diff and the current state)
- Custom action dispatcher
- Replay selected actions
- Search for a specific action type

## Setup guide ✍🏻

- Install the `redux-middleware-flipper` and `react-native-flipper`
```bash
yarn add redux-middleware-flipper react-native-flipper

# for iOS
cd ios && pod install
```
- Add the middleware in dev mode in your redux store setup file
```javascript
if (__DEV__) {
  const reduxDebugger = require('redux-middleware-flipper').default;
  middleware.push(reduxDebugger());
}
```
- Open Flipper desktop app and install the plugin 
```
Manage Plugins > Install Plugins > search "RNReduxDebugger" > Install
```

## References 📚

- Getting started with [Flipper](https://fbflipper.com/docs/tutorial/intro)

## Motivation

- This project is inspired by [Flutter version](https://github.com/leanflutter/flipper-plugin-reduxinspector)