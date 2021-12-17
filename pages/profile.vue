<template>
  <div>
    <v-list>
      <v-list-item class="px-2">
        <div class="module-border-wrap">
          <img
            v-if="!user.name"
            src="~/assets/profile.png"
            alt=""
            width="120px"
          />
          <img v-else :src="user.pictureUrl" alt="" width="120px" />
        </div>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ user.firstname }} {{ user.lastname }}
          </v-list-item-title>

          <v-list-item-subtitle>CS {{ user.batch }}</v-list-item-subtitle>
        </v-list-item-content>
        <dir class="d-flex justify-start">
          <v-btn class="mb-3 mr-6" color="primary" disabled>
            Edit Profile
          </v-btn>
        </dir>
      </v-list-item>
    </v-list>
    <div>
      <h2 class="ma-3">Blogs Post</h2>
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
      sampleCards: [
        { blogTitle: 'Blog Card 1', blockCoverphoto: 'stock-1', writer: 'nnn' },
        { blogTitle: 'Blog Card 2', blockCoverphoto: 'stock-1', writer: 'nnn' },
        { blogTitle: 'Blog Card 3', blockCoverphoto: 'stock-1', writer: 'nnn' },
        { blogTitle: 'Blog Card 3', blockCoverphoto: 'stock-1', writer: 'nnn' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
