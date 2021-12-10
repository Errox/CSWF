<template>
	<div v-if="currentFanProduct" class="edit-form py-3">
		<p class="headline">Huidige fanProduct aanpassen</p>

		<v-form ref="form" lazy-validation>
			<v-text-field v-model="currentFanProduct.productTitle" :rules="productTitleRules" label="productTitle"
				required></v-text-field>

			<v-text-field v-model="currentFanProduct.description" :rules="descriptionRules" label="Description"
				required></v-text-field>

			<v-text-field v-model="currentFanProduct.buyLink" :rules="buyLinkRules" label="buyLink" required>
			</v-text-field>

			<v-text-field v-model="currentFanProduct.price" :rules="priceRules" required></v-text-field>

			<v-divider class="my-5"></v-divider>

			<v-btn color="error" small class="mr-2" @click="deleteFanProduct">
				Delete
			</v-btn>

			<v-btn color="success" small @click="updateFanProduct">
				Update
			</v-btn>
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
		name: "fanproduct",
		data() {
			return {
				valid: true,
				currentFanProduct: null,
				message: "",
				buyLinkRules: [
					v => !!v || 'buyLink is required',
					v => v.length <= 150 || 'buyLink must be less then 150 characters long.',
					v => v.length >= 2 || 'buyLink must be at least 2 characters long',
					v =>
					/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
					.test(v) || 'URL must be valid. (example: https://DeStoep.nl/Sokken)'
				],
				price: [
					v => !!v || 'Price is required',
					v => typeof v == 'number' || 'Price must be a number'
				],
				titleRules: [
					v => !!v || 'Title is Required!',
					v => v.length <= 150 || 'Title must be less then 150 characters.',
					v => v.length >= 2 || 'Title must be at least 2 characters long'
				],
				productTitleRules: [
					v => !!v || 'Product Title is Required!',
					v => v.length <= 250 || 'Product Title must be less then 250 characters.',
					v => v.length >= 4 || 'Product Title must be at least 2 characters long'
				],
			};
		},
		methods: {
			getFanProduct(id) {
				console.log(id);
				FanProductDataService.get(id)
					.then((response) => {
						console.log(this.currentFanProduct);
						this.currentFanProduct = response.data;
						console.log(this.currentFanProduct);
					})
					.catch((e) => {
						console.log(e);
						this.message = e.response.message;
					});
			},

			updateFanProduct() {
				const data = {
					id: this.currentFanProduct.id,
					productTitle: this.currentFanProduct.productTitle,
					description: this.currentFanProduct.description,
					buyLink: this.currentFanProduct.buyLink,
					price: this.currentFanProduct.price,
          			clubId: this.$route.params.clubId
				};

				this.$refs.form.validate()
				if (this.valid) {
					FanProductDataService.update(this.currentFanProduct.id, data)
						.then((response) => {
							console.log(response.data);
							this.message = "The fanProduct was updated successfully!";
						})
						.catch((e) => {
							console.log(e);
							this.message = e.response.message;
						});
				}

			},

			deleteFanProduct() {
				const data = {
					id: this.$route.params.clubId,
				};
				FanProductDataService.delete(this.currentFanProduct.id, data)
					.then((response) => {
						console.log(response.data);
						this.$router.push({
							name: "fanProducts"
						});
					})
					.catch((e) => {
						console.log(e);
						this.message = e.response.message;
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