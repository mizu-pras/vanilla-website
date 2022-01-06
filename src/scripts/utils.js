import {
    contentElement
} from './variables/elements'

export const changeComponent = (id) => {
    for(let i = 0, n = contentElement.length; i < n; i++) {
        contentElement[i].style.display = 'none'
    }

    document.getElementById(id).style.display = 'flex'
}