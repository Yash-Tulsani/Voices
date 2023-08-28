const Room = require('../Models/RoomModel');

class RoomService{
    async createRoom(payload){
        const {topic,roomType,ownerId,speakers}=payload;
        const room=await Room.create({
            topic,
            roomType,
            ownerId,
            speakers
        });
        return room;
    }
    async getAllRooms(types){
        const rooms=await Room.find({roomType: {$in: types}});
        return rooms;
    }
}

module.exports= new RoomService();