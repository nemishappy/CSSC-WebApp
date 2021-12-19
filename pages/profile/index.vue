<template>
  <div>
    <v-list>
      <v-list-item class="px-2">
        <div class="module-border-wrap">
          <img
            v-if="!user.name"
            src="~/assets/profile.png"
            alt=""
            style="width: 120px; height: 120px; object-fit: cover"
          />
          <img
            v-else
            :src="user.pictureUrl"
            alt=""
            style="width: 120px; height: 120px; object-fit: cover"
          />
        </div>
        <v-list-item-content>
          <v-list-item-title class="real-name">
            {{ user.firstname }} {{ user.lastname }} <span class="writer-name" v-if="user.name">({{user.name}})</span>
          </v-list-item-title>

          <v-list-item-subtitle>CS {{ user.batch }}</v-list-item-subtitle>
          <v-list-item-subtitle><v-icon small>email</v-icon> {{ user.email }}</v-list-item-subtitle>
          <div class="d-flex mt-2">
            <v-tooltip bottom>
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mx-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="facebook"
                    src="~/assets/Icons/Line.png"
                    alt=""
                  />
                </v-avatar>
              </template>
              <span>{{ lineUrl }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mx-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="facebook"
                    src="~/assets/Icons/Github.png"
                    alt=""
                  />
                </v-avatar>
              </template>
              <span>{{ githubUrl }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar class="mx-1" size="26" v-bind="attrs" v-on="on">
                  <img
                    class="icon"
                    v-on:click="facebook"
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
          <v-btn class="mb-3 mr-6" color="primary" to="/editprofile">
            Edit Profile
          </v-btn>
        </dir>
      </v-list-item>
    </v-list>
    <div>
      <h2 class="ma-5">Blogs Post</h2>
      <div class="toggle-edit ma-3">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <div class="d-flex flex-wrap">
        <BlogCard
          :post="post"
          v-for="(post, index) in sampleCards"
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
  },
  data() {
    return {
      editPost: true,
      sampleCards: [
        { blogTitle: 'Blog Card 1', blockCoverphoto: 'stock-1', writer: 'nnn' },
        { blogTitle: 'Blog Card 2', blockCoverphoto: 'stock-1', writer: 'nnn' },
        { blogTitle: 'Blog Card 3', blockCoverphoto: 'stock-1', writer: 'nnn' },
        { blogTitle: 'Blog Card 3', blockCoverphoto: 'stock-1', writer: 'nnn' },
      ],
      fname: 'name.nts',
      facebookUrl: '',
      lineUrl: '',
      githubUrl: '',
      linkedinUrl: '',
    }
  },
  methods: {
    facebook() {
      window.open(this.facebookUrl, '_blank')
    },
  },
  mounted() {
    this.facebookUrl = 'https://www.facebook.com/' + this.user.facebook
    this.lineUrl = 'http://line.me/ti/p/~' + this.user.line
    this.githubUrl = 'https://github.com/' + this.user.github
    this.linkedinUrl = 'https://www.linkedin.com/in/' + this.user.linkedin
  },
}
</script>

<style lang="scss" scoped>
.real-name{
  font-size: 24px;
  .writer-name{
    font-size: 20px;
  }
}
.icon {
  cursor: pointer;
}
</style>
