import { requestQuiz, requestToken } from '../../data/dataApi';

export const ACTION_TOKEN = 'ACTION_TOKEN';
export const ACTION_QUIZ = 'ACTION_QUIZ';
export const EMAIL_USER = 'EMAIL_USER';

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
    const data = await response.results;
    dispatch(actionQuiz(data));
  } catch (error) {
    console.error(error);
  }
};
