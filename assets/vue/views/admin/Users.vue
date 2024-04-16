<template>
  <div>
    <h1>Liste des Utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <img :src="getFullImageUrl(user.profilePictureUrl)" alt="Profile Picture" class="profile-img">
        {{ user.firstname }} {{ user.lastname }} - {{ user.email }} - {{ user.pseudo }} - {{ user.roles }}
        <button @click="editUser(user)">Modifier</button>
        <button @click="deleteUser(user.id)">Supprimer</button>
        <div v-if="editingUser.id === user.id">
          <input v-model="editingUser.firstname" placeholder="Prénom">
          <input v-model="editingUser.lastname" placeholder="Nom">
          <input v-model="editingUser.email" placeholder="Email">
          <input v-model="editingUser.pseudo" placeholder="Pseudo">



          <!-- Supposant que vous voulez aussi permettre la modification de l'image de profil -->

          <button @click="updateUser(editingUser)">Appliquer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const editingUser = reactive({ id: null, firstname: '', lastname: '', email: '', pseudo:'', profilePicture: null });

const getFullImageUrl = (imageUrl) => {
  const baseURL = 'http://127.0.0.1:8000';
  return `${baseURL}${imageUrl}`;
};

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token d\'authentification manquant');
      return;
    }
    const response = await axios.get('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    users.value = response.data['hydra:member'];
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error);
  }
});

const editUser = (user) => {
  editingUser.id = user.id;
  editingUser.firstname = user.firstname;
  editingUser.lastname = user.lastname;
  editingUser.email = user.email;
  editingUser.pseudo = user.pseudo;
  // Réinitialisez profilePicture car on ne modifie pas l'image ici directement

};



const updateUser = async (user) => {
  try {
    const userData = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      pseudo: user.pseudo,
      // Ne pas inclure email et pseudo si ils ne sont pas modifiés

      // Ne pas inclure email et pseudo si ils ne sont pas modifiés
    };

    const token = localStorage.getItem('authToken');
    await axios.patch(`http://127.0.0.1:8000/api/users/${user.id}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/merge-patch+json', // Modifier ici
      }
    });

    // Mettez à jour l'affichage utilisateur ici...
    const userIndex = users.value.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users.value[userIndex] = { ...users.value[userIndex], ...user };
    }
    editingUser.id = null; // Ferme le formulaire d'édition
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
  }
};







const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    users.value = users.value.filter(user => user.id !== userId);
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur:', error);
  }
};
</script>


<style lang="scss" scoped>
h1 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 10px;
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;

    .profile-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
      object-fit: cover;
    }

    button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin: 5px;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}

input {
  margin: 5px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
