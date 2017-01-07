import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { removeNotification, removeAllNotifications, NOTIFICATIONS_POS_TOP_RIGHT } from 'modules/Notifications';
import { default as Notification } from 'components/Notification';
import styleMap from './Notify.scss';


export class Notify extends React.Component {

  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    remove: React.PropTypes.func.isRequired,
    removeAll: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,
    customStyles: React.PropTypes.object,
    notificationComponent: React.PropTypes.func,
    transitionDurations: React.PropTypes.shape({
      enter: React.PropTypes.number,
      leave: React.PropTypes.number,
    }),
    position: React.PropTypes.string,
    forceClose: React.PropTypes.bool,
  }

  static defaultProps = {
    notificationComponent: Notification,
    transitionDurations: {
      enter: 160,
      leave: 400,
    },
    position: NOTIFICATIONS_POS_TOP_RIGHT,
    styles: styleMap,
    forceClose: false,
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
      position } = this.props;
    let { styles } = this.props;
    styles = Object.assign({}, styles, customStyles);
    const notificationsContainerClass = styles[`container${position}`];

    return (
        <div className={notificationsContainerClass}>
          <ReactCSSTransitionGroup
              component="div"
              className={styles.wrapper}
              transitionName={ { enter: styles.enter,
                                  leave: styles.leave,
                              } }
              transitionEnterTimeout={transitionDurations.enter}
              transitionLeaveTimeout={transitionDurations.leave}>
            {
              notifications.map((notification, i) => {
                const NewNotification = notification.customComponent || notificationComponent;
                return (
                  <NewNotification
                    key={notification.id}
                    {...notification}
                    isFirst={(i === 0 && notifications.length > 1)}
                    handleDismiss={this.handleDismiss}
                    handleDismissAll={this.handleDismissAll}
                  />
                );
              })
            }
          </ReactCSSTransitionGroup>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  remove: (id) => {
    dispatch(removeNotification(id));
  },
  removeAll: (force) => {
    dispatch(removeAllNotifications(force));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notify);
