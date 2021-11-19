<template>
  <v-row align="center" class="row px-3 mx-auto" style="max-width:50%">
    <v-col  cols="12" md="8">
      <v-text-field v-model="title" label="Zoeken op titel"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Zoek
      </v-btn>
      <v-btn small @click="click('sports-add')">
        Nieuwe sport toevoegen
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Sports</v-card-title>

        <v-data-table
          :headers="headers"
          :items="sports"
          disable-pagination
          :hide-default-footer="true"
          class="table"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editSport(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteSport(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SportDataService from "../../services/SportDataService";
export default {
  name: "sports-list",
  data() {
    return {
      sports: [],
      title: "",
      headers: [
        { text: "Titel", align: "start", sortable: false, value: "title" },
        { text: "Beschrijving", value: "description", sortable: false },
        { text: "Registratie", value: "openForRegistration", sortable: false },
        { text: "Link", value: "wikiLink", sortable: false },
        { text: "Acties", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveSports() {
      SportDataService.getAll()
        .then((response) => {
          this.sports = response.data.map(this.getDisplaySport);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSports();
    },

    removeAllSports() {
      SportDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      SportDataService.findByTitle(this.title)
        .then((response) => {
          this.sports = response.data.map(this.getDisplaySport);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editSport(id) {
      this.$router.push({ path: '/sports/'+id });
    },

    deleteSport(id) {
      SportDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplaySport(sport) {
      return {
        id: sport.id,
        title: sport.title,//.length > 30 ? sport.title.substr(0, 30) + "..." : sport.title,
        description: sport.description,//.length > 30 ? sport.description.substr(0, 30) + "..." : sport.description,
        wikiLink: sport.wikiLink,//.length > 30 ? sport.wikiLink.substr(0, 30) + "..." : sport.wikiLink,
        openForRegistration: sport.openForRegistration ? "Open" : "Gesloten",
      };
    },
    click(url){
      this.$router.push({ name: url });
    },
  },
  mounted() {
    this.retrieveSports();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>