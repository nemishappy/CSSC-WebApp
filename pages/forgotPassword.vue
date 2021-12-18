<template>
  <div class="reset-password">
    <Dialog />
    <Overlay />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'login' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <v-icon small class="icon">email</v-icon>
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import Dialog from '~/components/Dialog'
import Overlay from '~/components/Overlay'
export default {
  head() {
    return {
      title: 'Forgot Pawword',
    }
  },
  data() {
    return {
      email: '',
    }
  },
  components: {
    Dialog,
    Overlay,
  },
  methods: {
    resetPassword() {
      this.$store.dispatch('toggleOverlay')
      this.$fire.auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.$store.dispatch('setDialog', {
            isShow: true,
            title: '',
            message: 'If your account exists, you will receive a email',
          })
          this.$store.dispatch('toggleOverlay')
        })
        .catch((err) => {
          this.$store.dispatch('setDialog', {
            isShow: true,
            title: 'Error',
            message: err.message,
          })
          this.$store.dispatch('toggleOverlay')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
