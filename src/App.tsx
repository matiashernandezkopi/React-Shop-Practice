import React ,{ useState } from 'react'
import './App.css'
import { Sidebar } from './components/sidebar';
import { SelectedContent } from './components/selectedContent';
import { CarritoMiniatura } from './components/carritoMinuatura';
import { useSelector } from 'react-redux';
import { LoginForm } from './components/loginForm';

/** TODO
 * 
 * al logearce, que se guarde el usuario en una variable. y que se utilice para hacer una venta desde el carrito. y se añada dicha venta en la ventasdb
*/

interface RootState {
  carritoArray: prendaCarrito[];
}


function App() {
  const [content,setContent] = useState<string>("Main")
  const [openLogin,setOpenLogin]=useState<boolean>(false)
  const carritoArray = useSelector((state:RootState) => state.carritoArray);
  
  const onClose = ()=>{
    setOpenLogin(false)
  }
  

  return (
    <>
      <button className=' absolute right-2 top-2 p-1 bg-blue-900 border-2 border-white text-white rounded-lg z-50' onClick={()=>setOpenLogin(true)}>Login</button>
      <Sidebar setContent={setContent} content={content} />
      
      <main className=' ml-36 h-full'>
        
        {openLogin && <LoginForm onClose={onClose}/>}
        <div className='h-full'>
          <SelectedContent content={content} />
        </div>
        <CarritoMiniatura carritoArray={carritoArray}/>
      </main> 
      
    </>
  
  )
}


export default App
