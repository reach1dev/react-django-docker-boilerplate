import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  events: [],
  error: null,
  loading: false,
  searchQuery: {
    filterMode: 'Cumulative',
    filterDate: '',
    filterTime: '',
    vehicleType: 'all_vehicle',
    sortMode: 'Speed',
    speedThreshold: 0
  }
};

const getEventsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getEventsSuccess = (state, action) => {
  return updateObject(state, {
    events: action.events.map((e, index) => Object.assign({ ...e, index })),
    error: null,
    loading: false
  });
};

const getEventsUpdate = (state, action) => {
  return updateObject(state, {
    events: [...state.events, ...action.events.map((e, index) => Object.assign({ ...e, index: (state.events.length + index) }))],
    error: null,
    loading: false
  });
}

const getEventsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.GET_EVENTS_START:
      return getEventsStart(state, action);

    case actionTypes.GET_EVENTS_SUCCESS:
      return getEventsSuccess(state, action);
    case actionTypes.GET_EVENTS_UPDATE:
      return getEventsUpdate(state, action);

    case actionTypes.GET_EVENTS_FAIL:
      return getEventsFail(state, action);

    case actionTypes.SET_SEARCH_QUERY:
      return updateObject(state, {
        searchQuery: action.searchQuery
      });

    case actionTypes.CLEAR_SEARCH_QUERY:
      return updateObject(state, {
        searchQuery: initialState.searchQuery
      });

    default:
      return state;
  }
};

export default reducer;