// Coloque aqui suas actions
export const ADD_EMAIL_USER = 'ADD_EMAIL_USER';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const REQUEST_ADD_WALLET = 'REQUEST_ADD_WALLET';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const UPDATE_SAVED_VALUES_BOOL = 'UPDATE_SAVED_VALUES_BOOL';

export const addUser = (userData) => ({
  type: ADD_EMAIL_USER,
  payload: userData,
});

const requestAddWallet = (bool) => ({
  type: REQUEST_ADD_WALLET,
  payload: bool,
});

export const updateSavedBool = (bool) => ({
  type: UPDATE_SAVED_VALUES_BOOL,
  payload: bool,
});

const addWallet = (walletData) => ({
  type: ADD_CURRENCIES,
  payload: walletData,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
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
