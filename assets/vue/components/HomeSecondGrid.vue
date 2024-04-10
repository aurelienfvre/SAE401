<template>
  <div class="home-second-grid">
    <div class="content-container">
      <div class="text-and-title">
        <p>{{ $t('homeSecondGrid.title') }}</p>
        <router-link to="/education" class="details-text">
          {{ $t('homeSecondGrid.detailsText') }}
          <span v-html="arrowSvg" class="arrow-icon"></span>
        </router-link>
      </div>
      <div class="main-image-container">
        <img
            src="@/assets/image_grid3.webp"
            alt="{{ $t('homeSecondGrid.mainImageAlt') }}"
            draggable="false"
            class="main-image"
        />
      </div>
      <div class="sub-containers">
        <div class="color-container orange">
          <img
              class="centered-image"
              src="@/assets/hand.svg"
              alt="{{ $t('homeSecondGrid.handImageAlt') }}"
              draggable="false"
          />
        </div>
        <div class="color-container green">
          <img
              src="@/assets/image_grid4.webp"
              alt="{{ $t('homeSecondGrid.secondaryImageAlt') }}"
              draggable="false"
              class="centered-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const arrowSvg = ref(`
<svg width="65" height="8" viewBox="0 0 65 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M64.3536 4.35355C64.5488 4.15829 64.5488 3.84171 64.3536 3.64645L61.1716 0.464466C60.9763 0.269204 60.6597 0.269204 60.4645 0.464466C60.2692 0.659728 60.2692 0.976311 60.4645 1.17157L63.2929 4 L60.4645 6.82843C60.2692 7.02369 60.2692 7.34027 60.4645 7.53553C60.6597 7.7308 60.9763 7.7308 61.1716 7.53553L64.3536 4.35355ZM0 4.5L64 4.5V3.5L0 3.5L0 4.5Z" fill="#B1B1B1"/>
</svg>
`);
</script>


<style scoped>
.home-second-grid {
  display: grid;
  gap: 20px;
  align-self: start;
  z-index: 10;
  grid-auto-columns: repeat(2, 1fr);
}
.text-and-title {
  width: 100%; /* La largeur correspond à celle de l'image principale en dessous */
  margin-bottom: 0; /* Pour éviter tout espacement supplémentaire entre les éléments */
}

.text-and-title h2 {
  margin: 0; /* Aucun espacement entre le titre et le router-link */
  padding: 0; /* Ajustez selon vos besoins */
  font-size: 20px;
}

.details-text {
  /* Styles pour le router-link 'Voir plus de détails' */
  text-decoration: none; /* Supprime le soulignement par défaut */
  display: inline-block; /* Pour permettre l'alignement et le positionnement */
  color: #b1b1b1;
}

.main-image-container {
  width: 77%; /* Largeur correspondant au design spécifié */
  border-radius: 8px; /* Arrondissement des coins */
}

.main-image {
  width: 100%; /* Utiliser la largeur totale du conteneur */
  border-radius: 8px; /* Arrondissement des coins */
}

.sub-containers {
  display: flex;
  width: 77%; /* Largeur correspondant au design spécifié */
  margin-top: -5px;
}

.color-container {
  border-radius: 8px;
}

.orange {
  flex: 0 0 70%; /* Utilise 'flex-basis' pour la largeur sans 'flex-grow' ou 'flex-shrink' */
  background-color: #fdae84;
  height: 5rem; /* Hauteur fixe pour le conteneur orange */
  position: relative;
}

.green {
  flex: 0 0 30%; /* Utilise 'flex-basis' pour la largeur sans 'flex-grow' ou 'flex-shrink' */
  background-color: #c1dd13;
  height: 5rem; /* Hauteur fixe pour le conteneur vert */
  position: relative; /* Pour positionner l'image secondaire */
}

.centered-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%; /* Ajustez selon les dimensions de l'image */
  max-height: 80%; /* Ajustez selon les dimensions de l'image */
}
.main-image-container,
.sub-containers {
  width: 15vw; /* Ajustez selon vos besoins, en utilisant vw pour un ratio basé sur la largeur de la vue */
}

/* Ajuster la hauteur des conteneurs de couleur pour maintenir le ratio */

/* Si vous souhaitez ajuster la taille des images pour maintenir un ratio constant */
.centered-image {
  max-width: 80%; /* Continuez d'utiliser un pourcentage de la largeur du conteneur */
  max-height: auto; /* Cela ajustera automatiquement la hauteur pour maintenir le ratio */
}
</style>