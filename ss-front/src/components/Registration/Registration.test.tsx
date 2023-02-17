import { render, screen } from '@testing-library/react';
import Registration from './Registration';

test('should contain e-mail input field', () => {
    render(<Registration />);
    const inputElement = screen.getByPlaceholderText(/E-mail/i);
    expect(inputElement).toBeInTheDocument();
});
