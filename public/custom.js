
const socket = io('http://localhost:3005');
let container = document.getElementById('container');
let image = document.getElementById('carro');
let positionHorizontal = 0;
let positionVertical = 0;
let rotate = 'rotate-top';
console.log(process.env.APP_URL);
const keyBoard = {
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40,
    keyA: 65,
    keyW: 87,
    keyD: 68,
    keyS: 83
}

renderImagePosition = atributes => {
    image.style.marginLeft = atributes.horizontal + 'px';
    image.style.marginTop = atributes.vertical + 'px';
    image.className = atributes.rotation;
    // console.log(atributes.horizontal, atributes.vertical);
}

socket.on('receiveData', data => {
    positionHorizontal = data.horizontal;
    positionVertical = data.vertical;
    rotate = data.rotation;
    renderImagePosition(data);
})

move = e => {
    switch (e.keyCode) {
        case keyBoard.arrowRight:
        case keyBoard.keyD:
            if (container.clientWidth - 100 <= positionHorizontal) {
                positionHorizontal = container.clientWidth - 100;
            } else {
                positionHorizontal += 10;
            }
            rotate = 'rotate-right';
            // console.log('direita')

            break;
        case keyBoard.arrowLeft:
        case keyBoard.keyA:
            if (positionHorizontal <= 5) {
                positionHorizontal = 0;
            } else {
                positionHorizontal -= 10;
            }
            rotate = 'rotate-left';
            // console.log('esquerda')

            break;
        case keyBoard.arrowUp:
        case keyBoard.keyW:
            if (positionVertical <= 5) {
                positionVertical = 0;
            } else {
                positionVertical -= 10;
            }
            rotate = 'rotate-top';
            // console.log('cima')

            break;
        case keyBoard.arrowDown:
        case keyBoard.keyS:
            if (container.clientHeight - 100 <= positionVertical) {
                positionVertical = container.clientHeight - 100;
            } else {
                positionVertical += 10;
            }
            rotate = 'rotate-down';
            // console.log('baixo')

            break;
        default:
            break;
    }

    let attImage = {
        horizontal: positionHorizontal,
        vertical: positionVertical,
        rotation: rotate
    }

    renderImagePosition(attImage);
    socket.emit('sendData', attImage);


}

document.addEventListener('keydown', move);

