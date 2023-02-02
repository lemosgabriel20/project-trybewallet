// Coloque aqui suas actions
export const ADD_EMAIL_USER = 'ADD_EMAIL_USER';
export const ADD_WALLET = 'ADD_WALLET';

export const addUser = (userData) => ({
  type: ADD_EMAIL_USER,
  payload: userData,
});

export const addWallet = (walletData) => ({
  type: ADD_WALLET,
  payload: walletData,
});
