<template>
  <v-app>
    <v-app-bar app dark>
      <button type="button" @click="click('About')"> SportCommunity </button>
      <button type="button" @click="click('sports')"> Alle sporten </button>
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
      this.$router.push({ name: url });
    }
  },
    
};
</script>
