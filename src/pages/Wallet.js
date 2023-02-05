import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import { fetchWallet, saveExpenses, updateSavedBool,
  accessEditMode, updateId } from '../redux/actions';

// ao montar o componente, fazer requisição
// dar display da requisição como map -> <option>{currency}</option>

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
    isButtonDisabled: true,
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
          const {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          } = this.state;
          const newData = {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          };
          dispatch(saveExpenses(newData));
          dispatch(updateSavedBool(true));
          this.setState((prevState) => {
            const iterator = 1;
            return ({
              ...prevState,
              id: prevState.id + iterator,
              value: '',
              description: '',
              isButtonDisabled: true,
            });
          });
        });
      });
  };

  handleEdit = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const newData = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(updateId(expenses, newData, idToEdit));
    this.setState({
      value: '',
      description: '',
      isButtonDisabled: true,
    });
    dispatch(accessEditMode(false, null));
  };

  handleInput = (evt) => {
    const { id } = evt.target;
    const { value } = evt.target;
    this.setState({ [id]: value });
  };

  handleValue = (evt) => {
    this.setState({ value: evt.target.value }, () => {
      const { state } = this;
      if (state.value === '') this.setState({ isButtonDisabled: true });
      else this.setState({ isButtonDisabled: false });
    });
  };

  render() {
    const { value, description, isButtonDisabled } = this.state;
    const { currencies, isFetching, editor } = this.props;
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
            onChange={ this.handleValue }
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
        {(editor) ? (
          <button
            data-testid="final-edit-button"
            type="button"
            onClick={ this.handleEdit }
            disabled={ isButtonDisabled }
          >
            Editar despesa
          </button>)
          : (
            <button
              data-testid="add-button"
              type="button"
              onClick={ this.handleClick }
              disabled={ isButtonDisabled }
            >
              Adicionar despesa
            </button>)}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
