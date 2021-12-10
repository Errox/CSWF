<template>
  <v-row align="center" class="row px-3 mx-auto" style="max-width:50%">
    <v-col  cols="12" md="8">
      <v-text-field v-model="title" label="Zoeken op clubnaam"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Zoek
      </v-btn>
      <v-btn small @click="click('clubs-add')">
        Nieuwe club toevoegen
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Clubs</v-card-title>

        <v-data-table
          :headers="headers"
          :items="clubs"
          disable-pagination
          :hide-default-footer="true"
          class="table"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editClub(item.id)">mdi-magnify</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ClubDataService from "../../services/ClubDataService";
export default {
	name: "clubs-list",
	data() {
		return {
			clubs: [],
			title: "",
			headers: [
				{text: "name", value: "name", align: "start", sortable: false},
				{text: "city", value: "city", sortable: false},
				{text: "streetName", value: "streetName", sortable: false},
				{text: "URL", value: "URL", sortable: false},
				{text: "Acties", value: "actions", sortable: false},
			],
		};
	},
	methods: {
		retrieveClubs() {
			ClubDataService.getAll()
				.then((response) => {
					this.clubs = response.data.map(this.getDisplayClub);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		refreshList() {
			this.retrieveClubs();
		},

		searchTitle() {
			ClubDataService.findByTitle(this.title)
				.then((response) => {
					this.clubs = response.data.map(this.getDisplayClub);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		editClub(id) {
			this.$router.push({path: "/clubs/"+id});
		},

		getDisplayClub(club) {
			return {
				id: club.id,
				name: club.name,
				city: club.city,
				streetName: club.streetName,
				URL: club.URL,
			};
		},
		click(url) {
			console.log(url);
			this.$router.push({name: url});
		},
	},
	mounted() {
		this.retrieveClubs();
	},
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
