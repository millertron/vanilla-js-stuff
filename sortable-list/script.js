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

let dragStartIndex
let currentDragItem

const swapItems = (endIndex) => {
    const source = listItems[dragStartIndex].querySelector('.draggable')
    const target = listItems[endIndex].querySelector('.draggable')

    listItems[dragStartIndex].appendChild(target)
    listItems[endIndex].appendChild(source)

    source.closest('li').classList.remove('over')
}

const dragStart = (e) => {
    const item = e.target
    dragStartIndex = +item.closest('li').getAttribute('data-index')
}

const dragOver = (e) => {
    e.preventDefault()
}

const dragDrop = (e) => {
    const item = e.target
    const dragEndIndex = +item.closest('li').getAttribute('data-index')
    swapItems(dragEndIndex)
}

const dragEnter = (e) => {
    const item = e.target
    currentDragItem = item.closest('li')
    item.closest('li').classList.add('over')
}

const dragLeave = (e) => {
    const item = e.target
    if (currentDragItem !== item.closest('li')) {
        item.closest('li').classList.remove('over')
    }
}

const addDragEventListeners = () => {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(item => {
        item.addEventListener('dragstart', dragStart)
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragdrop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

const createList = () => {
    [...itemsData]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((i, j) => i.sort - j.sort)
        .forEach((item, index) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${item.value}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `
            listItems.push(listItem)
            draggableList.appendChild(listItem)
        })
    addDragEventListeners()
}

const checkItemOrder = () => {
    listItems.forEach((item, index) => {
        const value = item.querySelector('.draggable').innerText.trim()
        if (value === itemsData[index]) {
            item.classList.add('right')
            item.classList.remove('wrong')
        } else {
            item.classList.add('wrong')
            item.classList.remove('add')
        }
    })
}

checkButton.addEventListener('click', checkItemOrder)

createList()
