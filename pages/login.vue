<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'register' }"
          >Register</router-link
        >
      </p>
      <h2>Login to CSShowcase</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <v-icon small class="icon">mdi-email</v-icon>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <v-icon small class="icon">mdi-lock</v-icon>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'forgotPassword' }"
        >Forgot your password?</router-link
      >
      <v-btn @click.prevent="signIn" text color="primary">Sign In</v-btn>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      errorMsg: '',
    }
  },
  methods: {
    signIn() {
      if (this.email !== '' && this.password !== '') {
        this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            
            this.error = false
            this.errorMsg = ''
            this.$router.push({ name: 'home' })
            console.log(this.$fire.auth.currentUser.uid)
          })
          .catch((err) => {
            this.error = true
            this.errorMsg = "incorrect email or password"
          })
        return
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
      return
    },
  },
}
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  background-color: #fff;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h3 {
      text-align: center;
      font-size: 22px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 24px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 40px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 10px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url('~/assets/background.png');
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
