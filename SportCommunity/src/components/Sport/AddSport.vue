<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Sport</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="sport.title" :rules="titleRules" label="Title" required></v-text-field>

        <v-text-field v-model="sport.description" :rules="descriptionRules" label="Description" required></v-text-field>

        <v-text-field v-model="sport.wikiLink" :rules="wikiLinkRules" label="Wiki Link" required></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveSport">Submit</v-btn>


      <p class="mt-3">{{ message }}</p>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Sport.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newSport">Add</v-btn>
        </v-card-actions>

      </v-card>
    </div>
  </div>
</template>

<script>
  import SportDataService from "../../services/SportDataService";

  export default {
    name: "add-sport",
    data() {
      return {
        valid: true,
        message: "",
        sport: {
          id: null,
          title: "",
          description: "",
          openForRegistration: false,
        },
        submitted: false,
        wikiLinkRules: [
          v => !!v || 'wikiLink is required',
          v =>
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
          .test(v) || 'URL must be valid. (example: https://en.wikipedia.org/wiki/Volleyball)'
        ],
        titleRules: [
          v => !!v || 'Title is Required!',
          v => v.length <= 150 || 'Title must be less then 150 characters.',
          v => v.length >= 2 || 'Title must be at least 2 characters long'
        ],
        descriptionRules: [
          v => !!v || 'Description is Required!',
          v => v.length <= 250 || 'Title must be less then 250 characters.',
          v => v.length >= 4 || 'Title must be at least 2 characters long'
        ],
      };
    },
    methods: {
      saveSport() {
        const data = {
          title: this.sport.title,
          description: this.sport.description,
          wikiLink: this.sport.wikiLink,
          clubId: this.$route.params.clubId
        };
        this.$refs.form.validate()
        if (this.valid) {
          SportDataService.create(data)
            .then((response) => {
              this.sport.id = response.data.id;
              this.submitted = true;
            })
            .catch((e) => {
              this.message = e.response.data;
            });
        }
      },

      newSport() {
        this.submitted = false;
        this.sport = {};
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