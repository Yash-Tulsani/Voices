import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function GuestRoute() {
  const isAuth=useSelector((state)=>state.isAuth)
  return (
    isAuth ? <Navigate to={"/rooms"}/> : <Outlet/>
  )
}
