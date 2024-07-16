import React ,{ useState } from 'react'
import './App.css'
import { Sidebar } from './components/sidebar';
import { SelectedContent } from './components/selectedContent';
import { CarritoMiniatura } from './components/carritoMinuatura';
import { useSelector } from 'react-redux';
import { LoginForm } from './components/loginForm';

function App() {
  const [content,setContent] = useState<string>("Main")
  const [openLogin,setOpenLogin]=useState<boolean>(false)

  //loged user
  const [logedUser,setUser] = useState<LoggedUser|null>(null)

  const toLogin = (name:string,email:string,phone?:number)=>{
    const newLogedUser = {
      name: name,
      email: email,
      phone: phone
    }
    
    setUser(newLogedUser)
  }

  const toLogout = ()=>{
    setUser(null)
  }

  const carritoArray = useSelector((state:RootState) => state.carritoArray);
  
  const onClose = ()=>{
    setOpenLogin(false)
  }

  return (
    <>
      <button className=' absolute right-20 top-2 p-1 bg-blue-900 border-2 border-white text-white rounded-lg z-50' onClick={()=>setOpenLogin(true)}>LogIn</button>
      <button className=' absolute right-2 top-2 p-1 bg-red-900 border-2 border-white text-white rounded-lg z-50' onClick={()=>toLogout()}>LogOut</button>
      
      <Sidebar setContent={setContent} content={content} />
      
      <main className=' ml-36 h-full'>
        
        {openLogin && <LoginForm onClose={onClose} toLogin={toLogin}/>}
        <div className='h-full'>
          <SelectedContent content={content} />
        </div>
        <CarritoMiniatura carritoArray={carritoArray} LogedUser={logedUser}/>
      </main> 
    </>
  
  )
}


export default App
