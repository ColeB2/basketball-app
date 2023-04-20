import { minutesSort } from '../../src/helpers/helperFunctions';

export function compareBoxscoreData(boxscore, teamId, gameData) {
    console.log('REACHING HERE');
    const teamData = gameData.data.filter(
        (player) => player.team.id === teamId
    );
    teamData.sort(minutesSort);

    boxscore.within(() => {
        cy.get('tbody tr').each((row, rowIndex) => {
            //data
            const expectedData = teamData[rowIndex];

            cy.wrap(row)
                .find('td')
                .each((cell) => {
                    // accessor is classname of table cell.
                    const accessor = cell[0].className;
                    const actualValue = cell.text();
                    if (accessor === 'player') {
                        // Skip player tests, TODO later.
                    } else {
                        let expectedValue = expectedData[accessor];
                        // class name is 3pg_pct ft_pct fg_pct, convert to rate.
                        if (accessor.slice(-3) === 'pct') {
                            let rate = parseFloat(String(expectedValue));
                            rate *= 100;
                            expectedValue = rate.toFixed(1);
                        }
                        expect(actualValue.toString()).to.equal(
                            expectedValue.toString()
                        );
                    }
                });
        });
    });
}
