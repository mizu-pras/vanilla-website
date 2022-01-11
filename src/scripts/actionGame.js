import {
    statusStartGame,
    statusEndGame,
    statusBetActive,
    tableWin,
    tablePeriode,
    tableMax,
    gameTimer,
    textIsRunning,
    buttonEndGame,
    buttonRestartGame
} from './variables/elements'

import { games, resultGame } from './variables/globals'
import { socketLocal } from './variables/globals'

const initGameScreen = () => {
    textIsRunning.textContent = 'running'

    const start = new Date()
    statusStartGame.textContent = start.toString()
    statusEndGame.textContent = '-'

    // reset 
    resultGame.win = 0
    resultGame.totalPeriode = 0
    resultGame.maxDouble = 0

    games.double = 0
    games.betActive = null
    games.double = 0
    games.isWin = false
    games.lastPeriode = null

    updateTableGame()
}

const actionStopGame = () => {
    textIsRunning.textContent = 'stoped'

    const stop = new Date()
    statusEndGame.textContent = stop.toString()

    gameTimer.textContent = ''

    buttonEndGame.style.display = 'none'
    buttonEndGame.disabled = true

    buttonRestartGame.style.display = 'block'
    buttonRestartGame.disabled = false
}

const actionNewValue = (data) => {
    const { win, periode, timer } = data

    if (games.lastPeriode == periode) {
        return
    }
    games.lastPeriode = periode
    resultGame.totalPeriode += 1

    let currentBet = checkBet(Number(win))

    games.isWin = games.betActive === currentBet
    if (games.isWin) {
        games.double = 1

        resultGame.win += 1
        
        if (resultGame.win == resultGame.targetWin) {
            socketLocal.stopGame()

            updateTableGame()
            return
        }
    }
    else {
        games.double += 1
    }

    timerGame(timer)

    if (games.double > resultGame.maxDouble) {
        resultGame.maxDouble = games.double
    }

    let value = games.oneBet
    for (let i = 1; i < games.double; i++) {
        value *= 2
    }

    if (currentBet == 'jp') {
        currentBet = games.betActive
    }

    console.log('send taruhan')
    console.log(`${currentBet}, ${value}`)
    const dataSubmit = {
        betName: currentBet,
        value: value
    }

    socketLocal.socket.emit('submit-bet', dataSubmit)
    statusBetActive.textContent = `${currentBet}, ${value.toLocaleString("id")}`

    games.betActive = currentBet
    updateTableGame()
}

const checkBet = (number) => {
    if (number == 0) {
        return 'jp'
    }

    const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

    return reds.includes(number) ? 'red' : 'black'
}

export const updateTableGame = () => {
    tableWin.innerHTML = resultGame.win
    tablePeriode.innerHTML = resultGame.totalPeriode
    tableMax.innerHTML = resultGame.maxDouble
}

const timerGame = (time) => {
    gameTimer.textContent = time

    let nowTime = time
    const x = setInterval(() => {

        nowTime -= 1

        gameTimer.textContent = nowTime

        if (nowTime < 0) {
            clearInterval(x)
            gameTimer.textContent = 'Closed'
        }


    }, 1000)
}

export {
    initGameScreen,
    actionStopGame,
    actionNewValue
}