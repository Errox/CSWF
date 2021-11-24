<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Registration</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="registration.userId"
          :rules="[(v) => !!v || 'userId is required']"
          label="userId"
          required
        ></v-text-field>

        <v-text-field
          v-model="registration.sportId"
          :rules="[(v) => !!v || 'sportId is required']"
          label="sportId"
          required
        ></v-text-field>

        <v-text-field
          v-model="registration.clubId"
          :rules="[(v) => !!v || 'clubId is required']"
          label="clubId"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveRegistration">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Registration.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newRegistration">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RegistrationDataService from "../../services/RegistrationDataService";

export default {
  name: "add-registration",
  data() {
    return {
      registration: {
        id: null,
        userId: "",
        sportId: "",
        clubId: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveRegistration() {
      var data = {
        userId: this.registration.userId,
        sportId: this.registration.sportId,
        clubId: this.registration.clubId
      };

      RegistrationDataService.create(data)
        .then((response) => {
          this.registration.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newRegistration() {
      this.submitted = false;
      this.registration = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>