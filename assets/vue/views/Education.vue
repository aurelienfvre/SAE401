<template>
  <CardContainer height="530vh">
    <div class="page-container sticky">
      <div class="filter-buttons">
        <a href="#ocean" @click="handleAnchorClick('ocean')" class="button" :data-content="$t('ocean.title')"><span>{{ $t('ocean.title') }}</span></a>
        <a href="#jungle" @click="handleAnchorClick('jungle')" class="button" :data-content="$t('jungle.title')"><span>{{ $t('jungle.title') }}</span></a>
        <a href="#desert" @click="handleAnchorClick('desert')" class="button" :data-content="$t('desert.title')"><span>{{ $t('desert.title') }}</span></a>
        <a href="#arctic" @click="handleAnchorClick('arctic')" class="button" :data-content="$t('arctic.title')"><span>{{ $t('arctic.title') }}</span></a>
      </div>
    </div>
    <CardPage
        id="ocean"
        :image="imageOcean"
        :title="$t('ocean.title')"
        height="44rem"
        innerHeight="36rem"
    >
      <div v-html="$t('ocean.content.title')" class="title-edu"></div>
      <p class="edu-text">
        {{ $t('ocean.content.paragraph1') }}
      </p>
      <p class="edu-text">
        {{ $t('ocean.content.paragraph2') }}
      </p>
      <p class="edu-text">
        {{ $t('ocean.content.paragraph3') }}
      </p>
    </CardPage>
    <CardPage
        id="jungle"
        :image="imageJungle"
        :title="$t('jungle.title')"
        height="51rem"
        innerHeight="43rem"
    >
      <div v-html="$t('jungle.content.title')" class="title-edu"></div>
      <p class="edu-text">
        {{ $t('jungle.content.paragraph1') }}
      </p>
      <p class="edu-text">
        {{ $t('jungle.content.paragraph2') }}
      </p>
      <p class="edu-text">
        {{ $t('jungle.content.paragraph3') }}
      </p>
    </CardPage>
    <CardPage
        id="desert"
        :image="imageDesert"
        :title="$t('desert.title')"
        height="50rem"
        innerHeight="42rem"
    >
      <div v-html="$t('desert.content.title')" class="title-edu"></div>
      <p class="edu-text">
        {{ $t('desert.content.paragraph1') }}
      </p>
      <p class="edu-text">
        {{ $t('desert.content.paragraph2') }}
      </p>
      <p class="edu-text">
        {{ $t('desert.content.paragraph3') }}
      </p>
    </CardPage>
    <CardPage
        id="arctic"
        :image="imageArctic"
        :title="$t('arctic.title')"
        height="53rem"
        innerHeight="45rem"
    >
      <div v-html="$t('arctic.content.title')" class="title-edu"></div>
      <p class="edu-text">
        {{ $t('arctic.content.paragraph1') }}
      </p>
      <p class="edu-text">
        {{ $t('arctic.content.paragraph2') }}
      </p>
      <p class="edu-text">
        {{ $t('arctic.content.paragraph3') }}
      </p>
    </CardPage>

    <!-- Les autres CardPages avec les mêmes modifications -->

  </CardContainer>
  <Footer />
</template>


<script setup>
import { useI18n } from 'vue-i18n';
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";

import imageOcean from "@/assets/ocean.jpg";
import imageJungle from "@/assets/jungle.jpg";
import imageDesert from "@/assets/desert.jpg";
import imageArctic from "@/assets/arctic.jpg";

const { t } = useI18n();

// Fonction pour gérer le défilement doux
const handleAnchorClick = (event) => {
  event.preventDefault(); // Empêcher le défilement instantané
  const href = event.target.getAttribute('href'); // Obtenir la valeur de l'attribut href du lien
  const offsetTop = document.querySelector(href).offsetTop; // Calculer la position de l'élément cible

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth' // Assurer un défilement doux
  });
};
</script>

<style lang="scss" scoped>


.title-edu {
  text-align: left;
  font-size: 30px;
  margin-bottom: 3rem;
}

.edu-text {
  text-align: justify;
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 1.5;
  font-weight: 300;
}

.page-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;

  &.sticky {
    position: sticky;
    top: 0; // Ajustez cette valeur selon les besoins
    z-index: 1000; // Assurez-vous qu'il reste au-dessus d'autres éléments
    background-color: white; // Ou une autre couleur qui correspond à votre design
    padding: 10px 300px; // Ajoute un peu d'espace autour des boutons
  }
}

.filter-buttons {
  display: flex;
  gap: 10px; // Espacement entre les boutons

  .button {
    --color: #333; // Couleur de base du bouton
    padding: 10px 50px;
    border-radius: 20px;
    border: 1px solid var(--color);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.5s, background-color 0.5s; // Ajouté pour l'animation de fond
    font-weight: 500;
    color: var(--color);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 0 5px; // Espacement entre les boutons, ajustez selon vos besoins

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      background: var(--color);
      height: 145px;
      width: 225px;
      border-radius: 50%;
      top: 100%;
      left: -100%;
      transition: all 0.7s;
    }

    &::after {
      content: attr(data-content);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.25s, transform 0.25s;
      transform: translateY(100%);
      color: #fff; // Couleur du texte au survol
    }

    &:hover {
      color: #fff; // Changement pour assurer la visibilité du texte

      &::before {
        top: -30px;
        left: -10px;
      }

      &::after {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &:active::before {
      background: #333; // Couleur de background lors du clic
      transition: background 0s;
    }

    span {
      transition: transform 0.25s, opacity 0.25s;
      opacity: 1;
      display: block; // Assure que le span est traité comme un bloc pour la transformation
    }

    &:hover span {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
}

</style>