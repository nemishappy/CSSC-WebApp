<template>
  <div class="profile" v-if="userLoadded">
    <Dialog />
    <Overlay />
    <div class="edit-container">
      <h2 class="ml-6 mt-3">Account Settings</h2>
      <div class="d-flex flex-column px-13 my-3">
        <div class="d-flex flex-column my-3">
          <h3 class="mb-3">About you</h3>

          <v-text-field
            v-model="userEdit.firstname"
            :rules="realNameRules"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            v-model="userEdit.lastname"
            :rules="realNameRules"
            label="Last name"
            required
          ></v-text-field>
          <v-text-field
            v-model="userEdit.name"
            :rules="nameRules"
            :counter="12"
            label="Name"
            hint="Your name appears on your Profile page, as your byline, and in your responses."
            required
          ></v-text-field>
          <v-textarea
            v-model="userEdit.bio"
            label="Bio"
            hint="Add your bio"
            required
          ></v-textarea>
          <div class="d-flex">
            <v-file-input
              :rules="picRules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an photo"
              prepend-icon="mdi-camera"
              @change="fileChange"
              v-model="file"
              label="Profile picture"
            ></v-file-input>
            <v-avatar class="ml-13">
              <img
                v-if="!userEdit.pictureUrl"
                src="~/assets/profile.png"
                alt=""
              />
              <img v-else :src="userEdit.pictureUrl" alt="" />
            </v-avatar>
          </div>
        </div>

        <v-divider></v-divider>

        <div class="d-flex flex-column my-3">
          <h3 class="mb-3">Contract</h3>
          <v-text-field
            v-model="userEdit.email"
            :rules="emailRules"
            label="E-mail"
            hint="This is contract email. You can not change your account email."
          ></v-text-field>
          <v-text-field
            v-model="userEdit.facebook"
            label="Facebook username"
            hint='"https://www.facebook.com/{your username}" fill your username.'
          ></v-text-field>
          <v-text-field
            v-model="userEdit.line"
            label="Line"
            hint="Line ID."
          ></v-text-field>
          <v-text-field
            v-model="userEdit.github"
            label="Github"
            hint='"https://github.com/{your username}" fill your username.'
          ></v-text-field>
          <v-text-field
            v-model="userEdit.linkedin"
            label="LinkedIn"
            hint='"https://www.linkedin.com/in/{your username}/" fill your username.'
          ></v-text-field>
        </div>
        <v-btn
          class="mt-3 align-self-end"
          color="primary"
          @click="updateProfile"
        >
          Save
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from '~/components/Dialog'
import Overlay from '~/components/Overlay'
export default {
  head() {
    return {
      title: 'Edit Profile',
    }
  },
  data() {
    return {
      userEdit: {
        uid: '',
        email: '',
        name: '',
        bio: '',
        pictureUrl: '',
        firstname: '',
        lastname: '',
        facebook: '',
        line: '',
        github: '',
        linkedin: '',
      },
      file: null,
      valid: false,
      realNameRules: [(v) => !!v || 'This is required'],
      nameRules: [
        (v) => v.length <= 12 || 'Name must be less than 12 characters',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      picRules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
    }
  },
  components: {
    Dialog,
    Overlay,
  },
  created() {
    const user = { ...this.$store.getters.getUser }
    this.userEdit = user
  },
  mounted() {
    if (!this.$store.getters.getUser.uid) {
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    userLoadded() {
      return this.$store.getters.getUserLoadded
    },
  },
  methods: {
    fileChange() {
      if (this.file) {
        this.userEdit.pictureUrl = URL.createObjectURL(this.file)
        return
      }
      this.userEdit.pictureUrl = ''
    },
    async updateProfile() {
      if (
        this.userEdit.email !== '' &&
        this.userEdit.firstname !== '' &&
        this.userEdit.lastname !== ''
      ) {
        this.$store.dispatch('toggleOverlay')
        const dataBase = await this.$fire.firestore
          .collection('users')
          .doc(this.userEdit.uid)
        if (this.file) {
          const storageRef = this.$fire.storage.ref()
          const docRef = storageRef.child(
            `documents/Profile/picture/${this.file.name}`
          )
          // delete old picture
          if (this.$store.getters.getUser.pictureUrl) {
            const storageRefDelete = this.$fire.storage.refFromURL(
              this.$store.getters.getUser.pictureUrl
            )
            await storageRefDelete
              .delete()
              .then(() => {
                console.log('File deleted successfully')
              })
              .catch((error) => {
                console.log('error: ', err)
              })
          }
          docRef.put(this.file).on(
            'state_changed',
            (snapshot) => {
              console.log(snapshot)
            },
            (err) => {
              console.log(err)
              this.$store.dispatch('toggleOverlay')
            },
            async () => {
              this.userEdit.pictureUrl = await docRef.getDownloadURL()
              delete this.userEdit.uid
              await dataBase
                .update(this.userEdit)
                .then(() => {
                  console.log('Document successfully updated!')
                  this.$store.dispatch(
                    'setUserByUID',
                    this.$store.getters.getUser.uid
                  )
                  this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Successfully updated!',
                    message: '',
                  })
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error)
                  this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Error updating document:',
                    message: error,
                  })
                })
              this.$store.dispatch('toggleOverlay')
            }
          )
          return
        }
        delete this.userEdit.uid
        await dataBase
          .update(this.userEdit)
          .then(() => {
            console.log('Document successfully updated!')
            this.$store.dispatch(
              'setUserByUID',
              this.$store.getters.getUser.uid
            )
            this.$store.dispatch('setDialog', {
              isShow: true,
              title: 'Successfully updated!',
              message: '',
            })
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
            this.$store.dispatch('setDialog', {
              isShow: true,
              title: 'Error updating document:',
              message: error,
            })
          })
        this.$store.dispatch('toggleOverlay')

        return
      }
      this.$store.dispatch('setDialog', {
        isShow: true,
        title: 'Invalid!',
        message: 'Please ensure all require field has been filled!',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-container {
  max-width: 600px;
  margin: 16px auto;
  background-color: #fff;
  padding: 12px 0;
}
</style>
