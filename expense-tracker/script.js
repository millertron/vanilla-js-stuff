const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('moneyPlus')
const moneyMinus = document.getElementById('moneyMinus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const transactionData = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10}
]

const addTransactionDOM = (transaction) => {
    const transactionAmount = transaction.amount
    
    const item = document.createElement('li')
    item.classList.add(transactionAmount >= 0 ? 'plus' : 'minus')
    item.innerHTML = `
        ${transaction.text} <span>${transactionAmount}</span>
        <button class="delete-btn">x</button>
    `
    list.appendChild(item)
}

const sumAndFormat = (amounts) => {
    return amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
}

const updateValues = () => {
    const amounts = transactionData.map(transaction => transaction.amount)
    const total = sumAndFormat(amounts)

    const income = sumAndFormat(amounts.filter(item => item > 0))    
    const expense = sumAndFormat(amounts.filter(item => item < 0))
    
    balance.innerText = `$${total}`
    moneyPlus.innerText = `$${income}`
    moneyMinus.innerText = `$${expense}`
}

const init = () => {
    list.innerHTML = ''
    transactionData.forEach(addTransactionDOM)
    updateValues()
}


init()
