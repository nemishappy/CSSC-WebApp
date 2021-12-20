<template>
  <div>
    <h2 class="ma-3">Saved Post</h2>
    <div class="toggle-edit ma-3">
      <span>Toggle Editing Saved Post</span>
      <input type="checkbox" v-model="editPost" />
    </div>
    <div v-if="blogPosts" class="d-flex align-content-space-around flex-wrap">
      <BlogCardSafe
        :post="post"
        class="mx-auto"
        v-for="(post, index) in blogPosts"
        :key="index"
      />
    </div>
    <div v-else class="d-flex justify-center pa-4">
      <p>No post saved.</p>
    </div>
  </div>
</template>

<script>
import BlogCardSafe from '~/components/BlogCardSafe'
export default {
  head() {
    return {
      title: 'Saved',
    }
  },
  components: {
    BlogCardSafe,
  },
  computed: {
    blogPosts() {
      return this.$store.getters.getSavedPosts
    },
    editPost: {
      get() {
        return this.$store.getters.getEditPost
      },
      set(payload) {
        this.$store.dispatch('toggleEditPost')
      },
    },
  },
  async mounted() {
    if (this.$store.getters.getUser.uid) {
      await this.$store.dispatch('setSavedPosts')
      return
    }
    this.$router.push({ name: 'home' })
  },
  beforeDestroy() {
    if (!this.editPost) this.$store.dispatch('toggleEditPost')
  },
}
</script>

<style lang="scss">
.toggle-edit {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    margin-right: 16px;
  }

  input[type='checkbox'] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background: #fff;
    outline: none;
    width: 40px;
    height: 15px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  input[type='checkbox']:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    top: 0;
    left: 0;
    background: #303030;
    transform: scale(1.1);
    transition: 750ms ease all;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  input:checked[type='checkbox']:before {
    background: #fff;
    left: 26px;
  }
}
</style>
