import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disableButton: true,
  };

  handleClick = (evt) => {
    evt.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  handleInput = (evt) => {
    const { type } = evt.target;
    this.setState({ [type]: evt.target.value }, () => {
      const { state } = this;
      const minLenght = 6;
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const dotCom = -4;
      if (state.email.match(emailRegex)
        && state.email.slice(dotCom) === '.com'
        && state.password.length >= minLenght) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  };

  render() {
    const { disableButton } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            required
            onChange={ this.handleInput }
          />
          <input
            data-testid="password-input"
            type="password"
            required
            minLength="6"
            onChange={ this.handleInput }
          />
          <button
            type="submit"
            disabled={ disableButton }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
