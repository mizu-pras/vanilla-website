import {
    buttonEnter,
    buttonBackFromGame,
    formStartGame,
    urlWebInput,
    urlGameInput,
    usernameInput,
    passwordInput,
    idLobbyInput,
    oneBetInput
} from './variables/elements'

import { games } from './variables/globals'

import { changeComponent } from './utils'

buttonEnter.addEventListener('click', () => {
    changeComponent('start-game-screen')
})

buttonBackFromGame.addEventListener('click', () => {
    changeComponent('welcome-screen')
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

    console.log('games', games)

    // if success pass validation form
    changeComponent('loading-screen')
})