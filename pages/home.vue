<template>
  <div>
    <BlogPost v-if="!user.uid" :post="welcomeScreen" />
    <div v-else />
    <!-- v-else for fix DOMException -->
    <BlogPost :post="post" v-for="(post, index) in blogPostHome" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <v-slide-group multiple show-arrows>
          <v-slide-item>
            <div class="blog-cards">
              <BlogCardSafe
                :post="post"
                v-for="(post, index) in blogPostCards"
                :key="index"
              />
            </div>
          </v-slide-item>
        </v-slide-group>
      </div>
    </div>
    <v-container>
      <div v-if="!user.uid" class="updates">
        <div class="container">
          <h2>never miss a post. Register for your free account today!</h2>
          <router-link class="router-button" to="#">
            Register for CSShowcase
            <v-icon color="white" class="icon ml-1">arrow_forward</v-icon>
          </router-link>
        </div>
      </div>
      <div v-else></div> 
      <!-- v-else for fix DOMException -->
    </v-container>
  </div>
</template>

<script>
import BlogPost from '~/components/BlogPost'
import BlogCardSafe from '~/components/BlogCardSafe'
export default {
  components: {
    BlogPost,
    BlogCardSafe,
  },
  computed:{
    user() {
      return this.$store.getters.getUser
    },
    blogPostHome() {
      return this.$store.getters.getBlogPostHome;
    },
    blogPostCards() {
      return this.$store.getters.getBlogPostCards;
    },
  },

  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost:
          'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        welcomeScreen: true,
        photo: 'coding',
      },
    }
  },
  async mounted() {
    await this.$store.dispatch('setBlogPosts')
  },
}
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      color: #fff;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 26px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 32px;
      }
    }
  }
}
</style>
