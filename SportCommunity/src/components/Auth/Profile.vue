<template>
  <div class="container">
  <br>
    <div class="row">
       <div class="col-md-6">
      <header class="jumbotron">
        <h3>
          <strong>{{currentUser.email}}'s </strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong>
        {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
      </p>
      <p>
        <strong>Id:</strong>
        {{currentUser.id}}
      </p>
      <p>
        <strong>Name:</strong>
        {{currentUser.name}}
      </p>
      <p>
        <strong>Sur Name:</strong>
        {{currentUser.surName}}
      </p>
      <p>
        <strong>Date Of Birth:</strong>
        {{currentUser.dateOfBirth}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      </div>

      <div class="col-md-6">
        <h2>Crud view of all entities</h2>
          <button type="button" class="btn btn-light" @click="click('sports')"> Alle sporten </button>
          <br><br>
          <!-- <button type="button" class="btn btn-light" @click="click('registrations')"> Alle registraties </button> -->
          <!-- <br><br> -->
          <button type="button" class="btn btn-light" @click="click('fanProducts')"> Alle Fan producten </button>
          <br> <br>
          <button type="button" class="btn btn-light" @click="click('users')"> Alle Users </button>
          <br> <br>
          <button type="button" class="btn btn-light" @click="click('clubs')"> Alle Clubs </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
	name: "Profile",
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push("/login");
		}
	},
    methods: {
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
