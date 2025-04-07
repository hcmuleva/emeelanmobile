import React, { useState } from 'react'
import MyLogin from '../../components/authentication/MyLogin'
import MyRegister from '../../components/authentication/MyRegister'


export default function LoginPage() {
  const [isLogined, setIsLogined] = useState(true)

  return (<>
        { isLogined ? 
            <MyLogin isLogined={isLogined} setIsLogined={setIsLogined}/>
            :
            <MyRegister isLogined={isLogined} setIsLogined={setIsLogined}/>
        }
    </>
  )
}