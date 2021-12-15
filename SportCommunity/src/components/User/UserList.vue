<template>
	<v-row align="center" class="row px-3 mx-auto" style="max-width:50%">
		<v-col cols="12" md="8">
			<v-text-field v-model="title" label="Zoeken op usernaam"></v-text-field>
		</v-col>

		<v-col cols="12" md="4">
			<v-btn small @click="searchTitle">
				Zoek
			</v-btn>
			<v-btn small @click="click('users-add')">
				Nieuwe user toevoegen
			</v-btn>
		</v-col>

		<v-col cols="12" sm="12">
			<v-card class="mx-auto" tile>
				<v-card-title>Users</v-card-title>

				<v-data-table :headers="headers" :items="users" disable-pagination :hide-default-footer="true"
					class="table">
				</v-data-table>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	import UserDataService from "../../services/UserDataService";
	export default {
		name: "users-list",
		data() {
			return {
				users: [],
				title: "",
				headers: [{
						text: "name",
						value: "name",
						align: "start",
						sortable: false
					},
					{
						text: "surName",
						value: "surName",
						sortable: false
					},
					{
						text: "email",
						value: "email",
						sortable: false
					},
					{
						text: "dateOfBirth",
						value: "dateOfBirth",
						sortable: false
					},
				],
			};
		},
		methods: {
			retrieveUsers() {
				UserDataService.getAll()
					.then((response) => {
						this.users = response.data.map(this.getDisplayUser);
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
			},

			refreshList() {
				this.retrieveUsers();
			},

			removeAllUsers() {
				UserDataService.deleteAll()
					.then((response) => {
						console.log(response.data);
						this.refreshList();
					})
					.catch((e) => {
						console.log(e);
					});
			},

			searchTitle() {
				UserDataService.findByTitle(this.title)
					.then((response) => {
						this.users = response.data.map(this.getDisplayUser);
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
			},

			editUser(id) {
				this.$router.push({
					path: "/users/" + id
				});
			},

			deleteUser(id) {
				UserDataService.delete(id)
					.then(() => {
						this.refreshList();
					})
					.catch((e) => {
						console.log(e);
					});
			},

			getDisplayUser(user) {
				return {
					id: user.id,
					name: user.name,
					surName: user.surName,
					email: user.email,
					password: user.password,
					dateOfBirth: user.dateOfBirth,
				};
			},
			click(url) {
				this.$router.push({
					name: url
				});
			},
		},
		mounted() {
			this.retrieveUsers();
		},
	};
</script>

<style>
	.list {
		max-width: 750px;
	}
</style>