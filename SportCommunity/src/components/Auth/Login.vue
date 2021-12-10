<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h2> Login </h2>
      <form name="form" @submit.prevent="handleLogin">
        <v-form ref="form" lazy-validation>
          <v-text-field data-cy="email-input" v-model="user.email" :rules="[(v) => !!v || 'email is required']" label="email" required>
          </v-text-field>

          <v-text-field data-cy="password-input" v-model="user.password" type="password" :rules="[(v) => !!v || 'Password is required']"
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
        user: new User("", ""),
        loading: false,
        message: "",
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