<template>
  <CardContainer height="56rem">
    <CardPage
        :image="loginImage"
        width="80%"
        height="42rem"
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
        <h2>{{ $t('login.title') }}</h2>
        <p>{{ $t('login.readyToPlay') }}</p>
      </div>
      <form class="login-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">
            {{ $t('login.emailAddress') }} <span class="required">*</span>
          </label>
          <input type="email" id="email" v-model="email" :placeholder="$t('login.emailPlaceholder')" required />
        </div>
        <div class="form-group">
          <label for="password">
            {{ $t('login.password') }} <span class="required">*</span>
          </label>
          <input type="password" id="password" v-model="password" :placeholder="$t('login.passwordPlaceholder')" required />
        </div>
        <div class="form-group">
          <div class="form-button">
            <button type="submit"><span>GO !</span></button>
          </div>
        </div>
        <div class="register-link">
          {{ $t('login.noAccount') }}
          <router-link to="/register" class="create-account">
            {{ $t('login.createAccount') }}
          </router-link>
        </div>
      </form>
    </CardPage>
  </CardContainer>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import loginImage from "@/assets/image-login.jpg";

const router = useRouter();
const { t } = useI18n();

// Références réactives pour le stockage des valeurs des champs de formulaire
const email = ref('');
const password = ref('');

const submitForm = async () => {
  try {
    const loginResponse = await axios.post('http://127.0.0.1:8000/api/login_check', {
      username: email.value,
      password: password.value,
    });

    const token = loginResponse.data.token;
    localStorage.setItem('authToken', token);
    // Définit le token d'authentification pour les futures requêtes Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Récupère les informations de l'utilisateur connecté
    const userResponse = await axios.get('http://127.0.0.1:8000/api/me');
    const roles = userResponse.data.roles; // Assurez-vous que votre endpoint /api/me retourne un champ 'roles'
    const pseudo = userResponse.data.pseudo;
    const profilePictureUrl = userResponse.data.profilePicture || '/img/default-profile.png'; // Fallback à une image par défaut

    // Stockage des informations de l'utilisateur dans le localStorage
    localStorage.setItem('userName', pseudo);
    localStorage.setItem('profilePictureUrl', profilePictureUrl);
    localStorage.setItem('userRoles', JSON.stringify(roles)); // Ajoutez cette ligne

    // Redirige l'administrateur vers le back-office et les autres utilisateurs vers la page d'accueil
    if (roles.includes('ROLE_ADMIN')) {
      await router.push('/admin');
    } else {
      await router.push('/');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion ou de la récupération des informations de l’utilisateur:', error);
    // Ici, vous pouvez gérer l'erreur, par exemple, en affichant un message d'erreur à l'utilisateur
  }
};



</script>


<style lang="scss" scoped>
.ecolearn-logo {
  margin-left: -60px;
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
    margin: 0 0 15px;
    color: #002773;
  }
}

.form-button {
  display: flex;
  justify-content: center;
}

.form-group {
  padding: 10px;
  &.double {
    display: flex;
    gap: 10px;
  }
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: transparent;
  color: #333;
  &::placeholder {
    color: #949494;
  }
}

button[type="submit"] {
  --color: #333; // Variable pour la couleur de base
  padding: 8px 40px;
  border-radius: 30px;
  border: 1px solid var(--color);
  background-color: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: var(--color);
  transition: color 0.5s;
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
    left: -100%;
    transition: all 0.7s;
  }

  &:hover {
    color: #fff;
    &::before {
      top: -30px;
      left: -30px;
    }
    &::after {
      opacity: 1;
      transform: translateY(0);
      color: #fff;
    }
    > span {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  &:active::before {
    background: #333;
    transition: background 0s;
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
    background-color: transparent;
  }

  span {
    display: inline-block;
    transition: transform 0.25s, opacity 0.25s;
    opacity: 1;
  }
}

.required {
  color: red;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  .create-account {
    color: #002773;
    text-decoration: none;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
}

</style>