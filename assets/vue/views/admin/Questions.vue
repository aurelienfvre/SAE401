<template>
  <div class="question-management">
    <h2>Gestion des Questions</h2>
    <!-- Formulaire pour l'ajout ou la modification -->
    <div>
      <select v-model="form.quizId">
        <option disabled value="">Sélectionnez un quiz</option>
        <!-- Supposant que vous avez une liste de quizzes chargée dans quizzes -->
        <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz['@id']">{{ quiz.name }}</option>
      </select>
      <input v-model="form.contentFr" placeholder="Contenu FR">
      <input v-model="form.contentEn" placeholder="Contenu EN">
      <input v-model="form.explanationTitleFr" placeholder="Titre d'explication FR">
      <input v-model="form.explanationTitleEn" placeholder="Titre d'explication EN">
      <input v-model="form.explanationContentFr" placeholder="Contenu d'explication FR">
      <input v-model="form.explanationContentEn" placeholder="Contenu d'explication EN">
      <button @click="saveQuestion">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
    </div>

    <!-- Affichage de la liste des questions -->
    <ul>
      <li v-for="question in questions" :key="question.id">
        {{ question.contentFr }} / {{ question.contentEn }}
        <button @click="editQuestion(question)">Modifier</button>
        <button @click="deleteQuestion(question.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quizzes: [], // La liste des quiz chargée depuis l'API
      questions: [], // La liste des questions
      form: { // Le formulaire pour ajouter ou modifier une question
        quizId: '',
        contentFr: '',
        contentEn: '',
        explanationTitleFr: '',
        explanationTitleEn: '',
        explanationContentFr: '',
        explanationContentEn: '',
        id: null
      },
      isEditing: false, // État pour savoir si l'on est en mode édition ou ajout
    };
  },
  mounted() {
    this.fetchQuizzes();
    this.fetchQuestions();
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
    // Récupérer toutes les questions
    async fetchQuestions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/questions');
        this.questions = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors de la récupération des questions:', error);
      }
    },
    // Sauvegarder une nouvelle question ou les modifications d'une question existante
    async saveQuestion() {
      try {
        const questionData = {
          quiz: this.form.quizId,
          contentFr: this.form.contentFr,
          contentEn: this.form.contentEn,
          explanationTitleFr: this.form.explanationTitleFr,
          explanationTitleEn: this.form.explanationTitleEn,
          explanationContentFr: this.form.explanationContentFr,
          explanationContentEn: this.form.explanationContentEn,
        };
        if (this.isEditing) {
          await axios.put(`http://127.0.0.1:8000/api/questions/${this.form.id}`, questionData);
        } else {
          await axios.post('http://127.0.0.1:8000/api/questions', questionData);
        }
        this.resetForm();
        await this.fetchQuestions();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la question:', error);
      }
    },
    // Remplir le formulaire avec les données d'une question pour modification
    editQuestion(question) {
      this.form = { ...question, quizId: question.quiz };
      this.isEditing = true;
    },
    // Supprimer une question
    async deleteQuestion(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/questions/${id}`);
        this.fetchQuestions();
      } catch (error) {
        console.error('Erreur lors de la suppression de la question:', error);
        console.error('Erreur détaillée:', error.response);
      }
    },
    // Réinitialiser le formulaire
    resetForm() {
      this.form = {
        quizId: '',
        contentFr: '',
        contentEn: '',
        explanationTitleFr: '',
        explanationTitleEn: '',
        explanationContentFr: '',
        explanationContentEn: '',
        id: null
      };
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.question-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.question-management h2 {
  margin-bottom: 20px;
}

.question-management div {
  margin-bottom: 20px;
}

.question-management input, .question-management select {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.question-management button {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-right: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

.question-management button:hover {
  opacity: 0.9;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
}

button:hover {
  background-color: #c82333;
}

.edit-button {
  background-color: #ffc107;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
}

.add-button {
  background-color: #28a745;
  color: white;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #218838;
}
</style>
