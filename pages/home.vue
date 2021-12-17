<template>
  <div>
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sample" :key="index" />
  </div>
</template>

<script>
import BlogPost from '~/components/BlogPost'
export default {
  components: {
    BlogPost,
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
      sample: [
        {
          blogTitle: 'Test',
          blogHTML:
            'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',

          blogCoverPhoto: 'coding',
        },
        {
          blogTitle: 'Test!',
          blogHTML:
            'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',

          blogCoverPhoto: 'coding',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
