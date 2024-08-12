'use client'
import React, { useEffect } from 'react'
import { useContextApi } from '../context/Context'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import Statistical from './statistical/page'

const Dashboard = () => {
  const { isAuthenticated }: any = useContextApi()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const currentTime = Math.floor(Date.now() / 1000)
        const accessToken: string | any = localStorage.getItem('accessToken')
        const decodedToken: any | string = jwtDecode(accessToken)
        if (!isAuthenticated() || currentTime > decodedToken.exp) {
          router.push('/')
        }
      }
    }
    checkAuth()
  }, [isAuthenticated, router])

  return (
    <div className="mt-[20px] ml-4 flex flex-col justify-center">
      <Statistical />
    </div>
  )
}

export default Dashboard
