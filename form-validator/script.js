const form = document.getElementById('form')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const passwordConfirmInput = document.getElementById('passwordConfirm')

const showError = (input, message) => {
    const formControl = input.parentElement
    const errorSmall = formControl.querySelector('small')
    errorSmall.innerText = message
    formControl.className = 'form-control error'
}

const showSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

const getFieldLabel = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkRequired = (inputs) => {
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldLabel(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

const isValidEmail = (value) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(String(value).toLowerCase())
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([usernameInput, emailInput, passwordInput, passwordConfirmInput])
})

