<template>
  <v-card class="mx-auto my-3 blog-card" v-if="user">
    <v-img
      class="white--text align-end"
      height="200px"
      width="374"
      v-if="!post.blogCoverPhoto"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <div v-if="!editPost">
        <div class="card-icon"><v-icon class="icon">delete</v-icon></div>
      </div>
    </v-img>
    <v-img
      class="white--text align-end"
      height="200px"
      width="374"
      v-else
      :src="post.blogCoverPhoto"
    >
      <div v-if="!editPost">
        <div class="card-icon">
          <v-icon class="icon" @click="deleteBlogSaved()">delete</v-icon>
        </div>
      </div>
    </v-img>
    <v-card-subtitle class="pb-0 d-flex align-center">
      <v-avatar size="36">
        <img
          v-if="!user.pictureUrl"
          class="avatar"
          src="~/assets/profile.png"
          alt=""
        />
        <img v-else :src="user.pictureUrl" class="avatar" alt="" />
      </v-avatar>
      <div class="mx-3" v-if="user.name">@{{ user.name }}</div>
      <div class="mx-3" v-else>{{ user.firstname }} {{ user.lastname }}</div>
    </v-card-subtitle>

    <v-card-title>{{ post.blogTitle }}</v-card-title>

    <v-card-text class="text--primary">
      {{ post.blogSubtitle }}
    </v-card-text>

    <v-card-actions>
      <router-link
        class="link"
        :to="{ name: 'blogs-id', params: { id: this.post.blogID } }"
      >
        View The Post<v-icon class="icon">arrow_forward</v-icon>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    editPost() {
      return this.$store.getters.getEditPost
    },
  },
  data() {
    return {
      user: null,
    }
  },
  async mounted() {
    const userDataBase = this.$fire.firestore
      .collection('users')
      .doc(this.post.profileId)
    await userDataBase.get().then((doc) => {
      this.user = doc.data()
    })
  },
  methods: {
    deleteBlogSaved() {
      this.$store.dispatch('deleteSavedPost', this.post.blogID)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-icon {
  font-size: 12px;
  color: #1a56be;
  border-radius: 25px;
  padding: 5px;
  background: #fff;
  font-weight: bold;
  display: inline;
  position: absolute;
  top: 12px;
  right: 11px;

  transition: 0.5s ease all;
}
</style>
