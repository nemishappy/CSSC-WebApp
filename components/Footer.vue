<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'home' }"
            >CSShowcase</router-link
          >
          <ul>
            <a href="#">
              <div v-html="youTube" class="svg-icon"></div>
            </a>
            <a href="#"><div v-html="twitter" class="svg-icon"></div> </a>
            <a href="#"><div v-html="instagram" class="svg-icon"></div> </a>
            <a href="#"><div v-html="linkedin" class="svg-icon"></div> </a>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import youTube from '~/assets/Icons/youtube-brands.svg?raw'
import twitter from '~/assets/Icons/twitter-brands.svg?raw'
import instagram from '~/assets/Icons/instagram-brands.svg?raw'
import linkedin from '~/assets/Icons/linkedin-brands.svg?raw'

export default {
  name: 'footer-vue',

  data() {
    return {
      youTube,
      twitter,
      instagram,
      linkedin,
    }
  },
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 50px 25px;
  background-color: #303030;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-1 {
        flex-direction: column;
        width: 100px;
        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;
          display: flex;
          align-items: center;

          .svg-icon {
            width: 24px;
            height: auto;
            color: #fff;
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
