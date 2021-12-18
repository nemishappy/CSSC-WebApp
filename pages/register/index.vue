<template>
  <div class="form-wrap">
    <Overlay />
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'login' }"
          >Login</router-link
        >
      </p>
      <h3>Create Your FireBlog Account</h3>
      <div class="inputs">
        <div class="input">
          <input
            type="text"
            placeholder="First Name/ชื่อ"
            v-model="firstName"
          />
          <v-icon small class="icon">person</v-icon>
        </div>
        <div class="input">
          <input
            type="text"
            placeholder="Last Name/นามสกุล"
            v-model="lastName"
          />
          <v-icon small class="icon">person</v-icon>
        </div>
        <div class="input">
          <input type="number" placeholder="CS Batch/รุ่นที่" v-model="batch" />
          <v-icon small class="icon">group</v-icon>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <v-icon small class="icon">email</v-icon>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <v-icon small class="icon">lock</v-icon>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import Overlay from '~/components/Overlay'
export default {
  head() {
    return {
      title: 'Register',
    }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      batch: '',
      email: '',
      password: '',
      error: null,
      errorMsg: '',
    }
  },
  components: {
    Overlay,
  },
  methods: {
    async register() {
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.batch !== '' &&
        this.firstName !== '' &&
        this.lastName !== ''
      ) {
        this.$store.dispatch('toggleOverlay')
        this.error = false
        this.errorMsg = ''
        const firebaseAuth = await this.$fire.auth
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        const result = await createUser
        const dataBase = this.$fire.firestore
          .collection('users')
          .doc(result.user.uid)
        await dataBase.set({
          firstname: this.firstName,
          lastname: this.lastName,
          batch: this.batch,
          email: this.email,
          name: '',
          bio: '',
          pictureUrl: '',
          facebook: '',
          line: '',
          github: '',
          linkedin: '',
        })
        this.$store.dispatch('toggleOverlay')
        this.$router.push({ name: 'register-done' })
        return
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
      return
    },
  },
}
</script>

<style lang="scss" scoped>
.register {
  h3 {
    max-width: 350px;
  }
}
</style>
