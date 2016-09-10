import Notifications from 'components/NotificationsContainer/NotificationsContainer'
import reducer, {createNotification, removeNotification, removeAllNotifications} from 'modules/Notifications'

export {
    reducer,
    Notifications,
    createNotification,
    removeNotification,
    removeAllNotifications    
}

export default reducer