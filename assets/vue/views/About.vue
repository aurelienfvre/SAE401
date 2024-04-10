<template>
  <CardContainer height="238vh">
    <CardPage
        :image="aboutImage"
        height="90rem"
        innerHeight="82rem"
        width="80%"
        innerBgColor="#fff"
    >
      <h1 class="title">{{ $t('about.discover') }}</h1>

      <h2 class="section-title">{{ $t('about.visionTitle') }}</h2>
      <p>{{ $t('about.visionContent') }}</p>

      <h2 class="section-title">{{ $t('about.pillarsTitle') }}</h2>
      <p>{{ $t('about.pillarsContent') }}</p>

      <h2 class="section-title">{{ $t('about.missionTitle') }}</h2>
      <p>{{ $t('about.missionContent') }}</p>

      <div class="values-container">
        <div class="value-section">
          <h2 class="value-title">{{ $t('about.values.educationTitle') }}</h2>
          <p>{{ $t('about.values.educationContent') }}</p>
        </div>
        <div class="vertical-hr"></div>
        <div class="value-section">
          <h2 class="value-title">{{ $t('about.values.ecoDesignTitle') }}</h2>
          <p>{{ $t('about.values.ecoDesignContent') }}</p>
        </div>
        <div class="vertical-hr"></div>
        <div class="value-section">
          <h2 class="value-title">{{ $t('about.values.funTitle') }}</h2>
          <p>{{ $t('about.values.funContent') }}</p>
        </div>
      </div>

      <div class="image">
        <img
            src="@/assets/about-image2.jpg"
            alt="{{ $t('about.teamAlt') }}"
            draggable="false"
        />
      </div>
    </CardPage>
  </CardContainer>
  <Footer />
</template>


<script setup>
import { useI18n } from 'vue-i18n';
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import aboutImage from "@/assets/about-image.jpg";

const { t } = useI18n();
</script>

<style scoped>
.title {
  text-align: center;
  padding: 0 0 40px 0;
  font-weight: 500;
}

.section-title {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}
.values-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #d1e2fd;
  color: #002773;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 10px;
}

.value-section {
  width: 30%; /* Ajustez en fonction de la largeur de votre contenu */
  text-align: center;
}

.value-title {
  font-weight: bold;
  padding: 0.7rem;
}

.vertical-hr {
  width: 1px;
  background-color: #000;
  margin: 0 20px; /* Ajustez l'espacement selon vos besoins */
  flex-grow: 1; /* Permet à la ligne de s'étendre verticalement pour occuper tout l'espace disponible */
  height: 14rem;
}
.image {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
}
.image img {
  border-radius: 10px;
  width: 70%;
}
</style>