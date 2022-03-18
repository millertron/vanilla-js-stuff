const rulesButton = document.getElementById('rulesButton')
const closeButton = document.getElementById('closeButton')
const rulesSection = document.getElementById('rules')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvasItemColor = '#0095dd'

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 80,
    height: 10,
    speed: 8,
    dx: 0
}

const drawBall = () => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = canvasItemColor
    ctx.fill()
    ctx.closePath()
}

const drawPaddle = () => {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height)
    ctx.fillStyle = canvasItemColor
    ctx.fill()
    ctx.closePath()
}

const draw = () => {
    drawBall()
    drawPaddle()
}

rulesButton.addEventListener('click', () => rules.classList.add('show'))
closeButton.addEventListener('click', () => rules.classList.remove('show'))

draw()
