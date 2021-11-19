<template>
  <v-container>
    <div class="container px-4">
        <div class="row gx-4 justify-content-center">
            <div class="col-lg-8">
                <h2>About Sport Community</h2>
                <p class="lead">Sport Community is een platform om gemakkelijk clubs en sporten op te zoeken en je hiervoor aan te melden! Op dit platform kan je verschillende dingen doen.</p>
                <ul>
                    <li>Je kan je nieuwe sport toevoegen zodat andere hierop kunnen inschrijven.</li>
                    <li>Je kan je eigen club op de website zetten om zo je sporten te delen met anderen.</li>
                    <li>Gemakkelijk alle inschrijvingen op jouw club of sport inzien</li>
                    <li>Gemakkelijk aanmelden voor een sport die jou interresant lijkt.</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container px-4">
        <div class="row gx-4 justify-content-center">
            <div class="col-lg-8">
                <h2>Entiteiten</h2>
                <div class="row">
                    <div class="col-lg-6">
                        <p class="lead">De volgende entiteiten worden gebruikt binnen deze applicatie om het mogelijk te maken</p>
                        <p> Binnen de applicatie wordt er gebruik gemaakt van 4 verschillende entiteiten. Dat zijn de users, Sports, clubs en registrations. Deze 4 worden gebruikt om het mogelijk te maken om voor een gebruiker een nieuwe club sport aan te maken. Ook kan de gebruiker inloggen om zich zo in te schrijven voor een bepaalde sport bij een bepaalde club.</p>
                        <p> Er worden specefieke attributen opgeslagen door de entiteiten om de website zo functioneel mogelijk te maken. Zo is er dus ook een Wikilink die je mee kan sturen met een sport om een specefiekere uitleg te krijgen over de sport zelf. Deze link kan vervolgens gebruikt worden om meer te leren over de sport. Ook is het mogelijk om als club jezelf aan te melden en je club url mee te sturen voor eventueel reclame of inzicht te geven in wat de club buiten sport nogmeer voor je kan betekenen.</p>
                    </div>
                    <div class="col-lg-6">
                        <img class="img-thumbnail" src="/images/ClassDiagramV1-1.png"> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container px-4">
        <div class="row gx-4 justify-content-center">
            <div class="col-lg-8">
                <h2>Huidige staat van de website</h2>
                <p class="lead">Momenteel is het mogelijk om je eigen sport toe te voegen op de website. Deze kan je terug vinden in de lijst met alles sporten. Alle nieuwe sporten worden vanuit gegaan dat deze gelijk toegankelijk zijn tot alle gebruikers en wordt de sport opgeslagen dat deze open is tot registreren. Alle sporten worden uitgebreid laten zien in deze lijst. Het is de bedoeling als de entieit Club ingebouwd is om in de detail pagina ook de club te laten zien. </p>
                <p> Ook wordt er gebruik gemaakt van Bootstrap om de website er netjes uit te laten zien. Bootstrap wordt ook gebruikt om de website repsonsive te maken voor mobile devices.</p>
                <p> De github repo is terug te vinden op deze <a href="https://github.com/Errox/CSWF">Link.</a> Hierbij wordt er ook gebruik gemaakt van CI/CD om de applicatie te testen en automatisch te deployen naar heroku op de <a href="https://cswf.herokuapp.com/"> link</a> </p>
                <p> De website maakt ook gebruik van VueJS. Deze communiceert met een NodeJs Express API. De API maakt vervoglens verbinding met een MongoDB </p>
            </div>
        </div>
    </div>
  </v-container>
            
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
