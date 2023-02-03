import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchWallet, saveExpenses, updateSavedBool } from '../redux/actions';

// ao montar o componente, fazer requisição
// dar display da requisição como map -> <option>{currency}</option>

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '0',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ exchangeRates: data }, () => {
          dispatch(saveExpenses(this.state));
          dispatch(updateSavedBool(true));
          this.setState((prevState) => {
            const iterator = 1;
            return ({
              ...prevState,
              id: prevState.id + iterator,
              value: '',
              description: '',
            });
          });
        });
      });
  };

  handleInput = (evt) => {
    const { id } = evt.target;
    const { value } = evt.target;
    if (id === 'value') this.setState({ [id]: (value) });
    else this.setState({ [id]: value });
  };

  render() {
    const { value, description } = this.state;
    const { currencies, isFetching } = this.props;
    return (
      <div>
        <Header />
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            type="number"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            type="text"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleInput }
          >
            { (isFetching) ? <option>Carregando</option>
              : currencies.map((currency, index) => (
                <option
                  data-testid="option"
                  key={ index }
                >
                  { currency }
                </option>
              )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            onChange={ this.handleInput }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag"
            onChange={ this.handleInput }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          data-testid="add-button"
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
