import {
    buttonEnter,
    buttonBackFromGame,
    buttonEndGame,
    buttonRestartGame,
    formStartGame,
    urlWebInput,
    urlGameInput,
    usernameInput,
    passwordInput,
    idLobbyInput,
    oneBetInput,
    targetWinInput
} from './variables/elements'

import { games, socketLocal, resultGame } from './variables/globals'

import { changeComponent } from './utils'

buttonEnter.addEventListener('click', () => {
    socketLocal.connectSocket()

    changeComponent('start-game-screen')
})

buttonBackFromGame.addEventListener('click', () => {
    changeComponent('welcome-screen')

    socketLocal.stopGame()
})

formStartGame.addEventListener('submit', function(event) {
    event.preventDefault()

    const data = {
        url: urlWebInput.value, 
        urlgame: urlGameInput.value, 
        username: usernameInput.value, 
        password: passwordInput.value,
        idlobby: idLobbyInput.value
    }
    console.log('data form', data)

    if (!data.url || !data.urlgame || !data.username || !data.password || !data.idlobby) {
        alert('Please fill input field!')
        return
    }

    if (oneBetInput.value) {
        games.oneBet = Number(oneBetInput.value)
    }
    if (targetWinInput.value) {
        resultGame.targetWin = Number(targetWinInput.value)
    }

	socketLocal.startGame(data)

    // if success pass validation form
    changeComponent('loading-screen')
})

buttonEndGame.addEventListener('click', () => {
    socketLocal.stopGame()
})

buttonRestartGame.addEventListener('click', () => {
    changeComponent('welcome-screen')

    buttonRestartGame.style.display = 'none'
    buttonRestartGame.disabled = true

    buttonEndGame.style.display = 'block'
    buttonEndGame.disabled = false
    
    
})

if (window.performance) {
    console.info("window.performance works fine on this browser");
}