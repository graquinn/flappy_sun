document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const announceBox = document.querySelector('.over-announcement')

    let overAnnouncement = 'Try Again Sweetie!'

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 440

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)


    function generateObstacle () {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 90
        let obstacleBottom = randomHeight

        const obstacle = document.createElement('div')
        const  topObstacle = document.createElement('div')

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('top-obstacle')
        } 
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)

        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'

        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            } 
            
            if (
                obstacleLeft > 180 && obstacleLeft < 260 && birdLeft === 220 && 
               (birdBottom < obstacleBottom + 126|| birdBottom > obstacleBottom + gap - 222)||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)     
    }

    generateObstacle()



    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over!')
        isGameOver = true
        document.removeEventListener('keyup', control)
        // style.removeProperty('.endScreen')
     if (isGameOver === true) {
            ground.classList.add('paused')
            announceBox.innerHTML = overAnnouncement;
    }
}
   

})







