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
    const response = await requestToken();
    const data = await response;
    dispatch(actionToken(data));
  } catch (error) {
    console.log(error);
  }
};

export const thunkQuiz = (token) => async (dispatch) => {
  try {
    const response = await requestQuiz(token);
    const data = await response;
    dispatch(actionQuiz(data.results));
    dispatch(expiredToken(data.response_code));
  } catch (error) {
    console.error(error);
  }
};
