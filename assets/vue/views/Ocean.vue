<template>
  <CardContainer height="120vh">
    <div class="flex-container">
      <div ref="lottieContainerRef" class="lottie-animation"></div>
      <div class="quiz-content">
        <div v-if="loading" class="loading">
          <p>{{ $t('quiz.loading') }}</p>
        </div>
        <div v-else>
          <div class="progress-bar">
            <div :style="{ width: progressPercentage + '%' }" class="progress-bar-fill"></div>
            <span>{{ Math.round(progressPercentage) }}%</span>
          </div>
          <div class="quiz-wrap" v-if="currentQuiz && questions.length > 0 && !isQuizFinished">
            <div class="quiz-container">
              <div>
                <p class="question">{{ currentQuestion['content' + currentLocale] }}</p>
                <div v-if="!showExplanation" class="answers-grid">
                  <div v-for="answer in currentAnswers" :key="answer.id"
                       :class="{'card-quiz': true, 'active': selectedAnswer === answer}"
                       @click="toggleAnswer(answer)">
                    {{ answer['content' + currentLocale] }}
                  </div>
                  <button class="validate-button" @click="validateAnswer" :disabled="!selectedAnswer">{{ $t('quiz.submit') }}</button>
                </div>
                <div v-if="showExplanation" class="explanation-content">
                  <h3>{{ currentQuestion['explanationTitle' + currentLocale] }}</h3>
                  <p>{{ currentQuestion['explanationContent' + currentLocale] }}</p>
                  <button v-if="hasNextQuestion" @click="nextQuestion" class="quiz-button">{{ $t('quiz.next') }}</button>
                  <button v-else @click="finishQuiz" class="quiz-button">{{ $t('quiz.finish') }}</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="isQuizFinished">
            <p>{{ $t('quiz.score') }} : {{ score }}/{{ questions.length }}</p>
            <button @click="restartQuiz">{{ $t('quiz.retry') }}</button>
          </div>
        </div>
        <div v-if="showTransition" :class="['transition-sphere', transitionClass]"></div>
      </div>
    </div>
  </CardContainer>
  <Footer />
</template>








<script setup>
import {computed, onMounted, ref, watch, nextTick, watchEffect} from 'vue';
import { useStore } from 'vuex';
import CardContainer from "@/components/CardContainer.vue";
import Footer from "@/components/Footer.vue";
import { useI18n } from 'vue-i18n';
import lottie from 'lottie-web';

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
const transitionClass = computed(() => store.state.transitionType === 'correct' ? 'expand-correct' : 'expand-incorrect');
const showExplanation = ref(false);
const loading = computed(() => store.state.loading);
const selectedAnswer = ref(null);
const lottieContainerRef = ref(null);


onMounted(() => {
  store.dispatch('fetchQuizData', 1);
  nextTick(() => {
    watchEffect(() => {
      if (loading.value && !showExplanation.value) {
        console.log("Loading animation for loading state...");
        loadAnimation('https://lottie.host/0df1ac36-4e0a-48d7-87a8-3c4c1b5619fa/mtob88tlVY.json', lottieContainerRef, true);
      } else if (showExplanation.value && selectedAnswer.value) {
        console.log("Loading explanation animation based on answer correctness...");
        const animationUrl = selectedAnswer.value.isCorrect
            ? 'https://lottie.host/ce618da0-5fab-42a7-8323-d3595f332079/p3cvIR3U0p.json'  // Update this if you have a new URL
            : 'https://lottie.host/1a90251d-ea43-475a-897b-10c29eb23d99/sSMtkY3gYC.json';  // Update this if you have a new URL
        loadAnimation(animationUrl, lottieContainerRef, false);
      }
    });
  });
});

function loadAnimation(animationUrl, containerRef, loop = true) {
  const container = containerRef.value;
  console.log("Attempting to load animation into container:", container);
  if (!container) {
    console.log("No container found for Lottie animation.");
    return;
  }

  // Clear the container
  container.innerHTML = '';

  const animation = lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: loop,
    autoplay: true,
    path: animationUrl
  });
  console.log("Animation loaded: ", animation);
}

watch(showExplanation, (newVal, oldVal) => {
  if (!newVal && oldVal && !loading.value) {
    console.log("Reverting to main quiz animation after explanation...");
    loadAnimation('https://lottie.host/0df1ac36-4e0a-48d7-87a8-3c4c1b5619fa/mtob88tlVY.json', lottieContainerRef, true);
  }
});

