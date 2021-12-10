<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Sport</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="sport.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="sport.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>

        <v-text-field
          v-model="sport.wikiLink"
          :rules="[(v) => !!v || 'wikiLink is required']"
          label="Wiki Link"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveSport">Submit</v-btn>
    
      
      <p class="mt-3">{{ message }}</p>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Sport.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newSport">Add</v-btn>
        </v-card-actions>
        
      </v-card>
    </div>
  </div>
</template>

<script>
import SportDataService from "../../services/SportDataService";

export default {
	name: "add-sport",
	data() {
		return {
      message: "",
			sport: {
				id: null,
				title: "",
				description: "",
				openForRegistration: false,
			},
			submitted: false,
		};
	},
	methods: {
		saveSport() {
			const data = {
				title: this.sport.title,
				description: this.sport.description,
				wikiLink: this.sport.wikiLink,
        clubId: this.$route.params.clubId
			};

			SportDataService.create(data)
				.then((response) => {
					this.sport.id = response.data.id;
					console.log(response.data);
					this.submitted = true;
				})
				.catch((e) => {
          this.message = e.response.data;
					console.log(e);
				});
		},

		newSport() {
			this.submitted = false;
			this.sport = {};
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
