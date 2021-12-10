<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Club</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
        data-cy="nameClub-input"
          v-model="club.name"
          :rules="[(v) => !!v || 'name is required']"
          label="name"
          required
        ></v-text-field>

        <v-text-field
        data-cy="city-input"
          v-model="club.city"
          :rules="[(v) => !!v || 'City is required']"
          label="city"
          required
        ></v-text-field>

        <v-text-field
        data-cy="streetname-input"
          v-model="club.streetName"
          :rules="[(v) => !!v || 'streetName is required']"
          label="streetName"
          required
        ></v-text-field>

        <v-text-field
        data-cy="URL-input"
        v-model="club.URL"
        :rules="[(v) => !!v || 'URL is required']"
        label="URL"
        required
      ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveClub">Submit</v-btn>
      
      <p class="mt-3">{{ message }}</p>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Club.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newClub">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ClubDataService from "../../services/ClubDataService";

export default {
	name: "add-club",
	data() {
		return {
      message: "",
			club: {
				id: null,
				name: "",
				city: "",
				streetName: "",
				URL: "",
			},
			submitted: false,
		};
	},
	methods: {
		saveClub() {
			const data = {
				name: this.club.name,
				city: this.club.city,
				streetName: this.club.streetName,
				URL: this.club.URL,
			};

			ClubDataService.create(data)
				.then((response) => {
					this.club.id = response.data.id;
					console.log(response.data);
					this.submitted = true;
				})
				.catch((e) => {
          this.message = e.response.data;
					console.log(e);
				});
		},

		newClub() {
			this.submitted = false;
			this.club = {};
		},
	},
  mounted() {
    this.message = "";
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
