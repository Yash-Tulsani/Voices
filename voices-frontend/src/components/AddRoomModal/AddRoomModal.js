import React, { useEffect, useRef, useState } from 'react'
import styles from './AddRoomModal.module.css';
import RoomType from  '../RoomType/RoomType.js'
import {toast} from 'react-toastify'
import { createRoom } from '../../http/http';

// Hooks
import { useNavigate } from 'react-router-dom';


const roomTypesData=[
    {
        id: 1,
        name: 'Open',
        icon: '/Images/open-type-icon.svg',
    },
    {
        id: 2,
        name: 'Social',
        icon: '/Images/social-type-icon.png',
    },
    {
        id: 3,
        name: 'Closed',
        icon: '/Images/closed-type-icon.svg',
    }

]

function AddRoomModal({setShowModal}) {
    // Initialization
    const navigate=useNavigate();

    // References
    const outerModalElementRef=useRef(null);

    // Local States
    const [selectedStates,setSelectedStates]=useState([true,false,false]);
    const [roomTopic,setRoomTopic]=useState('');

    // Helper functions
    const checkIsRoomTypeSelected=()=>{
        for(let state of selectedStates){
            if(state===true){
                return true;
            }
        }
        return false;
    }

    // Event Listeners
    const closeModal = (e) => {
        setShowModal(false);
    }
    const closeModalOnClickingOutside = (e) => {
        if(e.target === outerModalElementRef.current){
            setShowModal(false);
            e.stopPropagation();
        }
    }
    const handleRoomTopicChange=(e)=>{
        setRoomTopic(e.target.value);
    }
    const handleCreateRoom=async ()=>{
        if(roomTopic=='' || !checkIsRoomTypeSelected()){
            toast.error("Please fill all the fields.");
            return;
        }
        try{
            const {data}=await createRoom({topic:roomTopic,roomType:roomTypesData[selectedStates.indexOf(true)].name});
            // navigate(`/room/${data.id}`);
            console.log(data);
        }catch(err){
            toast.error("Some error occured. Please try again later.");
        }
        setShowModal(false);
    }

    // Side Effects
    useEffect(() => {
        const outerModalElement = outerModalElementRef.current;
        outerModalElement.addEventListener('click', closeModalOnClickingOutside, true);
        return () => {
            outerModalElement.removeEventListener('click', closeModalOnClickingOutside, true);
        }
    },[]);

    
    return (
        <div ref={outerModalElementRef} className={styles.outerModal}>
            <div className={styles.innerModal}>
                <div className={styles.closeButtonContainer}>
                    <img onClick={closeModal} className={styles.closeButton} src="/Images/close-icon.png" alt="close" />
                </div>
                <div className={styles.innerModalHead}>
                    Enter the topic to be discussed
                </div>
                <input value={roomTopic} onChange={handleRoomTopicChange} className={styles.innerModalInput} type="text" />
                <div className={styles.roomTypeContainer}>
                    <div className={styles.innerModalHead}>
                        Room Type
                    </div>
                    <div className={styles.roomTypesList}>
                        {
                            roomTypesData.map((roomType,index)=>{
                                return <RoomType key={index} name={roomType.name} icon={roomType.icon} index={index}
                                 selectedStates={selectedStates} setSelectedStates={setSelectedStates}/>
                            })
                        }       
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.startRoomContainer}>
                    <span className={styles.startRoomText}>Start a Room</span>
                    <div className={styles.startRoomButton}>
                        <img className={styles.startRoomButtonIcon} src="/Images/start-emoji.svg" alt="" />
                        <span className={styles.startRoomButtonText} onClick={handleCreateRoom}>Let's Go</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal;