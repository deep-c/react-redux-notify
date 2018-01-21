import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
  removeNotification,
  removeAllNotifications,
  NOTIFICATIONS_POS_TOP_RIGHT
} from "modules/Notifications";
import { default as Notification } from "components/Notification";
import styleMap from "./Notify.scss";

export class Notify extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
    customStyles: PropTypes.object,
    notificationComponent: PropTypes.func,
    transitionDurations: PropTypes.shape({
      enter: PropTypes.number,
      leave: PropTypes.number
    }),
    position: PropTypes.string,
    forceClose: PropTypes.bool,
    localization: PropTypes.shape({
      closeAllBtnText: PropTypes.string,
      acceptBtnText: PropTypes.string,
      denyBtnText: PropTypes.string
    })
  };

  static defaultProps = {
    notificationComponent: Notification,
    transitionDurations: {
      enter: 160,
      leave: 400
    },
    position: NOTIFICATIONS_POS_TOP_RIGHT,
    styles: styleMap,
    forceClose: false,
    localization: {
      closeAllBtnText: "Close All",
      acceptBtnText: "Accept",
      denyBtnText: "Deny"
    }
  };

  constructor(props) {
    super(props);
    this.handleDismiss = this._handleDismiss.bind(this);
    this.handleDismissAll = this._handleDismissAll.bind(this);
  }

  _handleDismiss(id) {
    const { remove } = this.props;
    remove(id);
  }

  _handleDismissAll(force) {
    const { removeAll, forceClose } = this.props;
    removeAll(force || forceClose);
  }

  render() {
    const {
      notifications,
      customStyles,
      notificationComponent,
      transitionDurations,
      position,
      localization
    } = this.props;
    let { styles } = this.props;
    styles = Object.assign({}, styles, customStyles);
    const notificationsContainerClass = styles[`container${position}`];

    return (
      <div className={notificationsContainerClass}>
        <ReactCSSTransitionGroup
          component="div"
          className={styles.wrapper}
          transitionName={{
            enter: styles.enter,
            leave: styles.leave
          }}
          transitionEnterTimeout={transitionDurations.enter}
          transitionLeaveTimeout={transitionDurations.leave}
        >
          {notifications.map((notification, i) => {
            const NewNotification =
              notification.customComponent || notificationComponent;
            return (
              <NewNotification
                key={notification.id}
                localization={localization}
                {...notification}
                isFirst={i === 0 && notifications.length > 1}
                handleDismiss={this.handleDismiss}
                handleDismissAll={this.handleDismissAll}
              />
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
  remove: id => {
    dispatch(removeNotification(id));
  },
  removeAll: force => {
    dispatch(removeAllNotifications(force));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
