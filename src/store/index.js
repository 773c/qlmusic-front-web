import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import audio from './modules/audio'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    audio,
    user
  },
  getters
})

export default store
