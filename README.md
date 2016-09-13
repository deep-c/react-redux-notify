# react-redux-notify
A simple and flexible notifications component built for use with React and Redux.

![A quick look.](http://i.giphy.com/26gJzFSGpRBCd57y0.gif)


## Overview and Install
React redux notify is a simple yet flexible component for displaying notifications. You can simply include the component within your app and use the default settings or you can choose to customize it in many different ways. Easiest way to get up and running is to install it via npm.

```javascript
npm install react-redux-notify --save
```

After which you can import the component and the default styles for use:
```javascript
import Notify from 'react-redux-notify';
import 'react-redux-notify/dist/ReactReduxNotify.css';
```

You can also use the standalone build by including the following css and js files (both minified and unminified exist). You will need to ensure that you have **react**, **redux**, **react-redux** dependecies also included externally.
```javascript
<script src="dist/ReactReduxNotify.min.js"></script>
<link rel="stylesheet" href="dist/ReactReduxNotify.min.css">
```

## Demo and Example
An example can be seen by opening the `examples/index.html` file in your browser.

## Usage
Import the reducer and add it to your redux store as key `notifications`.
```javascript
import notifyReducer from 'react-redux-notify';

const reducers = combineReducers({ notifications: notifyReducer });
const store = createStore(reducers);
```
Add the notify component to your application. There are a number of props you can pass into the `Notify` component that allow you to customize it (see Options below).
```javascript
import {Notify} from 'react-redux-notify';

<Notify />
```

To create a notification import the `createNotification` action creator and dispatch it with your notification configuration obejct. The notification configuration is just a plain object whose keys are passed along to the `Notification` component. By default there are 4 types of notifications `SUCCESS`, `WARNING`, `ERROR` and `INFO`. 
```javascript
import { connect } from 'react-redux';
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notifications';
const mySuccessNotification = {
  message: 'You have been logged in!',
  type: NOTIFICATION_TYPE_SUCCESS,
  duration: 0,
  canDimiss: true,
  icon: <i className="fa fa-check" />
}

class MyComponent extends React.Component {
  handleClick(){
    const {createNotification} = this.props;
    createNotification(mySuccessNotification);
  }

  render(){
    return (
      <div>
        <Notify />
        <button onClick={this.handleClick.bind(this)}>Dispatch Notification!</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createNotification: (config) => {
      dispatch(createNotification(config))
  },
})

export default connect(null, mapDispatchToProps)(MyComponent)
```

## Options

There are a number of options that can be used to change the look and behaviour of both the `Notify` component as well as the `Notification` component itself.

### Notify Container Component
| Property | Type | Default | Default Options | Description |
| -------- | ---- | ------- | --------------- | ----------- |
| styles | `object` | CSSModules created mapping (see below) |  | The default styles created and mapped through CSSModules for the component. 
| customStyles | `object` | undefined |  | A custom styles object that gets merged into the default styles and allows for the overriding or creation of individual styles using your own classes.
| transitionDurations | `object` | `{ enter : 160, leave: 400 }` |  | React CSS Transition Group timeout values for enter and leave events. If you change the transition classes then you can use these to change the timeout values for your animation.
| position | `string` | 'TopRight' | `'TopRight', 'BottomRight', 'BottomLeft', 'TopLeft'` | Default options for where the Notify container will be positioned to render you components. Again this can be extended/customised through your own classes and this prop.

#### Notify Components Styles
This is the default style mapping created. You can choose to override these with your own classes using the `customStyles` prop explained above. You can view what these CSS classes do by default in the `src/components/Notify/` folder for `react-redux-notify` in the `node_modules` directory.
```javascript
{
  containerTopLeft:
  containerTopRight:
  containerBottomLeft:
  containerBottomRight:
  wrapper:
  enter:
  leave:
  notification-show:
  notification-hide:
  notification-shrink:
}
```
Furthermore since the positioning of the Notify component is done purely through css and the class is dynamically generated based on the `container${position}` props value, you can create your own unique position simply.
```css
.CustomBottomPosition {
  ....
  ....
}
```
```javascript
import {Notify} from 'react-redux-notify';
const myCustomStyles = {
  containerCustomBottomPosition: 'CustomBottomPosition'
}
<Notify customStyles={myCustomStyles} position={'CustomBottomPosition'}/>
```

#### Action creators
There are 3 action creators available which are all able to be imported from `react-redux-notify`.

| Action | Args | Description |
| ------ | ---- | ----------- |
| createNotification | Takes a single `object` as its only argument. (see Notification Component below) | The action creator to use when creating a new notification.
| removeNotification | Takes a `number` as its only argument | Removes the notification with the corresponding ID.
| removeAllNotifications |   | Removes all notifications. 

### Notification Component
The default notification component has the following configuration options which get passed when creating your notification object.

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| id | `number` | `Date.now()` | The unique identifier for each notification. **This cannot be changed**.
| type | `string` |   | A string that describes the type of notification wanting to be created. By default there are 4 types which can be used `SUCCESS`, `ERROR`, `WARNING`, `INFO`. These can also be imported as constants `NOTIFICATION_TYPE_${TYPE}`.
| canDimiss | `boolean` | true | Whether the notification allows the user to close the notification.
| duration | `number` | 2000 | Duration until the notification automatically closes. If set to 0 the notification will not close automatically.
| icon | `string`, `element` |  | The text or node to be rendered as the notification icon.
| customStyles | `object` |   | A custom styles object that gets merged into the default styles and allows for the overriding or creation of individual styles using your own classes.
| customComponent | `element` |   | A custom component that will be used for notification. It will get passed all these props as well as any custom object properties you choose to add to the notification configuration object.
| acceptBtn | `object` Requires the following properties : `{ handler: function, icon: element or string` |   | A function that will get called upon clicking the rendered accept button.
| denyButton | `object` Requires the following properties : `{ handler: function, icon: element or string` |   | A function that will get called upon clicking the rendered deny button.

#### Notification Component Styles
This is the default style mapping created. You can choose to override these with your own classes using the `customStyles` prop explained above. You can view what these CSS classes do by default in the `src/components/Notification/` folder for `react-redux-notify` in the `node_modules` directory.
```javascript
{
 add: later
}
```

## Contributing and Development
Changes and new ideas are always welcome.
```javascript
npm install react-redux-notify
npm start
opn ./examples/index.html
```
This is currently just a crude no js server solution for development.

## To Do
* Avoid reconciling the DOM when props arent changed. PureRenderMixin and/or Immutable.js?
* Allow button icons to be configurable.
* Finishing writing docs (Notification styles).
* Finish writing tests for Notify and Notification Components.
* Use proper webpack setup for development.
* Update Gif with example of notifications with buttons.
* Remove hardcoded dismiss call on button clicks.
* Implement CI and versioning.
* Allow mounting reducer at custom key.
* Refactor Notification css to reduce file size.
* Have an online demo page
* Use Jekyll or mkDocs for docs instead? (pretty small project not sure if worth)

## License
MIT Licensed. Copyright (c) Deeptesh Chagan 2016.
