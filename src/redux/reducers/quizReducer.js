import { ACTION_QUIZ, ACTION_TOKEN, EMAIL_USER } from '../actions';

const INITTIAL_STATE = {
  resultsQuiz: [],
  token: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
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
  case EMAIL_USER:
    return {
      ...state,
      player: { ...state.player, ...action.dataUser },
    };
  default:
    return state;
  }
};

// export default quizReducer;
