export const requestToken = async () => {
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL_TOKEN);
  const data = await response.json();
  return data;
};

export const requestQuiz = async (token) => {
  const URL_QUIZ = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL_QUIZ);
  const data = response.json();
  return data;
};
