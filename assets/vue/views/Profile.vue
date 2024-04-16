<template>
  <CardContainer height="60rem">
    <CardPage width="80%" height="45rem" innerWidth="30rem" innerHeight="37rem" innerBgColor="#D88BCA" innerPosition="left" innerPadding="50px" textAlignment="left" :dualInnerContainers="true" innerWidthRight="85%">
      <template #left>
        <div class="profile-page">
          <div v-if="!isEditing">
            <img :src="previewImage" alt="Photo de profil" class="profile-picture"/>
            <h4>{{ $t('profile.username') }}: {{ user.pseudo }}</h4>
            <h4>{{ $t('profile.firstName') }}: {{ user.firstname }}</h4>
            <h4>{{ $t('profile.lastName') }}: {{ user.lastname }}</h4>
            <h4>{{ $t('profile.email') }}: {{ user.email }}</h4>
            <div class="form-button">
              <button @click="toggleEdit" :data-content="$t('profile.edit')">
                <span>{{ $t('profile.edit') }}</span></button>
            </div>
            <div class="form-button">
              <button @click="logout" :data-content="$t('profile.logout')">
                <span>{{ $t('profile.logout') }}</span></button>
            </div>
          </div>
          <div v-else>
            <form @submit.prevent="updateProfile" class="edit-form">
              <img :src="previewImage" alt="Photo de profil" class="profile-picture-small" @click="clickFileInput"/>
              <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
              <div class="form-group">
                <label for="pseudo">{{ $t('profile.username') }}</label>
                <input type="text" id="pseudo" v-model="user.pseudo">
              </div>
              <div class="form-group">
                <label for="firstName">{{ $t('profile.firstName') }}</label>
                <input type="text" id="firstName" v-model="user.firstname">
              </div>
              <div class="form-group">
                <label for="lastName">{{ $t('profile.lastName') }}</label>
                <input type="text" id="lastName" v-model="user.lastname">
              </div>
              <div class="form-group">
                <label for="email">{{ $t('profile.email') }}</label>
                <input type="email" id="email" v-model="user.email">
              </div>
              <div class="form-group">
                <label for="password">{{ $t('profile.password') }}</label>
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password">
                <button :data-content="$t(showPassword ? 'profile.hide' : 'profile.show')" @click.prevent="togglePasswordVisibility">
                  <span>{{ $t(showPassword ? 'profile.hide' : 'profile.show') }}</span>
                </button>
              </div>
              <div class="form-buttons-inline">
                <button type="submit" :data-content="$t('profile.update')">
                  <span>{{ $t('profile.update') }}</span>
                </button>
                <button type="button" @click="toggleEdit" :data-content="$t('profile.cancel')">
                  <span>{{ $t('profile.cancel') }}</span>
                </button>
              </div>
            </form>
            <div class="form-button">
              <button @click="logout" :data-content="$t('profile.logout')">
                <span>{{ $t('profile.logout') }}</span></button>
            </div>
          </div>
        </div>
      </template>
      <template #right>
        <div class="additional-content">
          <h2>Informations supplémentaires</h2>
          <div v-for="quiz in quizzes" :key="quiz.id">
            <h3>{{ quiz.name }}</h3>
            <p>Progression: {{ calculateProgress(quiz.id) }}%</p>
            <div class="progress-bar">
              <div :style="{ width: calculateProgress(quiz.id) + '%' }"></div>
            </div>
          </div>
        </div>
      </template>
    </CardPage>
  </CardContainer>
  <Footer />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const user = ref({
  email: '',
  firstname: '',
  lastname: '',
  pseudo: '',
  password: '',
  profilePicture: null,
});
const quizzes = ref([]);
const userProgress = ref([]);
const isEditing = ref(false);
const previewImage = ref('');
const fileInput = ref(null); // Pour cliquer sur l'input file programmatically
const showPassword = ref(false);

function toggleEdit() {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    // Réinitialiser le formulaire si l'utilisateur annule l'édition
    fetchUserProfile();
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function clickFileInput() {
  fileInput.value.click();
}

async function fetchUserProfile() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get('http://127.0.0.1:8000/api/me');
    user.value = { ...response.data };
    previewImage.value = response.data.profilePicture || '/img/default-profile.png';
    localStorage.setItem('profilePictureUrl', previewImage.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l’utilisateur:', error);
    router.push('/login');
  }
}

onMounted(async () => {
  await fetchUserProfile();
  await fetchQuizzes();
  await fetchUserProgress();
});

async function fetchQuizzes() {
  const response = await axios.get('http://127.0.0.1:8000/api/quizzes');
  quizzes.value = response.data['hydra:member'];
}

async function fetchUserProgress() {
  const response = await axios.get('http://127.0.0.1:8000/api/user_progresses');
  userProgress.value = response.data['hydra:member'];
}

function calculateProgress(quizId) {
  const quiz = quizzes.value.find(q => q.id === quizId);
  if (!quiz) return 0;
  const progressData = userProgress.value.find(up => up.quiz === `/api/quizzes/${quizId}`);
  if (!progressData) return 0;
  const totalQuestions = quiz.questions.length;
  const correctAnswers = progressData.totalCorrectAnswers;
  return Math.round((correctAnswers / totalQuestions) * 100);
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  user.value.profilePicture = file;
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const updateProfile = async () => {
  try {
    const formData = new FormData();
    formData.append('email', user.value.email);
    formData.append('firstname', user.value.firstname);
    formData.append('lastname', user.value.lastname);
    formData.append('pseudo', user.value.pseudo);
    if (user.value.password) {
      formData.append('password', user.value.password);
    }
    if (user.value.profilePicture instanceof File) {
      formData.append('profilePicture', user.value.profilePicture);
    }
    const response = await axios.post('http://127.0.0.1:8000/api/profile/update', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.newToken) {
      localStorage.setItem('authToken', response.data.newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.newToken}`;
    }
    const updatedProfilePictureUrl = response.data.user.profilePicture;
    localStorage.setItem('profilePictureUrl', updatedProfilePictureUrl);
    previewImage.value = updatedProfilePictureUrl;
    router.push('/').then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>





<style lang="scss" scoped>
.profile-page {
  max-width: 800px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .form-group {
    width: 100%;
    margin-bottom: 5px;

    label {
      margin-bottom: 5px;
      color: #666;
      font-size: 16px;
    }
  }
}

.profile-picture,
.profile-picture-small {
  border-radius: 50%;
  object-fit: cover;

  &.profile-picture-small {
    width: 80px;
    height: 80px;
    transition: width 0.3s ease, height 0.3s ease;
  }

  &.profile-picture {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
}

.form-buttons-inline {
  display: flex;
  gap: 10rem; // Espace entre les boutons
}

.form-button {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    --color: #333; // Couleur de base du bouton
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

    &::before, &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.7s;
    }

    &::before {
      z-index: -1;
      background: var(--color);
      height: 162px;
      width: 217px;
      border-radius: 50%;
      top: 100%;
      left: -100%;
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

      span {
        transform: translateY(-100%);
        opacity: 0;
      }
    }

    &:active::before {
      background: #333;
      transition: background 0s;
    }

    &::after {
      opacity: 0;
      transform: translateY(100%);
      color: #333;
      background-color: transparent;
    }
  }
}

.additional-content {
  padding: 20px;
  background: #e9ecef;
  border-radius: 8px;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: transparent;
  color: #000;
}

</style>