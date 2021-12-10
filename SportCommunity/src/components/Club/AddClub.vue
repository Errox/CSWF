<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Club</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
        data-cy="nameClub-input"
          v-model="club.name"
          :rules="nameRules"
          label="name"
          required
        ></v-text-field>

        <v-text-field
        data-cy="city-input"
          v-model="club.city"
          :rules="cityRules"
          label="city"
          required
        ></v-text-field>

        <v-text-field
        data-cy="streetname-input"
          v-model="club.streetName"
          :rules="streetNameRules"
          label="streetName"
          required
        ></v-text-field>

        <v-text-field
        data-cy="URL-input"
        v-model="club.URL"
        :rules="URLRules"
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
      valid: true,
      message: "",
			club: {
				id: null,
				name: "",
				city: "",
				streetName: "",
				URL: "",
			},
			submitted: false,
      // Start Form Rules
      nameRules: [
        v => !!v || 'Name is Required!',
        v => v.length <= 150 || 'Name must be less then 150 characters.',
        v => v.length >= 2 || 'Name must be at least 2 characters long'
      ],
      cityRules: [
        v => !!v || 'City is Required!',
        v => v.length <= 150 || 'City must be less then 150 characters.',
        v => v.length >= 2 || 'City must be at least 2 characters long'
      ],
      streetNameRules: [
        v => !!v || 'Street Name is required!',
        v => v.length <= 150 || 'Street Name must be less then 150 characters long.',
        v => v.length >= 2 || 'Street Name must be at least 2 characters long',
        v => /^(.+)\s(\S+)$/.test(v) || 'StreetName must be valid. (A streetname with number)',
      ],
      URLRules: [
        v => !!v || 'URL is required',
        v => v.length <= 150 || 'URL must be less then 150 characters long.',
        v => v.length >= 2 || 'URL must be at least 2 characters long',
        v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(v) || 'URL must be valid. (example: https://deStoep.nl)' 
      ],
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
      this.$refs.form.resetValidation()
      this.$refs.form.validate()
      if(this.valid){
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
      }
		
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
