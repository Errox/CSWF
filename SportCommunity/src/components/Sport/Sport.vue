<template>
	<div v-if="currentSport" class="edit-form py-3">
		<p class="headline">Huidige sport aanpassen</p>

		<v-form ref="form" lazy-validation>
			<v-text-field v-model="currentSport.title" :rules="titleRules" label="Title" required></v-text-field>

			<v-textarea v-model="currentSport.description" :rules="descriptionRules" label="Description" required>
			</v-textarea>

			<v-text-field v-model="currentSport.wikiLink" :rules="wikiLinkRules" label="Wiki Link" required>
			</v-text-field>

			<label><strong>Registratie:</strong></label>
			{{ currentSport.openForRegistration ? "Open" : "Gesloten" }}
			<v-btn v-if="currentSport.openForRegistration" @click="updateOpenForRegistration(false)" color="primary"
				small class="mr-2">
				Sluiten voor registratie
			</v-btn>
			<v-btn v-else @click="updateOpenForRegistration(true)" color="primary" small class="mr-2">
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
				valid: true,
				currentSport: null,
				message: "",
				wikiLinkRules: [
					v => !!v || 'wikiLink is required',
					v => v.length <= 150 || 'wikiLink must be less then 150 characters long.',
					v => v.length >= 2 || 'wikiLink must be at least 2 characters long',
					v =>
					/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
					.test(v) || 'URL must be valid. (example: https://en.wikipedia.org/wiki/Volleyball)'
				],
				titleRules: [
					v => !!v || 'Title is Required!',
					v => v.length <= 150 || 'Title must be less then 150 characters.',
					v => v.length >= 2 || 'Title must be at least 2 characters long'
				],
				descriptionRules: [
					v => !!v || 'Title is Required!',
					v => v.length <= 250 || 'Title must be less then 250 characters.',
					v => v.length >= 4 || 'Title must be at least 2 characters long'
				],
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
					clubId: this.$route.params.clubId
				};


				this.$refs.form.validate()
				if (this.valid) {
					SportDataService.update(this.currentSport.id, data)
						.then((response) => {
							this.currentSport.openForRegistration = status;
							console.log(response.data);
						})
						.catch((e) => {
							this.message = e.response.message;
							console.log(e);
						});
				}
			},

			updateSport() {
				const data = {
					id: this.currentSport.id,
					title: this.currentSport.title,
					description: this.currentSport.description,
					wikiLink: this.currentSport.wikiLink,
					openForRegistration: this.currentSport.status,
					clubId: this.$route.params.clubId
				};
				
				this.$refs.form.validate()

				if (this.valid) {
					SportDataService.update(this.currentSport.id, data)
						.then((response) => {
							console.log(response.data);
							this.message = "The sport was updated successfully!";
						})
						.catch((e) => {
							this.message = e.response.message;
							console.log(e);
						});
				}
			},

			deleteSport() {
				SportDataService.delete(this.currentSport.id)
					.then((response) => {
						console.log(response.data);
						this.$router.push({
							name: "sports"
						});
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