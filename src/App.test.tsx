import { describe } from 'vitest';
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';

import App from './App';

describe('App', () => {
    it('Renders App component', async () => {
        // Arrange
        render(<App />);
        // const spy = vi.spyOn(server);
        // await waitFor(() => expect(spy).toHaveBeenCalled());
        await waitForElementToBeRemoved(() => screen.getByText('Loading'));
        // await waitFor(() => screen.getByText('TOR'));
        screen.getByRole('');
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
