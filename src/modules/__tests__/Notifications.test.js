import reducer, {
  createNotification,
  removeNotification,
  removeAllNotifications,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_WARNING,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_DEFAULT_DURATION,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
} from 'modules/Notifications';

describe('actions', () => {
  it('should create an action to remove a notification', () => {
    const id = 123456;
    const expectedAction = {
      type: REMOVE_NOTIFICATION,
      id,
    };
    expect(removeNotification(id)).toEqual(expectedAction);
  });

  it('should create an action to remove all notifications', () => {
    const expectedAction = {
      type: REMOVE_ALL_NOTIFICATIONS,
      force: true,
    };
    expect(removeAllNotifications(true)).toEqual(expectedAction);
  });

  it('should create an action to remove all applicable notifications', () => {
    const expectedAction = {
      type: REMOVE_ALL_NOTIFICATIONS,
    };
    expect(removeAllNotifications()).toEqual(expectedAction);
  });

  it('should create an action to create a new notification', () => {
    const config = {
      message: 'Testing, testing 1, 2, 3',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 3000,
      canDismiss: false,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
      customComponent: jest.fn(),
    };
    const expectedAction = {
      type: ADD_NOTIFICATION,
      notification: {
        message: config.message,
        type: config.type,
        duration: config.duration,
        canDismiss: config.canDismiss,
        acceptBtn: config.acceptBtn,
        denyBtn: config.denyBtn,
        customComponent: config.customComponent,
      },
    };
    const action = createNotification(config);
    expect(action).toMatchObject(expectedAction);
    expect(action.notification.id).toEqual(expect.any(Number));
    // make sure its an integer
    expect(Math.trunc(action.notification.id))
    .toEqual(action.notification.id);
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_NOTIFICATION', () => {
    const id1 = Date.now();
    const id2 = Date.now();
    const notification1 = {
      id: id1,
      message: 'Testing1, testing1 1, 2, 3',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 3000,
      canDismiss: false,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
    };
    const notification2 = {
      id: id2,
      message: 'Testing2, testing2 1, 2, 3',
      type: NOTIFICATION_TYPE_ERROR,
      duration: NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
      customComponent: jest.fn(),
    };
    const action = {
      type: ADD_NOTIFICATION,
      notification: notification2,
    };
    expect(reducer([notification1], action)).toEqual([
      notification1,
      notification2,
    ]);
  });

  it('should handle REMOVE_NOTIFICATION', () => {
    const id = Date.now();
    const notification = {
      id,
      message: 'Testing, testing 1, 2, 3',
      type: NOTIFICATION_TYPE_INFO,
      duration: NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
    };
    const action = {
      type: REMOVE_NOTIFICATION,
      id: notification.id,
    };
    expect(reducer([notification], action)).toEqual([]);
  });

  it('should handle REMOVE_ALL_NOTIFICATIONS', () => {
    const notification1 = {
      id: new Date(1330688329360),
      message: 'Testing, testing 1, 2, 3',
      type: NOTIFICATION_TYPE_WARNING,
      duration: NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
    };
    const notification2 = {
      id: new Date(1267688329388),
      message: 'Testing2, testing2 1, 2, 3',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 0,
      canDismiss: false,
      acceptBtn: null,
      denyBtn: null,
    };
    const notification3 = {
      id: new Date(1267623829303),
      message: 'Testing3, testing3 1, 2, 3',
      type: NOTIFICATION_TYPE_INFO,
      duration: NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
    };
    const action = {
      type: REMOVE_ALL_NOTIFICATIONS,
    };
    expect(
      reducer([notification1, notification2, notification3], action)
    ).toEqual([notification2]);
  });

  it('should handle REMOVE_ALL_NOTIFICATIONS with force parameter', () => {
    const notification1 = {
      id: new Date(1330688329360),
      message: 'Testing, testing 1, 2, 3',
      type: NOTIFICATION_TYPE_WARNING,
      duration: NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
    };
    const notification2 = {
      id: new Date(1267688329388),
      message: 'Testing2, testing2 1, 2, 3',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 0,
      canDismiss: false,
      acceptBtn: null,
      denyBtn: null,
    };
    const notification3 = {
      id: new Date(1267623829303),
      message: 'Testing3, testing3 1, 2, 3',
      type: NOTIFICATION_TYPE_INFO,
      duration: NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
    };
    const action = {
      type: REMOVE_ALL_NOTIFICATIONS,
      force: true,
    };
    expect(
      reducer([notification1, notification2, notification3], action)
    ).toEqual([]);
  });
});
