<template>
  <div class="quiz-management">
    <h2>Gestion des Quiz</h2>
    <!-- Formulaire pour l'ajout ou la modification -->
    <div>
      <input v-model="form.name" placeholder="Nom du Quiz">
      <button @click="saveQuiz">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
    </div>

    <!-- Affichage de la liste des quiz -->
    <ul>
      <li v-for="quiz in quizzes" :key="quiz.id">
        {{ quiz.name }}
        <button @click="editQuiz(quiz)">Modifier</button>
        <button @click="deleteQuiz(quiz.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quizzes: [], // La liste des quiz
      form: { // Le formulaire pour ajouter ou modifier un quiz
        name: '',
        id: null
      },
      isEditing: false, // État pour savoir si l'on est en mode édition ou ajout
    };
  },
  mounted() {
    this.fetchQuizzes();
  },
  methods: {
    // Récupérer tous les quiz
    async fetchQuizzes() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/quizzes');
        this.quizzes = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz:', error);
      }
    },
    // Sauvegarder un nouveau quiz ou les modifications d'un quiz existant
    async saveQuiz() {
      try {
        if (this.isEditing) {
          await axios.put(`http://127.0.0.1:8000/api/quizzes/${this.form.id}`, this.form);
        } else {
          await axios.post('http://127.0.0.1:8000/api/quizzes', this.form);
        }
        this.resetForm();
        await this.fetchQuizzes();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du quiz:', error);
      }
    },
    // Remplir le formulaire avec les données d'un quiz pour modification
    editQuiz(quiz) {
      this.form = { ...quiz };
      this.isEditing = true;
    },
    // Supprimer un quiz
    async deleteQuiz(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/quizzes/${id}`);
        await this.fetchQuizzes();
      } catch (error) {
        console.error('Erreur lors de la suppression du quiz:', error);
      }
    },
    // Réinitialiser le formulaire
    resetForm() {
      this.form = { name: '', id: null };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.quiz-management h2 {
  margin-bottom: 20px;
  text-align: center;
}

.quiz-management div {
  margin-bottom: 20px;
}

.quiz-management input {
  margin: 5px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.quiz-management button {
  background-color: #dc3545; /* Vert */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  font-size: 16px;
}

.quiz-management button:hover {
  background-color: #c82333; /* Vert foncé */
}

.quiz-management ul {
  list-style-type: none;
  padding: 0;
}

.quiz-management li {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quiz-management .edit-btn, .quiz-management .delete-btn {
  background-color: #dc3545; /* Rouge */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.quiz-management .edit-btn:hover, .quiz-management .delete-btn:hover {
  background-color: #c82333; /* Rouge foncé */
}
</style>
