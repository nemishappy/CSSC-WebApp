export const state = () => ({
  dialog: {
    isShow: false,
    title: '',
    message: '',
  },
  overlay: false,
  photoPreview: {
    isShow: false,
    blogPhotoFileURL: '',
  },
  post:{
    blogTitle:'',
    blogSubtitile: '',
    blogHTML: '',
  },
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
  getPhotoPreview(state) {
    return state.photoPreview
  },
  getPost(state) {
    return state.post
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
  SET_PHOTOPREVIEW(state, payload) {
    state.photoPreview = { ...state.photoPreview, ...payload }
  },
  SET_POST(state, payload){
    state.post = { ...state.post, ...payload }
  }
}

export const actions = {
  setDialog({ commit }, data) {
    commit('SET_DIALOG', data)
  },
  toggleOverlay({ commit }) {
    commit('SET_OVERLAY')
  },
  setPhotoPreview({ commit }, data) {
    commit('SET_PHOTOPREVIEW', data)
  },
  setPost({ commit }, data) {
    commit('SET_POST', data)
  },
  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
    commit('SET_USERLOADDED', false)
    if (!authUser) {
      // claims = null
      // Perform logout operations
      commit('SET_USER', null)
      commit('SET_USERLOADDED', true)
      console.log('logout')
      this.$router.push({ name: 'home' })
    } else {
      const { uid } = authUser
      await dispatch('setUserByUID', uid)
      return
    }
  },
  async setUserByUID({ commit }, data) {
    commit('SET_USERLOADDED', false)
    const dataBase = this.$fire.firestore.collection('users').doc(data)
    await dataBase
      .get()
      .then((doc) => {
        if (doc.exists) {
          var obj = doc.data()
          obj['uid'] = data
          commit('SET_USER', obj)
        } else {
          console.log('No such user!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
    commit('SET_USERLOADDED', true)
  },
}
