// Constants
export const NOTIFICATIONS_POS_TOP_RIGHT = 'TopRight';
export const NOTIFICATIONS_POS_BOT_RIGHT = 'BottomRight';
export const NOTIFICATIONS_POS_BOT_LEFT = 'BottomLeft';
export const NOTIFICATIONS_POS_TOP_LEFT = 'TopLeft';
export const NOTIFICATION_TYPE_SUCCESS = 'SUCCESS';
export const NOTIFICATION_TYPE_WARNING = 'WARNING';
export const NOTIFICATION_TYPE_INFO = 'INFO';
export const NOTIFICATION_TYPE_ERROR = 'ERROR';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONS';

// Action Creators
export function createNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    notification: {
      id: parseInt(Math.random().toString().split('.')[1], 10),
      ...notification,
    },
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id,
  };
}

export function removeAllNotifications(force) {
  return {
    type: REMOVE_ALL_NOTIFICATIONS,
    force,
  };
}

// Reducer
export const initialState = [];
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.notification];
    case REMOVE_NOTIFICATION:
      return state.filter(item => item.id !== action.id);
    case REMOVE_ALL_NOTIFICATIONS:
      if (action.force) {
        return [];
      }
      return state.filter(item => !item.canDismiss);
    default:
      return state;
  }
}
