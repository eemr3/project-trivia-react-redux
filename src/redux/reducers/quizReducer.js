import { ACTION_QUIZ, ACTION_TOKEN } from '../actions';

const INITTIAL_STATE = {
  resultsQuiz: [],
  token: '',
};

export default (state = INITTIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_QUIZ:
    return {
      ...state, resultsQuiz: action.quiz,
    };
  case ACTION_TOKEN:
    localStorage.setItem('token', JSON.stringify(action.token));
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

// export default quizReducer;
