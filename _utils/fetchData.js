export const fetchData = async (filePath) => {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.text()
        })
        .then(data => {
            return parseData(data)
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
        })
}

const parseData = (data) => {
    const lines = data.split('\n')
    const array = []

    lines.forEach(line => {
        array.push(line)
    })

    console.log(array)
    return array
}