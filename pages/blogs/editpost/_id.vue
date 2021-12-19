<template>
  <div class="create-post" v-if="blogHTML">
    <BlogCoverPreview />
    <Overlay />
    <h2 class="mt-4 ml-4">Edit Post</h2>
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
        <button @click="updateBlog">Publish Blog</button>
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
      routeID: '',
    }
  },
  components: {
    BlogCoverPreview,
    Overlay,
  },
  methods: {
    textChange(content) {
      console.log(content)
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

    async updateBlog() {
      if (
        this.blogTitle.length !== 0 &&
        this.blogHTML.length !== 0 &&
        this.blogSubtitle.length !== 0
      ) {
        this.$store.dispatch('toggleOverlay')
        if (this.file) {
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
              const dataBase = await this.$fire.firestore
                .collection('blogPosts')
                .doc(this.routeID)

              await dataBase.update({
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.file.name,
                blogTitle: this.blogTitle,
                blogSubtitle: this.blogSubtitle,
              })

              this.$store.dispatch('updatePost',this.routeID)
              this.$store.dispatch('toggleOverlay')
              this.$store.dispatch('clearPost')
              this.$router.push({
                name: 'blogs-id',
                params: { id: this.routeID },
              })
            }
          )
          return
        } else {
          const dataBase = await this.$fire.firestore
            .collection('blogPosts')
            .doc(this.routeID)

          await dataBase.update({
            blogHTML: this.blogHTML,
            blogTitle: this.blogTitle,
            blogSubtitle: this.blogSubtitle,
          })
          this.$store.dispatch('updatePost',this.routeID)
          this.$store.dispatch('toggleOverlay')
          this.$store.dispatch('clearPost')
          this.$router.push({
            name: 'blogs-id',
            params: { id: this.routeID },
          })
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
  async created() {
    this.routeID = this.$route.params.id
    const userDataBase = await this.$fire.firestore
      .collection('users')
      .doc(this.profileId)
      .collection('posts')
      .doc(this.routeID)
    await userDataBase
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such post!, not owener')
          this.$router.push({ name: 'home' })
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
        this.$router.push({ name: 'home' })
      })
  },
  async mounted() {
    const dataBase = this.$fire.firestore
      .collection('blogPosts')
      .doc(this.routeID)
    await dataBase
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.$store.dispatch('setPost', doc.data())
          this.$store.dispatch('setPhotoPreview', {
            fileName: doc.data().blogCoverPhotoName,
            blogPhotoFileURL: doc.data().blogCoverPhoto,
          })
        } else {
          console.log('No such post!')
          this.$router.push({ name: 'home' })
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
        this.$router.push({ name: 'home' })
      })
  },
}
</script>

<style lang="scss"></style>
