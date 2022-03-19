const draggableList = document.getElementById('draggableList')
const checkButton = document.getElementById('checkButton')

const itemsData = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

const listItems = []

let dragStartIndex;

const createList = () => {
    [...itemsData]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((i, j) => i.sort - j.sort)
        .forEach((item, index) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" dtaggable="true">
                    <p class="person-name">${item.value}</p>
                    <i class="fas fa-grip-lanes"></i>
                </div>
            `
            listItems.push(listItem)
            draggableList.appendChild(listItem)
        })
}

createList()
