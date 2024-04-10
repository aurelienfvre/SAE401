<template>
  <CardContainer height="69rem">
    <CardPage
        :image="loginImage"
        width="80%"
        height="55rem"
        innerWidth="30rem"
        innerHeight="auto"
        innerBgColor="#fff"
        innerPosition="right"
        innerPadding="50px"
        textAlignment="left"
    >
      <div class="contact-header">
        <img
            src="@/assets/ecolearn.svg"
            alt="Logo EcoLearn"
            class="ecolearn-logo"
            draggable="false"
        />
        <h2>{{ $t('register.title') }}</h2>
        <p>{{ $t('register.joinUs') }}</p>
      </div>
      <form class="login-form" @submit.prevent="submitForm">
        <div class="form-group double">
          <div class="input-wrapper">
            <label for="firstName">{{ $t('register.firstName') }} <span class="required">*</span></label>
            <input type="text" id="firstName" :placeholder="$t('register.firstName')" required v-model="firstName" />
          </div>
          <div class="input-wrapper">
            <label for="lastName">{{ $t('register.lastName') }} <span class="required">*</span></label>
            <input type="text" id="lastName" :placeholder="$t('register.lastName')" required v-model="lastName" />
          </div>
        </div>
        <div class="form-group">
          <label for="pseudo">{{ $t('register.username') }}<span class="required">*</span></label>
          <input
              type="text"
              id="pseudo"
              :placeholder="$t('register.username')"
              required
              v-model="pseudo"
          />
        </div>
        <div class="form-group">
          <label for="email">{{ $t('register.emailAddress') }} <span class="required">*</span></label>
          <input
              type="email"
              id="email"
              :placeholder="$t('register.emailAddress')"
              required
              v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">{{ $t('register.password') }} <span class="required">*</span></label>
          <input
              type="password"
              id="password"
              :placeholder="$t('register.password')"
              required
              v-model="password"
          />
        </div>
        <div class="form-group">
          <div class="form-button">
            <button type="submit"><span>GO !</span></button>
          </div>
        </div>
        <div class="register-link">
          {{ $t('register.haveAccount') }}
          <router-link to="/login" class="create-account">{{ $t('register.login') }}</router-link>
        </div>
      </form>
    </CardPage>
  </CardContainer>
  <Footer />
</template>

<script setup>
import {useI18n} from "vue-i18n";
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CardContainer from '@/components/CardContainer.vue';
import CardPage from '@/components/CardPage.vue';
import Footer from '@/components/Footer.vue';
import loginImage from '@/assets/image-login.jpg';

const { t } = useI18n();

const router = useRouter();
const firstName = ref('');
const lastName = ref('');
const pseudo = ref('');
const email = ref('');
const password = ref('');

const submitForm = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/users', {
      firstname: firstName.value,
      lastname: lastName.value,
      pseudo: pseudo.value,
      email: email.value,
      password: password.value,
    });
    console.log(response.data); // Affichez la réponse pour débogage
    await router.push('/login');
  } catch (error) {
    if (error.response) {
      console.error(error.response.data); // Affichez le corps de la réponse d'erreur
    } else {
      console.error(error.message); // Erreur lors de l'envoi de la requête
    }
  }
};

</script>

<style scoped>
.ecolearn-logo {
  margin-left: -60px; /* Ajustez selon la maquette */
  margin-bottom: -40px;
  padding: 40px;
  position: relative;
  bottom: 35px;
}

.contact-header h2,
.contact-header p {
  text-align: center;
}
.contact-header p {
  margin: 0 0 15px 0;
}

.contact-header p {
  color: #002773;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}



.form-button {
  display: flex;
  justify-content: center;
}

.form-group.double {
  display: flex;
  gap: 10px;
}

.form-group {
  padding: 10px;
}

.input-wrapper {
  flex: 1;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 10px;
  box-shadow: none;
  background-color: transparent;
  color: #333;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
textarea::placeholder {
  color: #949494;
}
button[type="submit"] {
  --color: #333; /* Couleur de base du bouton */
  padding: 8px 40px;
  border-radius: 30px;
  border: 1px solid var(--color);
  background-color: #fff;
  cursor: pointer;
  position: relative; /* Nécessaire pour les pseudo-éléments de survol */
  overflow: hidden; /* Empêche le débordement du pseudo-élément */
  color: var(--color); /* Couleur du texte du bouton */
  transition: color 0.5s; /* Transition pour la couleur du texte */
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}

/* Animation de background circulaire au survol */
button[type="submit"]::before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 150px;
  width: 200px;
  border-radius: 50%;
  top: 100%;
  left: -100%; /* Démarre de la gauche pour l'animation */
  transition: all 0.7s;
}

/* Change la couleur du texte et déclenche l'animation de background au survol */
button[type="submit"]:hover {
  color: #fff;
}

button[type="submit"]:hover::before {
  top: -30px;
  left: -30px; /* Anime le background vers le centre */
}

/* Maintient le style du background lors d'une action active/clic */
button[type="submit"]:active::before {
  background: #333; /* Couleur de background lors du clic */
  transition: background 0s;
}

/* Styles pour l'animation du texte au survol */
button[type="submit"] span {
  display: inline-block;
  transition: transform 0.25s, opacity 0.25s;
}

button[type="submit"]::after {
  content: "GO !"; /* Texte qui apparaît au survol */
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
  color: #333; /* Assurez-vous que cette couleur est visible sur votre fond */
  background-color: transparent; /* Transparent pour voir l'animation du background */
}

/* Animation du texte au survol */
button[type="submit"]:hover::after {
  opacity: 1;
  transform: translateY(0);
  color: #fff;
}

/* Cache le texte original du bouton lors du survol */
button[type="submit"]:hover > span {
  transform: translateY(-100%);
  opacity: 0;

}

.required {
  color: red;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

.create-account {
  color: #002773;
  text-decoration: none;
  font-weight: 600;
}
.create-account:hover {
  text-decoration: underline;
}
</style>