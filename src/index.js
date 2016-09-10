import Notifications from 'components/NotificationsContainer/NotificationsContainer'
import reducer, 
    {createNotification, 
    removeNotification, 
    removeAllNotifications,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO,
    NOTIFICATION_TYPE_ERROR} from 'modules/Notifications'

export {
    reducer,
    Notifications,
    createNotification,
    removeNotification,
    removeAllNotifications,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO,
    NOTIFICATION_TYPE_ERROR        
}

export default reducer