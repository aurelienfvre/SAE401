import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export default createStore({
    state: {
        userProgress: {},
        quizzes: [],
        currentQuiz: null,
        currentAnswers: [],
        score: 0,
        questions: [],
        currentQuestionIndex: 0,
        quizFinished: false,
        showTransition: false,
        transitionType: 'correct', // 'correct' ou 'incorrect'
        loading: false,
    },
    getters: {
        currentQuestion: (state) => state.questions[state.currentQuestionIndex],
        currentAnswers: (state) => state.currentAnswers,
        progressPercentage: (state) => {
            return (state.currentQuestionIndex / state.questions.length) * 100;
        },
        isQuizFinished: (state) => state.quizFinished

    },
    mutations: {

        RESET_EXPLANATION(state) {
            state.showExplanation = false;  // Assurez-vous que cette propriété est bien gérée dans votre état
        },
        SET_QUIZZES(state, quizzes) {
            state.quizzes = quizzes;
        },
        SHOW_EXPLANATION(state) {
            state.showExplanation = true;
            console.log("Explanation is now shown");
        },

        SET_LOADING(state, isLoading) {
            state.loading = isLoading;
        },
        SET_SHOW_TRANSITION(state, { show, type }) {
            state.showTransition = show;
            state.transitionType = type;
        },
        SET_USER_PROGRESS(state, progress) {
            state.userProgress = progress;
        },
        SET_CURRENT_QUIZ(state, quiz) {
            state.currentQuiz = quiz;
            state.questions = quiz.questions;
            state.currentQuestionIndex = 0;
            state.quizFinished = false;
        },
        SET_QUESTIONS(state, questions) {
            state.questions = questions;
        },
        SET_CURRENT_ANSWERS(state, answers) {
            state.currentAnswers = answers;
        },
        INCREMENT_SCORE(state, payload) {
            if (payload.isCorrect) {
                state.score++;
            }
        },
        NEXT_QUESTION(state) {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex++;
                state.showExplanation = false; // Assurez-vous de cacher l'explication quand on passe à la prochaine question
            } else {
                state.quizFinished = true;
            }
        },

        RESET_QUIZ(state) {
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.quizFinished = false;
            state.currentAnswers = [];
            state.progressPercentage = 0;
            state.showExplanation = false;
        },
        FINISH_QUIZ(state) {
            state.quizFinished = true;
            state.progressPercentage = 100; // Assurez-vous d'atteindre 100%
            if (state.selectedAnswer && state.selectedAnswer.isCorrect) {
                state.score++;
            }
        },

    },
    actions: {
        async fetchQuizData({ commit, dispatch }, quizId) {
            commit('SET_LOADING', true); // Activer l'indicateur de chargement
            try {
                const response = await axios.get(`/quizzes/${quizId}`);
                commit('SET_CURRENT_QUIZ', response.data);
                // Attendre que toutes les questions et leurs réponses soient chargées
                await dispatch('fetchQuestions', response.data.questions);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        },
        validateAnswer({ commit, dispatch }, { answer }) {
            commit('SET_SHOW_TRANSITION', { show: true, type: answer.isCorrect ? 'correct' : 'incorrect' });
            setTimeout(() => {
                dispatch('updateProgress', { isCorrect: answer.isCorrect });
                commit('SET_SHOW_TRANSITION', { show: false, type: '' });
            }, 2000);
        },
        async fetchQuestions({ commit, dispatch }, questions) {
            try {
                const questionResponses = await Promise.all(
                    questions.map(q => axios.get(q.replace('/api', '')))
                );
                const questionData = questionResponses.map(res => res.data);
                commit('SET_QUESTIONS', questionData);

                // S'assurer que les réponses sont chargées pour la première question immédiatement
                if (questionData.length > 0) {
                    await dispatch('fetchAnswersForQuestion', questionData[0].id);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async fetchAnswersForQuestion({ commit, state }, questionId) {
            try {
                const response = await axios.get(`/answers?question=${questionId}`);
                if (state.questions[state.currentQuestionIndex].id === questionId) {
                    commit('SET_CURRENT_ANSWERS', response.data['hydra:member']);
                }
            } catch (error) {
                console.error('Error fetching answers for question:', error);
            }
        },


        fetchUserProgress({ commit }) {
            axios.get('/user_progresses')
                .then(response => {
                    commit('SET_USER_PROGRESS', response.data['hydra:member'][0]);
                })
                .catch(error => console.error('Error fetching user progress:', error));
        },
        updateProgress({ state, commit }, { isCorrect }) {
            if (state.userProgress && state.userProgress.id) {
                axios.put(`/user_progresses/${state.userProgress.id}`, {
                    score: state.score,
                    progress: state.currentQuestionIndex
                }).then(() => {
                    commit('NEXT_QUESTION');
                }).catch(error => console.error('Failed to update user progress:', error));
            } else {
                console.error('User progress ID is undefined');
            }
        },

        nextQuestion({ commit, dispatch, state }) {
            if (!state.isQuizFinished) {
                commit('NEXT_QUESTION');
                if (!state.isQuizFinished) {
                    dispatch('fetchAnswersForQuestion', state.questions[state.currentQuestionIndex].id);
                    commit('RESET_EXPLANATION'); // Assurez-vous de remettre à zéro toute explication affichée
                }
            }
        },



        finishQuiz({ commit, state }, answer) {
            commit('FINISH_QUIZ', { isCorrect: answer && answer.isCorrect });
        },
        resetQuiz({ commit, dispatch }) {
            commit('RESET_QUIZ');
            dispatch('fetchQuizData', state.currentQuiz.id);
        },
    }


});
