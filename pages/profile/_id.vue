<template>
  <div v-if="profile.email">
    <v-list>
      <v-list-item class="px-2">
        <div class="module-border-wrap">
          <img
            v-if="!profile.pictureUrl"
            src="~/assets/profile.png"
            alt=""
            style="width: 120px; height: 120px; object-fit: cover"
          />
          <img
            v-else
            :src="profile.pictureUrl"
            alt=""
            style="width: 120px; height: 120px; object-fit: cover"
          />
        </div>
        <v-list-item-content>
          <v-list-item-title class="real-name">
            {{ profile.firstname }} {{ profile.lastname }}
            <span class="writer-name" v-if="profile.name"
              >({{ profile.name }})</span
            >
          </v-list-item-title>

          <v-list-item-subtitle>CS {{ profile.batch }}</v-list-item-subtitle>
          <v-list-item-subtitle
            ><v-icon small>email</v-icon>
            {{ profile.email }}</v-list-item-subtitle
          >
          <div class="d-flex mt-2">
            <v-tooltip bottom v-if="profile.facebook">
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mr-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="facebook"
                    src="~/assets/Icons/Facebook.png"
                    alt=""
                  />
                </v-avatar>
              </template>
              <span>{{ facebookUrl }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="profile.line">
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mx-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="line"
                    src="~/assets/Icons/Line.png"
                    alt=""
                  />
                </v-avatar>
              </template>
              <span>{{ lineUrl }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="profile.github">
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mx-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="github"
                    src="~/assets/Icons/Github.png"
                    alt=""
                  />
                </v-avatar>
              </template>
              <span>{{ githubUrl }}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="profile.linkedin">
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mx-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="linkedin"
                    src="~/assets/Icons/LinkedIn.png"
                    alt=""
                  />
                </v-avatar>
              </template>
              <span>{{ linkedinUrl }}</span>
            </v-tooltip>
          </div>
        </v-list-item-content>
        <dir class="d-flex justify-start">
          <v-btn
            v-if="user.uid === routeID"
            class="mb-3 mr-6 no-uppercase"
            color="primary"
            to="/profile/editprofile"
          >
            Edit Profile
          </v-btn>
          <v-btn v-else rounded class="mb-3 mr-6 no-uppercase" color="primary" >
            Follow
          </v-btn>
        </dir>
      </v-list-item>
    </v-list>
    <div>
      <h2 class="ma-5">Blogs Post</h2>
      <div v-if="user.uid === routeID" class="toggle-edit ma-3">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <div class="d-flex flex-wrap">
        <BlogCard
          :post="post"
          v-for="(post, index) in ownBlogPosts"
          v-on:deletePost="deletePost"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '~/components/BlogCard'
export default {
  head() {
    return {
      title: 'Profile',
    }
  },
  components: {
    BlogCard,
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    editPost: {
      get() {
        return this.$store.getters.getEditPost
      },
      set(payload) {
        this.$store.dispatch('toggleEditPost')
      },
    },
    // ownBlogPosts() {
    //   return this.$store.getters.getBlogPosts
    // },
  },
  data() {
    return {
      facebookUrl: '',
      lineUrl: '',
      githubUrl: '',
      linkedinUrl: '',
      profile: {},
      ownBlogPosts: [],
    }
  },
  async created() {
    this.routeID = this.$route.params.id
    const userDataBase = this.$fire.firestore
      .collection('users')
      .doc(this.routeID)
    await userDataBase.get().then((doc) => {
      this.profile = doc.data()
    })

    const subCollection = await this.$fire.firestore
      .collection('users')
      .doc(this.routeID)
      .collection('posts')
    const dbResults = await subCollection.get()
    // const blogDataBase = this.$fire.firestore.collection('blogPosts')
    // const blogResults = await blogDataBase.get()
    dbResults.forEach(async (post) => {
      const blogDataBase = this.$fire.firestore
        .collection('blogPosts')
        .doc(post.id)
      await blogDataBase
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.ownBlogPosts.push(doc.data())
          } else {
            console.log('No such post!')
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    })
    this.ownBlogPosts = this.ownBlogPosts.sort(function (x, y) {
      return x.date - y.date
    })
    this.facebookUrl = 'https://www.facebook.com/' + this.profile.facebook
    this.lineUrl = 'http://line.me/ti/p/~' + this.profile.line
    this.githubUrl = 'https://github.com/' + this.profile.github
    this.linkedinUrl = 'https://www.linkedin.com/in/' + this.profile.linkedin
  },
  mounted() {},
  methods: {
    facebook() {
      window.open(this.facebookUrl, '_blank')
    },
    line() {
      window.open(this.lineUrl, '_blank')
    },
    github() {
      window.open(this.githubUrl, '_blank')
    },
    linkedin() {
      window.open(this.linkedinUrl, '_blank')
    },
    deletePost(blogID) {
      this.ownBlogPosts = this.ownBlogPosts.filter(
        (post) => post.blogID !== blogID
      )
    },
  },
  beforeDestroy() {
    if (!this.editPost) this.$store.dispatch('toggleEditPost')
  },
}
</script>

<style lang="scss" scoped>
.real-name {
  font-size: 24px;
  .writer-name {
    font-size: 20px;
  }
}
.icon {
  cursor: pointer;
}
</style>
