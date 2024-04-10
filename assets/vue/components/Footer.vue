<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="logo-social-container">
        <router-link to="/" class="logo">
          <img src="@/assets/ecolearn.svg" alt="Logo EcoLearn" draggable="false" />
        </router-link>
        <div class="social-links">
          <a href="https://www.facebook.com" target="_blank"><img src="@/assets/facebook.svg" alt="Facebook" draggable="false"/></a>
          <a href="https://www.twitter.com" target="_blank"><img src="@/assets/twitter.svg" alt="Twitter" draggable="false"/></a>
          <a href="https://www.instagram.com" target="_blank"><img src="@/assets/instagram.svg" alt="Instagram" draggable="false"/></a>
        </div>
      </div>
      <div class="footer-bottom">
        <router-link to="/education" :data-content="$t('footer.education')">
          <span>{{ $t('footer.education') }}</span>
        </router-link>
        <router-link to="/about" :data-content="$t('footer.about')">
          <span>{{ $t('footer.about') }}</span>
        </router-link>
        <router-link to="/contact" :data-content="$t('footer.contact')">
          <span>{{ $t('footer.contact') }}</span>
        </router-link>
        <router-link to="/legal" :data-content="$t('footer.legal')">
          <span>{{ $t('footer.legal') }}</span>
        </router-link>
      </div>
      <div class="contact">
        <div class="contact-info">
          <p>{{ $t('footer.question') }}</p>
          <a class="mail" href="mailto:ecolearn@mailo.com" target="_blank">{{ $t('footer.writeUs') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.footer-container {
  background-color: #ffffff;
  width: 90vw;
  max-width: 1546px;
  height: 20vw; /* Hauteur spécifiée */
  margin: 2rem auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.logo-social-container {
  display: flex;
  flex-direction: column;
  align-items: start; /* Pour centrer le logo par rapport aux liens sociaux */
  padding: 4.375rem;
}

.logo {
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: start; /* Centrer les liens sociaux horizontalement */
  width: 100%;
  padding-left: 3rem;
}

.social-links a {
  margin-right: 10px;
}

.social-links img {
  width: 24px;
}

.footer-bottom {
  margin-top: auto; /* Force le contenu à se déplacer vers le bas */
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.footer-bottom a {
  position: relative;
  overflow: hidden;
  margin: 0 1rem;
  font-size: 1rem;
  color: #333; /* Assurez-vous que cette couleur est visible sur votre fond */
  text-decoration: none;
  transition: color 0.3s;
  margin-top: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer-bottom a::after {
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
  color: #000;
}

.footer-bottom a:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.footer-bottom a > span {
  display: inline-block;
  transition: transform 0.25s, opacity 0.25s;
}

.footer-bottom a:hover > span {
  transform: translateY(-100%);
  opacity: 0;
}
.footer-content {
  display: flex;
  justify-content: space-between; /* Ajustement pour aligner les éléments à droite et à gauche */
  align-items: center; /* Alignement vertical des éléments */
  width: 100%; /* Assurez-vous que footer-content utilise toute la largeur */
}

.contact {
  padding-right: 4rem;
}

.contact-info {
  padding: 10px 75px;
  border-radius: 30px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column; /* Les éléments du conteneur sont empilés verticalement */
  align-items: center; /* Centrer le contenu dans le conteneur */
  justify-content: center; /* Centrer verticalement pour les petits conteneurs */
  width: 21rem;
}

.contact-info p {
  margin: 5px 0; /* Petite marge entre les lignes de texte */
  text-align: center; /* Assurez-vous que le texte est centré dans le conteneur */
}
.mail {
  text-decoration: none;
  color: #002773;
  transition: transform 0.3s;
  font-weight: 600;
}
.mail:hover {
  text-decoration: underline;
  transform: scale(1.1);
  transition: transform 0.3s;

}
</style>