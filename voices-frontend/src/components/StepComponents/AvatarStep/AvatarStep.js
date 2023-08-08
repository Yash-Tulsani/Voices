import React,{useState,useRef} from 'react'
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import styles from './AvatarStep.module.css'
import {setAvatar} from '../../../redux/slices/activateSlice'

import { useSelector,useDispatch } from 'react-redux';



export default function AvatarStep() {
  const dispatch=useDispatch();
  const imgFromStore=useSelector((state)=>state.activate).avatar;

  const inputElement=useRef()
  const [image,setImage]=useState(imgFromStore);
  const {username}=useSelector((state)=>state.activate);

  const handleImageUpload=(e)=>{
    const imgFile=e.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
    reader.readAsDataURL(imgFile);
  }

  const handleAvatarClick=()=>{
    inputElement.current.click();
  }



  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarTextBox}>
        <div className={styles.avatarHeader}>Okay, <span className={styles.username}>{username} </span> !</div>
        
      </div>
      <div className={styles.avatarSelectBox}>
        <div className={styles.avatarText}>{imgFromStore!=""?"How's this photo?":"Choose a profile photo"}</div>
        <Avatar alt="Set Image" src={image} onClick={handleAvatarClick} className={styles.avatarImg} sx={{width:"6vmax",height:"6vmax",fontSize:"3vmax"}} >
          <AddAPhotoIcon sx={{fontSize:"2.5vmax"}}/>
        </Avatar>
        <input type="file" accept='image/*' ref={inputElement} id="imgInput" style={{display:"none"}} onChange={handleImageUpload}/>
        <label htmlFor='imgInput' className={styles.chooseImgText}>Choose a different photo</label>
      </div>
      
    </div>
  )
}
