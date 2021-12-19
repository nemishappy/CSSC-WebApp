export const state = () => ({
  dialog: {
    isShow: false,
    title: '',
    message: '',
  },
  overlay: false,
  editPost: true,
  file: null,
  photoPreview: {
    isShow: false,
    blogPhotoFileURL: '',
  },
  post: {
    blogTitle: '',
    blogSubtitle: '',
    blogHTML: '',
  },
  blogPosts: [],
  postLoaded: false,
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
  getEditPost(state) {
    return state.editPost
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
  getFile(state) {
    return state.file
  },
  getBlogPosts(state) {
    return state.blogPosts
  },
  getBlogPostHome(state) {
    return state.blogPosts.slice(0, 2)
  },
  getBlogPostCards(state) {
    return state.blogPosts.slice(2, 6)
  },
  getPostLoaded(state) {
    return state.postLoaded
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
  SET_EDITPOST(state) {
    state.editPost = !state.editPost
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_USERLOADDED(state, payload) {
    state.userLoadded = payload
  },
  SET_FILE(state, payload) {
    state.file = payload
  },
  SET_PHOTOPREVIEW(state, payload) {
    state.photoPreview = { ...state.photoPreview, ...payload }
  },
  SET_POST(state, payload) {
    state.post = { ...state.post, ...payload }
  },
  SET_BLOGPOSTS(state, payload) {
    state.blogPosts.push(payload)
  },
  SET_POSTLOADED(state, payload) {
    state.postLoaded = payload
  },
  CLEAR_EDITPOST(state) {
    state.file = null
    state.photoPreview = {
      isShow: false,
      blogPhotoFileURL: '',
    }
    state.post = {
      blogTitle: '',
      blogSubtitle: '',
      blgHTML: '',
    }
  },
  FILTER_BLOGPOST(state, payload) {
    state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
  },
}

export const actions = {
  setDialog({ commit }, data) {
    commit('SET_DIALOG', data)
  },
  toggleOverlay({ commit }) {
    commit('SET_OVERLAY')
  },
  toggleEditPost({ commit }) {
    commit('SET_EDITPOST')
  },
  setFile({ commit }, data) {
    commit('SET_FILE', data)
  },
  setPhotoPreview({ commit }, data) {
    commit('SET_PHOTOPREVIEW', data)
  },
  setPost({ commit }, data) {
    commit('SET_POST', data)
  },
  clearPost({ commit }, data) {
    commit('CLEAR_EDITPOST')
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
  async setBlogPosts({ commit, getters }) {
    commit('SET_POSTLOADED', false)
    const dataBase = this.$fire.firestore
      .collection('blogPosts')
      .orderBy('date', 'desc')
    const dbResults = await dataBase.get()
    dbResults.forEach((doc) => {
      if (!getters.getBlogPosts.some((post) => post.blogID === doc.id)) {
        const data = {
          blogID: doc.data().blogID,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogSubtitle: doc.data().blogSubtitle,
          blogDate: doc.data().date,
          profileId: doc.data().profileId,
        }
        commit('SET_BLOGPOSTS', data)
      }
    })
    commit('SET_POSTLOADED', true)
  },
  async updatePost({ commit, dispatch }, data) {
    commit("FILTER_BLOGPOST", data);
    await dispatch("setBlogPosts");
  },
}
