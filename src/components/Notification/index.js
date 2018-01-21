import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styleMap from "./Notification.scss";

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
      title: PropTypes.node
    }),
    denyBtn: PropTypes.shape({
      handler: PropTypes.func.isRequired,
      icon: PropTypes.node,
      title: PropTypes.node
    }),
    isFirst: PropTypes.bool.isRequired,
    handleDismiss: PropTypes.func.isRequired,
    handleDismissAll: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
    localization: PropTypes.shape({
      closeAllBtnText: PropTypes.string.isRequired,
      acceptBtnText: PropTypes.string.isRequired,
      denyBtnText: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    styles: styleMap,
    canDismiss: true,
    duration: 0
  };

  componentDidMount() {
    const { handleDismiss, id, duration } = this.props;
    if (duration !== 0) {
      setTimeout(() => {
        handleDismiss(id);
      }, duration);
    }
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
      localization
    } = this.props;
    let { styles } = this.props;
    styles = Object.assign({}, styles, customStyles);
    const cx = classNames.bind(styles);
    const containerTypeClass = cx({
      "has-close": !isFirst && canDismiss,
      "no-close": !isFirst && !canDismiss,
      "has-close-all": isFirst && canDismiss,
      "has-close-all--noDismiss": isFirst && !canDismiss,
      [`notification--${type.toLowerCase()}`]: true
    });

    return (
      <div key={id} className={containerTypeClass}>
        {icon ? <span className={styles.icon}>{icon}</span> : false}
        <div className={styles.content}>
          <div className={styles["item--message"]}>{message}</div>
          {!canDismiss && (acceptBtn || denyBtn) ? (
            <div className={styles["item--btnBar"]}>
              {acceptBtn ? (
                <div
                  className={styles.actionBtn}
                  onClick={e => {
                    acceptBtn.handler(e, this.props);
                  }}
                >
                  {acceptBtn.icon && typeof acceptBtn.icon === "string" ? (
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
                  className={styles.actionBtn}
                  onClick={e => {
                    denyBtn.handler(e, this.props);
                  }}
                >
                  {denyBtn.icon && typeof denyBtn.icon === "string" ? (
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
          <div className={styles.close} onClick={() => handleDismiss(id)} />
        ) : (
          false
        )}
        {isFirst && canDismiss ? (
          <div
            className={styles["close-all"]}
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
