import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  // Pegar valor total das expenses
  render() {
    const { expenses, areSavedValues } = this.props;
    return (
      <table>
        <tbody>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
          { (areSavedValues) ? (expenses.map((expense, index) => {
            console.log(expense);
            const idx = index * index;
            const currencyName = Object.values(expense.exchangeRates);
            const exactCurrency = (currencyName.find((curr) => {
              const currSym = expense.currency;
              return curr.code === currSym;
            }));
            return (
              <tr key={ idx }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ exactCurrency.name }</td>
                <td>{ Number(exactCurrency.ask).toFixed(2) }</td>
                <td>{(Number(exactCurrency.ask) * Number(expense.value)).toFixed(2)}</td>
                <td>Real</td>
                <td>{ /* button */ }</td>
              </tr>
            );
          }))
            : null }
        </tbody>
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
