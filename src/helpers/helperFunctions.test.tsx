import { describe } from 'vitest';

import { formatTimeInET } from './helperFunctions';

describe('ScoreCard', () => {
    it('Does something', () => {
        const time = '2023-04-11T23:30:00Z';
        const expectedString = '7:30 PM EDT';
        // time output gives narrowno-break space
        // (U+202F) character in unicode
        const sanitizedTimeOutput = formatTimeInET(time).replace(
            /\u202F/g,
            ' '
        );
        expect(sanitizedTimeOutput).toBe(expectedString);
    });
});
