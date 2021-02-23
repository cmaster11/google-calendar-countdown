const state = {
  selectedEvent: null,
};

const getters = {
  getSelectedEvent(state) {
    return state.selectedEvent;
  },
};

const mutations = {
  setCurrentEvent(state, event) {
    state.selectedEvent = event;
  },
  unsetCurrentEvent(state) {
    state.selectedEvent = null;
  },
};

export default {
  state,
  getters,
  mutations,
};