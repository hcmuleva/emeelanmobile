import React,{useState} from 'react'
import MyLogin from './MyLogin'
import MyRegister from './MyRegister'

export default function LoginRegisterController() {
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