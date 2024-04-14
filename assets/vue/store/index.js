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
    },
    getters: {
        currentQuestion: (state) => state.questions[state.currentQuestionIndex],
        currentAnswers: (state) => state.currentAnswers,
        progressPercentage: (state) => state.questions.length > 0 ? (state.currentQuestionIndex / state.questions.length) * 100 : 0,
        isQuizFinished: (state) => state.quizFinished
    },
    mutations: {
        SET_QUIZZES(state, quizzes) {
            state.quizzes = quizzes;
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
        INCREMENT_SCORE(state) {
            state.score++;
        },
        NEXT_QUESTION(state) {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex++;
                state.currentAnswers = []; // Nettoyez les réponses actuelles lorsque vous passez à la question suivante
            } else {
                state.quizFinished = true;
            }
        },
        RESET_QUIZ(state) {
            state.currentQuestionIndex = 0;
            state.score = 0;
            state.quizFinished = false;
            state.currentAnswers = []; // Nettoyez les réponses lors de la réinitialisation du quiz
        },
        FINISH_QUIZ(state) {
            state.quizFinished = true;
        }
    },
    actions: {
        async fetchQuizData({ commit, dispatch }, quizId) {
            try {
                const response = await axios.get(`/quizzes/${quizId}`);
                commit('SET_CURRENT_QUIZ', response.data);
                dispatch('fetchQuestions', response.data.questions);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        },
        async fetchQuestions({ commit, dispatch }, questions) {
            try {
                const questionResponses = await Promise.all(
                    questions.map(q => axios.get(q.replace('/api', ''))) // Assurez-vous que les URLs sont correctes
                );
                const questionData = questionResponses.map(res => res.data);
                commit('SET_QUESTIONS', questionData);
                questionData.forEach(question => {
                    dispatch('fetchAnswersForQuestion', question.id);
                });
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        },
        async fetchAnswersForQuestion({ commit }, questionId) {
            try {
                const response = await axios.get(`/answers?question=${questionId}`);
                commit('SET_CURRENT_ANSWERS', response.data['hydra:member']);
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
        updateProgress({ state, commit }, isCorrect) {
            if (isCorrect) {
                commit('INCREMENT_SCORE');
            }
            commit('NEXT_QUESTION');

            try {
                axios.put(`/user_progresses/${state.userProgress.id}`, {
                    score: state.score,
                    progress: state.currentQuestionIndex
                }).catch(error => console.error('Failed to update user progress:', error));
            } catch (error) {
                console.error('Failed to update user progress:', error);
            }
        },
        finishQuiz({ commit }) {
            commit('FINISH_QUIZ');
        },
        resetQuiz({ commit }) {
            commit('RESET_QUIZ');
        }
    }


});
