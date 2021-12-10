<template>
  <v-container>
    <div class="container px-4">
      <div class="row gx-4 justify-content-center">
        <div class="col-lg-8">
          <h2>About Sport Community</h2>
          <p class="lead">
            Sport Community is een platform om gemakkelijk clubs en sporten op
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
              FanProducts. Deze 3 worden gebruikt om het
              mogelijk te maken om voor een gebruiker een nieuwe club sport
              aan te maken en deze op te vullen met hun eigen materiaal (zoals
              merchendise maar ook kleding). Zo kan je als club echt aantonen wat je doet qua sporten maar ook wat je
              eventueel wilt verkopen als club.
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
              verkopen! Het is de bedoeling om je als club hierop gemakkelijk aan te bieden naar de rest. Als het ware
              reclame te maken voor je club en hiervoor aandacht voor te krijgen.
            </p>
            <!-- </div> -->
            <!-- <div class="col-lg-6"> -->
            <img class="img-thumbnail" src="/images/ClassDiagramV1-4.png" />
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
            De website bestaat uit 3 CRUD functionaliteiten op 3 verschillende entiteiten. Het is hierbij mogelijk om
            een club toe te voegen, en hierbij gelijk ook deze aan te passen als je inzicht er in wilt hebben.
            Ook is het mogelijk om in te loggen als een gebruiker. Als je ingelogd ben is het mogelijk om je eigen items
            aan te passen en nieuwe toe te voegen. Het is niet mogelijk om die van iemand anders aan te passen.
            Bij het kopje clubs is het mogelijk om zo direct alle clubs te bekijken die er zijn gemaakt. Hierbij kan je
            gelijk inzicht hebben welke sporten en fan producten er bij horen.
            Als je alle items los wilt bekijken kan je in je profiel de sporten gebruikers en fan producten individueel
            bekijken.
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
            NodeJs Express API. De API maakt vervolgens verbinding met een cloud
            MongoDB instantie.
          </p>
        </div>
      </div>
    </div>
    <div class="container px-4">
      <div class="row gx-4 justify-content-center">
        <div class="col-lg-8">
          <h2>User Stories</h2>
          <ul>
            <li> US1: Als gebruiker wil ik kunnen registreen om de website te gebruiken. </li>
            <li> US2: Als gebruiker wil ik een club kunnen toevoegen om zo mijn club te laten zien aan de wereld. </li>
            <li> US3: Als gebruiker wil ik een sport kunnen toevoegen om zo te laten zien wat mijn club te bieden heeft qua sporten. </li>
            <li> US4: Als gebruiker wil ik een Fan Product kunnen toevoegen om zo reclame te maken wat mijn club voor merchendise heeft. </li>
            <li> US5: Als gebruiker wil ik mijn club kunnen aanpassen om zo een eventuele spelfout te kunnnen corrigieren. </li>
            <li> US6: Als gebruiker wil ik mijn sport kunnen aanpassen om zo een eventuele spelfout te kunnnen corrigieren. </li>
            <li> US7: Als gebruiker wil ik mijn Fan Product kunnen aanpassen om zo een eventuele spelfout te kunnnen corrigieren. </li>
            <li> US8: Als gebruiker wil ik mijn gegevens kunnen verwijderen om iets wat uit niet meer relevant is van de site te kunnen halen. </li>
          </ul>
        </div>
      </div>
    </div>
  </v-container>
</template>