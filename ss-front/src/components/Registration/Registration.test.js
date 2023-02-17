import { render, screen } from '@testing-library/jest-dom';
import Registration from './Registration';

test('should contain e-mail input field', () => {
    render(<Registration />);
    const inputElement = screen.getByPlaceHolder(/E-mail/i);
    expect(inputElement).toBeInTheDocument();
});
