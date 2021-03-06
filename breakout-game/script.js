const rulesButton = document.getElementById('rulesButton')
const closeButton = document.getElementById('closeButton')
const rulesSection = document.getElementById('rules')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvasItemColor = '#0095dd'

let score = 0
//using keybuffer as workaround for keydown issue
let keyBuffer = 0

const brickRowCount = 9
const brickColCount = 5

const brickParam = {
    width: 70,
    height: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    alive: true
}

const bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColCount; j++) {
        const x = i * (brickParam.width + brickParam.padding) + brickParam.offsetX
        const y = j * (brickParam.height + brickParam.padding) + brickParam.offsetY
        bricks[i][j] = { x, y, ...brickParam }
    }
}

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

const drawScore = () => {
    ctx.font = '20px Arial'
    ctx.fillStyle = canvasItemColor
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

const drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.width, brick.height)
            ctx.fillStyle = brick.alive ? canvasItemColor : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawBricks()
    drawScore()
}

const movePaddle = () => {
    keyBuffer--
    
    if (keyBuffer < 0) {
        paddle.dx = 0
        keyBuffer = 0
    }

    paddle.x += paddle.dx

    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width
    }
    if (paddle.x < 0) {
        paddle.x = 0
    }
}

const resetBricks = () => {
    bricks.forEach(column => {
        column.forEach(b => b.alive = true)
    })
}

const brickCollision = (brick) => {
    const ballLeft = ball.x - ball.size
    const ballRight = ball.x + ball.size
    const ballTop = ball.y - ball.size
    const ballBottom = ball.y + ball.size

    if (brick.alive
        && ballLeft > brick.x && ballRight < brick.x + brick.width
        && ballBottom > brick.y && ballTop < brick.y + brick.height) {
        ball.dy *= -1
        brick.alive = false
        score++
        if (bricks.length === bricks.filter(b => b.alive).length) {
            resetBricks()
        }
    }
}

const moveBall = () => {
    ball.x += ball.dx
    ball.y -= ball.dy

    const ballLeft = ball.x - ball.size
    const ballRight = ball.x + ball.size
    const ballTop = ball.y - ball.size
    const ballBottom = ball.y + ball.size

    if (ballLeft < 0 || ballRight > canvas.width) {
        ball.dx *= -1
    }
    if (ballTop < 0 || ballBottom > canvas.height) {
        ball.dy *= -1
    }

    if (ballLeft > paddle.x && ballRight < paddle.x + paddle.width
        && ballBottom > paddle.y) {
        ball.dy *= -1
    }

    bricks.forEach(column => {
        column.forEach(brickCollision)
    })

    if (ballBottom > canvas.height) {
        score = 0
        resetBricks()
    }
}

const update = () =>{
    movePaddle()
    moveBall()
    draw()
    requestAnimationFrame(update)
}

const keyDown = (e) => {
    const keyPressed = e.key
    if (['Right', 'ArrowRight', 'a'].includes(keyPressed)) {
        paddle.dx = paddle.speed
        keyBuffer = 5
    } else if (['Left', 'ArrowLeft', 'd'].includes(keyPressed)) {
        paddle.dx = -paddle.speed
        keyBuffer = 5
    }
}

document.addEventListener('keydown', keyDown)

rulesButton.addEventListener('click', () => rules.classList.add('show'))
closeButton.addEventListener('click', () => rules.classList.remove('show'))

update()
