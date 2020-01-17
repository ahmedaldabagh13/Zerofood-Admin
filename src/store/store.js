import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "/v1";

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null
    // type
  },
  getters: {
    loggedIn(state) {
      return state.token == null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    }
  },
  actions: {
    destroyToken(context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem("token");
        context.commit("destroyToken");
      }
    },
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            phone: credentials.email,
            password: credentials.password,
            playerId: "12"
          })
          .then(response => {
            const token = response.data.data.token;
            localStorage.setItem("token", token);
            context.commit("retrieveToken", token);
            resolve(response);
            console.log(token);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  }
});
