export const NAMESPACE = 'APP_INTEGRATION';

type StartAction = {
  type: 'college/APP_INTEGRATION/LOAD_START';
};

type SuccessAction = {
  type: 'college/APP_INTEGRATION/LOAD_SUCCESS';
};

type Action = StartAction | SuccessAction;

interface State {
  loading: boolean;
}
interface RootState {
  APP_INTEGRATION: State;
}
export const APP_START = 'college/APP_INTEGRATION/LOAD_START';
export const APP_START_SUCCESS = 'college/APP_INTEGRATION/LOAD_SUCCESS';

const initialState = {
  loading: false,
};

export default (state: State = initialState, { type }: Action): State => {
  switch (type) {
    case APP_START:
      return { ...state, loading: true };
    case APP_START_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};

// Action Creators
export const appStart = (): StartAction => {
  return { type: APP_START };
};
export const appSuccess = (): SuccessAction => {
  return { type: APP_START_SUCCESS };
};
export const Selectors = {
  loading: (state: RootState): boolean => state[NAMESPACE].loading,
};
