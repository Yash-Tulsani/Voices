const roomService=require('../Services/room-service');
const RoomDto=require('../Data-Transform-Objects/RoomDto');


class RoomsController{
    async createRoom(req,res,next){
        console.log('Creating room');
        const {topic,roomType}=req.body;
        if(!topic || !roomType){
            res.status(400).json({message: "All fields are required"});
            return;
        }
        const room =await roomService.createRoom({
            topic,
            roomType,
            ownerId: req.user._id,
            speakers: [req.user._id]
        })
        console.log(room);
        res.status(200).json(new RoomDto(room));
    }

    async getAllRooms(req,res,next){
        const rooms=await roomService.getAllRooms(['open']);
        const roomDtos=rooms.map(room=>new RoomDto(room));
        res.status(200).json(roomDtos);
    }
}

module.exports=new RoomsController();