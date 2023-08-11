import React from 'react';
import { useRef, useEffect } from 'react';
import styles from './RoomType.module.css';

function RoomType({name,icon,index,selectedStates,setSelectedStates}){
    const roomTypeRef = useRef(null);
    useEffect(() =>{
        if(selectedStates[index]){
            roomTypeRef.current.classList.add(styles.roomTypeSelectedContainer);
        }
        else{
            roomTypeRef.current.classList.remove(styles.roomTypeSelectedContainer);
        }
    },[selectedStates])

    function selectRoomType(){
        const newSelectedStates=[false,false,false];
        newSelectedStates[index]=true;
        setSelectedStates(newSelectedStates);
    }
    return (
        <div onClick={selectRoomType} ref={roomTypeRef} className={styles.roomTypeContainer}>
            <img className={styles.roomTypeIcon} src={icon} alt={name} />
            <span className={styles.roomTypeName}>{name}</span>
        </div>
    )
}

export default RoomType;