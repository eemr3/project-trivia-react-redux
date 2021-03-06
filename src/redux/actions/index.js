import { requestQuiz, requestToken } from '../../data/dataApi';

export const ACTION_TOKEN = 'ACTION_TOKEN';
export const ACTION_QUIZ = 'ACTION_QUIZ';
export const EMAIL_USER = 'EMAIL_USER';
export const EXPIRED_TOKEN = 'EXPIRED_TOKEN';
export const TIME_VALUE = 'TIME_VALUE';
export const SCORE_VALUE = 'SCORE_VALUE';
export const TOTAL_SCORE_VALUE = 'TOTAL_SCORE_VALUE';
export const DIFFICULTY_QUESTION = 'DIFFICULTY_QUESTION';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

export const scoreValue = (payload) => ({
  type: SCORE_VALUE,
  payload,
});

export const difficultyQuestion = (payload) => ({
  type: DIFFICULTY_QUESTION,
  payload,
});

export const timerValue = (timeValue) => (
  {
    type: TIME_VALUE, timeValue,
  }
);

export const correctAnswer = (bool) => ({
  type: CORRECT_ANSWER,
  bool,
});

const actionToken = (token) => ({
  type: ACTION_TOKEN,
  token,
});

const actionQuiz = (quiz) => (
  {
    type: ACTION_QUIZ, quiz,
  }
);

export const emailUser = (dataUser) => (
  {
    type: EMAIL_USER, dataUser,
  }
);

export const expiredToken = (code) => (
  {
    type: EXPIRED_TOKEN, code,
  }
);

export const thunkToken = () => async (dispatch) => {
  try {
    let response = await requestToken();
    if (response.token === null || response.response_code !== 0) {
      response = await requestToken();
    } else {
      dispatch(actionToken(response.token));
      dispatch(expiredToken(response.response_code));
    }
  } catch (error) {
    console.log(error);
  }
};

export const thunkQuiz = () => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const CODE_FAILED = 3;
    const data = await requestQuiz(token);
    if (data.response_code === CODE_FAILED) { // Solução utilizando dica do colega/amigo Rafael (Carvalho) Alonso B. Santos - Turma-16Tribo A
      const newTokenRequest = await requestToken(); // Solução utilizando dica do colega/amigo Rafael (Carvalho) Alonso B. Santos - Turma-16Tribo A
      const newDataQuestion = await requestQuiz(newTokenRequest.token); // Solução utilizando dica do colega/amigo Rafael (Carvalho) Alonso B. Santos - Turma-16Tribo A
      dispatch(actionQuiz(newDataQuestion.results));
    } else {
      const response = await requestQuiz(token);
      const dataApi = await response;
      dispatch(actionQuiz(dataApi.results));
    }
  } catch (error) {
    console.error(error);
  }
};
