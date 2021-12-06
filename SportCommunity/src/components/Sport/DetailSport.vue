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
