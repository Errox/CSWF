<template>
    <div class="submit-form mt-3 mx-auto">
        <p class="headline">Add Sport To Club</p>

        <div v-if="!submitted">
            <v-form ref="form" lazy-validation>
                <v-select
                    v-model="sport"
                    :items="sports"
                    item-text="title"
                    item-value="id"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                    :rules="selectRules"
                ></v-select>

            </v-form>

            <v-btn color="primary" class="mt-3" @click="saveSport">Submit</v-btn>
            <v-btn color="primary" class="mt-3" @click="click('sports-add')">Nieuwe sport toevoegen</v-btn>


            <p class="mt-3">{{ message }}</p>
        </div>

        <div v-else>
            <v-card class="mx-auto">
                <v-card-title>
                    Submitted successfully!
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
    import SportDataService from "../../services/SportDataService";
    import ClubDataService from "../../services/ClubDataService";
    export default {
        name: "add-sport",
        data() {
            return {
                valid: true,
                message: "",
                sports: {},
                sport: '',
                submitted: false,
                selectRules: [v => !!v || 'Sport is required'] 
            };
        },
        methods: {
            saveSport() {
                this.$refs.form.validate()
                if (this.valid) {
                    if(!this.sport.id != undefined){
                        ClubDataService.addSportToClub({ clubId : this.$route.params.clubId , sportId: this.sport.id })
                            .then((response) => {
                                this.sport.id = response.data.id;
                                this.submitted = true;
                            })
                            .catch((e) => {
                                this.message = e.response.data;
                            });
                    }
                }
                // Close and return to before page
                console.log(this.sport.id)
            },
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
            getDisplaySport(sport) {
                return {
                    id: sport.id,
                    title: sport.title,
                };
            },
            click(url) {
                this.$router.push({name: url});
            },
        },
        mounted() {
            this.message = "";
            this.retrieveSports();
        },
    };
</script>

<style>
    .submit-form {
        max-width: 300px;
    }
</style>