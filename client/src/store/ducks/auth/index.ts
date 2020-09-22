export const NAMESPACE = 'AUTH';

export const LOGIN_START_ACTION = 'AUTH/LOGIN_START_ACTION';
export const LOGIN_SUCCESS_ACTION = 'AUTH/LOGIN_SUCCESS_ACTION';
export const LOGIN_ERROR_ACTION = 'AUTH/LOGIN_ERROR_ACTION';

export const LOGOUT_START_ACTION = 'AUTH/LOGOUT_START_ACTION';
export const LOGOUT_SUCCESS_ACTION = 'AUTH/LOGOUT_SUCCESS_ACTION';
export const LOGOUT_ERROR_ACTION = 'AUTH/LOGOUT_ERROR_ACTION';

export const REGISTER_START_ACTION = 'AUTH/REGISTER_START_ACTION';
export const REGISTER_SUCCESS_ACTION = 'AUTH/REGISTER_SUCCESS_ACTION';
export const REGISTER_ERROR_ACTION = 'AUTH/REGISTER_ERROR_ACTION';

interface State {
  loading: boolean;
  error: Error | null;
  token: string | null;
  info: UserInfo | null;
}

interface RootState {
  AUTH: State;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  role: string;
  username: string;
}

interface LoginStartAction {
  type: 'AUTH/LOGIN_START_ACTION';
  payload: {
    username: string;
    password: string;
  };
}

interface LoginErrorAction {
  type: 'AUTH/LOGIN_ERROR_ACTION';
  payload: {
    error: Error;
  };
}

interface LoginSuccessAction {
  type: 'AUTH/LOGIN_SUCCESS_ACTION';
  payload: {
    token: string;
    info: UserInfo;
  };
}

interface LogoutStartAction {
  type: 'AUTH/LOGOUT_START_ACTION';
}

interface LogoutErrorAction {
  type: 'AUTH/LOGOUT_ERROR_ACTION';
  payload: {
    error: Error;
  };
}

export interface RegisterParams {
  firstName: string;
  lastName: string;
  username: string; // EMAIL
  password: string;
}

interface RegisterStartAction {
  type: 'AUTH/REGISTER_START_ACTION';
  payload: RegisterParams;
}

interface RegisterErrorAction {
  type: 'AUTH/REGISTER_ERROR_ACTION';
  payload: {
    error: Error;
  };
}

interface RegisterSuccessAction {
  type: 'AUTH/REGISTER_SUCCESS_ACTION';
}

interface LogoutSuccessAction {
  type: 'AUTH/LOGOUT_SUCCESS_ACTION';
}

export type Action = LoginStartAction &
  LoginErrorAction &
  LoginSuccessAction &
  LogoutStartAction &
  LogoutErrorAction &
  LogoutSuccessAction &
  RegisterStartAction &
  RegisterErrorAction &
  RegisterSuccessAction;

const initialState = {
  loading: false,
  error: null,
  token: null,
  info: null,
};

const reducer: (state: State, action: Action) => State = (
  state: State = initialState,
  { type, payload }: Action,
): State => {
  switch (type) {
    case LOGIN_START_ACTION: {
      return {
        ...state,
        loading: true,
        token: null,
        info: null,
      };
    }
    case LOGIN_SUCCESS_ACTION: {
      return {
        ...state,
        loading: false,
        token: payload.token,
        info: payload.info,
      };
    }
    case LOGIN_ERROR_ACTION: {
      return {
        ...state,
        loading: false,
        token: null,
        error: payload.error,
      };
    }
    case LOGOUT_START_ACTION: {
      return {
        ...state,
        loading: true,
        token: null,
      };
    }
    case LOGOUT_SUCCESS_ACTION: {
      return {
        ...state,
        loading: false,
        info: null,
      };
    }
    case LOGOUT_ERROR_ACTION: {
      return {
        ...state,
        loading: false,
        token: null,
        error: payload.error,
      };
    }
    case REGISTER_START_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_SUCCESS_ACTION: {
      return {
        ...state,
        loading: false,
      };
    }
    case REGISTER_ERROR_ACTION: {
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    }
    default:
      return state;
  }
};

export const Creators = {
  loginStart({ username, password }: LoginParams): LoginStartAction {
    return {
      type: LOGIN_START_ACTION,
      payload: {
        username,
        password,
      },
    };
  },
  loginError(error: Error): LoginErrorAction {
    return {
      type: LOGIN_ERROR_ACTION,
      payload: {
        error,
      },
    };
  },
  loginSuccess(token: string, info: UserInfo): LoginSuccessAction {
    return {
      type: LOGIN_SUCCESS_ACTION,
      payload: {
        token,
        info,
      },
    };
  },
  registerStart({ username, password, firstName, lastName }: RegisterParams): RegisterStartAction {
    return {
      type: REGISTER_START_ACTION,
      payload: {
        username,
        password,
        firstName,
        lastName,
      },
    };
  },
  registerError(error: Error): RegisterErrorAction {
    return {
      type: REGISTER_ERROR_ACTION,
      payload: {
        error,
      },
    };
  },
  registerSuccess(): RegisterSuccessAction {
    return {
      type: REGISTER_SUCCESS_ACTION,
    };
  },
  logoutStart(): LogoutStartAction {
    return {
      type: LOGOUT_START_ACTION,
    };
  },
  logoutError(error: Error): LogoutErrorAction {
    return {
      type: LOGOUT_ERROR_ACTION,
      payload: {
        error,
      },
    };
  },
  logoutSuccess(): LogoutSuccessAction {
    return {
      type: LOGOUT_SUCCESS_ACTION,
    };
  },
};

export const Selectors = {
  loading: (state: RootState): boolean => state[NAMESPACE].loading,
  error: (state: RootState): Error | null => state[NAMESPACE].error,
  token: (state: RootState): string | null => state[NAMESPACE].token,
  info: (state: RootState): UserInfo | null => state[NAMESPACE].info,
};

export default reducer;
