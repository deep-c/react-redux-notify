import { default as Notify } from './components/Notify';
import reducer,
    { createNotification,
    removeNotification,
    removeAllNotifications,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO,
    NOTIFICATION_TYPE_ERROR,
    NOTIFICATIONS_POS_TOP_RIGHT,
    NOTIFICATIONS_POS_BOT_RIGHT,
    NOTIFICATIONS_POS_BOT_LEFT,
    NOTIFICATIONS_POS_TOP_LEFT,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    REMOVE_ALL_NOTIFICATIONS } from './modules/Notifications';

export {
    reducer,
    Notify,
    createNotification,
    removeNotification,
    removeAllNotifications,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO,
    NOTIFICATION_TYPE_ERROR,
    NOTIFICATIONS_POS_TOP_RIGHT,
    NOTIFICATIONS_POS_BOT_RIGHT,
    NOTIFICATIONS_POS_BOT_LEFT,
    NOTIFICATIONS_POS_TOP_LEFT,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    REMOVE_ALL_NOTIFICATIONS,
};

export default reducer;
