import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchWallet } from '../redux/actions';

// ao montar o componente, fazer requisição
// dar display da requisição como map -> <option>{currency}</option>

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  render() {
    const { currencies, isFetching } = this.props;
    return (
      <div>
        <Header />
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            id="value-input"
            type="number"
          />
        </label>
        <label htmlFor="description-input">
          Valor:
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
          >
            { (isFetching) ? <option>Carregando</option>
              : currencies.map((currencie, index) => (
                <option key={ index }>
                  { currencie }
                </option>
              )) }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
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
