// @ts-nocheck
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const auth_token = localStorage.getItem("app_auth")
    return (auth_token !== null && auth_token !== undefined) ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute