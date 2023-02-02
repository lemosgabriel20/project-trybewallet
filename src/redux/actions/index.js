// Coloque aqui suas actions
export const ADD_EMAIL_USER = 'ADD_EMAIL_USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const REQUEST_ADD_WALLET = 'REQUEST_ADD_WALLET';

export const addUser = (userData) => ({
  type: ADD_EMAIL_USER,
  payload: userData,
});

const requestAddWallet = (bool) => ({
  type: REQUEST_ADD_WALLET,
  payload: bool,
});

const addWallet = (walletData) => ({
  type: ADD_CURRENCIES,
  payload: walletData,
});

export function fetchWallet() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const currencies = (Object.keys(data)).filter((key) => key !== 'USDT');
        dispatch(addWallet(currencies));
        dispatch(requestAddWallet(false));
      });
  };
}
