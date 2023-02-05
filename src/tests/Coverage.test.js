import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
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
  const total = screen.getByTestId('total-field');
  const currency = screen.getByTestId('header-currency-field');
  expect(total).toHaveTextContent('0');
  expect(currency).toHaveTextContent('BRL');
});

it('', () => {
  renderWithRouterAndRedux(<App />);
  const div = screen.getByTestId('app-div');
  expect(div).toBeInTheDocument();
});

it('', async () => {
  renderWithRouterAndRedux(<Wallet />);
  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  const addButton = screen.getByTestId('add-button');
  userEvent.type(value, '12');
  userEvent.type(description, 'Doze dólares');
  userEvent.click(addButton);
  await waitFor(() => {
    const tableElements = screen.getAllByTestId('tbody-test');
    const deleteButtons = screen.getAllByTestId('delete-btn');
    expect(tableElements).toHaveLength(1);
    userEvent.click(deleteButtons[0]);
    expect(tableElements).toHaveLength(0);
  }, { timeout: 3000 });
  await waitFor(() => {
    userEvent.type(value, '12');
    userEvent.type(description, 'Doze dólares');
    userEvent.click(addButton);
    const tableElements = screen.getAllByTestId('tbody-test');
    const editButtons = screen.getAllByTestId('edit-btn');
    const finalEditBtn = screen.getByTestId('final-edit-button');
    expect(tableElements).toHaveLength(1);
    userEvent.click(editButtons[0]);
    userEvent.type(value, '13');
    userEvent.type(description, 'Treze dólares');
    userEvent.click(finalEditBtn);
    expect(tableElements).toHaveLength(1);
  }, { timeout: 3000 });
});
