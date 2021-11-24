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

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteClub">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateClub">
        Update
      </v-btn>
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

    updateOpenForRegistration() {
      var data = {
        name: this.club.name,
        city: this.club.city,
        streetname: this.club.streetname,
        URL: this.club.URL
      };

      ClubDataService.update(this.currentClub.id, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateClub() {
      ClubDataService.update(this.currentClub.id, this.currentClub)
        .then((response) => {
          console.log(response.data);
          this.message = "The club was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteClub() {
      ClubDataService.delete(this.currentClub.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "clubs" });
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