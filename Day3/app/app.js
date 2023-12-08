import {data} from './data.js'

const numbers = []
const symbols = []
const gears = []

const lines = data.split('\n')
// console.log(lines)

for (const [i, line] of lines.entries()) {
    Array.from(line.matchAll(/[^0-9|.]/g)).forEach(match => {
        symbols.push({
            line: i,
            index: match.index
        })
    })

    Array.from(line.matchAll(/[0-9]+/g)).forEach(match => {
        numbers.push({
            line: i,
            start: match.index,
            end: match.index + match[0].length - 1,
            number: parseInt(match[0])
        })
    })
    Array.from(line.matchAll(/\*/g)).forEach(match => {
        gears.push({
            line: i,
            index: match.index
        })
    })
}
console.log(symbols)
console.log(numbers)
console.log(gears)

const isNearby = (number, symbol) =>
    symbol.line <= number.line + 1 &&
    symbol.line >= number.line - 1 &&
    symbol.index >= number.start - 1 &&
    symbol.index <= number.end + 1


const validNumbers = numbers.filter(number => symbols.some(symbol => isNearby(number, symbol)))
console.log(validNumbers)

const validGears = gears
    .map(gear => {
        const matchingNumbers = numbers.filter(number => isNearby(number, gear))
        return {
            isValid: matchingNumbers.length === 2,
            gearRation: matchingNumbers.reduce(
                (acc, number) => acc === 0 ? number.number : acc * number.number,
                0)
        }
    })
    .filter(gear => gear.isValid)

console.log('Part 1: ', validNumbers.reduce((acc, number) => acc + number.number, 0))
console.log('Part 2: ', validGears.reduce((acc, gear) => acc + gear.gearRation, 0))