<template>
  <section class="container">
    <client-only>
      <quill-editor
        ref="editor"
        v-model.lazy="editedContent"
        :options="editorOption"
        @change="debounceTextChange"
      />
    </client-only>
  </section>
</template>

<script>
import { debounce } from 'vue-debounce'
export default {
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      editedContent: this.content,
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike', 'code'],
              ['blockquote', 'code-block'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image'],
            ],
            handlers: {
              image: this.uploadImage,
            },
          },
        },
      },
    }
  },
  methods: {
    debounceTextChange: debounce(function () {
      this.$emit('text-change', this.editedContent)
    }, 2000),
    uploadImage() {
      if (!process.client) {
        return
      }
      let fileInput = this.$el.querySelector('input.ql-image[type=file]')

      if (fileInput == null) {
        fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute(
          'accept',
          'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
        )
        fileInput.classList.add('ql-image')
        fileInput.addEventListener('change', () => {
          if (fileInput.files != null && fileInput.files[0] != null) {
            // customize image upload function
            const file = fileInput.files[0]
            const fileName = file.name.split('.').slice(0, -1).join('.') 
            this.$fire.storage
              .ref('documents/blogPostPhotos/' + file.name)
              .put(file)
              .then((response) => {
                console.log('===image upload succeeded===')
                response.ref.getDownloadURL().then((downloadURL) => {
                  console.log(downloadURL)
                  let range = this.$refs.editor.quill.getSelection()
                  this.$refs.editor.quill.insertEmbed(
                    range.index,
                    'image',
                    downloadURL
                  )
                })
              })
              .catch((err) => console.log(err))
          }
        })
        let container = this.$el.querySelector('.ql-toolbar.ql-snow')
        container.appendChild(fileInput)
      }
      fileInput.click()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 0;
  padding: 0 0;

  .quill-editor {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
