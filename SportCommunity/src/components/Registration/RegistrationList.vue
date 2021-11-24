<template>
  <v-row align="center" class="row px-3 mx-auto" style="max-width:50%">
    <v-col  cols="12" md="8">
      <v-text-field v-model="title" label="Zoeken op titel"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Zoek
      </v-btn>
      <v-btn small @click="click('registrations-add')">
        Nieuwe registration toevoegen
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Registrations</v-card-title>

        <v-data-table
          :headers="headers"
          :items="registrations"
          disable-pagination
          :hide-default-footer="true"
          class="table"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editRegistration(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteRegistration(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RegistrationDataService from "../../services/RegistrationDataService";
export default {
  name: "registrations-list",
  data() {
    return {
      registrations: [],
      title: "",
      headers: [
        { text: "userId", align: "start", sortable: false, value: "userId" },
        { text: "sportId", value: "sportId", sortable: false },
        { text: "clubId", value: "clubId", sortable: false },
        { text: "Acties", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveRegistrations() {
      RegistrationDataService.getAll()
        .then((response) => {
          this.registrations = response.data.map(this.getDisplayRegistration);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRegistrations();
    },

    removeAllRegistrations() {
      RegistrationDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      RegistrationDataService.findByTitle(this.title)
        .then((response) => {
          this.registrations = response.data.map(this.getDisplayRegistration);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editRegistration(id) {
      this.$router.push({ path: '/registrations/'+id });
    },

    deleteRegistration(id) {
      RegistrationDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayRegistration(registration) {
      return {
        id: registration.id,
        userId: registration.userId,
        sportId: registration.sportId,
        clubId: registration.clubId,
      };
    },
    click(url){
      this.$router.push({ name: url });
    },
  },
  mounted() {
    this.retrieveRegistrations();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>