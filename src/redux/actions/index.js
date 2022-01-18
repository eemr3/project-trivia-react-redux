import { requestQuiz, requestToken } from '../../data/dataApi';
// import handleAnswers from '../../components/Quiz';

export const ACTION_TOKEN = 'ACTION_TOKEN';
export const ACTION_QUIZ = 'ACTION_QUIZ';
export const EMAIL_USER = 'EMAIL_USER';
export const EXPIRED_TOKEN = 'EXPIRED_TOKEN';

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

    if (data.response_code === CODE_FAILED) {
      const newTokenRequest = await requestToken();
      const newDataQuestion = await requestQuiz(newTokenRequest.token);
      dispatch(actionQuiz(newDataQuestion));
    } else {
      const response = await requestQuiz(token);
      const dataApi = await response;
      dispatch(actionQuiz(dataApi.results));
    }
  } catch (error) {
    console.error(error);
  }
};
