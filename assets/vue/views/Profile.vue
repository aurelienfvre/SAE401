<template>
  <CardContainer height="auto">
    <CardPage width="80%" height="auto" innerWidth="30rem" innerHeight="auto" innerBgColor="#D88BCA" innerPosition="left" innerPadding="50px" textAlignment="left" :dualInnerContainers="true">
      <template #left>
        <div class="profile-page">
        <h1>Mon Profil</h1>
          <div v-if="!isEditing">
            <!-- Affichage des informations -->
            <p>Email: {{ user.email }}</p>
            <p>Prénom: {{ user.firstname }}</p>
            <p>Nom: {{ user.lastname }}</p>
            <p>Pseudo: {{ user.pseudo }}</p>
            <img :src="previewImage" alt="Photo de profil" class="profile-picture"/>
            <button @click="toggleEdit">Modifier</button>
            <button @click="logout">Déconnexion</button>
          </div>
          <div v-else>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input type="text" id="firstName" v-model="user.firstname">
          </div>
          <div class="form-group">
            <label for="lastName">Nom</label>
            <input type="text" id="lastName" v-model="user.lastname">
          </div>
          <div class="form-group">
            <label for="pseudo">Pseudo</label>
            <input type="text" id="pseudo" v-model="user.pseudo">
          </div>
          <div class="form-group">
            <label for="password">Mot de passe (laisser vide pour ne pas changer)</label>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password">
            <button type="button" @click="togglePasswordVisibility">{{ showPassword ? 'Cacher' : 'Montrer' }}</button>
          </div>
          <div class="form-group">
            <label for="profilePicture">Photo de profil</label>
            <input type="file" id="profilePicture" @change="handleFileUpload" accept="image/*">
            <img :src="previewImage" alt="Photo de profil" class="profile-picture" @click="clickFileInput"/>
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
        <button @click="logout">Déconnexion</button>
      </div>
    </div>
  </template>
      <template #right>
        <!-- Nouveau contenu pour le second container -->
        <div class="additional-content">
          <h2>Informations supplémentaires</h2>
          <!-- Ajoutez ici le contenu supplémentaire que vous souhaitez afficher dans le second container -->
        </div>
      </template>
    </CardPage>
  </CardContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";

const router = useRouter();
const user = ref({
  email: '',
  firstname: '',
  lastname: '',
  pseudo: '',
  password: '',
  profilePicture: null,
});
const isEditing = ref(false);
const previewImage = ref('');
const fileInput = ref(null); // Pour cliquer sur l'input file programmatically

function toggleEdit() {
  isEditing.value = !isEditing.value;
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get('http://127.0.0.1:8000/api/me');
    user.value = { ...response.data };
    previewImage.value = response.data.profilePicture || '/img/default-profile.png'; // Assurez-vous que le chemin par défaut est correct
    localStorage.setItem('profilePictureUrl', previewImage.value); // Mettez à jour le localStorage avec l'URL initiale
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l’utilisateur:', error);
    router.push('/login');
  }
});

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
    if (user.value.password) formData.append('password', user.value.password);
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

    // Mettez à jour l'URL de la photo de profil dans le localStorage et l'interface utilisateur
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





<style scoped>
.profile-page {
  max-width: 600px;
  margin: auto;
}
.form-group {
  margin-bottom: 20px;
}
.profile-picture {
  max-width: 100px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
