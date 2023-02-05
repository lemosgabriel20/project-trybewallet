import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses, accessEditMode } from '../redux/actions';

class Table extends Component {
  handleDelete = (selected) => {
    const { dispatch, expenses } = this.props;
    const newData = expenses.filter((exp) => exp.id !== selected.id);
    dispatch(updateExpenses(newData));
  };

  handleEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(accessEditMode(true, expense.id));
  };

  render() {
    const { expenses, areSavedValues } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { (areSavedValues) ? (expenses.map((expense) => {
          const currencyName = Object.values(expense.exchangeRates);
          const exactCurrency = (currencyName.find((curr) => {
            const currSym = expense.currency;
            return curr.code === currSym;
          }));
          const rate = Number(exactCurrency.ask);
          return (
            <tbody data-testid="tbody-test" key={ expense.id }>
              <tr>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ exactCurrency.name }</td>
                <td>{ Number(exactCurrency.ask).toFixed(2) }</td>
                <td>{(rate * Number(expense.value)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(expense) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          );
        }))
          : null }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  areSavedValues: state.wallet.areSavedValues,
});

Table.propTypes = {
  expenses: PropTypes.obj,
}.isRequired;

export default connect(mapStateToProps)(Table);
