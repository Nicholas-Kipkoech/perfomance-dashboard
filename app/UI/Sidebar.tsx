'use client'
import React, { useEffect, useState } from 'react'
import { useContextApi } from '../context/Context'
import Image from 'next/image'
import iconLogo from '../assets/iconLogo.png'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken: any = localStorage.getItem('accessToken')
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken)
        setUser(decodedToken)
      }
    }
  }, [])

  const { setComponent, component }: any = useContextApi()
  const menuItems = [
    {
      name: 'Modules',
      items: [
        {
          name: 'Underwriting',
        },
        {
          name: 'Claims',
        },
        {
          name: 'Finance',
        },
        {
          name: 'Reinsurance',
        },
      ],
    },
  ]
  return (
    <div className="flex flex-col   h-full overflow-y-auto text-white">
      <Image
        src={iconLogo}
        alt="logo"
        className={'h-[80px] object-contain '}
        style={{ background: 'white' }}
      />
      <div className="h-[60px] mt-2 flex justify-center">
        <p className="text-[14px]">{user?.userEmail?.toUpperCase()}</p>
      </div>
      <div className="gap-2 mt-10 flex p-[3px] flex-col">
        {menuItems.map((item, key) => (
          <div key={key} className="text-[18px]">
            {item.name}
            <div>
              {item.items.map((item, key) => (
                <div
                  onClick={() => setComponent(item.name)}
                  className={`h-[30px] text-[14px] ${
                    component === item.name
                      ? 'bg-white text-black'
                      : 'text-white'
                  }   cursor-pointer mt-[2px] flex items-center justify-center`}
                  key={key}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
