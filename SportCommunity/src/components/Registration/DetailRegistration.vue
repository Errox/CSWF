<template>
  <div v-if="currentRegistration" class="edit-form py-3">
    <p class="headline">Huidige registration aanpassen</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentRegistration.userId"
        :rules="[(v) => !!v || 'userId is required']"
        label="userId"
        required
      ></v-text-field>

      <v-textarea
        v-model="currentRegistration.sportId"
        :rules="[(v) => !!v || 'sportId is required']"
        label="sportId"
        required
      ></v-textarea>

      <v-text-field
        v-model="currentRegistration.clubId"
        :rules="[(v) => !!v || 'clubId is required']"
        label="clubId"
        required
      ></v-text-field>

    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Registration...</p>
  </div>
</template>

<script>
import RegistrationDataService from "../../services/RegistrationDataService";

export default {
  name: "registration",
  data() {
    return {
      currentRegistration: null,
      message: "",
    };
  },
  methods: {
    getRegistration(id) {
      RegistrationDataService.get(id)
        .then((response) => {
          this.currentRegistration = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getRegistration(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>