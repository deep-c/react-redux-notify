import React from 'react';
import { shallow } from 'enzyme';
import { Notification } from 'components/Notification';
import { NOTIFICATION_TYPE_SUCCESS } from 'modules/Notifications';

describe('Notification', () => {
  const ID = Date.now();
  const handleDismissClick = jest.fn();
  const handleDismissAllClick = jest.fn();
  const props = {
    id: ID,
    message: 'Hello There!',
    type: NOTIFICATION_TYPE_SUCCESS,
    isFirst: false,
    duration: 0,
    handleDismiss: handleDismissClick,
    handleDismissAll: handleDismissAllClick,
    localization: {
      closeAllBtnText: 'Close All',
      acceptBtnText: 'Accept',
      denyBtnText: 'Deny',
    },
    customStyles: {},
  };

  it('renders with default props', () => {
    const component = shallow(<Notification {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with an element for the icon when an element is passed', () => {
    const tProps = { ...props, icon: <i className="fa fa-fire" /> };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with an string for the icon when a string is passed', () => {
    const tProps = { ...props, icon: String.fromCharCode(183) };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders an accept button with an a title and an icon className and calls function on click', () => {
    const tProps = {
      ...props,
      canDismiss: false,
      acceptBtn: {
        handler: jest.fn(),
        icon: 'fa fa-thumbs-up',
        title: 'Accept',
      },
    };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders an accept button without a title and an icon element ', () => {
    const tProps = {
      ...props,
      canDismiss: false,
      acceptBtn: {
        handler: jest.fn(),
        icon: <i className="fa fa-thumbs-up" />,
      },
    };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders a deny button with an a title and an icon className', () => {
    const tProps = {
      ...props,
      canDismiss: false,
      denyBtn: {
        handler: jest.fn(),
        icon: 'fa fa-thumbs-down',
        title: 'Deny',
      },
    };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders a deny button without a title and an icon element ', () => {
    const tProps = {
      ...props,
      canDismiss: false,
      denyBtn: {
        handler: jest.fn(),
        icon: <i className="fa fa-thumbs-down" />,
      },
    };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with a close all button', () => {
    const tProps = { ...props, isFirst: true };
    const component = shallow(<Notification {...tProps} />);
    expect(component.find('.close-all').text()).toBe('Close All');
    expect(component).toMatchSnapshot();
  });

  it('renders with a duration greater than 0', () => {
    const tProps = { ...props, duration: 2000 };
    const component = shallow(<Notification {...tProps} />);
    expect(component).toMatchSnapshot();
  });

  it('calls handleDismiss after duration expires', () => {
    jest.useFakeTimers();
    const tProps = { ...props, duration: 2000 };
    // eslint-disable-next-line no-unused-vars
    const component = shallow(<Notification {...tProps} />);
    setTimeout(() => {
      expect(handleDismissClick).toHaveBeenCalled();
    }, 2000);
    jest.runAllTimers();
  });

  it('calls the button handler function when clicked', () => {
    const acceptBtnHandler = jest.fn();
    const denyBtnHandler = jest.fn();
    const tProps = {
      ...props,
      canDismiss: false,
      denyBtn: {
        handler: denyBtnHandler,
        icon: <i className="fa fa-thumbs-down" />,
        title: 'Deny',
      },
      acceptBtn: {
        handler: acceptBtnHandler,
        icon: 'fa fa-thumbs-up',
        title: 'Accept',
      },
    };
    const component = shallow(<Notification {...tProps} />);
    const buttons = component.find('.actionBtn');
    const acceptBtn = buttons.first();
    const denyBtn = buttons.last();
    acceptBtn.simulate('click');
    expect(acceptBtnHandler).toBeCalledWith(undefined, { ...tProps, showCloseAllBtn: true });
    denyBtn.simulate('click');
    expect(denyBtnHandler).toBeCalledWith(undefined, { ...tProps, showCloseAllBtn: true });
  });

  it('calls handleDismiss onclick', () => {
    const component = shallow(<Notification {...props} />);
    component.find('.close').simulate('click');
    expect(handleDismissClick).toHaveBeenCalled();
  });

  it('calls handleDismissAll onclick', () => {
    const tProps = { ...props, isFirst: true };
    const component = shallow(<Notification {...tProps} />);
    component.find('.close-all').simulate('click');
    expect(handleDismissAllClick).toHaveBeenCalled();
  });

  it('renders custom localization text for accept and deny buttons', () => {
    const acceptBtnHandler = jest.fn();
    const denyBtnHandler = jest.fn();
    const tProps = {
      ...props,
      localization: {
        closeAllBtnText: 'Close All',
        acceptBtnText: 'Yes',
        denyBtnText: 'No',
      },
      canDismiss: false,
      denyBtn: {
        handler: denyBtnHandler,
        icon: false,
      },
      acceptBtn: {
        handler: acceptBtnHandler,
        icon: false,
      },
      isFirst: true,
    };
    const component = shallow(<Notification {...tProps} />);
    const buttons = component.find('.actionBtn');
    expect(buttons.first().text()).toBe('Yes');
    expect(buttons.last().text()).toBe('No');
    expect(component).toMatchSnapshot();
  });

  it('renders custom localization text for close all', () => {
    const tProps = {
      ...props,
      localization: {
        closeAllBtnText: 'Close dem all',
        acceptBtnText: 'Yes',
        denyBtnText: 'No',
      },
      isFirst: true,
    };
    const component = shallow(<Notification {...tProps} />);
    expect(component.find('.close-all').text()).toBe('Close dem all');
    expect(component).toMatchSnapshot();
  });
});
