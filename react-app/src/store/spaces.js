// TYPES
const READ_SPACES = 'spaces/readSpaces'
const READ_SPAQUE = 'spaces/readSpaque'

// ACTION CREATORS
const loadSpaces = (allSpaces) => {
  return {
    type: READ_SPACES,
    payload: allSpaces
  };
};

const loadSpaque = (allSpaque) => {
  return {
    type: READ_SPAQUE,
    payload: allSpaque
  }
}

// MY THUNKS
export const getAllSpaces = () => async dispatch => {
  const res = await fetch('/api/spaces/');

  if (res.ok) {
    const allSpaces = await res.json();
    dispatch(loadSpaces(allSpaces));
    return allSpaces;
  }
}

export const getAllSpaque = (spaceId) => async dispatch => {
  const res = await fetch(`/api/spaces/${spaceId}`);

  if (res.ok) {
    const allSpaque = await res.json();
    dispatch(loadSpaque(allSpaque));
    return allSpaque;
  }
}

// REDUCE ME
const initialState = {
  allSpaces: {},
  allSpaque: {}
}

const spacesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_SPACES:
      const spacesState = { ...state, allSpaces: { ...state.allSpaces} };
      return spacesState
    default:
      return state;
  }
}
