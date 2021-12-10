<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h2> Login </h2>
      <form name="form" @submit.prevent="handleLogin">
        <v-form ref="form" lazy-validation>
          <v-text-field data-cy="email-input" v-model="user.email" :rules="emailRules" label="email" required>
          </v-text-field>

          <v-text-field data-cy="password-input" v-model="user.password" type="password" :rules="passwordRules"
            label="Password" required></v-text-field>

        </v-form>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert"><p data-cy="error-message-login">{{message}}</p></div>
        </div>
      </form>
      <br>
      <div class="form-group">
        <button @click="click('register')" class="btn btn-primary btn-block">
          <span>Registreer</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import User from "../../models/user";

  export default {
    name: "Login",
    data() {
      return {
        valid: true,
        user: new User("", ""),
        loading: false,
        message: "",      
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
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    created() {
      if (this.loggedIn) {
        this.$router.push("/profile");
      }
    },
    methods: {
      handleLogin() {
        this.$refs.form.validate()
        console.log(this.valid);
				if (this.valid) {
          this.loading = true;
          console.log("check email / password");
          if (this.user.email && this.user.password) {
            console.log(this.$store);
            this.$store.dispatch("auth/login", this.user).then(
              () => {
                this.loading = false;
                this.$router.push("/profile");
              },
              (error) => {
                this.loading = false;
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              },
            );
          } else {
            this.loading = false;
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