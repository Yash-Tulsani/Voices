import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function GuestRoute() {
  const {user}=useSelector((state)=>state.auth)

  return (
    (user && user.activated) ? <Navigate to={"/rooms"}/> : <Outlet/>
  )
}
