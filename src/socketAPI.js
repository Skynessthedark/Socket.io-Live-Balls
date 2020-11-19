const socketio = require('socket.io');
const io = socketio();

const socketAPI = { };
socketAPI.io = io;

const users = { };

//helpers
const randomcolor = require('../helpers/randomColors');

io.on('connection', (socket)=>{
    console.log('a user connected.');

    socket.on('newUser', (data)=>{
        const defaultData = {
            id: socket.id,
            position: {
                x: 0,
                y: 0
            },
            color: randomcolor()
        };

        const userData = Object.assign(data, defaultData);
        users[socket.id] = userData;
        console.log(users);

        socket.broadcast.emit('newUser', userData);
        socket.emit('initPlayers', users);
    });

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('disUser', users[socket.id]);
        delete users[socket.id];
        console.log(users);
    });

    socket.broadcast.on('animate', (data)=>{

        users[socket.id].position.x = data.x;
        users[socket.id].position.y = data.y;
        
        socket.broadcast.emit('animate', {socketId: socket.id, x: data.x, y: data.y});
    });

    socket.on('newMessage', (data)=>{
        socket.broadcast.emit('newMessage', data);
    });
});

module.exports = socketAPI;