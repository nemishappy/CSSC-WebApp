<template>
  <div class="post-view">
      <h2 class="mt-4 ml-4">Blog Preview</h2>
    <div class="container quillWrapper">
      <h2>{{ post.blogTitle }}</h2>
      <p>{{ post.blogSubtitile }}</p>
      <div class="d-flex align-center justify-space-between my-3">
        <div class="d-flex align-center">
          <v-avatar size="48">
            <img
              v-if="!user.pictureUrl"
              class="avatar"
              src="~/assets/profile.png"
              alt=""
            />
            <img v-else :src="user.pictureUrl" class="avatar" alt="" />
          </v-avatar>
          <div class="mx-3" v-if="user.name">@{{ user.name }}</div>
          <div class="mx-3" v-else>
            {{ user.firstname }} {{ user.lastname }}
          </div>
          <div class="mr-3">CS {{ user.batch }}</div>
          <div>Posted on: xx/xx/xxxx</div>
        </div>
        <div>
          <v-btn icon> <v-icon>bookmark_add</v-icon> </v-btn>
        </div>
      </div>
      <img v-if="blogCoverPhoto" :src="blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="post.blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Blog Preview',
    }
  },
  computed: {
    post() {
      return this.$store.getters.getPost
    },
    blogCoverPhoto() {
      return this.$store.getters.getPhotoPreview.blogPhotoFileURL
    },
    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
    &.avatar {
      margin-bottom: 0px;
    }
  }
}
</style>
