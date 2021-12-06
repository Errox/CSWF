<template>
  <v-app>
    <v-app-bar app dark>
      <button type="button" @click="click('About')"> SportCommunity </button>
      <button type="button" @click="click('sports')"> Alle sporten </button>
      <button type="button" @click="click('registrations')"> Alle registraties </button>
      <button type="button" @click="click('clubs')"> Alle clubs </button>
      <button type="button" @click="click('fanProducts')"> Alle Fan producten </button>
      <button type="button" @click="click('users')"> Alle Users </button>
      <button type="button" @click="click('AboutUrl')"> About </button>


      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            LogOut
          </a>
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
  name: 'App',
  computed: {
    currentUser() {
      console.log(this.$store)
      if(this.$store.state.auth.user){
        return this.$store.state.auth.user
      }
      return null;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    click(url){
      var tmp = this.$route.fullPath.replace(/[^a-zA-Z0-9]/g, '');
      
      console.log(tmp + " : " + url);
      if(url != tmp){
        this.$router.push({ name: url });
      }
    }
  },
    
};
</script>
