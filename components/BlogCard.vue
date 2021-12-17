<template>
  <v-card class="mx-auto my-3 blog-card" max-width="374">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <div class="card-icon"><v-icon class="icon">edit</v-icon></div>
      <div class="card-icon"><v-icon class="icon">delete</v-icon></div>
    </v-img>
    <v-card-subtitle class="pb-0">{{ post.writer }}</v-card-subtitle>
    <!-- <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-subtitle>{{ post.writer }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
    <v-card-title>{{ post.blogTitle }}</v-card-title>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>
      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <router-link
        class="link"
        :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"
      >
        View The Post<v-icon class="icon">arrow_forward</v-icon>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
}
</script>

<style lang="scss" scoped>
.card-icon {
  font-size: 12px;
  color: #1a56be;
  border-radius: 25px;
  padding: 5px;
  background: #fff;
  font-weight: bold;
  display: inline;
  position: absolute;
  top: 12px;
  right: 55px;
  &:nth-child(even) {
    right: 11px;
  }
}
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 400px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }
  .link {
    display: inline-flex;
    align-items: center;
    padding-bottom: 4px;
    margin-left: 6px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease-in all;
    text-decoration: none;
    color: inherit;
    &:hover {
      border-bottom-color: #303030;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
