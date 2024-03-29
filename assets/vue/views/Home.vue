<template>
  <CardContainer height="160vh">
    <div class="home-content">
      <p class="title__home">
        Explore la beauté de la nature et apprend l'importance de l'écologie de
        manière ludique et interactive.
      </p>
    </div>
    <div class="interactive-components-wrapper">
      <HomeFirstGrid class="home-first-grid" />
      <InteractiveButton class="interactive-button" />
      <HomeSecondGrid class="home-second-grid" />
    </div>
    <div class="educational-sections-wrapper">
      <p>
        EcoLearn est un site web éducatif interactif qui te plonge dans les
        différents écosystèmes de notre planète, tels que
        <span class="color-ocean">les océans</span>,
        <span class="color-jungle">la jungle</span>,
        <span class="color-forest">la forêt</span>,
        <span class="color-desert">le désert</span> et
        <span class="color-arctic">l'arctique</span>.
      </p>
      <p>
        Viens apprendre en t’amusant! Découvrez les merveilles de notre terre.
      </p>
    </div>
    <div class="play-button-wrapper">
      <PlayButton />
    </div>
  </CardContainer>

  <div class="cards-container">
    <HomeCard
        cardColor="card-color-ocean"
        :imageSrc="imageOcean"
        title="Océans"
        subtitle="Tout sur le monde marin, les
poissons, les coraux, les espèces
protégées.. sous forme de quizz"
        titleColor="#D1E2FD"
        subtitleColor="#fff"
        route="/ocean"
        buttonColor="#D1E2FD"
        buttonText="C'est parti !"
        textColor="black"
    />
    <HomeCard
        cardColor="card-color-jungle"
        :imageSrc="imageJungle"
        title="Jungle/Forêt"
        subtitle="Tout sur le monde de la faune
et flore, les forêts.. sous forme
de quizz "
        titleColor="#C1DD13"
        subtitleColor="#fff"
        route="/jungle"
        buttonColor="#ABF3DE"
        buttonText="C'est parti !"
        textColor="black"
    />
    <HomeCard
        cardColor="card-color-desert"
        :imageSrc="imageDesert"
        title="Désert"
        subtitle="Tout sur le monde du désert avec
les animaux spécifiques, l’écologie de cet écosystème.. sous forme de quizz"
        titleColor="#D88BCA"
        subtitleColor="#000"
        route="/desert"
        buttonColor="#FFE5D8"
        buttonText="C'est parti !"
        textColor="black"
    />
    <HomeCard
        cardColor="card-color-arctic"
        :imageSrc="imageArctic"
        title="Arctique"
        subtitle="Tout sur les enjeux arctique,
le climat, les animaux en voie de disparition.. sous forme de quizz
"
        titleColor="#3A7CA3"
        subtitleColor="#000"
        route="/arctic"
        buttonColor="#EDF4FF"
        buttonText="C'est parti !"
        textColor="black"
    />
  </div>
  <Footer />
</template>

<script setup>
import CardContainer from "@/components/CardContainer.vue";
import InteractiveButton from "@/components/InteractiveButton.vue";
import HomeFirstGrid from "@/components/HomeFirstGrid.vue";
import HomeSecondGrid from "@/components/HomeSecondGrid.vue";
import PlayButton from "@/components/PlayButton.vue";
import HomeCard from "@/components/HomeCard.vue";
import Footer from "@/components/Footer.vue";

import imageOcean from "@/assets/image-ocean.webp";
import imageJungle from "@/assets/image-jungle.webp";
import imageDesert from "@/assets/image-desert.webp";
import imageArctic from "@/assets/image-artic.webp";

</script>

<style scoped>
.home-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.interactive-components-wrapper {
  display: flex;
  align-items: start;
  justify-content: flex-start;
}

.home-first-grid,
.interactive-button,
.home-second-grid {
  min-width: 200px;
  margin-right: 20px;
}

.home-second-grid {
  margin-right: 140px;
  position: relative;
  bottom: 5%;
}

.title__home {
  font-size: 2rem;
  text-align: center;
  margin: 4rem 0 6rem;
  font-weight: 300;
  width: 65%;
  line-height: 1.5;
  font-family: "Inter", sans-serif;
}

.educational-sections-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin: 0;
}

.educational-sections-wrapper p {
  width: 32%;
  font-size: 1.5rem;
  margin: 0 8.3rem;
}

.color-ocean {
  color: #3a7ca3;
}
.color-jungle {
  color: #25a37e;
}
.color-forest {
  color: #bdd526;
}
.color-desert {
  color: #fdae84;
}
.color-arctic {
  color: #abcdff;
}

.play-button-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.cards-container {
  display: flex;
  flex-wrap: wrap; /* Permet aux cartes de passer à la ligne suivante si l'espace horizontal est insuffisant */
  gap: 2rem; /* Espacement entre les cartes */
  margin: 3rem auto; /* Marge supérieure et centrage horizontal */
  justify-content: center; /* Centre les cartes horizontalement */
  max-width: 1200px; /* Ajustez selon la largeur maximale souhaitée pour le conteneur */
}

.card-color-ocean {
  background-color: #3574d5; /* Couleur bleue ajustée */
}

.card-color-jungle {
  background-color: #25a37e; /* Couleur verte, si besoin d'ajustement */
}

.card-color-desert {
  background-color: #fdae84; /* Couleur orange ajustée */
}

.card-color-arctic {
  background-color: #d1e2fd; /* Couleur bleue ajustée */
}
</style>