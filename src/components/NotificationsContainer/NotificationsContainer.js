import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './NotificationsContainer.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { removeNotification, removeAllNotifications } from 'modules/Notifications'
import Notification from 'components/Notification/Notification'


export class Notifications extends React.Component {

  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    removeAllNotifications: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,    
  }

  handleOnDismiss(notification){
    let { removeNotification } = this.props;
    removeNotification(notification.id);
  }

  handleOnDismissAll(){
    let { removeAllNotifications } = this.props;
    removeAllNotifications();
  }

  render() {
    let { notifications, styles } = this.props;
    return (
        <ReactCSSTransitionGroup
            component="div"
            className={styles.container}
            transitionName={ {  enter: styles.enter,
                                leave: styles.leave,
                            } }
            transitionEnterTimeout={160}
            transitionLeaveTimeout={400}>
          {
            notifications.map((notification, i) => {
              return (
                <Notification
                  key={notification.id}
                  notification={notification}
                  isFirst={(i===0 && notifications.length > 1)}
                  onDismiss={this.handleOnDismiss.bind(this)}
                  onDismissAll={this.handleOnDismissAll.bind(this)}
                />
              )
            }, this)
          }
        </ReactCSSTransitionGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    removeNotification: (id) => {
      dispatch(removeNotification(id))
    },
    removeAllNotifications: () => {
      dispatch(removeAllNotifications())
    }
  }
}

Notifications = CSSModules(Notifications, styles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
