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
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
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
