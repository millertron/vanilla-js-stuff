const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('moneyPlus')
const moneyMinus = document.getElementById('moneyMinus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = localStorage.getItem('transactions')

let transactionData = localStorageTransactions ? JSON.parse(localStorageTransactions) : []

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactionData))
}

const addTransaction = (e) => {
    e.preventDefault()

    if (text.value.trim() !== '' && amount.value.trim() !== '') {
        const transaction = {
            id: transactionData.length + 1,
            text: text.value,
            amount: +amount.value
        }

        transactionData.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStorage()
        text.value = ''
        amount.value = ''
    }
}

const addTransactionDOM = (transaction) => {
    const transactionAmount = transaction.amount
    
    const item = document.createElement('li')
    item.classList.add(transactionAmount >= 0 ? 'plus' : 'minus')
    item.innerHTML = `
        ${transaction.text} <span>${transactionAmount}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
    list.appendChild(item)
}

const removeTransaction = (id) => {
    transactionData = transactionData.filter(transaction => id !== transaction.id)
    updateLocalStorage()
    init()
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

form.addEventListener('submit', addTransaction)

init()
