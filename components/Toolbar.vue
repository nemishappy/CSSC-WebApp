<template>
  <header>
    <v-app-bar dense flat clipped-left app class="">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="toggleMobileNav"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-left">CSSC</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="userLoadded" class="options hidden-sm-and-down">
        <div class="option">
          <NuxtLink to="/home"> <p>Home</p> </NuxtLink>
        </div>
        <div class="option">
          <NuxtLink to="/blogs"> <p>Blogs</p> </NuxtLink>
        </div>
        <div v-if="user" class="option">
          <NuxtLink to="/blogs/createpost">
            <p>Create Post</p>
          </NuxtLink>
        </div>
        <div v-if="!user" class="option">
          <NuxtLink to="/login">
            <p>login</p>
          </NuxtLink>
        </div>
        <div v-if="user" class="option">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-avatar size="36">
                  <img
                    v-if="!user.pictureUrl"
                    src="~/assets/profile.png"
                    alt=""
                  />
                  <img v-else :src="user.pictureUrl" alt="" />
                </v-avatar>
              </div>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      v-if="!user.pictureUrl"
                      src="~/assets/profile.png"
                      alt=""
                    />
                    <img v-else :src="user.pictureUrl" alt="" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      >{{ user.firstname }}
                      {{ user.lastname }}</v-list-item-title
                    >
                    <v-list-item-subtitle
                      >CS {{ user.batch }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-item>
                  <div class="option-profile" @click="menu = false">
                    <NuxtLink
                      :to="{
                        name: 'profile-id',
                        params: { id: this.user.uid },
                      }"
                    >
                      <p>My Profile</p>
                    </NuxtLink>
                  </div>
                </v-list-item>
                <v-list-item>
                  <div class="option-profile" @click="menu = false">
                    <NuxtLink to="/profile/editprofile">
                      <p>Settings</p>
                    </NuxtLink>
                  </div>
                </v-list-item>
              </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="logout"> Logout </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>
              <div class="option-mobile">
                <NuxtLink to="/home"> <p>Home</p> </NuxtLink>
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title
              ><div class="option-mobile">
                <NuxtLink to="/blogs"> <p>Blogs</p> </NuxtLink>
              </div></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="user">
            <v-list-item-title
              ><div class="option-mobile">
                <NuxtLink to="/blogs/createpost"> <p>Create Post</p> </NuxtLink>
              </div></v-list-item-title
            >
          </v-list-item>

          <v-list-item v-else>
            <v-list-item-title
              ><div class="option-mobile">
                <NuxtLink to="/login"> <p>Login/Register</p> </NuxtLink>
              </div></v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <div v-if="user">
            <v-list-item>
              <v-list-item-title
                ><div class="option-mobile">
                  <NuxtLink
                    :to="{
                      name: 'profile-id',
                      params: { id: this.user.uid },
                    }"
                  >
                    <p>My Profile</p>
                  </NuxtLink>
                </div></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><div class="option-mobile">
                  <NuxtLink to="/profile/editprofile">
                    <p>Settings</p>
                  </NuxtLink>
                </div></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-btn class="no-uppercase" block @click="logout"> Logout </v-btn>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    userLoadded() {
      return this.$store.getters.getUserLoadded
    },
  },
  methods: {
    toggleMobileNav() {
      this.drawer = !this.drawer
    },
    logout() {
      this.$fire.auth.signOut()
      this.menu = false
      // this.$router.push({ name: 'home' })
    },
  },
}
</script>
<style lang="scss" scoped>
.options {
  display: flex;
  padding: 15px 0px;
  .option {
    display: flex;
    align-items: center;
    padding: 12px;
    a {
      text-decoration: none;
      color: rgb(20, 20, 20);
    }
    .icon {
      width: 18px;
      height: auto;
    }
    p {
      font-size: 14px;
      margin: 0;
    }
  }
}
.option-mobile {
  display: flex;
  align-items: center;
  padding: 12px;
  a {
    text-decoration: none;
    color: rgb(20, 20, 20);
  }
  .icon {
    width: 18px;
    height: auto;
  }
  p {
    font-size: 14px;
    margin: 0;
  }
}
.option-profile {
  display: flex;
  align-items: center;
  padding: 12px;
  a {
    text-decoration: none;
    color: rgb(20, 20, 20);
  }
  .icon {
    width: 18px;
    height: auto;
  }
  p {
    font-size: 14px;
    margin: 0;
  }
}
</style>
