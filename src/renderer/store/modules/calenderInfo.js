import axios from 'axios';
import {ipcRenderer} from 'electron';

const state = {
  calendarList: [],
  selectedCalendar: '',
  eventList: [],
};

const getters = {
  getCalendarList(state) {
    return state.calendarList;
  },
  getEventList(state) {
    return state.eventList;
  },
  getEventListLength(state) {
    return state.eventList.length;
  },
};

const mutations = {
  saveCalendarList(state, acquiredCalendarList) {
    state.calendarList = acquiredCalendarList;
  },
  saveEventList(state, acquiredEventList) {
    state.eventList = acquiredEventList;
  },
  setCurrentCalendar(state, calendarId) {
    state.selectedCalendar = calendarId;
  },
  clearCalendar(state) {
    state.eventList = [];
    state.calendarList = [];
    state.selectedCalendar = '';
  },

};

const actions = {
  saveCalendarList(context, accessToken) {
    const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?fields=items(backgroundColor%2Cid%2Csummary%2CtimeZone)%2CnextPageToken%2CnextSyncToken&` + `&access_token=${accessToken}`;
    axios.get(url)
      .then(function (response) {
        // console.log(response.data.items);
        context.commit('saveCalendarList', response.data.items);
      })
      .catch(function (error) {
        // handle error
        console.log(error);

        if (error.response && error.response.status === 401) {
          // Re-auth
          ipcRenderer.send('google-oauth-refresh', context.getters.getRefreshToken);
        }
      });
  },
  saveEventList(context, accessToken) {
    const cal = encodeURIComponent(context.state.selectedCalendar);

    let startTime = new Date((new Date()).getTime());

    const dateISO = encodeURIComponent(startTime.toISOString());

    const url = `https://www.googleapis.com/calendar/v3/calendars/${cal}/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${dateISO}` + `&access_token=${accessToken}`;
    axios.get(url)
      .then(function (response) {
        // console.log(response.data.items);
        context.commit('saveEventList', response.data.items);

        if (response.data.items.length) {
          // Find the first calendar event in the near time
          const minTime = (new Date()).getTime();

          const firstEvent = response.data.items.find((el) => el.start && el.start.dateTime && ((new Date(el.start.dateTime)).getTime() >= minTime));
          if (firstEvent) {
            context.commit('setCurrentEvent', firstEvent);
          } else {
            context.commit('unsetCurrentEvent');
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);

        if (error.response && error.response.status === 401) {
          // Re-auth
          ipcRenderer.send('google-oauth-refresh', context.getters.getRefreshToken);
        }
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};