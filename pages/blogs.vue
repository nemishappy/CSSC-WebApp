<template>
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
  data() {
    return {        
      editPost: true,
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
</style>
