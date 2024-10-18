import {
  userReducer,
  setUser,
  resetUser,
  authChecked,
  setAuthorized,
  signIn,
  initialState,
} from './index';

const mockUser = {
  phone: '87654321098',
};

const mockUserState = {
  user: {
    phone: '89012345678',
    firstname: 'Name',
    city: 'City',
  },
  authorized: true,
  isAuthChecked: true,
  loading: false,
  requestError: '',
};

describe('user reducers', () => {
  it('setUser should set user data to store', () => {
    const state = userReducer(initialState, setUser(mockUser));
    expect(state).toEqual({ ...initialState, user: mockUser });
  });

  it('resetUser should set empty fields of user and unauthorize him', () => {
    const state = userReducer(mockUserState, resetUser());
    expect(state).toEqual({
      ...mockUserState,
      user: {
        phone: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        city: '',
      },
      authorized: false,
    });
  });

  it('authChecked should switch isAuthChecked', () => {
    const state = userReducer(initialState, authChecked());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('setAuthorized should switch authorized', () => {
    const state = userReducer(initialState, setAuthorized());
    expect(state).toEqual({ ...initialState, authorized: true });
  });
});

describe('signIn extra reducer', () => {
  it('should switch loading while signIn.pending', () => {
    const action = { type: signIn.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('should set user data to store while signIn.fulfilled', () => {
    const action = {
      type: signIn.fulfilled.type,
      payload: mockUser,
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      authorized: true,
    });
  });

  it('should correctly return errors', () => {
    const action = {
      type: signIn.rejected.type,
      error: { message: 'request rejected' },
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      requestError: 'request rejected',
      isAuthChecked: true,
    });
  });
});
