import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Notification.scss'
import classNames from 'classnames/bind'


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
    let { onDismiss, onDismissAll, notification, isFirst, styles } = this.props;
    let { message, type, canDismiss, acceptBtn, denyBtn, icon, customStyles } = notification;
    styles = Object.assign({}, styles, customStyles);
    const cx = classNames.bind(styles);
    let containerTypeClass = cx({
      'has-close': !isFirst && canDismiss,
      'no-close': !isFirst && !canDismiss,
      'has-close-all': isFirst && canDismiss,
      'has-close-all--noDismiss': isFirst && !canDismiss,
      [`notification--${type.toLowerCase()}`]: true,
    });

    return (
      <div className={containerTypeClass}>
        {(icon) ? <span styleName="icon">{icon}</span> : false}
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
