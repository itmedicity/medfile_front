// @ts-nocheck
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    // const token = useSelector(state => state.login.isLoggedIn.token)
    // const isAuthenticated = token !== null
    const isAuthenticated = true
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute