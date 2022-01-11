import io from "socket.io-client"
import { socketGame } from '../variables/globals'
import { progressOpenGameText, statusBetStatus } from '../variables/elements'
import { changeComponent } from '../utils'
import { initGameScreen, actionStopGame } from '../actionGame'

class SocketLocal {
    socket

    constructor() {
        console.log('setup socket local')

        progressOpenGameText.textContent = 'Start'
    }

    connectSocket() {
        console.log('connect socket local')

        this.socket = io("http://localhost:3000")
        // this.socket = io("128.199.178.134:8000/")

        console.log('socket local', this.socket)

        // proses open game
        this.socket.on("message-status", (data) => {
            progressOpenGameText.textContent = data
        })

        // finished open game
        this.socket.on("success-start-game", (data) => {
            console.log('success start game:', data)

            progressOpenGameText.textContent = ''

            changeComponent('game-screen')

            initGameScreen()
            
            socketGame.connectSocket(this.socket)
        })

        // status submit bet
        this.socket.on('status-submit-bet', (data) => {
            console.log('status-submit-bet', data)

            if (!data.status) {
                this.stopGame()
            }

            statusBetStatus.textContent = data.message
        })
    }
    
    startGame(data) {
        console.log('start game')

        this.socket.emit('start-game', data)
    }

    stopGame() {
        console.log('stop game')

        this.socket.emit('stop-game', 'stop game')

        this.socket.close()
        socketGame.socket.close()

        actionStopGame()
    }
}

export default SocketLocal