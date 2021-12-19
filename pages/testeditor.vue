<template>
  <div>
      <p>Test</p>
      <Editor v-on:text-change="textChange"/>
  </div>
</template>

<script>
// You can also register Quill modules in the component
import Editor from '~/components/AppEditor.vue'

export default {
  components: {
    Editor,
  },
  methods: {
      textChange(content){
          console.log(content);
      },
  },
}
</script>
