const filePath = 'data.txt';

fetch(filePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Part 1: ', getAllPossibleGames(data, {red: 12, green: 13, blue: 14}))
        console.log('Part 2: ', getGamePower(data))

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

const getGamePower = (game) => {
    let arr = parseData(game, 2)
    // console.log(arr)

    let gameTotalPower = 0

    arr.forEach(game => {
        const {gameNumber, values: colorValues} = game

        // console.log('---- Game ----')
        // console.log('colorValues', colorValues)
        let redMax = 1;
        let greenMax = 1;
        let blueMax = 1;

        colorValues.forEach(value => {
            const {color, count} = value

            switch (color) {
                case 'red': {
                    redMax = redMax > count ? redMax : count

                    break;
                }
                case 'green': {
                    greenMax = greenMax > count ? greenMax : count
                    break;
                }
                case 'blue': {
                    blueMax = blueMax > count ? blueMax : count
                    break;
                }
                default:
                    break;
            }
        })
        // console.log('redMax', redMax)
        // console.log('greenMax', greenMax)
        // console.log('blueMax', blueMax)
        let gameRoundPower = redMax * greenMax * blueMax
        // console.log(`${gameNumber}`, gameRoundPower)
        // console.log('colorValues', colorValues);
        gameTotalPower += gameRoundPower
    })

    return gameTotalPower
}

const parseData = (data, part) => {
    let arr = []

    const lines = data.split('\n')

    switch (part) {
        case 1: {
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
                                color, count: parseInt(count, 10)
                            }
                        })
                    })
                const gameInfo = {
                    gameNumber: gameNumber.trim(), rounds: rounds
                }
                arr.push(gameInfo)
            })
            break;
        }
        case 2: {
            lines.forEach(line => {
                const [gameNumber, ...colorValues] = line.split(':')

                // console.log(...colorValues);

                const values = colorValues
                    .join('')
                    .split(/,|;/)
                    .map(colorValues => {
                        // console.log('colorValues', colorValues)
                        const [count, color] = colorValues.trim().split(' ')
                        // console.log('color', color + ' ' + count)
                        // console.log('count', count)
                        return {
                            color: color.replace(';', '').trim(), count: parseInt(count, 10)
                        }

                    })
                const gameInfo = {
                    gameNumber: gameNumber.trim(), values
                }
                // console.log(gameInfo)
                arr.push(gameInfo)
            })
            break;
        }
        default:
            break;
    }
    return arr
    // console.log('initialGameList',arr)
}

const getAllPossibleGames = (data, configuration) => {
    let arr = parseData(data, 1)

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
    // console.log('possibleGames: ', possibleGames)

    return possibleGames.reduce((acc, game) => {
        const {gameNumber} = game

        return acc + parseInt(gameNumber.trim().split(' ').map(number => number.trim())[1], 10)
    }, 0)
}