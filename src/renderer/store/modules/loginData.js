import axios from 'axios';
import {ipcRenderer} from 'electron';

const state = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,

  //user Info
  name: '',
  email: '',
  pic: '',

};

const getters = {
  isUserLoggedIn(state) {
    return state.isLoggedIn;
  },
  getAccessToken(state) {
    return state.accessToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  userData(state) {
    return state;
  },
};

const mutations = {
  logInUser(state, accessToken, refreshToken) {
    state.isLoggedIn = true;
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
  },
  logOutUser(state) {
    state.pic = '';
    state.name = '';
    state.email = '';
    state.accessToken = '';
    state.isLoggedIn = false;
  },
  getUserData(state, acquiredUserData) {
    state.name = acquiredUserData.name;
    state.email = acquiredUserData.email;
    state.pic = acquiredUserData.picture;
  },
};

const actions = {
  getUserData(context) {
    const url = `https://www.googleapis.com/oauth2/v2/userinfo?fields=email%2Cname%2Cpicture` + `&access_token=${state.accessToken}`;
    axios.get(url)
      .then(function (response) {
        context.commit('getUserData', response.data);
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