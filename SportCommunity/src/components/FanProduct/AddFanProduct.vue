<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add FanProduct</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="fanProduct.productTitle" :rules="productTitleRules"
          label="productTitle" required></v-text-field>

        <v-text-field v-model="fanProduct.description" :rules="descriptionRules"
          label="Description" required></v-text-field>

        <v-text-field v-model="fanProduct.buyLink" :rules="buyLinkRules" label="buyLink"
          required></v-text-field>

        <v-text-field v-model="fanProduct.price" :rules="priceRules" label="price" required>
        </v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveFanProduct">Submit</v-btn>
      <p class="mt-3">{{ message }}</p>
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
        valid: true,
        message: "",
        fanProduct: {
          id: null,
          productTitle: "",
          description: "",
          buyLink: "",
          price: 0,
        },
        submitted: false,
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
      saveFanProduct() {
        const data = {
          productTitle: this.fanProduct.productTitle,
          description: this.fanProduct.description,
          buyLink: this.fanProduct.buyLink,
          price: this.fanProduct.price,
          clubId: this.$route.params.clubId
        };

        this.$refs.form.validate()
        if (this.valid) {
          FanProductDataService.create(data)
            .then((response) => {
              this.fanProduct.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
            })
            .catch((e) => {
              this.message = e.response.data;
              console.log(e);
            });
        }
      },

      newFanProduct() {
        this.submitted = false;
        this.fanProduct = {};
      },
    },
    mounted() {
      this.message = "";
    },
  };
</script>

<style>
  .submit-form {
    max-width: 300px;
  }
</style>