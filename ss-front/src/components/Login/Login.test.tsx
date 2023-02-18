import { render, screen } from '@testing-library/react';
import { LoginTemplate } from './LoginTemplate';

test('should contain e-mail input', () => {
  render(<LoginTemplate />);
  const emailElement = screen.getByPlaceholderText(/E-mail/i);
  expect(emailElement).toBeInTheDocument();
});