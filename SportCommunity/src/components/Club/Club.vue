<template>
	<div v-if="currentClub">
		<div class="edit-form py-3">
			<p class="headline"><strong>Club</strong> {{currentClub.name}} </p>
			<div v-if="userIsOwner">
				<v-form ref="form" lazy-validation>
					<v-text-field data-cy="nameClub-input" v-model="currentClub.name" :rules="nameRules" label="name"
						required>
					</v-text-field>

					<v-text-field data-cy="city-input" v-model="currentClub.city" :rules="cityRules" label="city"
						required>
					</v-text-field>

					<v-text-field data-cy="streetname-input" v-model="currentClub.streetName" :rules="streetNameRules"
						label="streetName" required></v-text-field>

					<v-text-field data-cy="URL-input" v-model="currentClub.URL" :rules="URLRules" label="URL" required>
					</v-text-field>

					<v-divider class="my-5">

					</v-divider>
					<p> This club is created by you! </p>


					<v-btn color="error" small class="mr-2" @click="deleteClub">
						Delete
					</v-btn>

					<v-btn color="success" small @click="updateClub">
						Update
					</v-btn>
				</v-form>
			</div>
			<div v-else>
				<p> <strong> Name: </strong> {{currentClub.name}}</p>
				<p> <strong> city: </strong> {{currentClub.city}}</p>
				<p> <strong> streetName: </strong> {{currentClub.streetName}}</p>
				<p> <strong> URL: </strong> {{currentClub.URL}}</p>
				<p> This club is created by {{currentClub.createdByName}} </p>

			</div>
			<p class="mt-3">{{ message }}</p>
		</div>


		<div class="row">
			<div v-if="fanProducts" class="col-md-6">
				<h1> Fan Producten </h1>
				<v-btn small @click="click('fanProducts-add')">
					Nieuwe fanProduct toevoegen
				</v-btn>
				<v-data-table :headers="headersFanProduct" :items="fanProducts" disable-pagination
					:hide-default-footer="true" class="table">
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon small class="mr-2" @click="editFanProduct(item._id.toString())">mdi-pencil</v-icon>
						<v-icon small @click="deleteFanProduct(item._id.toString())">mdi-delete</v-icon>
					</template>
				</v-data-table>
			</div>
			<div v-else>
				There are no fan products
			</div>
			<div v-if="sports" class="col-md-6">
				<h1> Sporten </h1>
				<v-btn small @click="click('sports-add')">
					Nieuwe sport toevoegen
				</v-btn>
				<v-data-table :headers="headersSport" :items="sports" disable-pagination :hide-default-footer="true"
					class="table">
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon small class="mr-2" @click="editSport(item._id.toString())">mdi-pencil</v-icon>
						<v-icon small @click="deleteSport(item._id.toString())">mdi-delete</v-icon>
					</template>
				</v-data-table>
			</div>
			<div v-else>
				There are no sports
			</div>
		</div>

	</div>
	<div v-else>
		<p>Please click on a Club...</p>
	</div>


</template>

<script>
	import ClubDataService from "../../services/ClubDataService";
	import FanProductDataService from "../../services/FanProductDataService";
	import SportDataService from "../../services/SportDataService";

	export default {
		name: "club",
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
			},
		},
		data() {
			return {
				valid: true,
				currentClub: null,
				userIsOwner: false,
				fanProducts: [],
				sports: [],
				message: "",
				headersFanProduct: [{
						text: "productTitle",
						align: "start",
						sortable: false,
						value: "productTitle"
					},
					{
						text: "Beschrijving",
						value: "description",
						sortable: false
					},
					{
						text: "buyLink",
						value: "buyLink",
						sortable: false
					},
					{
						text: "Acties",
						value: "actions",
						sortable: false
					},
				],
				headersSport: [{
						text: "Titel",
						align: "start",
						sortable: false,
						value: "title"
					},
					{
						text: "Beschrijving",
						value: "description",
						sortable: false
					},
					{
						text: "Registratie",
						value: "openForRegistration",
						sortable: false
					},
					{
						text: "Link",
						value: "wikiLink",
						sortable: false
					},
					{
						text: "Acties",
						value: "actions",
						sortable: false
					},
				],
				nameRules: [
					v => !!v || 'Name is Required!',
					v => v.length <= 150 || 'Name must be less then 150 characters.',
					v => v.length >= 2 || 'Name must be at least 2 characters long'
				],
				cityRules: [
					v => !!v || 'city is Required!',
					v => v.length <= 150 || 'city must be less then 150 characters.',
					v => v.length >= 2 || 'city must be at least 2 characters long'
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
					v =>
					/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
					.test(v) || 'URL must be valid. (example: https://deStoep.nl)'
				],
			};
		},
		methods: {
			getClub(id) {
				ClubDataService.get(id)
					.then((response) => {
						this.currentClub = response.data;
						if (this.currentUser.id == this.currentClub.createdById) {
							this.userIsOwner = true;
						}
						if (response.data.fanProducts) {
							this.fanProducts = response.data.fanProducts;
						}
						if (response.data.sports) {
							this.sports = response.data.sports;
						}
						console.log(this);
					})
					.catch((e) => {
						console.log(e);
					});
			},
			updateClub() {
				this.$refs.form.validate()
				if (this.valid) {
					ClubDataService.update(this.currentClub.id, this.currentClub)
						.then((response) => {
							this.message = "The club was updated successfully!";
						})
						.catch((e) => {
							this.message = e.response.data;
						});
				}
			},

			deleteClub() {
				ClubDataService.delete(this.currentClub.id)
					.then((response) => {
						this.$router.push({
							name: "clubs"
						});
					})
					.catch((e) => {
						this.message = e.response.data;
					});
			},
			click(url) {
				this.$router.push({
					name: url,
					params: {
						clubId: this.currentClub.id
					}
				});
			},
			editFanProduct(id) {
				this.$router.push({
					path: "/fanProducts/" + id + "/" + this.currentClub.id
				});
			},

			deleteFanProduct(id) {
				const data = {
					id: this.currentClub.id,
				};
				FanProductDataService.delete(id, data)
					.then(() => {
						this.refreshList();
					})
					.catch((e) => {
						console.log(e);
					});
			},
			editSport(id) {
				this.$router.push({
					path: "/sports/" + id + "/" + this.currentClub.id
				});
			},

			deleteSport(id) {
				const data = {
					id: this.currentClub.id,
				};
				SportDataService.delete(id, data)
					.then(() => {
						this.refreshList();
					})
					.catch((e) => {
						console.log(e);
					});
			},
		},

		mounted() {
			this.message = "";
			this.getClub(this.$route.params.id);
		},
	};
</script>

<style>
	.edit-form {
		max-width: 300px;
		margin: auto;
	}
</style>