import { render, screen } from '@testing-library/react';
import { RegistrationTemplate } from './RegistrationTemplate';

test('should contain e-mail input field', () => {
    render(<RegistrationTemplate />);
    const inputElement = screen.getByPlaceholderText(/E-mail/i);
    expect(inputElement).toBeInTheDocument();
});
