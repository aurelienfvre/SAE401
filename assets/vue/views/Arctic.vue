<template>
  <div class="quiz-wrapper">
    <CardContainer height="140vh">
      <div class="quiz-content" v-if="!showFinalScore">
        <div class="quiz-container">
          <h1>{{ currentQuestion?.contentFr }}</h1>
          <div class="cards-container">
            <div v-for="answer in currentAnswers" :key="answer.id"
                 class="card-quiz" :class="{ 'active': selectedAnswer === answer }"
                 @click="toggleAnswer(answer)">
              {{ answer.contentFr }}
            </div>
          </div>
          <button class="validate-button" @click="validateAnswer" v-if="selectedAnswer">Valider</button>
        </div>
        <div v-if="showFeedbackPage" class="feedback-container">
          <div :class="{'correct-feedback': feedbackType === 'correct', 'incorrect-feedback': feedbackType === 'incorrect'}">
            {{ feedbackMessage }}
            <div v-if="feedbackType === 'correct'">+{{ xpGained }} xp</div>
          </div>
          <div class="explanation">{{ currentQuestion?.explanationContentFr }}</div>
          <button class="next-question-button" @click="proceedToNextQuestion">Suivant</button>
          <button @click="restartQuiz">Recommencer</button>
        </div>
      </div>
      <div v-if="showFinalScore" class="final-score-container">
        Félicitations, vous avez terminé le quiz !
        <div>Votre score final est : {{ score }}</div>
        <div>Total XP gagné : {{ totalXP }}</div>
        <button @click="restartQuiz">Recommencer</button>
      </div>
      <div class="transition-sphere" v-if="showTransition" ref="transitionSphere"></div>
    </CardContainer>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import CardContainer from '@/components/CardContainer.vue';
import Footer from '@/components/Footer.vue';
import lottie from 'lottie-web';

export default {
  components: { CardContainer, Footer },
  data() {
    return {
      currentQuestion: null,
      currentAnswers: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showTransition: false,
      feedbackMessage: '',
      showFeedbackPage: false,
      feedbackType: '',
      score: 0,
      xpGained: 0,
      totalXP: 0,
      questions: [],
      lottieAnimation: null,
      showFinalScore: false,
    };
  },
  async mounted() {
    this.loadAnimation('https://assets9.lottiefiles.com/packages/lf20_yxo6hq9f.json', 'transitionSphere', true);
    await this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/questions');
        this.questions = response.data['hydra:member'];
        if (this.questions.length > 0) {
          await this.loadCurrentQuestion();
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
    async loadCurrentQuestion() {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.currentQuestion = currentQuestion;
      await this.fetchAnswersForQuestion(currentQuestion.id);
    },
    async fetchAnswersForQuestion(questionId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/answers?question=${questionId}`);
        this.currentAnswers = response.data['hydra:member'];
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    },
    toggleAnswer(answer) {
      this.selectedAnswer = this.selectedAnswer === answer ? null : answer;
    },
    validateAnswer() {
      if (!this.selectedAnswer) return;
      const isCorrect = this.selectedAnswer.isCorrect;
      this.feedbackMessage = isCorrect ? "Correct!" : "Incorrect!";
      this.feedbackType = isCorrect ? 'correct' : 'incorrect';
      this.xpGained = isCorrect ? 10 : 0;
      this.totalXP += this.xpGained;
      this.showFeedbackPage = true;
      this.showTransition = true;
      setTimeout(() => this.showTransition = false, 1000);
    },
    proceedToNextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.loadCurrentQuestion();
        this.resetQuestionState();
      } else {
        this.showFinalScore = true;
      }
    },
    resetQuestionState() {
      this.selectedAnswer = null;
      this.showFeedbackPage = false;
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.totalXP = 0;
      this.loadCurrentQuestion();
      this.resetQuestionState();
    },
    loadAnimation(animationUrl, containerRef, loop = true) {
      const container = this.$refs[containerRef];
      if (!container) return;

      container.innerHTML = '';

      if (this.lottieAnimation) {
        this.lottieAnimation.destroy();
      }

      this.lottieAnimation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop,
        autoplay: true,
        path: animationUrl,
      });
    },
  }
};
</script>

<style scoped>
.quiz-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.quiz-container, .feedback-container, .final-score-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cards-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.card-quiz {
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}
.card-quiz.active {
  background-color: #cccccc;
}
.validate-button, .next-question-button, .restart-quiz-button {
  margin-top: 20px;
}
.transition-sphere {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
.transition-sphere.active {
  display: block;
  animation: expand 2s forwards;
}
@keyframes expand {
  from {
    width: 100px;
    height: 100px;
  }
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
</style>
