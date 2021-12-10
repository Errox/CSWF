<template>
  <v-container>
    <div class="container px-4">
      <div class="row gx-4 justify-content-center">
        <div class="col-lg-8">
          <h2>Sport Community</h2>
          <p class="lead">
            Welkom op de front page van Sport Community! Sport Community is een platform om gemakkelijk clubs en sporten op
            te zoeken! Sport Community is gemaakt om iedereen op te hoogte te brengen wat er mogelijk is en waar.
            Hierbij kan je gemakkelijk inzicht krijgen welke clubs er zijn en waar je contact mee kan openemen als je
            geinttereseerd ben in de sport. Op dit platform kan je
            verschillende dingen doen.
          </p>
          <ul>
            <li>
              Je kan je eigen club op de website zetten om zo je sporten te
              delen met anderen.
            </li>
            <li>
              Gemakkelijk aanmelden voor een sport die jou interresant lijkt.
            </li>
            <li>Als club kan je je eigen merchendise aanbieden die bij de club hoort! Zoals leuke sokken die speciaal
              voor de club zijn of eventueel andere items!</li>
            <li>Ook kan je zien welke clubs er zijn waarbij je gemakkelijk in kan zien welke sporten deze club
              aanbieden! Op deze manier kan je op de hoogte zijn welke sporten er aangeboden zijn en kan je hierbij
              gemakkelijk naar hun persoonlijke website om gemakkelijk in contact te komen!</li>
          </ul>
          <p> Voor meer informatie, ga naar onze about page! <button type="button" class="btn btn-light" @click="click('AboutUrl')"> About </button> </p>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
  export default {
    methods: {
      click(url) {
        const tmp = this.$route.fullPath.replace(/[^a-zA-Z0-9]/g, "");
        if (url != tmp) {
          this.$router.push({
            name: url
          });
        }
      },
    },

  };
</script>