<template>
  <div v-if="currentFanProduct" class="edit-form py-3">
    <p class="headline">Huidige fanProduct aanpassen</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentFanProduct.productTitle"
        :rules="[(v) => !!v || 'productTitle is required']"
        label="productTitle"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentFanProduct.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentFanProduct.buyLink"
        :rules="[(v) => !!v || 'buyLink is required']"
        label="buyLink"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentFanProduct.price"
        :rules="[(v) => !!v || 'price is required']"
        label="price"
        required
      ></v-text-field>

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
      currentFanProduct: null,
      message: "",
    };
  },
  methods: {
    getFanProduct(id) {
      FanProductDataService.get(id)
        .then((response) => {
          console.log(this.currentFanProduct);
          this.currentFanProduct = response.data;
          console.log(this.currentFanProduct);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOpenForRegistration() {
      var data = {
        id: this.currentFanProduct.id,
        productTitle: this.currentFanProduct.productTitle,
        description: this.currentFanProduct.description,
        buyLink : this.currentFanProduct.buyLink,
        price : this.currentFanProduct.price,
      };

      FanProductDataService.update(this.currentFanProduct.id, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateFanProduct() {
      FanProductDataService.update(this.currentFanProduct.id, this.currentFanProduct)
        .then((response) => {
          console.log(response.data);
          this.message = "The fanProduct was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteFanProduct() {
      FanProductDataService.delete(this.currentFanProduct.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "fanProducts" });
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