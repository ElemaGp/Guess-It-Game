import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';

describe("Homepage body", () => {
    test('renders the word Number', () => {
        render(<Home />);
        const numberTexts = screen.getAllByText(/Number/i);
        expect(numberTexts.length).toBe(2);
    });
});

//integration test (tests functionality between two parts of the program)
describe("Game interaction", () => {
    it('Homepage user input and output functionality', async() => {
        render(<Home />);
        const inputElement = screen.getByRole("spinbutton")
        const buttonElement = screen.getByRole("button", { name: /PLAY/i});
        fireEvent.change(inputElement, { target: { value: "90"}})
        fireEvent.click(buttonElement)
        const yourNumber = screen.getByText(/90/i);
        expect (yourNumber).toBeInTheDocument();
    });
});
