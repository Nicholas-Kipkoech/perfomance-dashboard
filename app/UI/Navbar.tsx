'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from './reusableComponents/CustomButton'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { useContextApi } from '../context/Context'

import { Space, Dropdown } from 'antd'
import type { MenuProps } from 'react-select'
import path from 'path/win32'
import { MenuFoldOutlined, MenuOutlined } from '@ant-design/icons'

const Navbar = () => {
  const [user, setUser] = useState<any>({})
  const { logout, setComponent, fromDate, toDate }: any = useContextApi()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken: any = localStorage.getItem('accessToken')
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken)
        setUser(decodedToken)
      }
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const items = [
    {
      label: 'Underwriting',
      key: 'Underwriting',
    },
    {
      label: 'Claims',
      key: 'Claims',
    },
    {
      label: 'Finance',
      key: 'Finance',
    },
    {
      label: 'Statistical',
      key: 'statistical',
    },
  ]

  const handleClick = (e: any) => {
    setComponent(e.key)
  }

  return (
    <div className="w-full border h-[5rem] bg-[#092332] items-center justify-between p-2 flex text-white top-0 sticky">
      <Dropdown
        className="sm:block md:hidden"
        menu={{
          items,
          onClick: handleClick,
        }}
      >
        <MenuOutlined size={20} />
      </Dropdown>
      <div className="flex items-center justify-between gap-8">
        <span className="justify-start font-[700] md:text-[25px] sm:text-[12px] ml-3">
          {user?.orgDesc}
        </span>
        <p>
          [{fromDate.toUpperCase()}] - [{toDate.toUpperCase()}]
        </p>
      </div>
      <div className="flex items-center">
        <CustomButton
          name="Logout"
          className={
            'md:h-[40px] sm:h-[30px] border md:w-[150px] sm:w-[100px]   rounded-md text-white bg-[#cb7529]'
          }
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default Navbar