function toggleAnswer(answer) {
  console.log("Toggling answer:", answer);
  if (selectedAnswer.value === answer) {
    selectedAnswer.value = null;
  } else {
    selectedAnswer.value = answer;
  }
}

function validateAnswer() {
  console.log("Validating answer:", selectedAnswer.value);
  submitAnswer(selectedAnswer.value);
  selectedAnswer.value = null;
}

function submitAnswer(answer) {
  console.log("Submitting answer:", answer);
  store.commit('SET_SHOW_TRANSITION', { show: true, type: answer.isCorrect ? 'correct' : 'incorrect' });
  setTimeout(() => {
    showExplanation.value = true;
    store.dispatch('updateProgress', { isCorrect: answer.isCorrect });
    store.commit('SET_SHOW_TRANSITION', { show: false, type: '' });
  }, 2000); // Matches animation duration
  console.log("Answer submitted and transitions handled.");
}

function nextQuestion() {
  console.log("Moving to next question...");
  showExplanation.value = false;
  store.dispatch('nextQuestion');
}

function finishQuiz() {
  console.log("Finishing quiz...");
  if (selectedAnswer.value && selectedAnswer.value.isCorrect) {
    store.commit('INCREMENT_SCORE');
  }
  store.dispatch('finishQuiz');
}

function restartQuiz() {
  console.log("Restarting quiz...");
  store.dispatch('resetQuiz', currentQuiz.value.id);
}
</script>








<style scoped>
.quiz-wrap {
  display: flex;
  justify-content: center;
  padding: 40px;

}
.quiz-container {
  width: 100%; /* Full width of the quiz-content */
  font-size: 0.8em; /* Reduce text size of all texts in the quiz */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.flex-container {
  display: flex;
  justify-content: flex-start;
}

.lottie-animation {
  width: 40%;
  height: 100vh; /* Définir une hauteur pour être sûr qu'elle n'est pas nulle */
  min-width: 200px;

}

.quiz-content {
  width: 70%; /* Adjust based on your layout needs */
  display: flex;
  flex-direction: column;
}

.answers-grid {
  display: grid;
  gap: 20px;
  margin: 20px 0;
}
.progress-bar {
  position: relative;
  width: 50rem;
  background-color: #d9d8d8;
  height: 35px;
  border-radius: 50px;
  overflow: hidden;
}
.progress-bar-fill {
  background-color: #C1DD13;
  height: 100%;
  width: 0;
  transition: width 0.5s ease-in-out;
}
.progress-bar span {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}
.transition-sphere {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 10;
  background-color: transparent;
}
.expand-correct {
  background-color: #C1DD13;
  animation: expandAndShrink 2s ease-out forwards;
}
.expand-incorrect {
  background-color: #fb2e2e;
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
.loading {
  text-align: center;
  padding: 20px;
  font-size: 1.5em;
}
.card-quiz {
  padding: 20px;
  border: 1px solid #333;
  border-radius: 50px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.card-quiz.active, .card-quiz:hover {
  background-color: #d5d5d5;
  transform: scale(1.05);
}
.validate-button {
  padding: 15px 40px; /* Increased padding for larger button */
  border: none;
  border-radius: 50px;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-size: 1.1em; /* Slightly larger text */
  transition: background-color 0.2s, transform 0.2s; /* Transition for smooth hover effect */
}
.validate-button:hover {
  background-color: #555; /* Darker shade on hover */
  transform: scale(1.1); /* Slight increase in scale on hover */
}
.explanation-content {
  width: 60%; /* Specific width for explanation content */
  text-align: left; /* Align text to the right */
  padding: 10px; /* Padding for better spacing */
  font-style: italic; /* Italic style for emphasis */
  color: #444; /* Dark grey color for readability */
  font-size: 1.1em; /* Larger text size */
}
.question {
  font-weight: bold;
  font-size: 1.2em;
}

.quiz-button {
  margin-top: 10px;
  padding: 10px 40px;
  border-radius: 20px;
  background-color: #fff; /* Blue color for primary actions */
  color: black;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  border: 1px solid #333;
}

.quiz-button:hover {
  background-color: #333;
  color: white;/* Darker shade on hover */
}
.answers-grid, .explanation-content, .card-quiz {
  padding: 13px; /* Réduction du padding */
}

.card-quiz {
  font-size: 1rem; /* Réduire spécifiquement la taille du texte des cartes */
}
</style>
