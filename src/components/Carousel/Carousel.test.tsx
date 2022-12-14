import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Carousel from './Carousel';

describe('Carousel', () => {
    it('Renders Carousel component', () => {
        // Arrange
        const handleClick = () => {};
        render(
            <Carousel key={1} data={[]} meta={{}} handleClick={handleClick} />
        );
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
