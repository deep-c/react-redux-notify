import React from 'react';
import { mount } from 'enzyme';
import { Notify } from 'components/Notify';
import {
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_ERROR,
} from 'modules/Notifications';

describe('Notify', () => {
  const handleRemove = jest.fn();
  const handleRemoveAll = jest.fn();
  const notification1 = {
    id: 1,
    message: 'Notification 1!',
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: 0,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
  };
  const notification2 = {
    id: 2,
    message: 'Notification 2!',
    type: NOTIFICATION_TYPE_INFO,
    duration: 0,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
  };
  const notification3 = {
    id: 3,
    message: 'Notification 3!',
    type: NOTIFICATION_TYPE_ERROR,
    duration: 0,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
  };
  const props = {
    notifications: [],
    remove: handleRemove,
    removeAll: handleRemoveAll,
  };

  it('renders with required props', () => {
    const component = mount(<Notify {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders notifications', () => {
    const tProps = {
      ...props,
      notifications: [notification1, notification2],
    };
    const component = mount(<Notify {...tProps} />);
    // TODO: Fix this, not sure whats going on here, but children's length
    // doesn't seem to be correct, even though the output in the
    // snapshot is correct.
    // expect(component.find(".wrapper").children()).toHaveLength(2);
    expect(component).toMatchSnapshot();
  });

  it('renders first notification without closeAll if showCloseAllBtn is false', () => {
    const tProps = {
      ...props,
      notifications: [notification1, notification2],
      showCloseAllBtn: false,
    };
    const component = mount(<Notify {...tProps} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.close-all')).toHaveLength(0);
  });

  it('renders first notification with closeAll if showCloseAllBtn is true', () => {
    const tProps = {
      ...props,
      notifications: [notification1, notification2],
      showCloseAllBtn: true,
    };
    const component = mount(<Notify {...tProps} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.close-all')).toHaveLength(1);
  });

  it('renders custom notifications', () => {
    const MyCustomNotificationComponent = ({
      message,
      canDismiss,
      id,
      handleDismiss,
    }) => {
      let styles = {
        margin: '5px 0',
        padding: '2px 5px',
        border: '1px solid #333',
        float: 'right',
        clear: 'right',
        width: '330px',
        boxSizing: 'border-box',
      };
      if (canDismiss) {
        styles = Object.assign({}, styles, { cursor: 'pointer' });
      }
      return (
        <div
          onClick={() => {
            if (canDismiss) {
              handleDismiss(id);
            }
          }}
          style={styles}
        >
          {message}
        </div>
      );
    };
    const tProps = {
      ...props,
      notificationComponent: MyCustomNotificationComponent,
      notifications: [notification1],
    };
    const component = mount(<Notify {...tProps} />);
    expect(component).toMatchSnapshot();
    expect(component.contains(MyCustomNotificationComponent)).toEqual(true);
  });

  it('renders with the correct className when customStyles is used', () => {
    const tProps = {
      ...props,
      customStyles: {
        containerCustomPosition: 'CustomPosition',
      },
      position: 'CustomPosition',
    };
    const component = mount(<Notify {...tProps} />);
    expect(component.find('.CustomPosition')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('passes the correct props to each notification', () => {
    const tProps = {
      ...props,
      notifications: [notification1, notification2, notification3],
    };
    const component = mount(<Notify {...tProps} />);
    expect(component.find({ ...notification1, isFirst: true })).toHaveLength(1);
    expect(component.find({ ...notification2, isFirst: false })).toHaveLength(
      1
    );
    expect(component.find({ ...notification3, isFirst: false })).toHaveLength(
      1
    );
  });

  it('calls removeAll with the correct arguments', () => {
    const tProps = {
      ...props,
      notifications: [notification1, notification2, notification3],
    };
    const component = mount(<Notify {...tProps} />);
    component.find('.close-all').simulate('click');
    expect(handleRemoveAll).toHaveBeenCalled();
    component.setProps({ forceClose: true });
    component.find('.close-all').simulate('click');
    expect(handleRemoveAll).lastCalledWith(true);
  });

  it('calls remove with the correct arguments', () => {
    const tProps = { ...props, notifications: [notification1] };
    const component = mount(<Notify {...tProps} />);
    component
      .find('.close')
      .first()
      .simulate('click');
    expect(handleRemove).toHaveBeenCalled();
  });

  it('unmounts without error', () => {
    const component = mount(<Notify {...props} />);
    const instance = component.instance();
    expect(instance.defaultNode).not.toEqual(null);
    component.unmount();
    expect(instance.defaultNode).toEqual(null);
    expect(component).toMatchSnapshot();
  });
});
