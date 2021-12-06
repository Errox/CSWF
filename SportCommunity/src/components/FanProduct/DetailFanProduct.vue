<template>
  <div v-if="currentFanProduct" class="edit-form py-3">
    <p class="headline">Huidige fanProduct aanpassen</p>

    <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="fanProduct.productTitle"
          :rules="[(v) => !!v || 'productTitle is required']"
          label="productTitle"
          required
        ></v-text-field>

        <v-text-field
          v-model="fanProduct.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>

        <v-text-field
          v-model="fanProduct.buyLink"
          :rules="[(v) => !!v || 'buyLink is required']"
          label="buyLink"
          required
        ></v-text-field>

        <v-text-field
          v-model="fanProduct.price"
          :rules="[(v) => !!v || 'price is required']"
          label="price"
          required
        ></v-text-field>

    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a FanProduct...</p>
  </div>
</template>

<script>
import FanProductDataService from "../../services/FanProductDataService";

export default {
	name: "fanProduct",
	data() {
		return {
			currentFanProduct: null,
			message: "",
		};
	},
	methods: {
		getFanProduct(id) {
			FanProductDataService.get(id)
				.then((response) => {
					this.currentFanProduct = response.data;
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
	mounted() {
		this.message = "";
		this.getFanProduct(this.$route.params.id);
	},
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
