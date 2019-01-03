import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
  removeNotification,
  removeAllNotifications,
  NOTIFICATIONS_POS_TOP_RIGHT,
} from 'modules/Notifications';
import { default as Notification } from 'components/Notification';
import { canUseDOM } from 'utils';
import styles from './Notify.scss';

export class Notify extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    customStyles: PropTypes.object,
    notificationComponent: PropTypes.func,
    transitionDurations: PropTypes.shape({
      enter: PropTypes.number,
      leave: PropTypes.number,
    }),
    position: PropTypes.string,
    forceClose: PropTypes.bool,
    localization: PropTypes.shape({
      closeAllBtnText: PropTypes.string,
      acceptBtnText: PropTypes.string,
      denyBtnText: PropTypes.string,
    }),
    node: PropTypes.any,
    showCloseAllBtn: PropTypes.bool,
  };

  static defaultProps = {
    notifications: [],
    notificationComponent: Notification,
    transitionDurations: {
      enter: 160,
      leave: 400,
    },
    position: NOTIFICATIONS_POS_TOP_RIGHT,
    customStyles: {},
    forceClose: false,
    localization: {
      closeAllBtnText: 'Close All',
      acceptBtnText: 'Accept',
      denyBtnText: 'Deny',
    },
    showCloseAllBtn: true,
  };

  constructor(props) {
    super(props);
    this.handleDismiss = this._handleDismiss.bind(this);
    this.handleDismissAll = this._handleDismissAll.bind(this);
  }

  componentWillUnmount() {
    if (this.defaultNode) {
      // eslint-disable-next-line no-undef
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  _handleDismiss(id) {
    const { remove } = this.props;
    remove(id);
  }

  _handleDismissAll(force) {
    const { removeAll, forceClose } = this.props;
    removeAll(force || forceClose);
  }

  _getStyle(name) {
    return this.props.customStyles[name] || styles[name];
  }

  _render() {
    const {
      notifications,
      notificationComponent,
      transitionDurations,
      position,
      localization,
      showCloseAllBtn,
    } = this.props;
    const notificationsContainerClass = this._getStyle(`container${position}`);

    return (
      <div className={notificationsContainerClass}>
        <ReactCSSTransitionGroup
          component="div"
          className={this._getStyle('wrapper')}
          transitionName={{
            enter: this._getStyle('enter'),
            leave: this._getStyle('leave'),
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
                showCloseAllBtn={showCloseAllBtn}
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

  render() {
    const { node } = this.props;
    /* istanbul ignore if  */
    if (!canUseDOM) {
      return null;
    }
    /* istanbul ignore if  */
    if (!node && !this.defaultNode) {
      /* eslint-disable no-undef */
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }

    return createPortal(this._render(), node || this.defaultNode);
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  notifications: state.notifications,
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  remove: (id) => {
    dispatch(removeNotification(id));
  },
  removeAll: (force) => {
    dispatch(removeAllNotifications(force));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
