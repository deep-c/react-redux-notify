import Notifications from 'components/NotificationsContainer/NotificationsContainer'
import reducer, 
    {createNotification, 
    removeNotification, 
    removeAllNotifications,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO,
    NOTIFICATION_TYPE_ERROR,
    NOTIFICATIONS_POS_TOP_RIGHT,
    NOTIFICATIONS_POS_BOT_RIGHT,
    NOTIFICATIONS_POS_BOT_LEFT,
    NOTIFICATIONS_POS_TOP_LEFT} from 'modules/Notifications'

export {
    reducer,
    Notifications,
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
    NOTIFICATIONS_POS_TOP_LEFT             
}

export default reducer