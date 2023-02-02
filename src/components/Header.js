import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses, areSavedValues } = this.props;
    const expensesTotal = (areSavedValues) ? (expenses.reduce((acc, current) => {
      const { value } = current;
      const finalValue = Number(current.exchangeRates[current.currency].ask);
      return (acc + (Number(value) * finalValue));
    }, 0)).toFixed(2) : 0;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { expensesTotal }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  areSavedValues: state.wallet.areSavedValues,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
