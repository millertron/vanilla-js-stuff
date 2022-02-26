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

const checkLength = (input, minLength, maxLength) => {
    if (input.value.length < minLength) {
        showError(input, `${getFieldLabel(input)} must be at least ${minLength} characters`)
    } else if (input.value.length > maxLength) {
        showError(input, `${getFieldLabel(input)} must be no longer than ${maxLength} characters`)
    } else {
        showSuccess(input)
    }
}

const checkEmail = (input) => {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(String(input.value).toLowerCase())) {
        showError(input, 'Not a valid email')
    } else {
        showSuccess(input)
    }
}

const checkPasswordsMatch = () => {
    if (passwordInput.value !== passwordConfirmInput.value) {
        showError(passwordConfirmInput, 'Password does not match')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([usernameInput, emailInput, passwordInput, passwordConfirmInput])
    checkLength(username, 3, 15)
    checkLength(password, 9, 255)
    checkEmail(emailInput)
    checkPasswordsMatch()
})

