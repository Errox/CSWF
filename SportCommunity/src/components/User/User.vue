<template>
  <div v-if="currentUser" class="edit-form py-3">
    <p class="headline">Huidige user aanpassen</p>

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
          required
        ></v-text-field>

      <v-row justify="center">
        <v-date-picker
          v-model="user.dateOfBirth"
          :rules="[(v) => !!v || 'dateOfBirth is required']"
          label="dateOfBirth"
          required
        ></v-date-picker>
      </v-row>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteUser">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateUser">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";

export default {
	name: "user",
	data() {
		return {
			currentUser: null,
			message: "",
		};
	},
	methods: {
		getUser(id) {
			UserDataService.get(id)
				.then((response) => {
					this.currentUser = response.data;
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		updateOpenForRegistration() {
			const data = {
				name: this.user.name,
				surName: this.user.surName,
				email: this.user.email,
				password: this.user.password,
				dateOfBirth: this.user.dateOfBirth,
			};

			UserDataService.update(this.currentUser.id, data)
				.then((response) => {
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		updateUser() {
			UserDataService.update(this.currentUser.id, this.currentUser)
				.then((response) => {
					console.log(response.data);
					this.message = "The user was updated successfully!";
				})
				.catch((e) => {
					console.log(e);
				});
		},

		deleteUser() {
			UserDataService.delete(this.currentUser.id)
				.then((response) => {
					console.log(response.data);
					this.$router.push({name: "users"});
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
	mounted() {
		this.message = "";
		this.getUser(this.$route.params.id);
	},
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
