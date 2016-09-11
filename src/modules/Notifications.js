// Constants
export const NOTIFICATIONS_POS_TOP_RIGHT = 'TopRight'
export const NOTIFICATIONS_POS_BOT_RIGHT = 'BottomRight'
export const NOTIFICATIONS_POS_BOT_LEFT = 'BottomLeft'
export const NOTIFICATIONS_POS_TOP_LEFT = 'TopLeft'
export const NOTIFICATION_TYPE_SUCCESS = 'SUCCESS'
export const NOTIFICATION_TYPE_WARNING = 'WARNING'
export const NOTIFICATION_TYPE_INFO = 'INFO'
export const NOTIFICATION_TYPE_ERROR = 'ERROR'
export const NOTIFICATION_DEFAULT_DURATION = 2000;
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONS';

// Action Creators
export function createNotification({ message, type, duration, canDismiss, acceptBtn, denyBtn, customComponent, icon, ...other }){
  const id = Date.now();
  duration = (duration >= 0) ? parseInt(duration, 10): NOTIFICATION_DEFAULT_DURATION;
  canDismiss = (canDismiss === false) ? canDismiss: true;
  return {
    type: ADD_NOTIFICATION,
    notification: {
      id,
      message,
      type,
      duration,
      canDismiss,
      acceptBtn,
      denyBtn,
      customComponent,
      icon,
      ...other,
    }
  }
}

export function removeNotification(id){
  return {
    type: REMOVE_NOTIFICATION,
    id,
  }
}

export function removeAllNotifications(){
  return {
    type: REMOVE_ALL_NOTIFICATIONS,
  }
}

// Reducer
export const initialState = []
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.notification];
    case REMOVE_NOTIFICATION:
      return state.filter((item)=>item.id!=action.id);
    case REMOVE_ALL_NOTIFICATIONS:
      return state.filter((item)=>!item.canDismiss);
    default:
      return state;
  }
}
