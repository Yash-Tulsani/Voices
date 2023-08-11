import React, { useEffect, useRef, useState } from 'react'
import styles from './AddRoomModal.module.css';
import RoomType from  '../RoomType/RoomType.js'


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
    const outerModalElementRef=useRef(null);
    const [selectedStates,setSelectedStates]=useState([false,false,false]);

    useEffect(() => {
        const outerModalElement = outerModalElementRef.current;
        outerModalElement.addEventListener('click', closeModal, true);
        return () => {
            outerModalElement.removeEventListener('click', closeModal, true);
        }
    },[]);

    const closeModal = (e) => {
        // e.stopPropagation();
        // setShowModal(false);
    }
    return (
        <div onClick={closeModal} ref={outerModalElementRef} className={styles.outerModal}>
            <div className={styles.innerModal}>
                <div className={styles.closeButtonContainer}>
                    <img onClick={closeModal} className={styles.closeButton} src="/Images/close-icon.png" alt="close" />
                </div>
                <div className={styles.innerModalHead}>
                    Enter the topic to be discussed
                </div>
                <input className={styles.innerModalInput} type="text" />
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
                        <span className={styles.startRoomButtonText}>Let's Go</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal;