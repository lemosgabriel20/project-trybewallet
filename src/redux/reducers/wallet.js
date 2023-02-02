// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_WALLET_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: true,
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'REQUEST_ADD_WALLET':
    return {
      ...state,
      isFetching: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
