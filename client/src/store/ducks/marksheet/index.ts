import { ListAllParams, MarksheetItem, NewMarksheetParams, DeleteParams } from '../../../services/marksheet';

export type Marksheet = {
  id: string;
  list: MarksheetItem[];
  name: string;
  average: string;
  updatedAt: string;
};
export const NAMESPACE = 'MARKSHEET';

export const GET_MARKSHEET_START_ACTION = 'MARKSHEET/GET_MARKSHEET_START_ACTION';
export const GET_MARKSHEET_SUCCESS_ACTION = 'MARKSHEET/GET_MARKSHEET_SUCCESS_ACTION';
export const GET_MARKSHEET_ERROR_ACTION = 'MARKSHEET/GET_MARKSHEET_ERROR_ACTION';

export const SAVE_MARKSHEET_START_ACTION = 'MARKSHEET/SAVE_MARKSHEET_START_ACTION';
export const SAVE_MARKSHEET_SUCCESS_ACTION = 'MARKSHEET/SAVE_MARKSHEET_SUCCESS_ACTION';
export const SAVE_MARKSHEET_ERROR_ACTION = 'MARKSHEET/SAVE_MARKSHEET_ERROR_ACTION';

export const DELETE_MARKSHEET_START_ACTION = 'MARKSHEET/DELETE_MARKSHEET_START_ACTION';
export const DELETE_MARKSHEET_SUCCESS_ACTION = 'MARKSHEET/DELETE_MARKSHEET_SUCCESS_ACTION';
export const DELETE_MARKSHEET_ERROR_ACTION = 'MARKSHEET/DELETE_MARKSHEET_ERROR_ACTION';

export const SELECT_MARKSHEET_ACTION = 'MARKSHEET/SELECT_MARKSHEET_ACTION';

interface State {
  loading: boolean;
  error: Error | null;
  marksheets: Marksheet[];
  selected: Marksheet | null;
}

interface RootState {
  MARKSHEET: State;
}

interface SelectMarksheetStartAction {
  type: 'MARKSHEET/SELECT_MARKSHEET_ACTION';
  payload: {
    marksheet: Marksheet;
  };
}

interface GetMarksheetStartAction {
  type: 'MARKSHEET/GET_MARKSHEET_START_ACTION';
  payload: ListAllParams;
}

interface GetMarksheetErrorAction {
  type: 'MARKSHEET/GET_MARKSHEET_ERROR_ACTION';
  payload: {
    error: Error;
  };
}

interface GetMarksheetSuccessAction {
  type: 'MARKSHEET/GET_MARKSHEET_SUCCESS_ACTION';
  payload: {
    marksheets: Marksheet[];
  };
}

interface SaveMarksheetStartAction {
  type: 'MARKSHEET/SAVE_MARKSHEET_START_ACTION';
  payload: NewMarksheetParams;
}

interface SaveMarksheetSuccessAction {
  type: 'MARKSHEET/SAVE_MARKSHEET_SUCCESS_ACTION';
}

interface SaveMarksheetErrorAction {
  type: 'MARKSHEET/SAVE_MARKSHEET_ERROR_ACTION';
  payload: {
    error: Error;
  };
}

interface DeleteMarksheetStartAction {
  type: 'MARKSHEET/DELETE_MARKSHEET_START_ACTION';
  payload: DeleteParams;
}

interface DeleteMarksheetErrorAction {
  type: 'MARKSHEET/DELETE_MARKSHEET_ERROR_ACTION';
  payload: {
    error: Error;
  };
}

interface DeleteMarksheetSuccessAction {
  type: 'MARKSHEET/DELETE_MARKSHEET_SUCCESS_ACTION';
}

export type Action = GetMarksheetStartAction &
  GetMarksheetErrorAction &
  GetMarksheetSuccessAction &
  SaveMarksheetStartAction &
  SaveMarksheetErrorAction &
  SaveMarksheetSuccessAction &
  DeleteMarksheetStartAction &
  DeleteMarksheetErrorAction &
  DeleteMarksheetSuccessAction &
  SelectMarksheetStartAction;

const initialState = {
  loading: false,
  error: null,
  marksheets: [],
  selected: null,
};

const reducer: (state: State, action: Action) => State = (
  state: State = initialState,
  { type, payload }: Action,
): State => {
  switch (type) {
    case SELECT_MARKSHEET_ACTION: {
      return {
        ...state,
        selected: payload.marksheet,
      };
    }
    case GET_MARKSHEET_START_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MARKSHEET_SUCCESS_ACTION: {
      return {
        ...state,
        loading: false,
        marksheets: payload.marksheets,
      };
    }
    case GET_MARKSHEET_ERROR_ACTION: {
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    }
    case SAVE_MARKSHEET_START_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_MARKSHEET_SUCCESS_ACTION: {
      return {
        ...state,
        loading: false,
      };
    }
    case SAVE_MARKSHEET_ERROR_ACTION: {
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    }
    case DELETE_MARKSHEET_START_ACTION: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_MARKSHEET_SUCCESS_ACTION: {
      return {
        ...state,
        loading: false,
      };
    }
    case DELETE_MARKSHEET_ERROR_ACTION: {
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
  selectMarksheet({ marksheet }: { marksheet: Marksheet }): SelectMarksheetStartAction {
    return {
      type: SELECT_MARKSHEET_ACTION,
      payload: {
        marksheet,
      },
    };
  },
  getMarksheetStart({ userId }: ListAllParams): GetMarksheetStartAction {
    return {
      type: GET_MARKSHEET_START_ACTION,
      payload: {
        userId,
      },
    };
  },
  getMarksheetError(error: Error): GetMarksheetErrorAction {
    return {
      type: GET_MARKSHEET_ERROR_ACTION,
      payload: {
        error,
      },
    };
  },
  getMarksheetSuccess(marksheets: Marksheet[]): GetMarksheetSuccessAction {
    return {
      type: GET_MARKSHEET_SUCCESS_ACTION,
      payload: {
        marksheets,
      },
    };
  },
  deleteMarksheetStart({ id }: DeleteParams): DeleteMarksheetStartAction {
    return {
      type: DELETE_MARKSHEET_START_ACTION,
      payload: {
        id,
      },
    };
  },
  deleteMarksheetError(error: Error): DeleteMarksheetErrorAction {
    return {
      type: DELETE_MARKSHEET_ERROR_ACTION,
      payload: {
        error,
      },
    };
  },
  deleteMarksheetSuccess(): DeleteMarksheetSuccessAction {
    return {
      type: DELETE_MARKSHEET_SUCCESS_ACTION,
    };
  },
  saveMarksheetStart({ userId, rows, name, id }: NewMarksheetParams): SaveMarksheetStartAction {
    return {
      type: SAVE_MARKSHEET_START_ACTION,
      payload: {
        userId,
        rows,
        name,
        id,
      },
    };
  },
  saveMarksheetError(error: Error): SaveMarksheetErrorAction {
    return {
      type: SAVE_MARKSHEET_ERROR_ACTION,
      payload: {
        error,
      },
    };
  },
  saveMarksheetSuccess(): SaveMarksheetSuccessAction {
    return {
      type: SAVE_MARKSHEET_SUCCESS_ACTION,
    };
  },
};

export const Selectors = {
  loading: (state: RootState): boolean => state[NAMESPACE].loading,
  error: (state: RootState): Error | null => state[NAMESPACE].error,
  selected: (state: RootState): Marksheet | null => state[NAMESPACE].selected,
  marksheets: (state: RootState): Marksheet[] => state[NAMESPACE].marksheets,
};

export default reducer;
