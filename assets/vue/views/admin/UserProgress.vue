<template>
  <div class="user-progress-management">
    <h2>Gestion des Progrès des Utilisateurs</h2>
    <div v-if="selectedUserProgress">
      <h3>Modification des progrès pour: {{ getPseudo(selectedUserProgress.user) }}</h3>
      <input v-model="selectedUserProgress.oceansXp" placeholder="XP Océans" type="number" />
      <input v-model="selectedUserProgress.jungleForestXp" placeholder="XP Forêt Jungle" type="number" />
      <input v-model="selectedUserProgress.desertXp" placeholder="XP Désert" type="number" />
      <input v-model="selectedUserProgress.arcticXp" placeholder="XP Arctique" type="number" />
      <input v-model="selectedUserProgress.totalCorrectAnswers" placeholder="Total des réponses correctes" type="number" />
      <button @click="updateUserProgress">Mettre à jour</button>
      <button @click="resetSelection">Annuler</button>
    </div>
    <ul>
      <li v-for="userProgress in userProgresses" :key="userProgress.id">
        Utilisateur: {{ getPseudo(userProgress.user) }}, Total XP: {{ calculateTotalXp(userProgress) }}
        <button @click="selectUserProgress(userProgress)">Modifier</button>
        <button @click="deleteUserProgress(userProgress.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userProgresses: [],
      selectedUserProgress: null,
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
    this.fetchUserProgresses();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        this.users = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    },
    async fetchUserProgresses() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_progresses');
        this.userProgresses = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors de la récupération des progrès des utilisateurs:', error);
      }
    },
    getPseudo(userId) {
      // Cette méthode trouve le pseudo de l'utilisateur basé sur l'ID
      const user = this.users.find(user => user['@id'] === userId);
      return user ? user.pseudo : 'Utilisateur inconnu';
    },
    selectUserProgress(userProgress) {
      this.selectedUserProgress = { ...userProgress };
    },
    resetSelection() {
      this.selectedUserProgress = null;
    },
    calculateTotalXp(userProgress) {
      return userProgress.oceansXp + userProgress.jungleForestXp + userProgress.desertXp + userProgress.arcticXp;
    },
    async updateUserProgress() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/user_progresses/${this.selectedUserProgress.id}`, this.selectedUserProgress);
        this.fetchUserProgresses();
        this.resetSelection();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du progrès de l’utilisateur:', error);
      }
    },
    async deleteUserProgress(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/user_progresses/${id}`);
        this.fetchUserProgresses();
      } catch (error) {
        console.error('Erreur lors de la suppression du progrès de l’utilisateur:', error);
      }
    },
  },
};
</script>

<style scoped>
.user-progress-management {
  margin: 20px;
}

h2 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input[type="number"] {
  margin: 0 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

button:hover {
  background-color: #c82333;
}

div > button {
  margin-top: 10px;
}

</style>
