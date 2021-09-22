const express = require('express');
const http = require("http")
const socketio = require('socket.io');
const { addUsers, removeUser, getUser } = require('./entity');

const app = express()
const server = http.createServer(app);
const io = socketio(server, { cors: {origin: '*'}});

io.on('connect', (socket) => {
    console.log("User Connecetd");

    socket.on('join',({name,room},callBack) => {
        
        const {user, error} = addUsers({id:socket.id, name:name, room:room})

        if(error){
            callBack(error)
            return;
        }

        socket.join(user.room)

        socket.emit('message', {user:'admin',text: `welcome ${user.name}`})

        socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name} joined`})
    })

    socket.on('sendMsg', (message,callback) => {
        const user = getUser(socket.id)

        if(user){
            io.to(user.room).emit('message',{user: user.name, text: message})
        } 

        callback();
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message',{user: 'admin', text: `${user.name} left`})
        }
    })
})

server.listen(8000, () =>{
    console.log("Listening on port 8000")
})