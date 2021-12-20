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
.no-uppercase {
  text-transform: none;
}
.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 500px) {
    padding: 80px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    margin: 10px;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;

  max-width: 374px;
  
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  v-img {
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
    &.avatar {
      min-height: 0px;

      object-fit: cover;
    }
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
.module-border-wrap {
  display: flex;
  justify-content: center;
  border: 10px transparent;
  border-radius: 100%;
  background-image: linear-gradient(
    128deg,
    rgb(255, 136, 0),
    rgb(240, 62, 240)
  );
  background-origin: border-box;
  background-clip: content-box, border-box;
  padding: 10px;

  img {
    padding: 2px;
    border-radius: 50%;
  }
}
</style>
