import SocketGame from "../sockets/socketGame"
import SocketLocal from "../sockets/socketLocal"

const socketGame = new SocketGame()
const socketLocal = new SocketLocal()

export const resultGame = {
    win: 0,
    totalPeriode: 0,
    maxDouble: 0,
    profit: 0,
    targetWin: 0,
}

export const games = {
    betActive: null,
    // currentWin: null,
    oneBet: 5000,
    double: 0,
    isWin: false,
    lastPeriode: null,

}

export {
    socketGame,
    socketLocal
}