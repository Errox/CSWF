<template>
    <div class="col-md-12">
        <div class="card card-container">
            <h2>Registreer je account!</h2>
            <form name="form" @submit.prevent="handleRegister">
                <v-form ref="form" lazy-validation>
                    <v-text-field data-cy="name-input" v-model="user.name" :rules="[(v) => !!v || 'name is required']" label="Name" required>
                    </v-text-field>

                    <v-text-field data-cy="surname-input" v-model="user.surName" :rules="[(v) => !!v || 'surName is required']"
                        label="Achternaam" required></v-text-field>

                    <v-text-field data-cy="email-input" v-model="user.email" :rules="[(v) => !!v || 'email is required']" label="Email"
                        required></v-text-field>

                    <v-text-field data-cy="password-input" v-model="user.password" type="password"
                        :rules="[(v) => !!v || 'Password is required']" label="Password" required></v-text-field>
                    <div>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="user.date" label="Birthday date" v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker data-cy="dateOfBirth-input" v-model="user.date" :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1950-01-01"></v-date-picker>
                        </v-menu>
                    </div>
                </v-form>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">
                        <span>Register</span>
                    </button>
                </div>
                <br>
                <div class="form-group">
                    <div data-cy="notification-register" v-if="message" class="alert alert-primary" role="alert">{{message}}</div>
                </div>
            </form>
            <br>
            <div class="form-group">
                <button @click="click('login')" class="btn btn-primary btn-block">
                    <span>Login</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import User from "../../models/user";

    export default {
        name: "Register",
        data() {
            return {
                activePicker: null,
                date: null,
                user: new User("", "", "", "", ""),
                submitted: false,
                successful: false,
                message: "",
            };
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.activePicker = 'YEAR'))
            },
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push("/profile");
            }
        },
        methods: {
            handleRegister() {
                console.log(this.user);
                this.user.dateOfBirth = this.user.date;

                console.log(this.user.name || this.user.email || this.user.password || this.user.dateOfBirth || this
                    .user.surName);
                if (this.user.name == '' || this.user.email == '' || this.user.password == '' || this.user
                    .dateOfBirth == '' || this.user.surName == '') {
                    this.message = "Please fill in all the fields."
                } else {
                    this.message = "";
                    this.submitted = true;
                    this.$store.dispatch("auth/register", this.user).then(
                        (data) => {
                            this.message = data.message;
                            this.successful = true;
                        },
                        (error) => {
                            console.log(error.response);
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                        },
                    );
                }
            },
            click(url) {
                const tmp = this.$route.fullPath.replace(/[^a-zA-Z0-9]/g, "");

                console.log(tmp + " : " + url);
                if (url != tmp) {
                    this.$router.push({
                        name: url
                    });
                }
            },
        },
    };
</script>

<style scoped>
    label {
        display: block;
        margin-top: 10px;
    }

    .card-container.card {
        max-width: 350px !important;
        padding: 40px 40px;
    }

    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        margin-top: 50px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img-card {
        width: 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
</style>