import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './NotificationsContainer.scss'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { removeNotification, removeAllNotifications } from 'modules/Notifications'
import Notification from 'components/Notification/Notification'


export class Notifications extends React.Component {

  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    removeAllNotifications: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object,
    customStyles: React.PropTypes.object,
    NotficationComponent: React.PropTypes.element,
    transitionDurations: React.PropTypes.shape({
      enter: React.PropTypes.number,
      leave: React.PropTypes.number
    })    
  }

  static defaultProps = {
    NotificationComponent: Notification,
    transitionDurations: {
      enter: 160,
      leave: 400
    }
  }

  constructor(props){
    super(props);
    this.handleOnDismiss = this._handleOnDismiss.bind(this);
    this.handleOnDismissAll =  this._handleOnDismissAll.bind(this);
  }

  _handleOnDismiss(notification){
    let { removeNotification } = this.props;
    removeNotification(notification.id);
  }

  _handleOnDismissAll(){
    let { removeAllNotifications } = this.props;
    removeAllNotifications();
  }

  render() {
    let { notifications, styles, customStyles, NotificationComponent, transitionDurations } = this.props;
    styles = Object.assign({}, styles, customStyles); 

    return (
        <ReactCSSTransitionGroup
            component="div"
            className={styles.container}
            transitionName={ {  enter: styles.enter,
                                leave: styles.leave,
                            } }
            transitionEnterTimeout={transitionDurations.enter}
            transitionLeaveTimeout={transitionDurations.leave}>
          {
            notifications.map((notification, i) => {
              let Notification = notification.customComponent || NotificationComponent
              return (
                <Notification
                  key={notification.id}
                  notification={notification}
                  isFirst={(i===0 && notifications.length > 1)}
                  onDismiss={this.handleOnDismiss}
                  onDismissAll={this.handleOnDismissAll}
                />
              )
            })
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
