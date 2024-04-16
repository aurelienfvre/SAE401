<template>
  <div class="home-first-grid">
    <div class="content-container">
      <div class="text-and-images-container">
        <div class="text-container">
          <p class="text-title">{{ $t('homeFirstGrid.title') }}</p>
        </div>
        <div class="additional-text-container">
          <p class="learn-text">{{ $t('homeFirstGrid.learnText') }}</p>
          <router-link to="/education" class="details-text">
            {{ $t('homeFirstGrid.detailsText') }}
            <span v-html="arrowSvg" class="arrow-icon"></span>
          </router-link>
        </div>
        <div class="images-container">
          <img
              src="@/assets/image_grid1.webp"
              alt="Image 1"
              draggable="false"
              class="bordered-image"
          />
          <img
              src="../../../public/img/image_grid2.webp"
              alt="Image 2"
              draggable="false"
              class="bordered-image"
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
`); // Votre SVG ici
</script>


<style lang="scss" scoped>
.home-first-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.content-container {
  display: flex;
  flex-direction: column; // Les enfants s'organisent verticalement
  margin-left: 8.4375rem;
}

.text-and-images-container {
  display: flex;
  flex-wrap: wrap; // Permet aux enfants de passer à la ligne suivante si nécessaire
  width: 77%; // La largeur peut être ajustée selon le design global
  align-items: flex-end; // Alignement vertical en haut pour tous les enfants

  .text-container {
    background-color: #abcdff;
    padding: 16px;
    border-radius: 8px;
    width: 33%; // La largeur reste à 33%

    .text-title {
      margin: 0;
      text-align: center;
    }
  }

  .additional-text-container {
    width: 35%; // Correspond à la largeur d'une image
    display: flex;
    flex-direction: column;
    justify-content: center; // Centre verticalement le contenu
    padding: 5px;

    .details-text {
      display: flex;
      align-items: center;
      color: #b1b1b1;
      margin-top: 5px;
      text-decoration: none;

      .arrow-icon {
        margin-left: 4px;
      }
    }
  }

  .images-container {
    display: flex;

    .bordered-image {
      width: calc(35% - 8px);
      border-radius: 8px;
      object-fit: cover;
    }
  }
}

</style>