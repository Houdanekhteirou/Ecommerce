'use client'

import React, { useEffect } from 'react'

// import { useNavigate } from 'react-router-dom';

import { useRouter } from 'next/navigation'

import { signOut } from '../Account/userStorageService'

const Logout = () => {
  // const navigate = useNavigate();
  const router = useRouter()

  useEffect(() => {
    // Effectuer la déconnexion
    signOut()

    // Rediriger vers la page de connexion avec un message de déconnexion réussie
    router.push('/Products', { state: { message: 'You have been logged out successfully' } })

    window.location.reload()
  }, [router])

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  )
}

export default Logout
