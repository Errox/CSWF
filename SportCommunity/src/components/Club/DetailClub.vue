<template>
  <div v-if="currentClub" class="edit-form py-3">
    <p class="headline">Huidige club aanpassen</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentClub.name"
        :rules="[(v) => !!v || 'name is required']"
        label="name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentClub.city"
        :rules="[(v) => !!v || 'city is required']"
        label="city"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentClub.streetName"
        :rules="[(v) => !!v || 'streetName is required']"
        label="streetName"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentClub.URL"
        :rules="[(v) => !!v || 'URL is required']"
        label="URL"
        required
      ></v-text-field>

    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Club...</p>
  </div>
</template>

<script>
import ClubDataService from "../../services/ClubDataService";

export default {
  name: "club",
  data() {
    return {
      currentClub: null,
      message: "",
    };
  },
  methods: {
    getClub(id) {
      ClubDataService.get(id)
        .then((response) => {
          this.currentClub = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getClub(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>