<template>
	<div v-if="currentClub">
		<div class="edit-form py-3">
			<p class="headline"><strong>Club</strong> {{currentClub.name}} </p>
			<div v-if="userIsOwner">
				<v-form ref="form" lazy-validation>
					<v-text-field data-cy="nameClub-input" v-model="currentClub.name"
						:rules="[(v) => !!v || 'name is required']" label="name" required>
					</v-text-field>

					<v-text-field data-cy="city-input" v-model="currentClub.city"
						:rules="[(v) => !!v || 'city is required']" label="city" required>
					</v-text-field>

					<v-text-field data-cy="streetname-input" v-model="currentClub.streetName"
						:rules="[(v) => !!v || 'streetName is required']" label="streetName" required></v-text-field>

					<v-text-field data-cy="URL-input" v-model="currentClub.URL"
						:rules="[(v) => !!v || 'URL is required']" label="URL" required>
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
				ClubDataService.update(this.currentClub.id, this.currentClub)
					.then((response) => {
						console.log(response.data);
						this.message = "The club was updated successfully!";
					})
					.catch((e) => {
						this.message = e.response.data;
					});
			},

			deleteClub() {
				ClubDataService.delete(this.currentClub.id)
					.then((response) => {
						console.log(response.data);
						this.$router.push({
							name: "clubs"
						});
					})
					.catch((e) => {
						console.log(e);
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
					path: "/fanProducts/" + id
				});
			},

			deleteFanProduct(id) {
				FanProductDataService.delete(id)
					.then(() => {
						this.refreshList();
					})
					.catch((e) => {
						console.log(e);
					});
			},
			editSport(id) {
				this.$router.push({
					path: "/sports/" + id
				});
			},

			deleteSport(id) {
				SportDataService.delete(id)
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