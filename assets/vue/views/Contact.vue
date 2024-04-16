<template>
  <CardContainer :height="containerHeight">
    <CardPage
        :image="contactImage"
        width="80%"
        height="47rem"
        innerWidth="30rem"
        innerHeight="auto"
        innerBgColor="#fff"
        innerPosition="right"
        innerPadding="50px"
        textAlignment="left"
    >
      <div class="contact-header">
        <img src="@/assets/ecolearn.svg" alt="Logo EcoLearn" class="ecolearn-logo" draggable="false" />
        <h2>{{ $t('contact.title') }}</h2>
        <p>{{ $t('contact.subtitle') }}</p>
      </div>
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group double">
          <div class="input-wrapper">
            <label for="firstName">{{ $t('contact.firstName') }} <span class="required">*</span></label>
            <input type="text" id="firstName" :placeholder="$t('contact.placeholder.firstName')" required />
          </div>
          <div class="input-wrapper">
            <label for="lastName">{{ $t('contact.lastName') }} <span class="required">*</span></label>
            <input type="text" id="lastName" :placeholder="$t('contact.placeholder.lastName')" required />
          </div>
        </div>
        <div class="form-group">
          <label for="email">{{ $t('contact.emailAddress') }} <span class="required">*</span></label>
          <input type="email" id="email" :placeholder="$t('contact.placeholder.email')" required />
        </div>
        <div class="form-group">
          <label for="message">{{ $t('contact.yourMessage') }} <span class="required">*</span></label>
          <textarea id="message" :placeholder="$t('contact.placeholder.message')" required></textarea>
        </div>
        <div class="form-group">
          <div class="form-button">
            <button type="submit" :data-content="$t('contact.sendButton')">
              <span>{{ $t('contact.sendButton') }}</span>
            </button>
          </div>
        </div>
      </form>
    </CardPage>
  </CardContainer>
  <Footer />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import contactImage from "@/assets/image-contact.jpg"; // Ajustez le chemin selon votre projet

const { t } = useI18n();
</script>


<style lang="scss" scoped>
.ecolearn-logo {
  margin-left: -60px; // Ajustez selon la maquette
  margin-bottom: -40px;
  padding: 40px;
  position: relative;
  bottom: 35px;
}

.contact-header {
  h2, p {
    text-align: center;
  }

  p {
    margin: 0 0 20px 0;
    color: #002773;
  }
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-button {
  display: flex;
  justify-content: center;
}

.form-group {
  &.double {
    display: flex;
    gap: 10px;
  }
}

.input-wrapper {
  flex: 1;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 10px;
  box-shadow: none;
  background-color: transparent;
  color: #333;

  &::placeholder {
    color: #949494;
  }
}

button[type="submit"] {
  --color: #333; // Couleur de base du bouton
  padding: 8px 40px;
  border-radius: 30px;
  border: 1px solid var(--color);
  background-color: #fff;
  cursor: pointer;
  position: relative; // Nécessaire pour les pseudo-éléments de survol
  overflow: hidden; // Empêche le débordement du pseudo-élément
  color: var(--color); // Couleur du texte du bouton
  transition: color 0.5s; // Transition pour la couleur du texte
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
    top: 100%;
    left: -100%; // Démarre de la gauche pour l'animation
    transition: all 0.7s;
  }

  &:hover {
    color: #fff;

    &::before {
      top: -30px;
      left: -30px; // Anime le background vers le centre
    }
  }

  &:active::before {
    background: #333; // Couleur de background lors du clic
    transition: background 0s;
  }

  span {
    display: inline-block;
    transition: transform 0.25s, opacity 0.25s;
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
    color: #fff; // Couleur du texte lors du survol
    background-color: transparent; // Transparent pour voir l'animation du background
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover > span {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.required {
  color: red;
}

</style>
