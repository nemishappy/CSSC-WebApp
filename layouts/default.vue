<template>
  <v-app >
    <Toolbar v-if="!navigation"/>
    <v-main>
        <Nuxt />
      
    </v-main>
    <Footer v-if="!navigation"/>
  </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar'
import Footer from '~/components/Footer'
export default {
  name: 'DefaultLayout',
  components: {
    Toolbar,
    Footer
  },
  data() {
    return {      
      navigation: null,
    }
  },
  created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      if (this.$route.name === "login" || this.$route.name === "register" || this.$route.name === "forgotPassword") {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  
  watch: {
    $route() {
      this.checkRoute();
    },
  },
}
</script>
<style lang="scss">
.v-application {
  font-family: 'Sarabun', sans-serif;
  background-color: #f9f9f9 !important;
}
.v-application .primary {
  background-color: #2f5d8c !important;
  border-color: #2f5d8c !important;
}
.text-primary {
  color: #2f5d8c !important;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.v-application .error {
  text-align: center;
  font-size: 12px;
  color: red;
  background-color: transparent !important;
}
</style>
