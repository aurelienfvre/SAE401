<template>
  <CardContainer height="200vh">
    <CardPage
        :image="legalImage"
        height="74rem"
        innerHeight="66rem"
        width="80%"
        innerBgColor="#fff"
    >
      <h1 class="title">Mentions légales</h1>

      <h2 class="section-title">Informations générales</h2>
      <p>
        EcoLearn est une initiative éducative basée à Troyes, en France, au sein
        de l'IUT de Troyes. Conçu et développé par une équipe de trois
        passionnés, notre objectif est de faciliter l'accès à l'éducation
        environnementale pour tous.
      </p>

      <h2 class="section-title">Crédits</h2>
      <p>
        Toutes les ressources utilisées par EcoLearn sont soit créées par notre
        équipe, soit correctement créditées selon les termes de leur licence.
      </p>

      <h2 class="section-title">Droits de propriété intellectuelle</h2>
      <p>
        Le contenu fourni par EcoLearn est protégé par les lois sur la propriété
        intellectuelle et reste la propriété exclusive de ses créateurs.
      </p>
    </CardPage>
  </CardContainer>
  <Footer />
</template>

<script setup>
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import legalImage from "@/assets/legal_image.webp";
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
</style>