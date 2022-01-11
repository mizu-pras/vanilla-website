import io from "socket.io-client"
import { actionNewValue } from '../actionGame'

class SocketGame {
    constructor() {
        console.log('setup socket game')
    }

    connectSocket(sockLocal) {
        console.log('connect socket game')

        const user = {
            nickname: "DWTKVALARDT",
            operatorId: 287495130
        }

        this.socket = io("https://socketbalancing.menangtoto.pw", {
            transports: ["websocket"],
            upgrade: false,
            query: `user=${user.nickname}&agent=${user.operatorId}`
        })

        console.log('socket game', this.socket)
        console.log('socket local', sockLocal)

        this.socket.on('loadNewValue', (data) => {
            if (data.game && data.game == 'rouletteb') {
                console.log('loadNewValue', data)

                actionNewValue(data)
            }
        })
    }
}

export default SocketGame