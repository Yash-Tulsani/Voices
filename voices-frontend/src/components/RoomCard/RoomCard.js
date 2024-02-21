import React from 'react';
import styles from './RoomCard.module.css';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from 'react-router-dom';

function RoomCard({room}){
    // Initialization
    const navigate=useNavigate();

    // Event Listeners
    const handleRoomClick=(e)=>{
        navigate(`/room/${room.id}`);
    }

    return (
        <div className={styles.roomCardContainer} onClick={handleRoomClick} >
            <div className={styles.roomTopic}>{room.topic}</div>
            <div className={styles.speakers}>
                <div className={styles.avatars}>
                    {
                        <AvatarGroup max={3}>
                            {
                            room.speakers.map((speaker,index) => (
                                <Avatar key={speaker.id} style={{zIndex:`${index}`}} className={styles.avatar} src={speaker.avatar} alt="avatar" />
                            ))
                            }
                        </AvatarGroup>
                    }
                </div>   
                <div className={styles.speakerNamesList}>
                    {
                        room.speakers.map((speaker) => (
                            <div key={speaker.id} className={styles.speakerNamesWrapper}>
                                <span className={styles.speakerName}>{speaker.name}</span>
                                <img className={styles.chatIcon} src="/Images/chat-icon.png" alt="chat-icon" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.peopleCountContainer}>
                <span className={styles.peopleCount}>{room.totalPeople}</span>
                <img className={styles.peopleIcon} src="/Images/user-icon.png" alt="people-icon" />
            </div>   
        </div>
    )
}
export default RoomCard;