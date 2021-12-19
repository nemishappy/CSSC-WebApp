<template>
  <div>
    <h2 class="ma-3">Blogs Post</h2>
    
    <div class="d-flex align-content-space-around flex-wrap">
      <BlogCard
        :post="post"
        class="mx-auto"
        v-for="(post, index) in blogPosts"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import BlogCard from '~/components/BlogCard'
export default {
  head() {
    return {
      title: 'Blogs',
    }
  },
  components: {
    BlogCard,
  },
  computed:{
    blogPosts(){
      return this.$store.getters.getBlogPosts;
    }
  },
  async mounted() {
    await this.$store.dispatch('setBlogPosts')
  },
}
</script>

<style lang="scss" >
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
blockquote {
    margin: 0;
}

blockquote  {
    padding: 15px;
    background: #eee;
    border-radius: 5px;
}

blockquote ::before {
    content: '\201C';
}

blockquote ::after {
    content: '\201D';
}
.ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6{
  padding: 15px;  
}
</style>
