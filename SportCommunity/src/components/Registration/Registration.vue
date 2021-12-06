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

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteRegistration">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateRegistration">
        Update
      </v-btn>
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

		updateOpenForRegistration() {
			const data = {
				id: this.currentRegistration.id,
				userId: this.currentRegistration.userId,
				sportId: this.currentRegistration.sportId,
				clubId: this.currentRegistration.clubId,
			};

			RegistrationDataService.update(this.currentRegistration.id, data)
				.then((response) => {
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		updateRegistration() {
			RegistrationDataService.update(this.currentRegistration.id, this.currentRegistration)
				.then((response) => {
					console.log(response.data);
					this.message = "The registration was updated successfully!";
				})
				.catch((e) => {
					console.log(e);
				});
		},

		deleteRegistration() {
			RegistrationDataService.delete(this.currentRegistration.id)
				.then((response) => {
					console.log(response.data);
					this.$router.push({name: "registrations"});
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
