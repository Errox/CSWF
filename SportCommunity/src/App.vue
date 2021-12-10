<template>
  <v-app>
    <v-app-bar app dark>
      <button type="button" @click="click('FrontPage')"> SportCommunity </button>
      <button type="button" @click="click('clubs')"> Alle clubs </button>
      <button type="button" @click="click('AboutUrl')"> About </button>


      <div v-if="!currentUser" class="navbar-nav ml-auto" style="text-align:right">
        <li class="nav-item">
          <button type="button" @click="click('register')"> Sign Up </button>
        </li>
        <li class="nav-item">
          <button type="button" @click="click('login')"> Login </button>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto" style="text-align:right">
        <li class="nav-item">
          <button type="button" @click="click('profile')"> Welcome {{ currentUser.email }} </button>
        </li>
        <li class="nav-item">
          <button type="button" @click.prevent="logOut"> LogOut </button>
        </li>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    computed: {
      currentUser() {
        console.log(this.$store);
        if (this.$store.state.auth.user) {
          return this.$store.state.auth.user;
        }
        return null;
      },
    },
    methods: {
      logOut() {
        this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      },
      click(url) {
        const tmp = this.$route.fullPath.replace(/[^a-zA-Z0-9]/g, "");
        if (url != tmp) {
          this.$router.push({
            name: url
          });
        }
      },
    },

  };
</script>