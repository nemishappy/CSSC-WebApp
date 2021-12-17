export const state = () => ({
  dialog: {
    isShow: false,
    title: '',
    message: '',
  },
  overlay: false,
  user: null,
  userLoadded: false,
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
  getUserLoadded(state) {
    return state.userLoadded
  },
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
  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    commit('SET_USERLOADDED', false)
    if (!authUser) {
      // claims = null
      // Perform logout operations
      commit('SET_USER', null)
      console.log('logout')
      this.$router.push({ name: 'home' })
    } else {
      const { uid, email } = authUser
      await dispatch("setUser", { uid, email })
    }
    commit('SET_USERLOADDED', true)
  },
  async setUser({ commit }, data) {
    const dataBase = this.$fire.firestore.collection('users').doc(data.uid)
    await dataBase
      .get()
      .then((doc) => {
        if (doc.exists) {
          commit('SET_USER', {
            uid: data.uid,
            email: data.email,
            firstname: doc.data().firstName,
            lastname: doc.data().lastName,
            name: doc.data().name,
            batch: doc.data().batch,
          })
        } else {
          console.log('No such user!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  },
}
