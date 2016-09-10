import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Notification.scss'
import { NOTIFICATION_TYPE_SUCCESS,
         NOTIFICATION_TYPE_INFO,
         NOTIFICATION_TYPE_WARNING,
         NOTIFICATION_TYPE_ERROR } from 'modules/Notifications'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

export class Notification extends React.Component {

  static propTypes = {
    notification: React.PropTypes.object.isRequired,
    isFirst: React.PropTypes.bool.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    onDismissAll: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object,
  }

  componentDidMount() {
    let { onDismiss, notification } = this.props;
    let { duration } = notification;
    if (duration !== 0) {
        setTimeout(() => { onDismiss(notification) }, duration);
    }
  }

  render () {
    let { onDismiss, onDismissAll, notification, isFirst } = this.props;
    let { message, type, canDismiss, acceptBtn, denyBtn } = notification;
    let containerTypeClass = cx({
      'has-close': !isFirst && canDismiss,
      'no-close': !isFirst && !canDismiss,
      'has-close-all': isFirst && canDismiss,
      'has-close-all--noDismiss': isFirst && !canDismiss,
      'notification--success': (type === NOTIFICATION_TYPE_SUCCESS ),
      'notification--error' : (type === NOTIFICATION_TYPE_ERROR),
      'notification--warning': (type === NOTIFICATION_TYPE_WARNING),
      'notification--info' : (type === NOTIFICATION_TYPE_INFO),
    });
    return (
      <div className={containerTypeClass}>
        <i styleName="icon" />
          <div styleName="content">
            <div styleName="item--message">{message}</div>
            { (!canDismiss && (acceptBtn || denyBtn)) ?
                <div styleName="item--btnBar">
                  { (acceptBtn) ?
                  <div styleName="actionBtn" 
                    onClick={(e) => {acceptBtn.handler(); onDismiss(notification)}}>
                    <i className="fa fa-thumbs-o-up" />
                    {acceptBtn.title}
                  </div>
                  : false
                  }
                  {(denyBtn) ? 
                  <div styleName="actionBtn" 
                    onClick={(e) => {denyBtn.handler(); onDismiss(notification)}}>
                    <i className="fa fa-thumbs-o-down" />
                    {denyBtn.title}
                  </div>
                  :
                  false
                  }
                </div>
                :
                false
            }
          </div>
          { (canDismiss) ? <div className="fa fa-close" styleName="close" onClick={(e) => onDismiss(notification)}></div> : false }
          { (isFirst && canDismiss) ? <div styleName="close-all" onClick={(e) => onDismissAll()}>Close All</div> : false }
      </div>
    )
  }
}

Notification = CSSModules(Notification, styles);

export default Notification
