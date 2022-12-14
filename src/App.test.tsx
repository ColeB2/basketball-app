import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
    it('Renders App component', () => {
        // Arrange
        render(<App />);
        // Act
        // Expect
        // screen.debug();

        // screen.getByRole('');
        // expect(
        //     screen.getByRole('generic', {
        //         level: 1,
        //     })
        // ).toHaveTextContent('<divclass="boxscore-containers"/>');
    });
});
