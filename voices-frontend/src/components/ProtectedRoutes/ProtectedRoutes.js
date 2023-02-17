import React from 'react'
import { Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function ProtectedRoutes() {
    const isAuth=useSelector((state)=> state.isAuth)
  return (
    isAuth? <Outlet/>:<Navigate to="/" />
  )
}
