import { describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';

describe('App', () => {
    it('Renders App component', async () => {
        render(<App />);

        await waitFor(() => screen.getByText('CLE'));
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        expect(tables.length).toBe(15);
    });
    it('Renders Tables/Games Properly', async () => {
        render(<App />);

        await waitFor(() => screen.getByText('CLE'));
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        expect(tables.length).toBe(15);

        for (let i = 0; i <= 3; i++) {
            const table = tables[i];
            expect(table).toHaveTextContent(tableDataToday[i]);
        }
        for (let i = 0; i < tables.length; i++) {
            const table = tables[i];
            console.log(table.textContent);
        }
        for (let i = 5; i < tables.length; i++) {
            const table = tables[i];
            expect(table).toHaveTextContent(tableDataTomo[i - 5]);
        }
    });
});

const tableDataToday: string[] = [
    'FinalCleveland CavaliersCLE116Brooklyn NetsBKN114',
    'FinalNew York KnicksNYK106Orlando MagicORL111',
    'FinalOklahoma City ThunderOKC105Los Angeles ClippersLAC127',
    'FinalCharlotte HornetsCHA96New Orleans Pelicans NOP115',
];

const tableDataTomo: string[] = [
    '10:30 PM ETOklahoma City ThunderOKC0Los Angeles LakersLAL0',
    '10:00 PM ETChicago BullsCHI0Portland Trail BlazersPOR0',
    '10:00 PM ETPhoenix SunsPHX0Sacramento KingsSAC0',
    '7:00 PM ETSan Antonio Spurs SAS0Washington WizardsWAS0',
    '7:00 PM ETIndiana PacersIND0Boston CelticsBOS0',
    '8:30 PM ETCharlotte HornetsCHA0Dallas MavericksDAL0',
    '7:30 PM ETDetroit PistonsDET0Toronto RaptorsTOR0',
    '9:00 PM ETMilwaukee BucksMIL0Utah JazzUTA0',
    '8:00 PM ETHouston RocketsHOU0Memphis GrizzliesMEM0',
    '10:00 PM ETPhiladelphia 76ersPHI0Golden State WarriorsGSW0',
    '10:30 PM ETOklahoma City ThunderOKC0Los Angeles LakersLAL0',
];
