<template>
    <div class="col-md-12">
        <div class="card card-container">
            <h2>Registreer je account!</h2>
            <form name="form" @submit.prevent="handleRegister">
                <v-form ref="form" lazy-validation>
                    <v-text-field data-cy="name-input" v-model="user.name" :rules="nameRules" label="Name" required>
                    </v-text-field>

                    <v-text-field data-cy="surname-input" v-model="user.surName" :rules="surNameRules"
                        label="Achternaam" required></v-text-field>

                    <v-text-field data-cy="email-input" v-model="user.email" :rules="emailRules" label="Email"
                        required></v-text-field>

                    <v-text-field data-cy="password-input" v-model="user.password" type="password"
                        :rules="passwordRules" label="Password" required></v-text-field>
                    <div>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="user.date" label="Birthday date" v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker data-cy="dateOfBirth-input" v-model="user.date" :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1950-01-01" ></v-date-picker>
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
                valid: true,
                activePicker: null,
                date: null,
                menu: false,
                user: new User("", "", "", "", ""),
                submitted: false,
                successful: false,
                message: "",      
                nameRules: [
                    v => !!v || 'Name is Required!',
                    v => v.length <= 150 || 'Name must be less then 150 characters.',
                    v => v.length >= 2 || 'Name must be at least 2 characters long'
                ],      
                surNameRules: [
                    v => !!v || 'Sur Name is Required!',
                    v => v.length <= 150 || 'Sur Name must be less then 150 characters.',
                    v => v.length >= 2 || 'Sur Name must be at least 2 characters long'
                ],
                emailRules: [
                    v => !!v || 'Email is required!',
                    v => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v) || 'E-mail must be valid. (example: mail@address.nl)',
                ],
                passwordRules:[
                    v => !!v || 'Password is required',
                    v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v) || 'Minimum eight characters, at least one upper case letter, one lower case letter, one number.'
                ]
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
                this.$refs.form.validate()
                console.log(this.valid)
                if (this.valid) {
                    this.user.dateOfBirth = this.user.date;
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