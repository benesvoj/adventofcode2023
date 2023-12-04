const filePath = 'data.txt';

fetch(filePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        let arr = []
        const lines = data.split('\n')
        lines.forEach(line => {
            const [gameNumber, roundsData] = line.split(':')
            const rounds = roundsData
                .trim()
                .split(';')
                .map(round => {
                    const colorCountPairs = round
                        .trim()
                        .split(',')
                        .map(pair => pair.trim())
                    return colorCountPairs.map(pair => {
                        const [count, color] = pair.split(' ')
                        return {
                            color,
                            count: parseInt(count, 10)
                        }
                    })
                })
            const gameInfo = {
                gameNumber: gameNumber.trim(),
                rounds: rounds
            }
            arr.push(gameInfo)
        })
        console.log('initialGameList',arr)

        const configuration = {red: 12, green: 13, blue: 14}

        const possibleGames = arr.filter(game => {
            const {red, green, blue} = configuration
            const {rounds} = game
            // console.log('unFilteredRounds', rounds)

            const filteredRounds = rounds.filter(round => {
                // console.log('round', round)
                const redCount = (round.filter(item => item.color === 'red')[0] || {}).count || 0
                const greenCount = (round.filter(item => item.color === 'green')[0] || {}).count || 0
                const blueCount = (round.filter(item => item.color === 'blue')[0] || {}).count || 0
                // console.log('redCount', redCount)
                // console.log('greenCount', greenCount)
                // console.log('blueCount', blueCount)
                return redCount <= red && greenCount <= green && blueCount <= blue
            })
            // console.log('filteredRounds', filteredRounds)
            return filteredRounds.length === rounds.length;
        })

        // Determine which games would have been possible if the bag had been loaded with
        // only 12 red cubes, 13 green cubes, and 14 blue cubes.
        // What is the sum of the IDs of those games?
        console.log('possibleGames: ', possibleGames)

        const sum = possibleGames.reduce((acc, game) => {
            const {gameNumber} = game

            return acc + parseInt(gameNumber.trim().split(' ').map(number => number.trim())[1], 10)
        }, 0)
        console.log('sum', sum)

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });