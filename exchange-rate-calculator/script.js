const currencyOne = document.getElementById('currencyOne')
const amountOne = document.getElementById('amountOne')

const currencyTwo = document.getElementById('currencyTwo')
const amountTwo = document.getElementById('amountTwo')

const rate = document.getElementById('rate')
const swapButton = document.getElementById('swap')

const calculate = async () => {
    const currencyOneVal = currencyOne.value
    const amountOneVal = amountOne.value

    const currencyTwoVal = currencyTwo.value
    
    const apiResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneVal}`)
    const data = await apiResponse.json()
    
    const rateVal = data.rates[currencyTwoVal]
    rate.innerText = `1 ${currencyOneVal} = ${rateVal} ${currencyTwoVal}`
    amountTwo.value = (amountOneVal * rateVal).toFixed(2)
}

currencyOne.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
currencyTwo.addEventListener('change', calculate)
amountTwo.addEventListener('input', calculate)
swapButton.addEventListener('click', () => {
    const tmp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = tmp
    calculate()
})

calculate();
