import { Socket } from 'socket.io/dist';
import {v4 as UUIDv4} from 'uuid';

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
     const roomId = UUIDv4();
     socket.join(roomId);
     rooms[roomId] = [];
     socket.emit('room-created', {roomId});
     console.log('Room created with roomId: ', roomId);
    };

    const joinedRoom = ({roomId, peerId}: {roomId: string, peerId: string}) => {
      console.log('Check:', {rooms, roomId, peerId});
      if (rooms[roomId]) {
          console.log('New user has joined room ', roomId, ' with peer ID as ', peerId);
          rooms[roomId].push(peerId);
          console.log(rooms[roomId]);
          socket.join(roomId);

          socket.on('ready', () => {
            socket.to(roomId).emit('user-joined', {peerId});
          });

          socket.emit('get-users', {
            roomId,
            participants: rooms[roomId]
          });

      }
    };

    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
};

export default roomHandler;
