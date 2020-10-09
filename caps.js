'use strict';


const io = require('socket.io')(process.env.PORT);

function eventHandler(eventName, room=null){
  // The universal even handler
  return payload=>{
    const time = new Date();
    console.log('EVENT', {event: eventName, time, payload});
    if (!room) caps.emit(eventName, payload);
    else {
      caps.to(payload.store).emit(eventName, payload);
    }
  };
}

//Namespace of caps

const caps = io.of('/caps');

caps.on('connection', (socket)=>{
  socket.on('join', (room)=>{
    const valid = ['1-206-flowers', 'Lovers-flowers'];
    if (valid.includes(room)){
      console.log('Welcome, ', room);
      socket.join(room);
    }
  });

  socket.on('pickup', eventHandler('pickup'));

  socket.on('in-transit', eventHandler('in-transit', true));

  socket.on('delivered', eventHandler('delivered', true));
});

