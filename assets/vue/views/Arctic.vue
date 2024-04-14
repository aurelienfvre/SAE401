<template>
  <div>
    <CardContainer height="140vh">
      <!-- Content visible when not on the final score page -->
      <div v-if="!showFinalScore">
        <div class="quiz-container" v-if="!showFeedbackPage">
          <h1>{{ questions[currentQuestionIndex].question }}</h1>
          <div ref="lottieContainer" class="lottie-container">
            <div ref="lottieContainerQuestion" class="lottie-container"></div>
            <!-- Assurez-vous que le container pour les questions et le feedback est le même ou ajustez selon la logique de votre application -->
          </div>
          <div class="cards-container">
            <div v-for="(answer, index) in questions[currentQuestionIndex].answers" :key="index"
                 class="card-quiz" :class="{ 'active': selectedAnswer === answer }"
                 @click="toggleAnswer(answer)">
              {{ answer.text }}
            </div>
          </div>
          <button class="validate-button" @click="validateAnswer" v-if="selectedAnswer">Valider</button>
        </div>


        <!-- Feedback page content -->


        <!-- Feedback page content -->
        <div v-if="showFeedbackPage" class="feedback-container">
          <div :class="{'correct-feedback': feedbackType === 'correct', 'incorrect-feedback': feedbackType === 'incorrect'}">
            {{ feedbackMessage }}
            <div v-if="feedbackType === 'correct'">+{{ xpGained }} xp</div>
          </div>
          <!-- Container for Lottie feedback animation -->
          <div ref="lottieContainerFeedback" class="lottie-container-feedback"></div>
          <div class="explanation">{{ questions[currentQuestionIndex].explanation }}</div>
          <button class="next-question-button" @click="proceedToNextQuestion">Suivant</button>
          <button @click="restartQuiz">Recommencer</button>
        </div>
      </div>

      <!-- Final score page content -->
      <div v-if="showFinalScore" class="final-score-container">
        Félicitations, vous avez terminé le quiz !
        <div>Votre score final est : {{ score }}</div>
        <div>Total XP gagné : {{ totalXP }}</div>
        <button @click="restartQuiz">Recommencer</button>
      </div>

      <!-- Transition sphere, always present but shown conditionally -->
      <div class="transition-sphere" v-if="showTransition" ref="transitionSphere"></div>
    </CardContainer>

    <!-- Footer, always visible -->
    <Footer />
  </div>
</template>



<script>
import CardContainer from '@/components/CardContainer.vue';
import Footer from '@/components/Footer.vue';
import lottie from 'lottie-web';

