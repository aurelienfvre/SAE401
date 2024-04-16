<template>
  <header class="header">
    <nav class="navbar">
      <router-link to="/" class="nav-logo">
        <img src="@/assets/ecolearn.svg" alt="Logo EcoLearn" draggable="false" />
      </router-link>
      <div class="nav-center-items">
        <router-link to="/" class="nav-item" :data-content="$t('navbar.home')">
          <span>{{ $t('navbar.home') }}</span>
        </router-link>
        <router-link to="/education" class="nav-item" :data-content="$t('navbar.education')">
          <span>{{ $t('navbar.education') }}</span>
        </router-link>
        <router-link to="/about" class="nav-item" :data-content="$t('navbar.about')">
          <span>{{ $t('navbar.about') }}</span>
        </router-link>
        <router-link to="/contact" class="nav-item" :data-content="$t('navbar.contact')">
          <span>{{ $t('navbar.contact') }}</span>
        </router-link>
      </div>
      <div class="nav-right-items">
        <button class="language-btn" @click="toggleLanguage">
          <span :class="{ 'underline': languageStore.locale.value === 'fr' }">fr</span>/
          <span :class="{ 'underline': languageStore.locale.value === 'en' }">en</span>
        </button>



        <template v-if="isUserLoggedIn">
          <router-link :to="{ name: 'Profile' }">
            <img :src="profilePictureUrl" alt="Photo de profil" class="profile-picture" />
          </router-link>
        </template>

        <router-link v-else to="/login" class="login-btn" :data-content="$t('navbar.login')">
          <span>{{ $t('navbar.login') }}</span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const router = useRouter();
const { locale } = useI18n();

// Présume l'existence d'un 'languageStore' injecté
const languageStore = inject('languageStore');

// Réactive référence pour l'état de connexion et l'URL de la photo de profil
const isUserLoggedIn = ref(!!localStorage.getItem('authToken'));
let defaultProfilePicture = '/img/default-profile.png';
const profilePictureUrl = ref(localStorage.getItem('profilePictureUrl') || defaultProfilePicture);

// Observer les changements du token d'authentification pour ajuster l'état de connexion
watch(
    () => localStorage.getItem('authToken'),
    (newValue, oldValue) => {
      isUserLoggedIn.value = !!newValue;
      // Assurez-vous de réinitialiser l'URL de la photo de profil lorsque l'utilisateur se déconnecte
      if (!newValue) {
        profilePictureUrl.value = defaultProfilePicture;
      }
    },
    { immediate: true } // Exécutez immédiatement pour initialiser l'état
);

// Observer les changements de l'URL de la photo de profil dans localStorage
watch(
    () => localStorage.getItem('profilePictureUrl'),
    (newValue) => {
      profilePictureUrl.value = newValue || defaultProfilePicture;
    }
);

const logout = () => {
  localStorage.clear();
  router.push('/login').then(() => window.location.reload());
};

// Utilisez watchEffect pour réagir au changement de langue dans le store et mettre à jour la locale de vue-i18n
watchEffect(() => {
  locale.value = languageStore.locale.value;
});

// Fonction pour basculer la langue en utilisant le store
const toggleLanguage = () => {
  const newLocale = locale.value === 'fr' ? 'en' : 'fr';
  languageStore.setLocale(newLocale);
};
</script>

<style lang="scss" scoped>
.profile-picture {
  width: 50px; /* Ajustez la taille selon vos besoins */
  height: 50px;
  border-radius: 50%; /* Rend l'image circulaire */
  object-fit: cover; /* Assurez-vous que l'image couvre bien l'espace sans être déformée */
}
.header {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1.25rem;

  .underline {
    text-decoration: underline;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70rem;

    .nav-logo {
      font-size: 1.5rem;
      color: #333;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .nav-center-items {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-item {
      position: relative;
      overflow: hidden;
      margin: 0 1rem;
      font-size: 1rem;
      color: #333;
      text-decoration: none;
      transition: color 0.3s;
      margin-top: 15px;
      cursor: pointer;

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
        color: #000;
      }

      &:hover {
        &::after {
          opacity: 1;
          transform: translateY(0);
          text-decoration: underline;
        }

        > span {
          transform: translateY(-100%);
          opacity: 0;

        }
      }

      > span {
        display: inline-block;
        transition: transform 0.25s, opacity 0.25s;

      }
    }

    .nav-right-items {
      display: flex;
      align-items: center;
      justify-content: center;

      .language-btn {
        margin-left: 1rem;
        padding: 0.2rem 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-top: 15px;
        background-color: transparent;
        color: #333;
      }

      .login-btn {
        --color: #333; // Couleur de base du bouton
        margin-left: 1rem;
        padding: 0.2rem 1rem;
        border-radius: 50px;
        cursor: pointer;
        margin-top: 15px;
        color: var(--color);
        border: 1px solid var(--color);
        text-decoration: none;
        font-size: 15px;
        position: relative;
        overflow: hidden;
        transition: color 0.5s;
        font-weight: 500;
        z-index: 1;

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
        }

        &:active::before {
          background: #333; // Couleur de background lors du clic
          transition: background 0s;
        }

        > span {
          display: inline-block;
          transition: transform 0.25s, opacity 0.25s;
          opacity: 1;
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
          color: #fff;
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
    }
  }
}

/* Suppression des styles d'animation pour .language-btn et .login-btn */
</style>