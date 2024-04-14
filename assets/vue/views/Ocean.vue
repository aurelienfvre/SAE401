<template>
  <CardContainer height="140vh">
    <div class="quiz-container" v-if="currentQuiz && questions.length > 0 && !isQuizFinished">
      <h2>{{ currentQuiz.name }}</h2>
      <div>
        <p>{{ currentQuestion['content' + currentLocale] }}</p>
        <ul>
          <li v-for="answer in currentAnswers" :key="answer.id">
            <button @click="submitAnswer(answer)">
              {{ answer['content' + currentLocale] }}
            </button>
          </li>
        </ul>


        <div v-if="showExplanation">
          <h3>{{ currentQuestion['explanationTitle' + currentLocale] }}</h3>
          <p>{{ currentQuestion['explanationContent' + currentLocale] }}</p>
          <button v-if="hasNextQuestion" @click="nextQuestion">Suivant</button>
          <button v-else @click="finishQuiz">Terminer le quiz</button>
        </div>
      </div>
      <div class="progress-bar">
        <div :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
    <div v-else-if="isQuizFinished">
      <p>Quiz terminé! Votre score : {{ score }}/{{ questions.length }}</p>
      <button @click="restartQuiz">Recommencer</button>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
    <div v-if="showTransition" :class="['transition-sphere', transitionClass]"></div>

  </CardContainer>
  <Footer />
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import { useStore } from 'vuex';
import CardContainer from "@/components/CardContainer.vue";
import Footer from "@/components/Footer.vue";
import { useI18n } from 'vue-i18n';

const store = useStore();
const { locale } = useI18n();
const currentLocale = computed(() => locale.value === 'fr' ? 'Fr' : 'En');

const currentQuiz = computed(() => store.state.currentQuiz);
const questions = computed(() => store.state.questions);
const currentQuestion = computed(() => store.getters.currentQuestion);
const currentAnswers = computed(() => store.getters.currentAnswers);
const score = computed(() => store.state.score);
const progressPercentage = computed(() => store.getters.progressPercentage);
const isQuizFinished = computed(() => store.getters.isQuizFinished);
const hasNextQuestion = computed(() => store.state.currentQuestionIndex < store.state.questions.length - 1);
const showTransition = computed(() => store.state.showTransition);
const transitionClass = computed(() => {
  return store.state.transitionType === 'correct' ? 'expand-correct' : 'expand-incorrect';
});
const showExplanation = ref(false);

function submitAnswer(answer) {
  // Lancez l'animation
  store.commit('SET_SHOW_TRANSITION', { show: true, type: answer.isCorrect ? 'correct' : 'incorrect' });

  // Attendre que l'animation se termine avant de montrer l'explication
  setTimeout(() => {
    showExplanation.value = true;
    store.dispatch('updateProgress', { isCorrect: answer.isCorrect });
    store.commit('SET_SHOW_TRANSITION', { show: false, type: '' });
  }, 2000); // Correspond à la durée de l'animation
}


function nextQuestion() {
  showExplanation.value = false;
  store.commit('NEXT_QUESTION');
  // Chargez les réponses pour la question suivante
  const nextQuestionId = store.getters.currentQuestion.id;
  store.dispatch('fetchAnswersForQuestion', nextQuestionId);
}

function finishQuiz() {
  store.dispatch('finishQuiz');
}

function restartQuiz() {
  store.dispatch('resetQuiz');
}

onMounted(() => {
  store.dispatch('fetchQuizData', 1); // Make sure the quiz ID is correct or dynamic
});

watch(() => store.state.currentQuestionIndex, (newIndex) => {
  if (store.state.questions[newIndex]) {
    const questionId = store.state.questions[newIndex].id;
    store.dispatch('fetchAnswersForQuestion', questionId);
  }
}, { immediate: true }); // Exécute le watcher immédiatement à l'initialisation pour charger les réponses initiales

</script>


<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress-bar {
  width: 100%;
  background-color: #eee;
  height: 20px;
  border-radius: 10px;
}
.progress-bar div {
  height: 100%;
  background-color: blue;
  border-radius: 10px;
}
.transition-sphere {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 10;
  background-color: transparent; /* Couleur par défaut, transparente */
}

.expand-correct {
  background-color: #C1DD13; /* Vert pour une réponse correcte */
  animation: expandAndShrink 2s ease-out forwards;
}

.expand-incorrect {
  background-color: #fb2e2e; /* Rouge pour une réponse incorrecte */
  animation: expandAndShrink 2s ease-out forwards;
}

@keyframes expandAndShrink {
  0%, 100% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  50% {
    width: 200vw;
    height: 200vw;
    opacity: 1;
  }
}
</style>
