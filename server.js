const express = require('express');
const path = require('path');

//ter uma porta que vai ser acessada pelo websocket
const app = express();
//definir protocolo http
const server = require('http').createServer(app);
//defini o websocket
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));   
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('port', (process.env.PORT || 3005))

app.use('/', (req, res) => {
    res.render('index.html');
});

io.on('connection', socket => {
    console.log(`socket conectado ${socket.id}`);
    socket.on('sendData', data => {
        console.log(data);
        socket.broadcast.emit('receiveData', data);
    })
})

server.listen(app.get('port'), 'localhost', () => {
    console.log('servidor disponível na porta: ' + app.get('port'))
});