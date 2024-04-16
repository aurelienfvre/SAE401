<template>
  <div class="answers-management">
    <h2>Gestion des Réponses</h2>
    <div class="form-group">
      <input v-model="form.contentFr" placeholder="Contenu FR" class="input-field">
      <input v-model="form.contentEn" placeholder="Contenu EN" class="input-field">
      <select v-model="form.questionId" class="select-field">
        <option v-for="question in questions" :key="question.id" :value="question['@id']">
          {{ question.contentFr }} / {{ question.contentEn }}
        </option>
      </select>
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
      questions: [], // La liste des questions
      form: { // Le formulaire pour ajouter ou modifier une réponse
        contentFr: '',
        contentEn: '',
        isCorrect: true, // Par défaut à vrai
        questionId: null, // ID de la question sélectionnée
        id: null
      },
      isEditing: false, // État pour savoir si l'on est en mode édition ou ajout
    };
  },
  mounted() {
    this.fetchAnswers();
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/questions');
        this.questions = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors de la récupération des questions:', error);
      }
    },
    async fetchAnswers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/answers');
        this.answers = response.data['hydra:member'].map(answer => ({
          ...answer,
          id: answer['@id'].split('/').pop()  // Ensure IDs are extracted here
        }));
        console.log("Fetched answers with IDs:", this.answers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    }
    ,
    async saveAnswer() {
      const path = this.isEditing ? `answers/${this.form.id}` : 'answers';
      console.log("Saving answer with path:", path); // Vérifiez le chemin
      const method = this.isEditing ? 'put' : 'post';
      try {
        await axios[method](path, {
          ...this.form,
          question: this.form.questionId,
        });
        this.resetForm();
        await this.fetchAnswers();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la réponse:', error);
      }
    },
    editAnswer(answer) {
      console.log("Received answer object:", answer);
      if (!answer['@id']) {
        console.error('No ID found for answer:', answer);
        return;
      }

      // Assuming ID is the last segment after the last '/' in '@id'
      const answerId = answer['@id'].split('/').pop();

      this.form = {
        id: answerId,
        contentFr: answer.contentFr,
        contentEn: answer.contentEn,
        isCorrect: answer.isCorrect,
        questionId: answer.question && answer.question['@id']
      };
      this.isEditing = true;
    },
    async deleteAnswer(id) {
      console.log("Attempting to delete answer with ID:", id);
      if (!id) {
        console.error('ID is undefined, cannot delete');
        return;
      }

      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/answers/${id}`);
        console.log('Delete response:', response);
        await this.fetchAnswers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Failed to delete answer:', error);
      }
    },
    resetForm() {
      this.form = { contentFr: '', contentEn: '', isCorrect: true, questionId: null, id: null };
      this.isEditing = false;
    }
  }
};
</script>








<style lang="scss" scoped>
.answers-management {
  margin: 20px;

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

    &:hover {
      opacity: 0.9;
    }
  }

  .delete-button {
    background-color: #f44336;
  }

  .edit-button {
    background-color: #F44336;
  }
}

ul {
  list-style-type: none;
  padding: 0;

  .answer-item {
    margin-bottom: 10px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}


</style>