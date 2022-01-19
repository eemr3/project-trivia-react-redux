import {
  ACTION_QUIZ,
  ACTION_TOKEN,
  EMAIL_USER,
  EXPIRED_TOKEN,
  TIME_VALUE,
  SCORE_VALUE,
  DIFFICULTY_QUESTION,
  CORRECT_ANSWER,
} from '../actions';

const INITTIAL_STATE = {
  resultsQuiz: [],
  token: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  code: 0,
  finalTime: false,
  timeValue: 0,
  difficulty: 0,
  correctAnswers: false,
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
  case EXPIRED_TOKEN:
    return {
      ...state,
      code: action.code,
    };
  case TIME_VALUE:
    return {
      ...state,
      timeValue: action.timeValue,
    };
  case SCORE_VALUE:
    return { ...state,
      player: { ...state.player, score: action.payload },
    };
  case DIFFICULTY_QUESTION:
    return {
      ...state,
      difficulty: action.payload,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      correctAnswers: action.bool,
    };
  default:
    return state;
  }
};
