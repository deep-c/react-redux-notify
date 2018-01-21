import React from "react";
import renderer from "react-test-renderer";
import { Notification } from "components/Notification";
import { NOTIFICATION_TYPE_SUCCESS } from "modules/Notifications";

describe("Notification", () => {
  const ID = Date.now();
  const handleDismissClick = jest.fn();
  const handleDismissAllClick = jest.fn();
  const props = {
    id: ID,
    message: "Hello There!",
    type: NOTIFICATION_TYPE_SUCCESS,
    isFirst: false,
    duration: 0,
    handleDismiss: handleDismissClick,
    handleDismissAll: handleDismissAllClick,
    localization: {
      closeAllBtnText: "Close All",
      acceptBtnText: "Accept",
      denyBtnText: "Deny"
    }
  };

  it("it renders with default props", () => {
    const component = renderer.create(<Notification {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders with an element for the icon when an element is passed", () => {
    const tProps = { ...props, icon: <i className="fa fa-fire" /> };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders with an string for the icon when a string is passed", () => {
    const tProps = { ...props, icon: String.fromCharCode(183) };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders an accept button with an a title and an icon className and calls function on click", () => {
    const tProps = {
      ...props,
      canDismiss: false,
      acceptBtn: {
        handler: jest.fn(),
        icon: "fa fa-thumbs-up",
        title: "Accept"
      }
    };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders an accept button without a title and an icon element ", () => {
    const tProps = {
      ...props,
      canDismiss: false,
      acceptBtn: {
        handler: jest.fn(),
        icon: <i className="fa fa-thumbs-up" />
      }
    };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders a deny button with an a title and an icon className", () => {
    const tProps = {
      ...props,
      canDismiss: false,
      denyBtn: {
        handler: jest.fn(),
        icon: "fa fa-thumbs-down",
        title: "Deny"
      }
    };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders a deny button without a title and an icon element ", () => {
    const tProps = {
      ...props,
      canDismiss: false,
      denyBtn: {
        handler: jest.fn(),
        icon: <i className="fa fa-thumbs-down" />
      }
    };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders with a close all button", () => {
    const tProps = { ...props, isFirst: true };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders when a duration is greater than 0", () => {
    const tProps = { ...props, duration: 2000 };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it calls the button handler function when clicked", () => {
    const acceptBtnHandler = jest.fn();
    const denyBtnHandler = jest.fn();
    const tProps = {
      ...props,
      canDismiss: false,
      denyBtn: {
        handler: denyBtnHandler,
        icon: <i className="fa fa-thumbs-down" />,
        title: "Deny"
      },
      acceptBtn: {
        handler: acceptBtnHandler,
        icon: "fa fa-thumbs-up",
        title: "Accept"
      },
      styles: {}
    };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.children[0].children[1].children[0].props.onClick();
    expect(acceptBtnHandler).toBeCalledWith(undefined, tProps);
    tree.children[0].children[1].children[1].props.onClick();
    expect(denyBtnHandler).toBeCalledWith(undefined, tProps);
  });

  it("calls handleDismiss onclick", () => {
    const component = renderer.create(<Notification {...props} />);
    const tree = component.toJSON();
    tree.children[1].props.onClick();
    expect(handleDismissClick).toBeCalledWith(ID);
  });

  it("calls handleDismissAll onclick", () => {
    const tProps = { ...props, isFirst: true };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    tree.children[2].props.onClick();
    expect(handleDismissAllClick).toBeCalledWith();
  });

  it("renders localization custom localization text for accept and deny buttons", () => {
    const acceptBtnHandler = jest.fn();
    const denyBtnHandler = jest.fn();    
    const tProps = {
      ...props,
      localization: {
        closeAllBtnText: "Close dem all",
        acceptBtnText: "Yes",
        denyBtnText: "No"
      },
      canDismiss: false,
      denyBtn: {
        handler: denyBtnHandler,
        icon: <i className="fa fa-thumbs-down" />,
      },
      acceptBtn: {
        handler: acceptBtnHandler,
        icon: "fa fa-thumbs-up",
      },      
    };
    const component = renderer.create(<Notification {...tProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
