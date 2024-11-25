// @ts-nocheck
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useValidateToken from '../hooks/useValidateToken'

const ProtectedRoute = () => {

    const { isValid, isLoading } = useValidateToken()

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isValid === true ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute