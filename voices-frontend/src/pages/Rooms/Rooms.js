import React from 'react'
import { useState, useEffect } from 'react';
import styles from './Rooms.module.css';
import RoomCard from '../../components/RoomCard/RoomCard.js';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import {toast} from 'react-toastify';
import {getRooms} from '../../http/http.js'


// Dummy data, To be replaced with API data
 const rooms = [
      {
          id: 1,
          topic: 'Which framework best for frontend ?',
          speakers: [
              {
                  id: 1,
                  name: 'John Doe',
                  avatar: '/Images/otpImg.png',
              },
              {
                  id: 2,
                  name: 'Jane Doe',
                  avatar: '/Images/otpImg.png',
              },
          ],
          totalPeople: 40,
      },
      {
          id: 3,
          topic: 'What\'s new in machine learning?',
          speakers: [
              {
                  id: 1,
                  name: 'John Doe',
                  avatar: '/Images/otpImg.png',
              },
              {
                  id: 2,
                  name: 'Jane Doe',
                  avatar: '/Images/otpImg.png',
              },
          ],
          totalPeople: 40,
      },
      {
          id: 4,
          topic: 'Why people use stack overflow?',
          speakers: [
              {
                  id: 1,
                  name: 'John Doe',
                  avatar: '/Images/otpImg.png',
              },
              {
                  id: 2,
                  name: 'Jane Doe',
                  avatar: '/Images/otpImg.png',
              },
          ],
          totalPeople: 40,
      },
      {
          id: 5,
          topic: 'Artificial inteligence is the future?',
          speakers: [
              {
                  id: 1,
                  name: 'John Doe',
                  avatar: '/Images/otpImg.png',
              },
              {
                  id: 2,
                  name: 'Jane Doe',
                  avatar: '/Images/otpImg.png',
              },
          ],
          totalPeople: 40,
      },
  ];
  

function Rooms(){
    const [showModal, setShowModal] = useState(false);
    const [rooms,setRooms]=useState([]);

    // Helper functions
    const fetchRooms= async ()=>{
      try{
        const {data}=await getRooms();
        setRooms(data);
        console.log(data);
      }catch(err){
        toast.error(err.message);
        console.log(err.message);
      }
    }

    // Side effects
    useEffect(()=>{
      fetchRooms();
      setRooms(rooms);
    },[])

    // Event Listeners
    const openModal=(e)=>{ 
      setShowModal(true);
    }

    return (
      <>
        <div className={styles.roomsContainer}>
            <div className={styles.roomsHeader}>
                <div className={styles.roomsHeaderLeftSection}>
                  <div className={styles.roomsHeaderTextBox}>
                    <span className={styles.leftHeaderText}>All Voice Rooms</span>
                    <div className={styles.headerUnderline}></div>
                  </div>
                  <div className={styles.roomsSearchBox}>
                    <img className={styles.searchIcon} src="/Images/search-icon.svg" alt="" />
                    <input type="text" className={styles.roomsSearchInput} placeholder="Search rooms"/>
                  </div>
                </div>
                <div className={styles.roomsHeaderRightSection}>
                  <div className={styles.createRoomButton} onClick={openModal}>
                    <img className={styles.createRoomIcon} src="/Images/create-room-icon.svg" alt="" />
                    <span className={styles.createRoomText}>Start a room</span>
                  </div>
                </div>
            </div>
            <div className={styles.roomsListContainer}>
              {
                rooms.map((room,index)=>{
                  return (
                    <RoomCard key={room._id} room={room}/>
                  )
                })
              }
            </div>
        </div>
        {
          showModal && <AddRoomModal setShowModal={setShowModal}/>
        }
       </>
    )
}

export default Rooms