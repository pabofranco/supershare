import { render, screen } from '@testing-library/react';
import Login from './Login';

test('should contain e-mail input', () => {
  render(<Login />);
  const emailElement = screen.getByPlaceholderText(/E-mail/i);
  expect(emailElement).toBeInTheDocument();
});