import React from 'react';
import classNames from 'classnames/bind';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import styleMap from './Notification.scss';


class Notification extends React.Component {

  static propTypes = {
    id: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    canDismiss: React.PropTypes.bool.isRequired,
    duration: React.PropTypes.number.isRequired,
    icon: React.PropTypes.node,
    customStyles: React.PropTypes.object,
    customComponent: React.PropTypes.element,
    acceptBtn: React.PropTypes.shape({
      handler: React.PropTypes.func.isRequired,
      icon: React.PropTypes.node,
      title: React.PropTypes.node,
    }),
    denyBtn: React.PropTypes.shape({
      handler: React.PropTypes.func.isRequired,
      icon: React.PropTypes.node,
      title: React.PropTypes.node,
    }),
    isFirst: React.PropTypes.bool.isRequired,
    handleDismiss: React.PropTypes.func.isRequired,
    handleDismissAll: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    styles: styleMap,
    canDismiss: true,
    duration: 2000,
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    const { handleDismiss, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => { handleDismiss(id); }, duration);
    }
  }

  render() {
    const { handleDismiss, handleDismissAll, isFirst, message, type, canDismiss,
      acceptBtn, denyBtn, icon, customStyles, id } = this.props;
    let { styles } = this.props;
    styles = Object.assign({}, styles, customStyles);
    const cx = classNames.bind(styles);
    const containerTypeClass = cx({
      'has-close': !isFirst && canDismiss,
      'no-close': !isFirst && !canDismiss,
      'has-close-all': isFirst && canDismiss,
      'has-close-all--noDismiss': isFirst && !canDismiss,
      [`notification--${type.toLowerCase()}`]: true,
    });

    return (
      <div key={id} className={containerTypeClass}>
        {(icon) ? <span className={styles.icon}>{icon}</span> : false}
        <div className={styles.content}>
          <div className={styles['item--message']}>{message}</div>
          { (!canDismiss && (acceptBtn || denyBtn)) ?
              <div className={styles['item--btnBar']}>
                {(acceptBtn) ?
                  <div className={styles.actionBtn}
                    onClick={(e) => {
                      acceptBtn.handler(e, this.props);
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
                  <div className={styles.actionBtn}
                    onClick={(e) => {
                      denyBtn.handler(e, this.props);
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
        {(canDismiss) ?
          <div className={styles.close} onClick={() => handleDismiss(id)}></div>
          :
          false
        }
        {(isFirst && canDismiss) ?
          <div className={styles['close-all']}
            onClick={() => handleDismissAll()}>Close All</div>
          : false
        }
      </div>
    );
  }
}

export default Notification;
