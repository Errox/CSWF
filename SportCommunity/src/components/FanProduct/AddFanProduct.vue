<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add FanProduct</p>

    <div v-if="!submitted">
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

      <v-btn color="primary" class="mt-3" @click="saveFanProduct">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new FanProduct.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newFanProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import FanProductDataService from "../../services/FanProductDataService";

export default {
  name: "add-fanProduct",
  data() {
    return {
      fanProduct: {
        id: null,
        productTitle: "",
        description: "",
        buyLink: "",
        price: 0
      },
      submitted: false,
    };
  },
  methods: {
    saveFanProduct() {
      var data = {
        productTitle: this.fanProduct.productTitle,
        description: this.fanProduct.description,
        buyLink: this.fanProduct.buyLink,
        price: this.fanProduct.price
      };

      FanProductDataService.create(data)
        .then((response) => {
          this.fanProduct.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newFanProduct() {
      this.submitted = false;
      this.fanProduct = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>