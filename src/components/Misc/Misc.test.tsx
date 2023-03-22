import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Misc from './Misc';

describe('Misc', () => {
    it('Renders Misc with moon element that is clickable.', () => {
        const handleClick = vi.fn();
        render(<Misc theme={'dark'} handleClick={() => handleClick()} />);
        // screen.getByRole('');
        const moon = screen.getByTitle('Moon');
        fireEvent.click(moon);
        expect(handleClick).toHaveBeenCalled();
    });
    it('Renders Misc with sun element that is clickable.', () => {
        const handleClick = vi.fn();
        render(<Misc theme={'light'} handleClick={() => handleClick()} />);
        // screen.getByRole('');
        const sun = screen.getByTitle('Sun');
        fireEvent.click(sun);
        expect(handleClick).toHaveBeenCalled();
    });
});
