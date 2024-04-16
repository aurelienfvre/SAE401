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


<style lang="scss" scoped>
.home-second-grid {
  display: grid;
  gap: 20px;
  align-self: start;
  z-index: 10;
  grid-auto-columns: repeat(2, 1fr);
}

.text-and-title {
  width: 100%;
  margin-bottom: 0;

  h2 {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
}

.details-text {
  text-decoration: none;
  display: inline-block;
  color: #b1b1b1;
}

.main-image-container, .sub-containers {
  width: 15vw;

  border-radius: 8px;

  .main-image, .color-container {
    width: 100%;
    border-radius: 8px;
  }
}

.sub-containers {
  display: flex;
  margin-top: -5px;

  .color-container {
    &.orange, &.green {
      height: 5rem;
      position: relative;
    }

    &.orange {
      flex: 0 0 70%;
      background-color: #fdae84;
    }

    &.green {
      flex: 0 0 30%;
      background-color: #c1dd13;
    }

    .centered-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 80%;
      max-height: 80%;
    }
  }
}

</style>