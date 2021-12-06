<template>
  <v-container>
    <div class="container px-4">
      <div class="row gx-4 justify-content-center">
        <div class="col-lg-8">
          <h2>About Sport Community</h2>
          <p class="lead">
            Sport Community is een platform om gemakkelijk clubs en sporten op
            te zoeken en je hiervoor aan te melden! Op dit platform kan je
            verschillende dingen doen.
          </p>
          <ul>
            <li>
              Je kan je nieuwe sport toevoegen zodat andere hierop kunnen
              inschrijven.
            </li>
            <li>
              Je kan je eigen club op de website zetten om zo je sporten te
              delen met anderen.
            </li>
            <li>
              Gemakkelijk alle inschrijvingen op jouw club of sport inzien
            </li>
            <li>
              Gemakkelijk aanmelden voor een sport die jou interresant lijkt.
            </li>
            <li>Je kan als club kan je ook je eigen merchendise aanbieden!</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container px-4">
      <div class="row gx-4 justify-content-center">
        <div class="col-lg-8">
          <h2>Entiteiten</h2>
          <div class="row">
            <!-- <div class="col-lg-6"> -->
              <p class="lead">
                De volgende entiteiten worden gebruikt binnen deze applicatie om
                het mogelijk te maken
              </p>
              <p>
                Binnen de applicatie wordt er gebruik gemaakt van 4
                verschillende entiteiten. Dat zijn de users, Sports, clubs,
                FanProducts en registrations. Deze 4 worden gebruikt om het
                mogelijk te maken om voor een gebruiker een nieuwe club sport
                aan te maken en deze op te vullen met hun eigen materiaal (zoals
                merchendise maar ook kleding). Ook kan de gebruiker inloggen om
                zich zo in te schrijven voor een bepaalde sport bij een bepaalde
                club.
              </p>
              <p>
                Er worden specefieke attributen opgeslagen door de entiteiten om
                de website zo functioneel mogelijk te maken. Zo is er dus ook
                een Wikilink die je mee kan sturen met een sport om een
                specefiekere uitleg te krijgen over de sport zelf. Deze link kan
                vervolgens gebruikt worden om meer te leren over de sport. Ook
                is het mogelijk om als club jezelf aan te melden en je club url
                mee te sturen voor eventueel reclame of inzicht te geven in wat
                de club buiten sport nogmeer voor je kan betekenen. Binnen je
                club kan je ook een bepaald product toevoegen (FanProduct) om
                bepaalde producten die te maken hebben met je club/sport te
                verkopen!
              </p>
            <!-- </div> -->
            <!-- <div class="col-lg-6"> -->
              <img class="img-thumbnail" src="/images/ClassDiagramV1-3.png" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="container px-4">
      <div class="row gx-4 justify-content-center">
        <div class="col-lg-8">
          <h2>Huidige staat van de website</h2>
          <p class="lead">
            Momenteel is het mogelijk om als CRUD functie je eigen club sport en
            registratie toe te voegen. Al deze entiteiten zijn nog niet gelinkt
            met elkaar maar moeten wel alvast voorstellen hoe de bepaalde acties
            zich zullen voortzetten binnen de applicatie. Bij al deze entiteiten
            kan je dus iets toevoegen, uitlezen in een detail pagina, updaten
            naar gewenste verranderingen en verwijderen.
          </p>
          <p>
            Ook wordt er gebruik gemaakt van Bootstrap om de website er netjes
            uit te laten zien.
          </p>
          <p>
            De github repo is terug te vinden op deze
            <a href="https://github.com/Errox/CSWF">Link.</a> Hierbij wordt er
            ook gebruik gemaakt van CI/CD om de applicatie te testen en
            automatisch te deployen naar heroku op de
            <a href="https://cswf.herokuapp.com/"> link</a>
          </p>
          <p>
            Deze website maakt ook gebruik van VueJS. Deze communiceert met een
            NodeJs Express API. De API maakt vervoglens verbinding met een cloud
            MongoDB instantie
          </p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
	name: "HelloWorld",

	data: () => ({
		ecosystem: [
			{
				text: "vuetify-loader",
				href: "https://github.com/vuetifyjs/vuetify-loader",
			},
			{
				text: "github",
				href: "https://github.com/vuetifyjs/vuetify",
			},
			{
				text: "awesome-vuetify",
				href: "https://github.com/vuetifyjs/awesome-vuetify",
			},
		],
		importantLinks: [
			{
				text: "Documentation",
				href: "https://vuetifyjs.com",
			},
			{
				text: "Chat",
				href: "https://community.vuetifyjs.com",
			},
			{
				text: "Made with Vuetify",
				href: "https://madewithvuejs.com/vuetify",
			},
			{
				text: "Twitter",
				href: "https://twitter.com/vuetifyjs",
			},
			{
				text: "Articles",
				href: "https://medium.com/vuetify",
			},
		],
		whatsNext: [
			{
				text: "Explore components",
				href: "https://vuetifyjs.com/components/api-explorer",
			},
			{
				text: "Select a layout",
				href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
			},
			{
				text: "Frequently Asked Questions",
				href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
			},
		],
	}),
};
</script>
