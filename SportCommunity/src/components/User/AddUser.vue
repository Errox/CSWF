<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add User</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="[(v) => !!v || 'name is required']"
          label="name"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.surName"
          :rules="[(v) => !!v || 'surName is required']"
          label="surName"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="[(v) => !!v || 'email is required']"
          label="email"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="[(v) => !!v || 'password is required']"
          label="password"
          :append-icon="value ? 'invisible' : 'visible'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
          name="password"
          required
        ></v-text-field>
        
        Date of birth
        <datepicker v-model="user.dateOfBirth"
          :rules="[(v) => !!v || 'dateOfBirth is required']"
          label="dateOfBirth"
          required placeholder="Select Date"></datepicker>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveUser">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new User.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        surName: "",
        email: "",
        password: "",
        dateOfBirth: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        surName: this.user.surName,
        email: this.user.email,
        password: this.user.password,
        dateOfBirth: this.user.dateOfBirth
      };

      UserDataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },
  }, components: {
    Datepicker
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>