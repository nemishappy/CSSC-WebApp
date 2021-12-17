export const state = () => ({
  dialog: {
    isShow: false,
    title: '',
    message: '',
  },
  overlay: false,
  user: null,
  userLoadded : false,
})

export const getters = {
  getDialog(state) {
    return state.dialog
  },
  getOverlay(state) {
    return state.overlay
  },
  getUser(state) {
    return state.user
  },
  getUserLoadded(state){
    return state.userLoadded
  }
}

export const mutations = {
  SET_DIALOG(state, payload) {
    state.dialog = {
      ...state.dialog,
      ...payload,
    }
  },
  SET_OVERLAY(state) {
    state.overlay = !state.overlay
  },
  SET_USER(state, payload) {    
    state.user = payload
  },
  SET_USERLOADDED(state, payload) {    
    state.userLoadded = payload
  },
}

export const actions = {
  setDialog({ commit }, data) {
    commit('SET_DIALOG', data)
  },
  toggleOverlay({ commit }) {
    commit('SET_OVERLAY')
  },
  async onAuthStateChangedAction ({ commit }, { authUser, claims }) {
    commit('SET_USERLOADDED', false)
    if (!authUser) {
      // claims = null
      // Perform logout operations
      commit('SET_USER', null)
      console.log('logout')
      this.$router.push({ name: 'home' })
    } else {
      
      const { uid, email } = authUser
      commit('SET_USER', { uid, email })
    }
    commit('SET_USERLOADDED', true)
  },
}
