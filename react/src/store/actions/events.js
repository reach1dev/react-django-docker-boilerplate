import axios from "axios";
import * as actionTypes from "./actionTypes";
import { API_URL } from "../../constants/AppConfig";

export const clearSearchQuery = () => {
  return {
    type: actionTypes.CLEAR_SEARCH_QUERY,
  };
}

export const setSearchQuery = (searchQuery) => {
  return {
    type: actionTypes.SET_SEARCH_QUERY,
    searchQuery: searchQuery
  };
}

export const getEventsStart = () => {
  return {
    type: actionTypes.GET_EVENTS_START
  };
};

export const getEventsSuccess = events => {
  return {
    type: actionTypes.GET_EVENTS_SUCCESS,
    events: events
  };
};

export const getEventsUpdate = events => {
  return {
    type: actionTypes.GET_EVENTS_UPDATE,
    events: events
  };
};

export const getEventsFail = error => {
  return {
    type: actionTypes.GET_EVENTS_FAIL,
    error: error
  };
};

export const getAllEvents = (authToken, lastUpdatedTime = '') => {
  return dispatch => {
    dispatch(getEventsStart());

    axios
      .get(API_URL + "/api/events/?" + (lastUpdatedTime !== '' ? ('lastUpdatedTime=' + lastUpdatedTime) : ''), {
        headers: {
          Authorization: 'Token ' + authToken
        }
      })
      .then(res => {
        const events = res.data.map((e) => Object.assign({ ...e, speed: Math.abs(e.speed) }));
        if (lastUpdatedTime !== '') {
          dispatch(getEventsUpdate(events));
          return;
        }
        const step = Math.max(100, Math.floor(events.length / 30));
        let range = step;
        const timer = setInterval(() => {
          if (range >= events.length) {
            clearInterval(timer);
          }
          dispatch(getEventsSuccess(events.slice(0, Math.min(range, events.length))));
          range = range + step;
          if (range > events.length / 2) {
            range = range + step;
          }
        }, 50);
      })
      .catch(err => {
        dispatch(getEventsFail(err));
      });
  };
};
