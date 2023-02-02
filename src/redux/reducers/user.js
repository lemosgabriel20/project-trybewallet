// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_USER_STATE = {
  email: '',
};

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case 'ADD_EMAIL_USER':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
