import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../http/http'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Navigation.module.css"
import { setAuth } from '../../redux/slices/userAuthSlice'
import {toast} from 'react-toastify'


export default function Navigation() {
  const dispatch=useDispatch();
  const {isAuth}=useSelector((state)=>state.auth);
  async function logoutUser(){
    try{
      const {data}=await logout();
      dispatch(setAuth(data)); 
      toast.success("Logged out successfully")
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <nav className={styles.navbar}>
        <Link to="/">
            <span className={styles.brandName}>Voices</span>
        </Link>
        {isAuth && <div  className={styles.logoutBtn} onClick={logoutUser}>
          Logout
        </div>}
    </nav>
  )
}
