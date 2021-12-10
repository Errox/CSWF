<template>
  <div v-if="currentSport" class="edit-form py-3">
    <p class="headline">Huidige sport aanpassen</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentSport.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-textarea
        v-model="currentSport.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-textarea>

      <v-text-field
        v-model="currentSport.wikiLink"
        :rules="[(v) => !!v || 'Wikilink is required']"
        label="Wiki Link"
        required
      ></v-text-field>

      <label><strong>Registratie:</strong></label>
      {{ currentSport.openForRegistration ? "Open" : "Gesloten" }}
      <v-btn v-if="currentSport.openForRegistration"
        @click="updateOpenForRegistration(false)"
        color="primary" small class="mr-2"
      >
        Sluiten voor registratie
      </v-btn>
      <v-btn v-else
        @click="updateOpenForRegistration(true)"
        color="primary" small class="mr-2"
      >
        Openen voor registratie
      </v-btn>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteSport">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateSport">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Sport...</p>
  </div>
</template>

<script>
import SportDataService from "../../services/SportDataService";

export default {
	name: "sport",
	data() {
		return {
			currentSport: null,
			message: "",
		};
	},
	methods: {
		getSport(id) {
			SportDataService.get(id)
				.then((response) => {
					this.currentSport = response.data;
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		updateOpenForRegistration(status) {
			const data = {
				id: this.currentSport.id,
				title: this.currentSport.title,
				description: this.currentSport.description,
				wikiLink: this.currentSport.wikiLink,
				openForRegistration: status,
			};

			SportDataService.update(this.currentSport.id, data)
				.then((response) => {
					this.currentSport.openForRegistration = status;
					console.log(response.data);
				})
				.catch((e) => {
					this.message = e.response.message;
					console.log(e);
				});
		},

		updateSport() {
			SportDataService.update(this.currentSport.id, this.currentSport)
				.then((response) => {
					console.log(response.data);
					this.message = "The sport was updated successfully!";
				})
				.catch((e) => {
					this.message = e.response.message;
					console.log(e);
				});
		},

		deleteSport() {
			SportDataService.delete(this.currentSport.id)
				.then((response) => {
					console.log(response.data);
					this.$router.push({name: "sports"});
				})
				.catch((e) => {
					this.message = e.response.message;
					console.log(e);
				});
		},
	},
	mounted() {
		this.message = "";
		this.getSport(this.$route.params.id);
	},
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
