const filePath = 'data.txt';

fetch(filePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        let sum = 0;
        data.split('\n')
            .forEach(line => {
                console.log('line:', line)
                let numberLine = line
                    .replaceAll('one', 'o1e')
                    .replaceAll('two', 't2o')
                    .replaceAll('three', 't3e')
                    .replaceAll('four', 'f4r')
                    .replaceAll('five', 'f5e')
                    .replaceAll('six', 's6x')
                    .replaceAll('seven', 's7n')
                    .replaceAll('eight', 'e8t')
                    .replaceAll('nine', 'n9n')
                    .split('')
                    .map(char => (isNaN(Number(char))
                        ? null
                        : Number(char)))
                    .filter(char => char !== null)
                console.log('numbers in line:', numberLine)
                let lineNumber = Number(String(numberLine[0]) + String(numberLine[numberLine.length - 1]))
                console.log('line number:', lineNumber)
                sum += lineNumber
                console.log('summary:', sum)
            })
        console.log(sum)
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });