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
        INCREMENT_SCORE(state, isCorrect) {
            if (isCorrect) {
                state.score++;
            }
        },
        NEXT_QUESTION(state) {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex++;
            } else {
                state.quizFinished = true;
            }
        },
        UPDATE_PROGRESS(state) {
            const step = 100 / state.questions.length;
            state.progressPercentage = Math.min(state.progressPercentage + step, 100);
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
            // Assurez-vous de mettre à jour le score ici si nécessaire
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
                if (answer.isCorrect) {
                    commit('INCREMENT_SCORE', answer.isCorrect);
                }
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
        updateProgress({ commit }) {
            commit('NEXT_QUESTION');
            commit('UPDATE_PROGRESS');
        },
        nextQuestion({ commit, dispatch, state }) {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                commit('NEXT_QUESTION');
                dispatch('fetchAnswersForQuestion', state.questions[state.currentQuestionIndex].id);
                commit('RESET_EXPLANATION');
                commit('UPDATE_PROGRESS');
            } else {
                dispatch('finishQuiz');
            }
        },
        finishQuiz({ commit }) {
            commit('FINISH_QUIZ');
            commit('UPDATE_PROGRESS');
        },
        resetQuiz({ commit, dispatch }) {
            commit('RESET_QUIZ');
            dispatch('fetchQuizData', state.currentQuiz.id);
        },
    }


});