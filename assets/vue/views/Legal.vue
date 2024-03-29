<template>
  <CardContainer height="230vh">
    <CardPage
      :image="legalImage"
      height="86rem"
      innerHeight="78rem"
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

      <h2 class="section-title">Protection des données personnelles</h2>
      <p>
        Nous prenons la confidentialité très au sérieux et nous engageons à
        protéger les données personnelles de nos utilisateurs.
      </p>

      <h2 class="section-title">Sécurité</h2>
      <p>
        La sécurité de notre plateforme est une priorité absolue, garantissant
        une expérience sûre pour tous nos utilisateurs.
      </p>

      <h2 class="section-title">Droit applicable</h2>
      <p>
        L'utilisation de notre site et de nos services est régie par le droit
        français, indépendamment du lieu d'utilisation.
      </p>

      <h2 class="section-title">Limitation de responsabilité</h2>
      <p>
        En utilisant EcoLearn, les utilisateurs reconnaissent que notre équipe
        ne peut être tenue responsable de tout usage inapproprié du contenu ou
        des services proposés.
      </p>

      <h2 class="section-title">Mise à jour</h2>
      <p>
        Nous nous réservons le droit de mettre à jour ces mentions légales à
        tout moment, selon l'évolution de notre plateforme et des
        réglementations.
      </p>

      <h2 class="section-title">Données statistiques de suivi</h2>
      <p>
        Nous utilisons des données statistiques pour suivre et améliorer
        continuellement l'expérience utilisateur sur notre plateforme.
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
