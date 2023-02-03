import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
// import Header from '../components/Header';
import App from '../App';

it('Testa se o botão Entrar é clicável após inserir email e senha corretamente', () => {
  renderWithRouterAndRedux(<Login />);
  const button = screen.getByRole('button');
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  expect(button).toBeDisabled();
  userEvent.type(email, 'teste@teste.com');
  userEvent.type(password, '1234567');
  expect(button).toBeEnabled();
  userEvent.click(button);
});

it('', async () => {
  renderWithRouterAndRedux(<Wallet />);
  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  const button = screen.getByTestId('add-button');
  userEvent.type(value, '12');
  userEvent.type(description, 'Dolár');
  userEvent.click(button);
  expect(value).toHaveTextContent('');
  expect(description).toHaveTextContent('');
  // onst email = screen.getByTestId('email-field');
  const total = screen.getByTestId('total-field');
  await waitFor(() => {
    const options = screen.getAllByTestId('option');
    console.log(options);
  });
  const currency = screen.getByTestId('header-currency-field');
  expect(total).toHaveTextContent('0');
  expect(currency).toHaveTextContent('BRL');
});

it('', () => {
  renderWithRouterAndRedux(<App />);
  const div = screen.getByTestId('app-div');
  expect(div).toBeInTheDocument();
});
