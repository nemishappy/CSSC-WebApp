<template>
  <div class="create-post">
    <BlogCoverPreview />
    <Overlay />
    <h2 class="mt-4 ml-4">Create Post</h2>
    <div class="container">
      <div class="blog-info">
        <v-text-field
          class="text-field"
          placeholder="Enter Blog Title"
          color="#303030"
          v-model="blogTitle"
        ></v-text-field>
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{
              'button-inactive': !this.photoPreview.blogPhotoFileURL,
            }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ photoPreview.fileName }}</span>
        </div>
      </div>
      <v-text-field
        color="#303030"
        placeholder="Subtitile about blog"
        v-model="blogSubtitle"
      ></v-text-field>
      <div class="editor">
        <AppEditor :content="blogHTML" v-on:text-change="textChange" />
      </div>
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'blogs-blogpreview' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from '~/components/BlogCoverPreview'
import AppEditor from '~/components/AppEditor.vue'
import Overlay from '~/components/Overlay'
export default {
  head() {
    return {
      title: 'Create Post',
    }
  },
  components: {
    AppEditor,
  },
  data() {
    return {
      fileUrl: null,
      error: null,
      errorMsg: null,
    }
  },
  components: {
    BlogCoverPreview,
    Overlay,
  },
  methods: {
    textChange(content) {
      this.blogHTML = content
    },
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0]
      let fileName = ''
      if (this.file) {
        fileName = this.file.name
        if (fileName.length >= 16) {
          fileName = fileName.substring(0, 16) + '...'
        }
        this.fileUrl = URL.createObjectURL(this.file)
        this.$store.dispatch('setPhotoPreview', {
          isShow: false,
          fileName: fileName,
          blogPhotoFileURL: this.fileUrl,
        })
        return
      }
      this.fileUrl = ''
      this.$store.dispatch('setPhotoPreview', {
        isShow: false,
        fileName: fileName,
        blogPhotoFileURL: this.fileUrl,
      })
    },

    openPreview() {
      this.$store.dispatch('setPhotoPreview', {
        isShow: true,
      })
    },

    uploadBlog() {
      if (
        this.blogTitle.length !== 0 &&
        this.blogHTML.length !== 0 &&
        this.blogSubtitle.length !== 0
      ) {
        if (this.file) {
          this.$store.dispatch('toggleOverlay')
          const storageRef = this.$fire.storage.ref()
          const docRef = storageRef.child(
            `documents/BlogCoverPhotos/${this.file.name}`
          )
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot)
            },
            (err) => {
              console.log(err)
              this.loading = false
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL()
              const timestamp = await Date.now()
              const dataBase = await this.$fire.firestore
                .collection('blogPosts')
                .doc()

              await dataBase.set({
                blogID: dataBase.id,
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.file.name,
                blogTitle: this.blogTitle,
                blogSubtitle: this.blogSubtitle,
                profileId: this.profileId,
                date: timestamp,
              })

              const userDataBase = await this.$fire.firestore
                .collection('users')
                .doc(this.profileId)
                .collection('posts')
                .doc(dataBase.id)
              await userDataBase.set({ blogTitle: this.blogTitle , date: timestamp})

              this.$store.dispatch('toggleOverlay')
              this.$store.dispatch('clearPost')
              // this.$router.push({
              //   name: 'ViewBlog',
              //   params: { blogid: dataBase.id },
              // })
              this.$router.push({
                name: 'blogs-id',
                params: { id: dataBase.id },
              })
            }
          )
          return
        }
        this.error = true
        this.errorMsg = 'Please ensure you uploaded a cover photo!'
        setTimeout(() => {
          this.error = false
        }, 5000)
        return
      }
      this.error = true
      this.errorMsg = 'Please ensure Blog Title & Blog Post has been filled!'
      setTimeout(() => {
        this.error = false
      }, 5000)
      return
    },
  },
  computed: {
    profileId() {
      return this.$store.getters.getUser.uid
    },
    photoPreview() {
      return this.$store.getters.getPhotoPreview
    },
    file: {
      get() {
        return this.$store.getters.getFile
      },
      set(payload) {
        this.$store.dispatch('setFile', payload)
      },
    },
    blogTitle: {
      get() {
        return this.$store.getters.getPost.blogTitle
      },
      set(payload) {
        this.$store.dispatch('setPost', { blogTitle: payload })
      },
    },
    blogHTML: {
      get() {
        return this.$store.getters.getPost.blogHTML
      },
      set(payload) {
        this.$store.dispatch('setPost', { blogHTML: payload })
      },
    },
    blogSubtitle: {
      get() {
        return this.$store.getters.getPost.blogSubtitle
      },
      set(payload) {
        this.$store.dispatch('setPost', { blogSubtitle: payload })
      },
    },
  },
}
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }
  .button-inactive {
    pointer-events: none !important;
    cursor: none !important;
    background-color: rgba(128, 128, 128, 0.5) !important;
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;

    .text-field {
      max-width: 300px;
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