export default {
  components: {
    CardContainer,
    Footer,
  },
  data() {
    return {

      currentQuestionIndex: 0,
      selectedAnswer: null,
      showTransition: false,
      feedbackMessage: '',
      showFeedbackPage: false,
      feedbackType: '',
      score: 0,
      xpGained: 0,
      totalXP: 0,
      questions: [
        {
          question: "Quelle est l'espèce d'oiseau la plus menacée au monde ?",
          answers: [
            { text: "Le condor de Californie", correct: true },
            { text: "Le condor de Paris", correct: false },
            { text: "Le condor de Amiens", correct: false },
            { text: "Le condor de Troyes", correct: false }
          ],
          xp: 15, // XP pour répondre correctement
          explanation: "Le condor de Californie est considéré comme l'espèce d'oiseau la plus menacée..."
        },
        {
          question: "Quel est le plus grand mammifère terrestre ?",
          answers: [
            { text: "L'éléphant", correct: true },
            { text: "Le rhinocéros", correct: false },
            { text: "Le lion", correct: false },
            { text: "Le tigre", correct: false }
          ],
          xp: 10, // XP pour répondre correctement
          explanation: "L'éléphant est le plus grand mammifère terrestre..."
        }
        // Autres questions...
      ],

      lottieAnimation: null,
      answeredQuestions: [],
      showFinalScore: false, // Afficher le score final
    };
  },
  mounted() {
    this.loadAnimation('https://lottie.host/41de860e-be6d-4358-bf83-319c2c506c31/mZ2DV699MD.json', 'lottieContainerQuestion', true);
    this.restoreQuizState();
    this.addClickListener();
  },
  beforeDestroy() {
    this.removeClickListener();
  },
  methods: {
    // Ajustez la méthode loadAnimation pour accepter un argument containerRef
    async loadAnimation(animationUrl, containerRef, loop = true) {
      const container = this.$refs[containerRef];
      if (!container) return;

      // Nettoyer le conteneur
      container.innerHTML = '';

      if (this.lottieAnimation) {
        // Détruire l'animation précédente avant d'en charger une nouvelle
        this.lottieAnimation.destroy();
      }

      // Charger la nouvelle animation
      this.lottieAnimation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: loop,
        autoplay: true,
        path: animationUrl,
      });
    },




    addClickListener() {
      document.addEventListener('click', this.handleClickOutside);
    },
    removeClickListener() {
      document.removeEventListener('click', this.handleClickOutside);
    },
    handleClickOutside(event) {
      const cardsContainer = this.$el.querySelector('.cards-container');
      if (!cardsContainer.contains(event.target)) {
        this.selectedAnswer = null;
      }
    },
    toggleAnswer(answer) {
      if (this.selectedAnswer === answer) {
        this.selectedAnswer = null; // Permet de décocher une réponse
      } else {
        this.selectedAnswer = answer;
      }
    },
    initiateTransition() {
      this.showTransition = true;
      setTimeout(() => {
        this.showTransition = false;
        // Vous pouvez placer ici d'autres actions qui doivent se produire après la transition
      }, 7500); // Correspond à la durée de votre animation
    },

    validateAnswer() {
      if (!this.selectedAnswer) return;
      const questionId = this.currentQuestionIndex;
      const correct = this.selectedAnswer.correct;

      // Vérifiez si la question n'a pas déjà été répondue pour empêcher l'accumulation de points sur des rechargements/validations multiples
      if (correct && !this.answeredQuestions.includes(questionId)) {
        this.score++; // Incrémentez le score seulement si la réponse est correcte et n'a pas déjà été comptée
        this.totalXP += this.questions[questionId].xp; // Ajoutez l'XP de la question courante au total
        this.answeredQuestions.push(questionId); // Ajoutez l'ID de la question à la liste des questions répondues
      }

      this.feedbackMessage = correct ? "BRAVO" : "Ho non...";
      this.feedbackType = correct ? 'correct' : 'incorrect';
      this.xpGained = correct ? this.questions[questionId].xp : 0; // Déterminez l'XP gagné pour cette question spécifique

      this.showTransition = true;
      setTimeout(() => {
        this.showTransition = false;
        this.showFeedbackPage = true;
        this.$nextTick(() => {
          const feedbackAnimationUrl = correct
              ? 'https://lottie.host/c3830d48-e976-4393-9e41-c2db2932e573/VPHlT1oMim.json'
              : 'https://lottie.host/33f45c86-d3d0-4657-85c2-a650b2e81d10/kbz1xRpwh1.json';
          this.loadAnimation(feedbackAnimationUrl, 'lottieContainerFeedback', false);
        });
      }, 1950); // Assurez-vous que cette durée correspond à la durée de votre animation de transition
      // Durée pour simuler l'animation
      this.$nextTick(() => {
        if (!this.showFeedbackPage) { // Assurez-vous de charger l'animation de base seulement si vous n'êtes pas sur la page de feedback
          this.loadAnimation('https://lottie.host/41de860e-be6d-4358-bf83-319c2c506c31/mZ2DV699MD.json', 'lottieContainerQuestion', true);
        }
      });
      this.$nextTick(() => {
        const sphereClass = this.feedbackType === 'correct' ? 'expand-correct' : 'expand-incorrect';
        if (this.$refs.transitionSphere) {
          this.$refs.transitionSphere.classList.add(sphereClass);
          setTimeout(() => {
            this.$refs.transitionSphere.classList.remove(sphereClass);
          }, 2500); // Assurez-vous que cela correspond à la durée de l'animation CSS
        }
        localStorage.setItem('quizState', JSON.stringify({
          currentQuestionIndex: this.currentQuestionIndex,
          score: this.score,
          totalXP: this.totalXP
        }));
      });
      this.saveQuizState();
    },

    proceedToNextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.resetState(); // Assurez-vous que cela est correctement placé
        this.$nextTick(() => {
          this.loadAnimation('https://lottie.host/41de860e-be6d-4358-bf83-319c2c506c31/mZ2DV699MD.json', 'lottieContainerQuestion', true);});
      } else {
        this.showFinalScore = true; // Fin du quiz
        this.resetState();
        this.saveQuizState(); // Optionnel ici, dépend de si vous voulez réinitialiser à la fin
      }
    },

    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0; // Réinitialise le score
      this.totalXP = 0; // Important: Réinitialise l'XP à 0
      this.selectedAnswer = null;
      this.showFeedbackPage = false;
      this.showTransition = false;
      this.showFinalScore = false;
      this.answeredQuestions = []; // Réinitialise la liste des questions répondues
      localStorage.removeItem('quizState'); // Efface l'état sauvegardé dans localStorage
      // Recharger l'animation initiale
      this.$nextTick(() => {
        this.loadAnimation('https://lottie.host/41de860e-be6d-4358-bf83-319c2c506c31/mZ2DV699MD.json', 'lottieContainerQuestion', true);
      });
    },



    restoreQuizState() {
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        const { currentQuestionIndex, score, totalXP, answeredQuestions } = JSON.parse(savedState);
        this.currentQuestionIndex = currentQuestionIndex;
        this.score = score;
        this.totalXP = totalXP;
        this.answeredQuestions = answeredQuestions || [];
      }
    },
    resetState() {
      this.selectedAnswer = null;
      // this.showTransition = false;
      this.showFeedbackPage = false;

    },
    saveQuizState() {
      localStorage.setItem('quizState', JSON.stringify({
        currentQuestionIndex: this.currentQuestionIndex,
        score: this.score,
        totalXP: this.totalXP,
        answeredQuestions: this.answeredQuestions,
      }));
    },
  },
};
</script>



<style scoped>
.quiz-container {
  position: relative;
  text-align: center;
}

.lottie-container {
  width: 22rem;
  height: auto;
  margin: auto;
  position: relative;
}

.cards-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.card-quiz {
  padding: 20px;
  border: 1px solid #333;
  border-radius: 50px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.card-quiz.active, .card-quiz:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.validate-button {
  position: absolute;
  bottom: 7rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #333;
  color: white;
  cursor: pointer;
}


.transition-sphere {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 10;
}

@keyframes expandAndShrink {
  0%, 100% {
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
  }
  50% {
    width: 200vw;
    height: 200vw;
    top: 50%;
    left: 50%;
  }
}

.transition-sphere.expand-correct {
  background-color: #C1DD13; /* Bleu pour correct */
  animation: expandAndShrink 2s ease-out forwards;
}

.transition-sphere.expand-incorrect {
  background-color: #fb2e2e; /* Rouge pour incorrect */
  animation: expandAndShrink 2s ease-out forwards;
}


.feedback-page{
  color: #333;
}
.lottie-container-feedback {
  height: 35rem; /* Exemple, ajustez selon la taille désirée */
  width: 100%;
}

</style>

