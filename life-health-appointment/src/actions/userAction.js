export const LOGGED_IN = 'LOGGED_IN';

export const userAccSuccess = (data) => ({
  type: LOGGED_IN,
  payload: data,
});
