<template>
  <v-row align="center" class="row px-3 mx-auto" style="max-width:50%">
    <v-col  cols="12" md="8">
      <v-text-field v-model="title" label="Zoeken op titel"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Zoek
      </v-btn>
      <v-btn small @click="click('fanProducts-add')">
        Nieuwe fanProduct toevoegen
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>FanProducts</v-card-title>

        <v-data-table
          :headers="headers"
          :items="fanProducts"
          disable-pagination
          :hide-default-footer="true"
          class="table"
        >
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FanProductDataService from "../../services/FanProductDataService";
export default {
	name: "fanProducts-list",
	data() {
		return {
			fanProducts: [],
			title: "",
			headers: [
				{text: "productTitle", align: "start", sortable: false, value: "productTitle"},
				{text: "Beschrijving", value: "description", sortable: false},
				{text: "buyLink", value: "buyLink", sortable: false},
				{text: "price", value: "price", sortable: false},
			],
		};
	},
	methods: {
		retrieveFanProducts() {
			FanProductDataService.getAll()
				.then((response) => {
					this.fanProducts = response.data.map(this.getDisplayFanProduct);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		refreshList() {
			this.retrieveFanProducts();
		},

		removeAllFanProducts() {
			FanProductDataService.deleteAll()
				.then((response) => {
					console.log(response.data);
					this.refreshList();
				})
				.catch((e) => {
					console.log(e);
				});
		},

		searchTitle() {
			FanProductDataService.findByTitle(this.title)
				.then((response) => {
					this.fanProducts = response.data.map(this.getDisplayFanProduct);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		editFanProduct(id) {
			this.$router.push({path: "/fanProducts/"+id});
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

		getDisplayFanProduct(fanProduct) {
			return {
				id: fanProduct.id,
				productTitle: fanProduct.productTitle, // .length > 30 ? fanProduct.title.substr(0, 30) + "..." : fanProduct.title,
				description: fanProduct.description, // .length > 30 ? fanProduct.description.substr(0, 30) + "..." : fanProduct.description,
				buyLink: fanProduct.buyLink, // .length > 30 ? fanProduct.wikiLink.substr(0, 30) + "..." : fanProduct.wikiLink,
				price: fanProduct.price,
			};
		},
		click(url) {
			this.$router.push({name: url});
		},
	},
	mounted() {
		this.retrieveFanProducts();
	},
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
