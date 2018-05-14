import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Notification.scss';

export class Notification extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    canDismiss: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    icon: PropTypes.node,
    customStyles: PropTypes.object,
    customComponent: PropTypes.element,
    acceptBtn: PropTypes.shape({
      handler: PropTypes.func.isRequired,
      icon: PropTypes.node,
      title: PropTypes.node,
    }),
    denyBtn: PropTypes.shape({
      handler: PropTypes.func.isRequired,
      icon: PropTypes.node,
      title: PropTypes.node,
    }),
    isFirst: PropTypes.bool.isRequired,
    handleDismiss: PropTypes.func.isRequired,
    handleDismissAll: PropTypes.func.isRequired,
    localization: PropTypes.shape({
      closeAllBtnText: PropTypes.string.isRequired,
      acceptBtnText: PropTypes.string.isRequired,
      denyBtnText: PropTypes.string.isRequired,
    }),
    showCloseAllBtn: PropTypes.bool,
  };

  static defaultProps = {
    canDismiss: true,
    customStyles: {},
    duration: 0,
    showCloseAllBtn: true,
  };

  componentDidMount() {
    const { handleDismiss, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => {
        handleDismiss(id);
      }, duration);
    }
  }

  _getStyle(name) {
    return this.props.customStyles[name] || styles[name];
  }

  render() {
    const {
      handleDismiss,
      handleDismissAll,
      isFirst,
      message,
      type,
      canDismiss,
      acceptBtn,
      denyBtn,
      icon,
      customStyles,
      id,
      localization,
      showCloseAllBtn,
    } = this.props;
    const cx = classNames.bind(Object.assign({}, styles, customStyles));
    const containerTypeClass = cx({
      'has-close': !isFirst && canDismiss,
      'no-close': !isFirst && !canDismiss,
      'has-close-all': isFirst && canDismiss && showCloseAllBtn,
      'has-close-all--noDismiss': isFirst && !canDismiss && showCloseAllBtn,
      [`notification--${type.toLowerCase()}`]: true,
    });

    return (
      <div className={containerTypeClass}>
        {icon ? <span className={styles.icon}>{icon}</span> : false}
        <div className={this._getStyle('content')}>
          <div className={this._getStyle('item__message')}>{message}</div>
          {!canDismiss && (acceptBtn || denyBtn) ? (
            <div className={this._getStyle('item__btnBar')}>
              {acceptBtn ? (
                <div
                  className={this._getStyle('actionBtn')}
                  onClick={(e) => {
                    acceptBtn.handler(e, this.props);
                  }}
                >
                  {acceptBtn.icon && typeof acceptBtn.icon === 'string' ? (
                    <i className={acceptBtn.icon} />
                  ) : (
                    acceptBtn.icon
                  )}
                  {acceptBtn.title || localization.acceptBtnText}
                </div>
              ) : (
                false
              )}
              {denyBtn ? (
                <div
                  className={this._getStyle('actionBtn')}
                  onClick={(e) => {
                    denyBtn.handler(e, this.props);
                  }}
                >
                  {denyBtn.icon && typeof denyBtn.icon === 'string' ? (
                    <i className={denyBtn.icon} />
                  ) : (
                    denyBtn.icon
                  )}
                  {denyBtn.title || localization.denyBtnText}
                </div>
              ) : (
                false
              )}
            </div>
          ) : (
            false
          )}
        </div>
        {canDismiss ? (
          <div
            className={this._getStyle('close')}
            onClick={() => handleDismiss(id)}
          />
        ) : (
          false
        )}
        {isFirst && canDismiss && showCloseAllBtn ? (
          <div
            className={this._getStyle('close-all')}
            onClick={() => handleDismissAll()}
          >
            {localization.closeAllBtnText}
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Notification;
