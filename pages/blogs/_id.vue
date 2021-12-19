<template>
  <div class="post-view" v-if="post">
    <div class="container quillWrapper">
      <h2>{{ post.blogTitle }}</h2>
      <p class="subtitle-text">{{ post.blogSubtitle }}</p>
      <div class="d-flex align-center justify-space-between my-3">
        <div class="d-flex align-center" v-if="user">
          <div class="d-flex align-center profile" @click="toProfile">
            <v-avatar size="48">
              <img
                v-if="!user.pictureUrl"
                class="avatar"
                src="~/assets/profile.png"
                alt=""
              />
              <img v-else :src="user.pictureUrl" class="avatar" alt="" />
            </v-avatar>
            <div class="mx-3 text-primary name-text" v-if="user.name">@{{ user.name }}</div>
            <div class="mx-3 text-primary name-text" v-else>
              {{ user.firstname }} {{ user.lastname }}
            </div>
          </div>
          <div class="mr-3 name-text">CS {{ user.batch }}</div>
          <div class="date-text">
            Posted on:
            {{
              new Date(post.date).toLocaleString('en-us', { dateStyle: 'long' })
            }}
          </div>
        </div>
        <div>
          <v-btn icon> <v-icon>bookmark_add</v-icon> </v-btn>
        </div>
      </div>
      <img :src="post.blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="post.blogHTML"></div>
    </div>
    <div
      class="d-flex align-center justify-space-between container my-3"
      v-if="user"
    >
      <div class="d-flex">
        <h3>
          More from
          <div v-if="user.name" class="profile text-primary" @click="toProfile">@{{ user.name }}</div>
          <div v-else class="profile text-primary" @click="toProfile">{{ user.firstname }} {{ user.lastname }}</div>
        </h3>
      </div>
      <div>
        <v-btn rounded color="primary" class="no-uppercase"> Follow </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.post.blogTitle,
    }
  },
  data() {
    return {
      routeID: '',
      post: { blogTitle: '' },
      uid:'',
      user: '',
    }
  },
  async created() {
    this.routeID = this.$route.params.id
    await this.getPost()
  },
  methods: {
    async getPost() {
      const dataBase = this.$fire.firestore
        .collection('blogPosts')
        .doc(this.routeID)
      await dataBase
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            this.post = doc.data()
            const userDataBase = this.$fire.firestore
              .collection('users')
              .doc(doc.data().profileId)
            await userDataBase.get().then((doc) => {
              this.uid = doc.id
              this.user = doc.data()
            })
          } else {
            console.log('No such post!')
            this.$router.push({ name: 'home' })
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
          this.$router.push({ name: 'home' })
        })
    },
    toProfile() {
      this.$router.push({
        name: 'profile-id',
        params: { id: this.uid },
      })
    },
  },
}
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .quillWrapper {
    background-color: #fff !important;
  }
  .container {
    max-width: 1000px;
    padding: 60px 50px;
  }
  .subtitle-text {
    font-size: 18px;
  }
  .name-text {
    font-size: 18px;
    align-self: center;
  }
  .date-text {
    font-size: 14px;
    align-self: center;
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
.profile{
  cursor: pointer;
}
</style>
