import { ACTION_QUIZ } from '../actions';

const INITTIAL_STATE = {
  resultsQuiz: [],
  token: '',
};

const quizReducer = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_QUIZ:
    return {
      ...state, resultsQuiz: action.quiz,
    };
  default:
    return state;
  }
};

export default quizReducer;
