import React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames/bind';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styleMap from './styles.scss';


export class Notification extends React.Component {

  static propTypes = {
    notification: React.PropTypes.object.isRequired,
    isFirst: React.PropTypes.bool.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    onDismissAll: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    styles: styleMap,
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const { onDismiss, notification: { id, duration } } = this.props;
    if (duration !== 0) {
      setTimeout(() => { onDismiss(id); }, duration);
    }
  }

  render() {
    const { onDismiss, onDismissAll, notification, isFirst } = this.props;
    let { styles } = this.props;
    const { message, type, canDismiss, acceptBtn, denyBtn, icon, customStyles } = notification;
    styles = Object.assign({}, styles, customStyles);
    const cx = classNames.bind(styles);
    const options = { notification, onDismiss, onDismissAll };
    const containerTypeClass = cx({
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
                {(acceptBtn) ?
                  <div styleName="actionBtn"
                    onClick={(e) => {
                      acceptBtn.handler(e, options);
                    }}>
                    {(acceptBtn.icon && typeof acceptBtn.icon === 'string') ?
                      <i className={acceptBtn.icon} />
                      :
                      acceptBtn.icon
                    }
                    {acceptBtn.title}
                  </div>
                  : false
                }
                {(denyBtn) ?
                  <div styleName="actionBtn"
                    onClick={(e) => {
                      denyBtn.handler(e, options);
                    }}>
                    {(denyBtn.icon && typeof denyBtn.icon === 'string') ?
                      <i className={denyBtn.icon} />
                      :
                      denyBtn.icon
                    }
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
        { (canDismiss) ? <div className="fa fa-close" styleName="close" onClick={() => onDismiss(notification.id)}></div> : false }
        { (isFirst && canDismiss) ? <div styleName="close-all" onClick={() => onDismissAll()}>Close All</div> : false }
      </div>
    );
  }
}

export default CSSModules(Notification, styleMap);
