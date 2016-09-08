import Notifications from 'components/NotificationsContainer/NotificationsContainer'
import reducer from 'modules/Notifications'
import {createNotification, removeNotification, removeAllNotifications} from 'modules/Notifications'

export {
    reducer,
    Notifications,
    createNotification,
    removeNotification,
    removeAllNotifications    
}

export default Notifications