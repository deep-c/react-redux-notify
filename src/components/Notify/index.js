import React from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { removeNotification as remove, removeAllNotifications as removeAll, NOTIFICATIONS_POS_TOP_RIGHT } from 'modules/Notifications';
import { default as Notification } from 'components/Notification';
import styleMap from './styles.scss';


export class Notify extends React.Component {

  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    removeNotification: React.PropTypes.func.isRequired,
    removeAllNotifications: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,
    customStyles: React.PropTypes.object,
    NotficationComponent: React.PropTypes.element,
    transitionDurations: React.PropTypes.shape({
      enter: React.PropTypes.number,
      leave: React.PropTypes.number,
    }),
    position: React.PropTypes.string,
  }

  static defaultProps = {
    NotificationComponent: Notification,
    transitionDurations: {
      enter: 160,
      leave: 400,
    },
    position: NOTIFICATIONS_POS_TOP_RIGHT,
    styles: styleMap,
  }

  constructor(props) {
    super(props);
    this.handleOnDismiss = this._handleOnDismiss.bind(this);
    this.handleOnDismissAll = this._handleOnDismissAll.bind(this);
  }

  _handleOnDismiss(notification) {
    const { removeNotification } = this.props;
    removeNotification(notification.id);
  }

  _handleOnDismissAll() {
    const { removeAllNotifications } = this.props;
    removeAllNotifications();
  }

  render() {
    const {
      notifications,
      customStyles,
      NotificationComponent,
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
                const NewNotification = notification.customComponent || NotificationComponent;
                return (
                  <NewNotification
                    key={notification.id}
                    notification={notification}
                    isFirst={(i === 0 && notifications.length > 1)}
                    onDismiss={this.handleOnDismiss}
                    onDismissAll={this.handleOnDismissAll}
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
  removeNotification: (id) => {
    dispatch(remove(id));
  },
  removeAllNotifications: () => {
    dispatch(removeAll());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CSSModules(Notify, styleMap));
