<template>
  <div class="answers-management">
    <h2>Gestion des Réponses</h2>
    <!-- Formulaire pour l'ajout ou la modification d'une réponse -->
    <div class="form-group">
      <input v-model="form.contentFr" placeholder="Contenu FR" class="input-field">
      <input v-model="form.contentEn" placeholder="Contenu EN" class="input-field">
      <select v-model="form.isCorrect" class="select-field">
        <option :value="true">Vrai</option>
        <option :value="false">Faux</option>
      </select>
      <button @click="saveAnswer" class="action-button">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
    </div>

    <!-- Affichage de la liste des réponses -->
    <ul>
      <li v-for="answer in answers" :key="answer.id" class="answer-item">
        {{ answer.contentFr }} / {{ answer.contentEn }} - {{ answer.isCorrect ? 'Vrai' : 'Faux' }}
        <button @click="editAnswer(answer)" class="edit-button">Modifier</button>
        <button @click="deleteAnswer(answer.id)" class="delete-button">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      answers: [], // La liste des réponses
      form: { // Le formulaire pour ajouter ou modifier une réponse
        contentFr: '',
        contentEn: '',
        isCorrect: true, // Par défaut à vrai
        id: null
      },
      isEditing: false, // État pour savoir si l'on est en mode édition ou ajout
    };
  },
  mounted() {
    this.fetchAnswers();
  },
  methods: {
    // Récupérer toutes les réponses
    async fetchAnswers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/answers');
        this.answers = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses:', error);
      }
    },
    // Sauvegarder une nouvelle réponse ou les modifications d'une réponse existante
    async saveAnswer() {
      try {
        const path = this.isEditing ? `/api/answers/${this.form.id}` : '/api/answers';
        const method = this.isEditing ? 'put' : 'post';

        await axios[method](path, {
          ...this.form,
          // Remarque: isCorrect est déjà lié au modèle et sera envoyé tel quel
        });

        this.resetForm();
        await this.fetchAnswers();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la réponse:', error);
      }
    },
    // Remplir le formulaire avec les données d'une réponse pour modification
    editAnswer(answer) {
      this.form = { ...answer };
      this.isEditing = true;
    },
    // Supprimer une réponse
    async deleteAnswer(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/answers/${id}`);
        await this.fetchAnswers();
      } catch (error) {
        console.error('Erreur lors de la suppression de la réponse:', error);
      }
    },
    // Réinitialiser le formulaire
    resetForm() {
      this.form = { contentFr: '', contentEn: '', isCorrect: true, id: null };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.answers-management {
  margin: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.input-field, .select-field {
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.action-button, .edit-button, .delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

.delete-button {
  background-color: #f44336;
}

.edit-button {
  background-color: #F44336;
}

.action-button:hover, .edit-button:hover, .delete-button:hover {
  opacity: 0.9;
}

ul {
  list-style-type: none;
  padding: 0;
}

.answer-item {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>